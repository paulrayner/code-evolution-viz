import { TreeNode } from '../types';

/**
 * Find a file in the tree by its path
 * @param tree - The tree to search
 * @param targetPath - The path to search for
 * @returns The file node if found, null otherwise
 */
export function findFileInTree(tree: any, targetPath: string): any | null {
  const traverse = (node: any): any | null => {
    if (node.type === 'file') {
      if (node.path === targetPath) {
        return node;
      }
      return null;
    } else if (node.type === 'directory' && node.children) {
      for (const child of node.children) {
        const result = traverse(child);
        if (result) return result;
      }
    }
    return null;
  };

  return traverse(tree);
}
