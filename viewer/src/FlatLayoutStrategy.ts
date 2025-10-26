import * as THREE from 'three';
import { DirectoryNode, TreeNode } from './types';
import { ILayoutStrategy, LayoutNode, CameraDefaults } from './ILayoutStrategy';

/**
 * FlatLayoutStrategy - Gource-inspired 2D flat layout
 *
 * Creates a flat 2D visualization where:
 * - All nodes positioned on Z=0 plane (X/Y only)
 * - Files arranged in concentric rings around parent directories (Gource style)
 * - Shallow vertical spacing creates compressed hierarchical view
 * - Camera looks straight down from above
 *
 * Ring calculation follows Gource's approach:
 * - Ring 1: floor(1 × π) files = ~3 files
 * - Ring 2: floor(2 × π) files = ~6 files
 * - Ring 3: floor(3 × π) files = ~9 files
 * - etc.
 */
export class FlatLayoutStrategy implements ILayoutStrategy {
  /**
   * Calculate radius for concentric ring layout
   * Uses Gource-inspired approach: files orbit directories in expanding rings
   */
  calculateRadius(childCount: number): number {
    // For flat layout, use tighter spacing than 3D hierarchical
    const baseRadius = 4;

    // Linear scaling works better for flat 2D view
    // 35 files: 4 + (35 * 0.3) = ~14.5 radius
    return baseRadius + (childCount * 0.3);
  }

  /**
   * Calculate files per ring (Gource style)
   * @param ringNumber Ring index (1-based: 1, 2, 3, ...)
   * @returns Number of files that fit in this ring
   */
  private calculateFilesPerRing(ringNumber: number): number {
    // Gource formula: diameter × π
    // Ring 1 (diameter=1): ~3 files
    // Ring 2 (diameter=2): ~6 files
    // Ring 3 (diameter=3): ~9 files
    return Math.floor(ringNumber * Math.PI);
  }

  /**
   * Calculate vertical spacing (much shallower than 3D hierarchical)
   * Flat layout compresses Y-axis to emphasize 2D spread
   */
  private calculateVerticalSpacing(level: number): number {
    // Very shallow spacing - keep everything close to same plane
    const baseSpacing = 3;
    const depthFactor = Math.max(0.5, 1 - level * 0.15);
    return baseSpacing * depthFactor;
  }

  /**
   * Get default camera configuration for flat 2D top-down view
   */
  getCameraDefaults(): CameraDefaults {
    return {
      position: new THREE.Vector3(0, 80, 0), // Looking straight down from above
      lookAt: new THREE.Vector3(0, 0, 0)
    };
  }

  /**
   * Layout tree nodes in flat 2D space with Gource-style ring positioning
   */
  layoutTree(
    node: DirectoryNode,
    position: THREE.Vector3,
    level: number,
    angleStart: number,
    angleEnd: number,
    parentLayout?: LayoutNode
  ): LayoutNode[] {
    const nodes: LayoutNode[] = [];

    // Force Z=0 for flat 2D layout
    const flatPosition = new THREE.Vector3(position.x, position.y, 0);
    const currentLayout: LayoutNode = { node, position: flatPosition, parent: parentLayout };
    nodes.push(currentLayout);

    if (node.children.length === 0) return nodes;

    // Separate directories and files
    const childDirs = node.children.filter(child => child.type === 'directory') as DirectoryNode[];
    const childFiles = node.children.filter(child => child.type === 'file');

    const verticalSpacing = this.calculateVerticalSpacing(level);

    // Layout directories first (outer ring)
    if (childDirs.length > 0) {
      const dirRadius = this.calculateRadius(childDirs.length);
      const angleStep = (Math.PI * 2) / childDirs.length;

      childDirs.forEach((child, index) => {
        const angle = angleStep * index;
        const childPosition = new THREE.Vector3(
          flatPosition.x + Math.cos(angle) * dirRadius,
          flatPosition.y - verticalSpacing,
          0 // Force Z=0
        );

        // Recursively layout subdirectory
        const childNodes = this.layoutTree(child, childPosition, level + 1, 0, Math.PI * 2, currentLayout);
        nodes.push(...childNodes);
      });
    }

    // Layout files in concentric rings (Gource style)
    if (childFiles.length > 0) {
      let filesRemaining = childFiles.length;
      let fileIndex = 0;
      let ringNumber = 1;

      while (filesRemaining > 0) {
        const filesInRing = Math.min(filesRemaining, this.calculateFilesPerRing(ringNumber));
        const ringRadius = ringNumber * 1.5; // 1.5 units between rings (file diameter)
        const angleStep = (Math.PI * 2) / filesInRing;

        for (let i = 0; i < filesInRing; i++) {
          const file = childFiles[fileIndex];
          const angle = angleStep * i;
          const filePosition = new THREE.Vector3(
            flatPosition.x + Math.cos(angle) * ringRadius,
            flatPosition.y - verticalSpacing,
            0 // Force Z=0
          );

          nodes.push({ node: file, position: filePosition, parent: currentLayout });
          fileIndex++;
        }

        filesRemaining -= filesInRing;
        ringNumber++;
      }
    }

    return nodes;
  }
}
