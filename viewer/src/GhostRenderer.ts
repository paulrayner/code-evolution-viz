import * as THREE from 'three';
import { DirectoryNode, FileNode, TreeNode } from './types';

/**
 * GhostRenderer - Isolated module for Timeline V2 deletion visualization
 *
 * Renders "ghost" nodes for deleted files with red connections.
 * Ghosts appear temporarily during timeline playback to show what was removed.
 *
 * TODO: Replace with proper incremental scene updates in future
 */
export class GhostRenderer {
  private ghostMeshes: Set<THREE.Mesh> = new Set();
  private ghostEdges: Set<THREE.Line> = new Set();

  /**
   * Find mesh by file/directory path
   * @param path - File or directory path to find
   * @param fileObjects - Map of meshes to file nodes
   * @param dirObjects - Map of meshes to directory nodes
   * @returns Mesh if found, null otherwise
   */
  private findMeshByPath(
    path: string,
    fileObjects: Map<THREE.Object3D, FileNode>,
    dirObjects: Map<THREE.Object3D, DirectoryNode>
  ): THREE.Mesh | null {
    // Search in file objects
    for (const [mesh, fileNode] of fileObjects.entries()) {
      if (fileNode.path === path) {
        return mesh as THREE.Mesh;
      }
    }

    // Search in directory objects
    for (const [mesh, dirNode] of dirObjects.entries()) {
      if (dirNode.path === path) {
        return mesh as THREE.Mesh;
      }
    }

    return null;
  }

  /**
   * Clear all ghost meshes and edges from scene
   */
  clearGhosts(
    scene: THREE.Scene,
    fileObjects: Map<THREE.Object3D, FileNode>,
    edges: THREE.Line[],
    edgeNodeMap: Map<THREE.Line, { parent: TreeNode; child: TreeNode }>
  ) {
    // Remove ghost meshes from scene and fileObjects map
    for (const mesh of this.ghostMeshes) {
      scene.remove(mesh);
      fileObjects.delete(mesh);
    }

    // Remove ghost edges from scene and edges array
    for (const edge of this.ghostEdges) {
      scene.remove(edge);
      const index = edges.indexOf(edge);
      if (index !== -1) {
        edges.splice(index, 1);
      }
      edgeNodeMap.delete(edge);
    }

    // Clear tracking sets
    this.ghostMeshes.clear();
    this.ghostEdges.clear();
  }

  /**
   * Calculate position for ghost file among siblings in radial layout
   * Places ghost at midpoint between two sibling files
   */
  private calculateGhostPosition(
    parentMesh: THREE.Mesh,
    parentDirNode: DirectoryNode,
    fileObjects: Map<THREE.Object3D, FileNode>
  ): THREE.Vector3 {
    const parentPos = parentMesh.position;

    // Find first two sibling file meshes
    const siblingMeshes: THREE.Mesh[] = [];
    for (const child of parentDirNode.children) {
      if (child.type === 'file') {
        for (const [mesh, fileNode] of fileObjects.entries()) {
          if (fileNode.path === child.path) {
            siblingMeshes.push(mesh as THREE.Mesh);
            if (siblingMeshes.length === 2) break;
          }
        }
        if (siblingMeshes.length === 2) break;
      }
    }

    // No siblings: place at default position
    if (siblingMeshes.length === 0) {
      const defaultRadius = 10;
      const randomAngle = Math.random() * Math.PI * 2;
      return new THREE.Vector3(
        parentPos.x + defaultRadius * Math.cos(randomAngle),
        parentPos.y,
        parentPos.z + defaultRadius * Math.sin(randomAngle)
      );
    }

    // One sibling: place opposite side with same Y position
    if (siblingMeshes.length === 1) {
      const dx = siblingMeshes[0].position.x - parentPos.x;
      const dz = siblingMeshes[0].position.z - parentPos.z;
      const radius = Math.sqrt(dx * dx + dz * dz);
      const angle = Math.atan2(dz, dx);
      const oppositeAngle = angle + Math.PI;
      return new THREE.Vector3(
        parentPos.x + radius * Math.cos(oppositeAngle),
        siblingMeshes[0].position.y,  // Use same Y as sibling
        parentPos.z + radius * Math.sin(oppositeAngle)
      );
    }

    // Two+ siblings: place at midpoint angle with average Y position
    const dx1 = siblingMeshes[0].position.x - parentPos.x;
    const dz1 = siblingMeshes[0].position.z - parentPos.z;
    const angle1 = Math.atan2(dz1, dx1);
    const radius1 = Math.sqrt(dx1 * dx1 + dz1 * dz1);

    const dx2 = siblingMeshes[1].position.x - parentPos.x;
    const dz2 = siblingMeshes[1].position.z - parentPos.z;
    const angle2 = Math.atan2(dz2, dx2);
    const radius2 = Math.sqrt(dx2 * dx2 + dz2 * dz2);

    // Midpoint angle, average radius, and average Y position
    const midAngle = (angle1 + angle2) / 2;
    const avgRadius = (radius1 + radius2) / 2;
    const avgY = (siblingMeshes[0].position.y + siblingMeshes[1].position.y) / 2;

    return new THREE.Vector3(
      parentPos.x + avgRadius * Math.cos(midAngle),
      avgY,  // Use average Y of siblings
      parentPos.z + avgRadius * Math.sin(midAngle)
    );
  }

