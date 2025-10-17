#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import simpleGit, { SimpleGit } from 'simple-git';
import { DirectoryNode, FileNode, RepositorySnapshot, TreeNode, TimelineData } from './types';
import { TimelineAnalyzer } from './timeline-analyzer.js';

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
   * Get git metadata for a file (all metrics for visualization)
   */
  private async getGitMetadata(filePath: string): Promise<{
    lastModified: string | null;
    lastAuthor: string | null;
    lastCommitHash: string | null;
    lastCommitMessage: string | null;
    commitCount: number | null;
    contributorCount: number | null;
    firstCommitDate: string | null;
  }> {
    try {
      // Get full git log for this file (--follow to track renames)
      const log = await this.git.log({ file: filePath, '--follow': null });

      if (log.all.length > 0 && log.latest) {
        const latest = log.latest;
        const oldest = log.all[log.all.length - 1];

        // Get unique contributors
        const uniqueAuthors = new Set(log.all.map(commit => commit.author_name));

        return {
          lastModified: latest.date,
          lastAuthor: latest.author_name,
          lastCommitHash: latest.hash,
          lastCommitMessage: latest.message,
          commitCount: log.total,
          contributorCount: uniqueAuthors.size,
          firstCommitDate: oldest.date
        };
      }
    } catch (error) {
      console.log(`Could not get git history for ${filePath}`);
    }
    return {
      lastModified: null,
      lastAuthor: null,
      lastCommitHash: null,
      lastCommitMessage: null,
      commitCount: null,
      contributorCount: null,
      firstCommitDate: null
    };
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
  private buildTree(files: Array<{
    path: string;
    loc: number;
    lastModified: string | null;
    lastAuthor: string | null;
    lastCommitHash: string | null;
    commitCount: number | null;
    contributorCount: number | null;
    firstCommitDate: string | null;
  }>): DirectoryNode {
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
        lastCommitHash: file.lastCommitHash,
        commitCount: file.commitCount,
        contributorCount: file.contributorCount,
        firstCommitDate: file.firstCommitDate
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
        lastCommitHash: metadata.lastCommitHash,
        commitCount: metadata.commitCount,
        contributorCount: metadata.contributorCount,
        firstCommitDate: metadata.firstCommitDate
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

  // Parse flags
  let timelineMode = false;
  let targetCommitCount = 200;
  const positionalArgs: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--timeline') {
      timelineMode = true;
    } else if (arg === '--target-commits') {
      targetCommitCount = parseInt(args[++i], 10);
    } else if (!arg.startsWith('--')) {
      positionalArgs.push(arg);
    }
  }

  const repoPath = positionalArgs[0] || process.cwd();
  const outputPath = positionalArgs[1] || path.join(__dirname, '../output/repo-data.json');

  try {
    if (timelineMode) {
      // Timeline mode: Generate adaptive timeline with HEAD snapshot
      console.log('=== TIMELINE MODE ===');
      console.log(`Target commits: ${targetCommitCount}\n`);

      // First generate HEAD snapshot
      const analyzer = new RepositoryAnalyzer(repoPath);
      const headSnapshot = await analyzer.analyze();

      // Then generate timeline data
      const timelineAnalyzer = new TimelineAnalyzer(repoPath);
      const timelineData = await timelineAnalyzer.analyzeTimeline(targetCommitCount, headSnapshot);

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write output
      fs.writeFileSync(outputPath, JSON.stringify(timelineData, null, 2));
      console.log(`Output written to: ${outputPath}`);
      console.log(`\nTimeline Stats:`);
      console.log(`  Total commits in repo: ${timelineData.timeline.totalCommits}`);
      console.log(`  Commits in base sampling: ${timelineData.timeline.baseSampling.actualCount}`);
      console.log(`  Date range: ${timelineData.timeline.dateRange.first} to ${timelineData.timeline.dateRange.last}`);
      console.log(`\nHEAD Snapshot Stats:`);
      console.log(`  Total files: ${timelineData.headSnapshot.stats.totalFiles}`);
      console.log(`  Total LOC: ${timelineData.headSnapshot.stats.totalLoc}`);
    } else {
      // Static mode: Generate HEAD snapshot only (backward compatible)
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
    }
  } catch (error) {
    console.error('Error analyzing repository:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { RepositoryAnalyzer };
