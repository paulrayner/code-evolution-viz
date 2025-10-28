import * as THREE from 'three';
import { DirectoryNode } from './types';

export interface LayoutNode {
  node: import('./types').TreeNode;
  position: THREE.Vector3;
  mesh?: THREE.Mesh;
  parent?: LayoutNode;
  depth?: number;
}

/**
 * Camera configuration for a layout strategy
 */
export interface CameraDefaults {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
}

/**
 * ILayoutStrategy - Interface for tree layout algorithms
 *
 * Allows swapping between different layout strategies (3D hierarchical, flat 2D, force-directed, etc.)
 * without changing the visualization logic.
 */
export interface ILayoutStrategy {
  /**
   * Layout tree nodes in 3D space
   * @param node Root directory node to layout
   * @param position Starting position for the root
   * @param level Current depth level (0 = root)
   * @param angleStart Starting angle for angular layout (radians)
   * @param angleEnd Ending angle for angular layout (radians)
   * @param parentLayout Parent layout node (for building hierarchy)
   * @returns Array of positioned layout nodes
   */
  layoutTree(
    node: DirectoryNode,
    position: THREE.Vector3,
    level: number,
    angleStart: number,
    angleEnd: number,
    parentLayout?: LayoutNode
  ): LayoutNode[];

  /**
   * Calculate radius for child node positioning
   * @param childCount Number of children to position
   * @returns Radius value
   */
  calculateRadius(childCount: number): number;

  /**
   * Get default camera configuration for this layout
   * @returns Camera position and lookAt target
   */
  getCameraDefaults(): CameraDefaults;

  /**
   * Update physics simulation (optional, for force-directed layouts)
   * @param dt Delta time in seconds since last frame
   */
  tick?(dt: number): void;

  /**
   * Check if this layout needs continuous updates
   * @returns True if tick() should be called every frame (for physics)
   */
  needsContinuousUpdate?(): boolean;

  /**
   * Add a new node incrementally (optional, for timeline updates)
   * @param layoutNode The layout node to add
   */
  addNode?(layoutNode: LayoutNode): void;

  /**
   * Add a new edge incrementally (optional, for timeline updates)
   * @param parent Parent layout node
   * @param child Child layout node
   */
  addEdge?(parent: LayoutNode, child: LayoutNode): void;

  /**
   * Remove a node incrementally (optional, for timeline updates)
   * @param layoutNode The layout node to remove
   */
  removeNode?(layoutNode: LayoutNode): void;
}
