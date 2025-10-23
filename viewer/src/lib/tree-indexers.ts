import { DirectoryNode, FileNode, TreeNode } from '../types';

/**
 * Build an index mapping commit hashes to file nodes
 * @param tree - The directory tree to index
 * @returns Map of commit hash to array of files with that commit
 */
export function buildCommitIndex(tree: DirectoryNode): Map<string, FileNode[]> {
  const index = new Map<string, FileNode[]>();

  const processNode = (node: TreeNode) => {
    if (node.type === 'file') {
      if (node.lastCommitHash) {
        const files = index.get(node.lastCommitHash) || [];
        files.push(node);
        index.set(node.lastCommitHash, files);
      }
    } else {
      for (const child of node.children) {
        processNode(child);
      }
    }
  };

  for (const child of tree.children) {
    processNode(child);
  }

  return index;
}

/**
 * Build an index mapping file paths to FileNode objects
 * @param tree - The directory tree to index
 * @returns Map of file path to FileNode
 */
export function buildPathIndex(tree: DirectoryNode): Map<string, FileNode> {
  const index = new Map<string, FileNode>();

  const processNode = (node: TreeNode) => {
    if (node.type === 'file') {
      index.set(node.path, node);
    } else {
      for (const child of node.children) {
        processNode(child);
      }
    }
  };

  for (const child of tree.children) {
    processNode(child);
  }

  return index;
}
