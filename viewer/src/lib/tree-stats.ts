import { DirectoryNode, TreeNode } from '../types';

/**
 * Calculate statistics for a directory node
 * @param dir - The directory node to analyze
 * @returns Object with totalLoc and filesByExt counts
 */
export function calculateDirectoryStats(dir: DirectoryNode): { totalLoc: number; filesByExt: Record<string, number> } {
  const stats = { totalLoc: 0, filesByExt: {} as Record<string, number> };

  const processNode = (node: TreeNode) => {
    if (node.type === 'file') {
      stats.totalLoc += node.loc;
      const ext = node.extension;
      stats.filesByExt[ext] = (stats.filesByExt[ext] || 0) + 1;
    } else {
      for (const child of node.children) {
        processNode(child);
      }
    }
  };

  for (const child of dir.children) {
    processNode(child);
  }

  return stats;
}

/**
 * Calculate the maximum depth of a tree
 * @param node - The root node to traverse
 * @param depth - Current depth (used for recursion)
 * @returns Maximum depth found in the tree
 */
export function calculateMaxDepth(node: TreeNode, depth: number = 0): number {
  if (node.type === 'file') return depth;

  let maxDepth = depth;
  for (const child of node.children) {
    maxDepth = Math.max(maxDepth, calculateMaxDepth(child, depth + 1));
  }
  return maxDepth;
}

/**
 * Count directories in tree
 * @param node - The root node to traverse
 * @returns Number of directories found
 */
export function countDirectories(node: TreeNode): number {
  if (node.type === 'file') return 0;

  let count = 1; // This directory
  for (const child of node.children) {
    count += countDirectories(child);
  }
  return count;
}

/**
 * Collect all modification dates from files in the tree
 * @param tree - The directory tree to traverse
 * @returns Array of modification date strings
 */
export function collectModificationDates(tree: DirectoryNode): string[] {
  const dates: string[] = [];

  const processNode = (node: TreeNode) => {
    if (node.type === 'file') {
      if (node.lastModified) {
        dates.push(node.lastModified);
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

  return dates;
}

/**
 * Collect all LOC values from files in the tree
 * @param tree - The directory tree to traverse
 * @returns Array of LOC values
 */
export function collectLocValues(tree: DirectoryNode): number[] {
  const locValues: number[] = [];

  const processNode = (node: TreeNode) => {
    if (node.type === 'file') {
      locValues.push(node.loc);
    } else {
      for (const child of node.children) {
        processNode(child);
      }
    }
  };

  for (const child of tree.children) {
    processNode(child);
  }

  return locValues;
}