  /**
   * Render ghost files for deletions (Timeline V2 only)
   * @param deletedPaths - Paths of files being deleted
   * @param prevTree - Previous tree state (where files still exist)
   * @param scene - Three.js scene to add ghosts to
   * @param fileObjects - Map of meshes to file nodes
   * @param dirObjects - Map of meshes to directory nodes
   * @param edges - Array of edges to add ghost edges to
   * @param edgeNodeMap - Map of edges to their parent/child nodes
   * @param timelineMode - Current timeline mode
   */
  private renderDeletionGhosts(
    deletedPaths: string[],
    prevTree: DirectoryNode,
    scene: THREE.Scene,
    fileObjects: Map<THREE.Object3D, FileNode>,
    dirObjects: Map<THREE.Object3D, DirectoryNode>,
    edges: THREE.Line[],
    edgeNodeMap: Map<THREE.Line, { parent: TreeNode; child: TreeNode }>,
    timelineMode: 'off' | 'v1' | 'v2'
  ) {
    for (const filePath of deletedPaths) {
      // Find the file in the previous tree to get metadata
      const fileNode = this.findFileInPrevTree(prevTree, filePath);
      if (!fileNode) {
        console.warn(`Ghost rendering: Could not find deleted file in prev tree: ${filePath}`);
        continue;
      }

      // Find parent directory mesh in CURRENT tree
      // If parent directory was also deleted, skip rendering ghost for this file
      const parentPath = filePath.substring(0, filePath.lastIndexOf('/'));
      let parentMesh: THREE.Mesh | null = null;

      if (parentPath) {
        // File in subdirectory - find parent by path in current tree
        parentMesh = this.findMeshByPath(parentPath, fileObjects, dirObjects);
        if (!parentMesh) {
          // Parent directory doesn't exist in current tree (was also deleted)
          // Skip ghost rendering - no place to attach it
          continue;
        }
      } else {
        // File at root level - find root directory mesh
        // Root directory is always the first directory in dirObjects with empty/root path
        for (const [mesh, dirNode] of dirObjects.entries()) {
          if (dirNode.path === '' || dirNode.name === 'root') {
            parentMesh = mesh as THREE.Mesh;
            break;
          }
        }
        if (!parentMesh) {
          // Should never happen - root always exists
          continue;
        }
      }

      // Position ghost naturally among sibling files using midpoint angle
      const parentDirNode = dirObjects.get(parentMesh) || prevTree;
      const ghostPosition = this.calculateGhostPosition(parentMesh, parentDirNode, fileObjects);

      // Create sphere with same size as regular files for visual consistency
      // Match the size calculation used in createVisuals() for regular files
      const sizeMultiplier = timelineMode !== 'off' ? 0.3 : 2;
      const minSize = timelineMode !== 'off' ? 0.3 : 0.3;
      const normalizedSize = Math.max(minSize, (fileNode.loc / 100) * sizeMultiplier);
      const geometry = new THREE.SphereGeometry(normalizedSize, 16, 16);

      // Use red color for deleted files (makes deletions visually obvious)
      const redColor = 0xe74c3c; // Matches red connection line color

      const material = new THREE.MeshPhongMaterial({
        color: redColor,
        emissive: redColor,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 1.0
      });

      const ghostMesh = new THREE.Mesh(geometry, material);
      ghostMesh.position.copy(ghostPosition);

      // Add to scene and tracking
      scene.add(ghostMesh);
      fileObjects.set(ghostMesh, fileNode);
      this.ghostMeshes.add(ghostMesh);

      // Create edge from parent to ghost (will be colored red by highlighting)
      const edgeGeometry = new THREE.BufferGeometry().setFromPoints([
        parentMesh.position,
        ghostPosition
      ]);
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: 0x000000,
        opacity: 0.4,
        transparent: true
      });
      const edge = new THREE.Line(edgeGeometry, edgeMaterial);

      scene.add(edge);
      edges.push(edge);
      edgeNodeMap.set(edge, {
        parent: dirObjects.get(parentMesh) || prevTree,
        child: fileNode
      });
      this.ghostEdges.add(edge);
    }
  }

  /**
   * Find file node in previous tree by path
   */
  private findFileInPrevTree(tree: DirectoryNode, targetPath: string): FileNode | null {
    const traverse = (node: TreeNode): FileNode | null => {
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

  /**
   * Public API: Render deleted files as ghosts (Timeline V2 only)
   * @param deletedPaths - Paths of files being deleted
   * @param prevTree - Previous tree state (where files still exist)
   * @param scene - Three.js scene to add ghosts to
   * @param fileObjects - Map of meshes to file nodes
   * @param dirObjects - Map of meshes to directory nodes
   * @param edges - Array of edges to add ghost edges to
   * @param edgeNodeMap - Map of edges to their parent/child nodes
   * @param timelineMode - Current timeline mode
   */
  renderDeletedFiles(
    deletedPaths: string[],
    prevTree: DirectoryNode | null,
    scene: THREE.Scene,
    fileObjects: Map<THREE.Object3D, FileNode>,
    dirObjects: Map<THREE.Object3D, DirectoryNode>,
    edges: THREE.Line[],
    edgeNodeMap: Map<THREE.Line, { parent: TreeNode; child: TreeNode }>,
    timelineMode: 'off' | 'v1' | 'v2'
  ) {
    // Only render ghosts in Timeline V2 mode
    if (timelineMode !== 'v2') {
      return;
    }

    if (!prevTree || deletedPaths.length === 0) {
      return;
    }

    this.renderDeletionGhosts(deletedPaths, prevTree, scene, fileObjects, dirObjects, edges, edgeNodeMap, timelineMode);
  }
}
