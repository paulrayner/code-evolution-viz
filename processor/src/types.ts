/**
 * Shared types for repository analysis
 */

export interface FileNode {
  path: string;
  name: string;
  type: 'file';
  loc: number;
  extension: string;
  lastModified: string | null;
  lastAuthor: string | null;
  lastCommitHash: string | null;
}

export interface DirectoryNode {
  path: string;
  name: string;
  type: 'directory';
  children: TreeNode[];
}

export type TreeNode = FileNode | DirectoryNode;

export interface RepositorySnapshot {
  repositoryPath: string;
  commit: string;
  timestamp: string;
  author: string;
  message: string;
  tree: DirectoryNode;
  commitMessages: Record<string, string>; // Map of commit hash -> commit message
  stats: {
    totalFiles: number;
    totalLoc: number;
    filesByExtension: Record<string, number>;
  };
}
