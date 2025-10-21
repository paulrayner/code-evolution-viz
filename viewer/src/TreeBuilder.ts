import { DirectoryNode, FileNode, TreeNode, CommitSnapshot } from './types';

/**
 * TreeBuilder - Delta application engine for timeline-v2
 * Builds directory tree incrementally by applying commit deltas
 * Phase 1 POC for full delta timeline reconstruction
 */
export class TreeBuilder {
  private tree: DirectoryNode;

  constructor() {
    this.tree = {
      path: '',
      name: 'root',
      type: 'directory',
      children: []
    };
  }

  /**
   * Apply a single commit's delta to the tree
   */
  applyDelta(commit: CommitSnapshot): DirectoryNode {
    // IMPORTANT: Process deletes FIRST to handle rename scenarios correctly
    // If a file is renamed, git may show it as delete old + add new in same commit
    for (const path of commit.changes.filesDeleted) {
      this.deleteFile(path);
    }

    // Then add files
    for (const path of commit.changes.filesAdded) {
      this.addFile(path, {
        author: commit.author,
        date: commit.date,
        hash: commit.hash
      });
    }

    // Finally modify files
    for (const path of commit.changes.filesModified) {
      this.modifyFile(path, {
        author: commit.author,
        date: commit.date,
        hash: commit.hash
      });
    }

    return this.tree;
  }

  /**
   * Add a file to the tree, creating intermediate directories as needed
   */
  private addFile(path: string, metadata: { author: string; date: string; hash: string }): void {
    const parts = path.split('/');
    let node: DirectoryNode = this.tree;

    // Create intermediate directories
    for (let i = 0; i < parts.length - 1; i++) {
      const dirName = parts[i];
      const partialPath = parts.slice(0, i + 1).join('/');

      let child = node.children.find(
        c => c.name === dirName && c.type === 'directory'
      ) as DirectoryNode | undefined;

      if (!child) {
        child = {
          path: partialPath,
          name: dirName,
          type: 'directory',
          children: []
        };
        node.children.push(child);
      }

      node = child;
    }

    // Add the file
    const fileName = parts[parts.length - 1];

    // Check if file already exists (can happen with renames in same commit)
    const existingIndex = node.children.findIndex(c => c.name === fileName);
    if (existingIndex !== -1) {
      // Silently replace - this is normal for renames
      node.children.splice(existingIndex, 1);
    }

    const file: FileNode = {
      path,
      name: fileName,
      type: 'file',
      loc: 100, // Placeholder - no per-file LOC metrics in v2 yet
      extension: this.getExtension(fileName),
      lastModified: metadata.date,
      lastAuthor: metadata.author,
      lastCommitHash: metadata.hash,
      commitCount: 1,
      contributorCount: 1,
      firstCommitDate: metadata.date,
      recentLinesChanged: null,
      avgLinesPerCommit: null,
      daysSinceLastModified: null
    };

    node.children.push(file);
  }

  /**
   * Delete a file from the tree and prune empty directories
   */
  private deleteFile(path: string): void {
    const parts = path.split('/');
    const parent = this.findNode(parts.slice(0, -1));

    if (!parent || parent.type !== 'directory') {
      // Parent doesn't exist - file was already deleted or never added
      return;
    }

    const fileName = parts[parts.length - 1];
    parent.children = parent.children.filter(c => c.name !== fileName);
    // Note: Silently ignore if file doesn't exist - may have been deleted already

    // Prune empty directories upward
    this.pruneEmptyDirectories(parts.slice(0, -1));
  }

  /**
   * Modify a file (update metadata)
   */
  private modifyFile(path: string, metadata: { author: string; date: string; hash: string }): void {
    const file = this.findFile(path);

    if (!file) {
      // File doesn't exist - might have been deleted or never added
      // This can happen with complex git histories
      return;
    }

    file.lastAuthor = metadata.author;
    file.lastModified = metadata.date;
    file.lastCommitHash = metadata.hash;
    file.commitCount = (file.commitCount || 0) + 1;
  }

  /**
   * Remove empty directories walking up the tree
   */
  private pruneEmptyDirectories(pathParts: string[]): void {
    for (let i = pathParts.length - 1; i >= 0; i--) {
      const node = this.findNode(pathParts.slice(0, i + 1));

      if (!node || node.type !== 'directory') {
        break;
      }

      if (node.children.length === 0) {
        // Directory is empty, remove it
        const parent = this.findNode(pathParts.slice(0, i));

        if (parent && parent.type === 'directory') {
          parent.children = parent.children.filter(c => c.name !== node.name);
        } else {
          break; // Can't remove root
        }
      } else {
        // Stop at first non-empty parent
        break;
      }
    }
  }

  /**
   * Find a node by path parts
   */
  private findNode(pathParts: string[]): TreeNode | null {
    if (pathParts.length === 0) {
      return this.tree;
    }

    let node: TreeNode = this.tree;

    for (const part of pathParts) {
      if (node.type !== 'directory') {
        return null;
      }

      const child = node.children.find(c => c.name === part);
      if (!child) {
        return null;
      }

      node = child;
    }

    return node;
  }

  /**
   * Find a file node by full path
   */
  private findFile(path: string): FileNode | null {
    const parts = path.split('/');
    const node = this.findNode(parts);

    if (node && node.type === 'file') {
      return node as FileNode;
    }

    return null;
  }

  /**
   * Get file extension from filename
   */
  private getExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    if (lastDot === -1 || lastDot === 0) {
      return 'no-extension';
    }
    return filename.substring(lastDot + 1);
  }

  /**
   * Deep clone the current tree (for keyframes)
   */
  clone(): DirectoryNode {
    return JSON.parse(JSON.stringify(this.tree));
  }

  /**
   * Get the current tree
   */
  getTree(): DirectoryNode {
    return this.tree;
  }

  /**
   * Set the tree (for initializing from a cloned keyframe)
   */
  setTree(tree: DirectoryNode): void {
    this.tree = tree;
  }

  /**
   * Export all file paths (for validation)
   */
  exportPaths(): string[] {
    const paths: string[] = [];

    const traverse = (node: TreeNode) => {
      if (node.type === 'file') {
        paths.push(node.path);
      } else {
        node.children.forEach(traverse);
      }
    };

    traverse(this.tree);
    return paths.sort();
  }

  /**
   * Get tree statistics
   */
  getStats(): { totalFiles: number; totalDirs: number; depth: number } {
    let totalFiles = 0;
    let totalDirs = 0;
    let maxDepth = 0;

    const traverse = (node: TreeNode, depth: number) => {
      if (node.type === 'file') {
        totalFiles++;
        maxDepth = Math.max(maxDepth, depth);
      } else {
        totalDirs++;
        node.children.forEach(c => traverse(c, depth + 1));
      }
    };

    traverse(this.tree, 0);

    return { totalFiles, totalDirs, depth: maxDepth };
  }
}
