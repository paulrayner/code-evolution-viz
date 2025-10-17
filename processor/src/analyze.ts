#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import simpleGit, { SimpleGit } from 'simple-git';
import { DirectoryNode, FileNode, RepositorySnapshot, TreeNode } from './types';

interface FileInfo {
  path: string;
  content: string;
}

class RepositoryAnalyzer {
  private git: SimpleGit;
  private repoPath: string;

  constructor(repoPath: string) {
    this.repoPath = path.resolve(repoPath);
    this.git = simpleGit(this.repoPath);
  }

  /**
   * Count non-blank lines in file content
   */
  private countLinesOfCode(content: string): number {
    const lines = content.split('\n');
    return lines.filter(line => line.trim().length > 0).length;
  }

  /**
   * Get file extension
   */
  private getExtension(filePath: string): string {
    const ext = path.extname(filePath);
    return ext.length > 0 ? ext.substring(1) : 'no-extension';
  }

  /**
   * Get git metadata for a file (date, author, commit hash, and message from most recent commit)
   */
  private async getGitMetadata(filePath: string): Promise<{
    lastModified: string | null;
    lastAuthor: string | null;
    lastCommitHash: string | null;
    lastCommitMessage: string | null;
  }> {
    try {
      // Get the most recent commit that modified this file
      const log = await this.git.log({ file: filePath, maxCount: 1 });
      if (log.latest) {
        return {
          lastModified: log.latest.date,
          lastAuthor: log.latest.author_name,
          lastCommitHash: log.latest.hash,
          lastCommitMessage: log.latest.message
        };
      }
    } catch (error) {
      console.log(`Could not get git history for ${filePath}`);
    }
    return { lastModified: null, lastAuthor: null, lastCommitHash: null, lastCommitMessage: null };
  }

  /**
   * Read all files at HEAD
   */
  private async getFilesAtHead(): Promise<FileInfo[]> {
    const files = await this.git.raw(['ls-tree', '-r', 'HEAD', '--name-only']);
    const fileList = files.trim().split('\n').filter((f: string) => f.length > 0);

    const fileInfos: FileInfo[] = [];

    for (const filePath of fileList) {
      try {
        const fullPath = path.join(this.repoPath, filePath);

        // Skip binary files and very large files
        const stats = fs.statSync(fullPath);
        if (stats.size > 1024 * 1024) { // Skip files > 1MB
          console.log(`Skipping large file: ${filePath}`);
          continue;
        }

        const content = fs.readFileSync(fullPath, 'utf-8');
        fileInfos.push({ path: filePath, content });
      } catch (error) {
        console.log(`Could not read file ${filePath}, skipping`);
      }
    }

    return fileInfos;
  }

  /**
   * Build hierarchical tree structure from flat file list
   */
  private buildTree(files: Array<{ path: string; loc: number; lastModified: string | null; lastAuthor: string | null; lastCommitHash: string | null }>): DirectoryNode {
    const root: DirectoryNode = {
      path: '',
      name: 'root',
      type: 'directory',
      children: []
    };

    for (const file of files) {
      const parts = file.path.split('/');
      let currentNode = root;

      // Navigate/create directory structure
      for (let i = 0; i < parts.length - 1; i++) {
        const dirName = parts[i];
        const dirPath = parts.slice(0, i + 1).join('/');

        let dirNode = currentNode.children.find(
          child => child.type === 'directory' && child.name === dirName
        ) as DirectoryNode | undefined;

        if (!dirNode) {
          dirNode = {
            path: dirPath,
            name: dirName,
            type: 'directory',
            children: []
          };
          currentNode.children.push(dirNode);
        }

        currentNode = dirNode;
      }

      // Add file node
      const fileName = parts[parts.length - 1];
      const fileNode: FileNode = {
        path: file.path,
        name: fileName,
        type: 'file',
        loc: file.loc,
        extension: this.getExtension(fileName),
        lastModified: file.lastModified,
        lastAuthor: file.lastAuthor,
        lastCommitHash: file.lastCommitHash
      };
      currentNode.children.push(fileNode);
    }

    return root;
  }

  /**
   * Analyze repository at HEAD
   */
  async analyze(): Promise<RepositorySnapshot> {
    console.log(`Analyzing repository: ${this.repoPath}`);

    // Get HEAD commit info
    const log = await this.git.log({ maxCount: 1 });
    const headCommit = log.latest;

    if (!headCommit) {
      throw new Error('No commits found in repository');
    }

    console.log(`HEAD commit: ${headCommit.hash}`);
    console.log(`Reading files...`);

    // Get all files and calculate LOC
    const fileInfos = await this.getFilesAtHead();
    console.log(`Found ${fileInfos.length} files`);

    // Calculate LOC and get git metadata for each file
    console.log('Collecting git metadata...');
    const filesWithMetadata = [];
    const commitMessages: Record<string, string> = {};

    for (let i = 0; i < fileInfos.length; i++) {
      const f = fileInfos[i];
      const metadata = await this.getGitMetadata(f.path);
      filesWithMetadata.push({
        path: f.path,
        loc: this.countLinesOfCode(f.content),
        lastModified: metadata.lastModified,
        lastAuthor: metadata.lastAuthor,
        lastCommitHash: metadata.lastCommitHash
      });

      // Collect unique commit messages
      if (metadata.lastCommitHash && metadata.lastCommitMessage) {
        if (!commitMessages[metadata.lastCommitHash]) {
          commitMessages[metadata.lastCommitHash] = metadata.lastCommitMessage;
        }
      }

      // Progress indicator for large repos
      if ((i + 1) % 100 === 0) {
        console.log(`  Processed ${i + 1}/${fileInfos.length} files...`);
      }
    }

    // Build tree structure
    console.log('Building tree structure...');
    const tree = this.buildTree(filesWithMetadata);

    // Calculate stats
    const totalLoc = filesWithMetadata.reduce((sum, f) => sum + f.loc, 0);
    const filesByExtension: Record<string, number> = {};

    for (const file of filesWithMetadata) {
      const ext = this.getExtension(file.path);
      filesByExtension[ext] = (filesByExtension[ext] || 0) + 1;
    }

    console.log(`Collected ${Object.keys(commitMessages).length} unique commit messages`);

    const snapshot: RepositorySnapshot = {
      repositoryPath: this.repoPath,
      commit: headCommit.hash,
      timestamp: headCommit.date,
      author: headCommit.author_name,
      message: headCommit.message,
      tree,
      commitMessages,
      stats: {
        totalFiles: filesWithMetadata.length,
        totalLoc,
        filesByExtension
      }
    };

    console.log(`Analysis complete: ${totalLoc} total LOC across ${filesWithMetadata.length} files`);
    return snapshot;
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);
  const repoPath = args[0] || process.cwd();
  const outputPath = args[1] || path.join(__dirname, '../output/repo-data.json');

  try {
    const analyzer = new RepositoryAnalyzer(repoPath);
    const snapshot = await analyzer.analyze();

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write output
    fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));
    console.log(`\nOutput written to: ${outputPath}`);
    console.log(`\nStats:`);
    console.log(`  Total files: ${snapshot.stats.totalFiles}`);
    console.log(`  Total LOC: ${snapshot.stats.totalLoc}`);
    console.log(`  Files by extension:`, snapshot.stats.filesByExtension);
  } catch (error) {
    console.error('Error analyzing repository:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { RepositoryAnalyzer };
