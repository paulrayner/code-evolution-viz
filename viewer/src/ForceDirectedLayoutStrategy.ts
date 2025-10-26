import * as THREE from 'three';
import { DirectoryNode, FileNode, TreeNode } from './types';
import { ILayoutStrategy, LayoutNode, CameraDefaults } from './ILayoutStrategy';
import { PhysicsNode } from './PhysicsNode';
import { SpatialIndex } from './SpatialIndex';

/**
 * Configuration for force-directed physics
 */
interface ForceDirectedConfig {
  gravity: number;           // Parent attraction strength (default: 10.0)
  elasticity: number;        // Motion smoothing (default: 0.0)
  damping: number;           // Velocity decay (default: 0.9)
  collisionPadding: number;  // Extra space between nodes (default: 1.5)
  maxSpeed: number;          // Speed limiter (default: 100)
  fileDiameter: number;      // File diameter for ring spacing (default: 1.5)
}

/**
 * File orbit info (Gource style - relative positioning)
 */
interface FileOrbitInfo {
  layoutNode: LayoutNode;
  relativeOffset: THREE.Vector2; // X/Z offset from parent
  parentPhysicsNode: PhysicsNode; // Reference to parent
}

/**
 * ForceDirectedLayoutStrategy - Gource-style physics-based layout
 *
 * Creates organic, breathing tree visualization using real-time physics simulation.
 * Based on Gource's RDirNode force calculations.
 *
 * Key forces:
 * 1. Collision avoidance (repulsion between overlapping nodes)
 * 2. Parent gravity (attraction to parent at radius distance)
 * 3. Grandparent alignment (push along parent→grandparent direction)
 * 4. Sibling spacing (spread evenly around parent circumference)
 */
export class ForceDirectedLayoutStrategy implements ILayoutStrategy {
  private physicsNodes: Map<DirectoryNode, PhysicsNode> = new Map();
  private fileLayoutNodes: LayoutNode[] = [];
  private fileOrbitInfo: FileOrbitInfo[] = []; // NEW: Track relative file positions
  private config: ForceDirectedConfig;
  private spatialIndex: SpatialIndex = new SpatialIndex();

  constructor(config?: Partial<ForceDirectedConfig>) {
    this.config = {
      gravity: 10.0,
      elasticity: 0.0,
      damping: 0.9,
      collisionPadding: 1.5,
      maxSpeed: 100,
      fileDiameter: 1.5, // Scaled for Three.js world coords (Gource uses 8.0 for pixels)
      ...config
    };
  }

  /**
   * Calculate radius based on directory size (like Gource)
   */
  calculateRadius(childCount: number): number {
    if (childCount === 0) return 3;

    // Gource-style: sqrt of area
    const padded_file_radius = this.config.fileDiameter * 0.5; // Half file diameter
    const file_area = padded_file_radius * padded_file_radius * Math.PI;
    const total_area = file_area * childCount;
    const dir_radius = Math.max(1.0, Math.sqrt(total_area)) * 1.5; // Padding multiplier

    return dir_radius;
  }

  /**
   * Get camera defaults for top-down 2D view (Gource style)
   */
  getCameraDefaults(): CameraDefaults {
    return {
      position: new THREE.Vector3(0, 150, 0.1), // Adjusted for smaller scene scale
      lookAt: new THREE.Vector3(0, 0, 0)
    };
  }

  /**
   * Initialize layout tree and physics nodes
   */
  layoutTree(
    node: DirectoryNode,
    position: THREE.Vector3,
    level: number,
    angleStart: number,
    angleEnd: number,
    parentLayout?: LayoutNode
  ): LayoutNode[] {
    // Clear previous state
    this.physicsNodes.clear();
    this.fileLayoutNodes = [];

    // Create physics nodes for all directories
    const rootPhysicsNode = this.createPhysicsNodes(node, position, null);

    // Set initial positions
    this.setInitialPositions(rootPhysicsNode);

    // Create file nodes (static, orbit parents)
    this.createFileNodes();

    // Collect all layout nodes
    const layoutNodes: LayoutNode[] = [];
    this.physicsNodes.forEach(pNode => {
      layoutNodes.push(pNode.layoutNode);
    });
    layoutNodes.push(...this.fileLayoutNodes);

    return layoutNodes;
  }

  /**
   * Recursively create physics nodes for directory tree
   */
  private createPhysicsNodes(
    dirNode: DirectoryNode,
    position: THREE.Vector3,
    parent: PhysicsNode | null
  ): PhysicsNode {
    // Calculate radius for this directory
    const childCount = dirNode.children.filter(c => c.type === 'file').length;
    const radius = this.calculateRadius(childCount);

    // Create layout node
    const layoutNode: LayoutNode = {
      node: dirNode,
      position: position.clone(),
      parent: parent?.layoutNode
    };

    // Create physics node
    const physicsNode = new PhysicsNode(layoutNode, radius, parent);
    this.physicsNodes.set(dirNode, physicsNode);

    // Add to parent's children
    if (parent) {
      parent.children.push(physicsNode);
    }

    // Recursively create child directories
    const childDirs = dirNode.children.filter(c => c.type === 'directory') as DirectoryNode[];
    for (const childDir of childDirs) {
      const childPos = position.clone(); // Will be set by setInitialPositions
      this.createPhysicsNodes(childDir, childPos, physicsNode);
    }

    return physicsNode;
  }

  /**
   * Set initial positions for all physics nodes (Gource style)
   */
  private setInitialPositions(root: PhysicsNode): void {
    // Root is fixed at origin
    root.position.set(0, 0, 0);
    root.isInitialized = true;

    // Recursively initialize children
    const queue: PhysicsNode[] = [root];
    while (queue.length > 0) {
      const node = queue.shift()!;

      for (const child of node.children) {
        if (!child.isInitialized) {
          // Start at parent position + random offset
          child.position.copy(node.position);

          // Add pseudo-random offset based on path (deterministic)
          const hash = this.hashString(child.directoryNode.path);
          const offsetX = ((hash % 100) - 50) / 50; // -1 to 1
          const offsetZ = (((hash * 17) % 100) - 50) / 50;
          child.position.x += offsetX;
          child.position.z += offsetZ;

          child.isInitialized = true;
        }
        queue.push(child);
      }
    }
  }

  /**
   * Simple string hash for deterministic randomness
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Create file nodes that orbit their parent directories (Gource algorithm)
   */
  private createFileNodes(): void {
    this.fileOrbitInfo = []; // Reset
    this.fileLayoutNodes = [];

    this.physicsNodes.forEach(physicsNode => {
      const dirNode = physicsNode.directoryNode;
      const files = dirNode.children.filter(c => c.type === 'file') as FileNode[];

      if (files.length === 0) return;

      // Gource's ring algorithm adapted for our coordinate system
      // Start close to directory center, independent of collision radius
      let diameter = 1;
      let distance = 3.0; // Start at fixed distance for visible rings
      let fileIndex = 0;
      let filesRemaining = files.length;

      while (filesRemaining > 0) {
        // Max files in this ring: scaled up for denser packing (Gource-like)
        const maxFilesInRing = Math.max(1, Math.floor(diameter * Math.PI * 3.5));
        const filesInRing = Math.min(filesRemaining, maxFilesInRing);
        const angleStep = (Math.PI * 2) / filesInRing;
        const angleOffset = (diameter - 1) * 0.5; // Rotate each ring to stagger files organically

        for (let i = 0; i < filesInRing && fileIndex < files.length; i++) {
          const file = files[fileIndex];
          const angle = angleStep * i + angleOffset;

          // Store RELATIVE offset from parent (Gource style)
          const relativeOffset = new THREE.Vector2(
            Math.cos(angle) * distance,
            Math.sin(angle) * distance
          );

          // Create layout node (position will be updated in updateFilePositions)
          const layoutNode: LayoutNode = {
            node: file,
            position: new THREE.Vector3(0, 0, 0), // Placeholder, updated every frame
            parent: physicsNode.layoutNode
          };

          this.fileOrbitInfo.push({
            layoutNode,
            relativeOffset,
            parentPhysicsNode: physicsNode
          });

          this.fileLayoutNodes.push(layoutNode);
          fileIndex++;
        }

        filesRemaining -= filesInRing;
        diameter++;
        distance += this.config.fileDiameter * 2; // Larger spacing for visible ring separation
      }
    });

    // Initial position update
    this.updateFilePositions();
  }

  /**
   * Physics update (called every frame)
   */
  tick(dt: number): void {
    // Cap delta time to prevent huge jumps
    dt = Math.min(dt, 0.1);

    // 1. Rebuild spatial index
    this.spatialIndex.clear();
    this.physicsNodes.forEach(node => {
      if (node.parent) { // Don't index root
        this.spatialIndex.insert(node);
      }
    });

    // 2. Apply forces to each node
    this.physicsNodes.forEach(node => {
      if (node.parent) { // Root is fixed
        this.applyForces(node);
      }
    });

    // 3. Integrate (move nodes)
    this.physicsNodes.forEach(node => {
      node.integrate(dt, this.config.elasticity);
    });

    // 4. Update file positions (orbit parents)
    this.updateFilePositions();
  }

  /**
   * Apply all forces to a physics node (Gource algorithm)
   */
  private applyForces(node: PhysicsNode): void {
    node.resetAcceleration();

    // 1. Collision avoidance (repulsion from nearby nodes)
    const nearby = this.spatialIndex.queryNearPoint(
      node.position.x,
      node.position.z,
      node.radius * 3 // Search radius
    );

    for (const other of nearby) {
      const otherNode = other as PhysicsNode;
      if (otherNode === node) continue;
      if (otherNode === node.parent) continue;
      if (otherNode.parent === node) continue;
      if (node.isAncestor(otherNode)) continue;
      if (otherNode.isAncestor(node)) continue;

      // Check overlap
      if (node.overlaps(otherNode)) {
        this.applyRepulsion(node, otherNode);
      }
    }

    // 2. Parent gravity (attraction to parent)
    this.applyParentGravity(node);

    // 3. Grandparent alignment (push along parent→grandparent direction)
    if (node.parent && node.parent.parent) {
      this.applyGrandparentAlignment(node);
    }

    // 4. Sibling spacing (spread around parent circumference)
    this.applySiblingSpacing(node);
  }

  /**
   * Force 1: Repulsion from overlapping node
   */
  private applyRepulsion(node: PhysicsNode, other: PhysicsNode): void {
    const dir = node.directionTo(other);
    const dx = other.position.x - node.position.x;
    const dz = other.position.z - node.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    // Overlap distance (negative = overlapping)
    const overlap = dist - node.radius - other.radius;

    // Push apart proportional to overlap
    node.applyForce(overlap * dir.x, overlap * dir.y);
  }

  /**
   * Force 2: Parent gravity (pull toward parent at radius distance)
   */
  private applyParentGravity(node: PhysicsNode): void {
    if (!node.parent) return;

    const parentDist = node.distanceToParent();
    const dx = node.parent.position.x - node.position.x;
    const dz = node.parent.position.z - node.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist < 0.00001) return;

    const forceX = this.config.gravity * parentDist * (dx / dist);
    const forceZ = this.config.gravity * parentDist * (dz / dist);

    node.applyForce(forceX, forceZ);
  }

  /**
   * Force 3: Grandparent alignment (push along parent→grandparent direction)
   */
  private applyGrandparentAlignment(node: PhysicsNode): void {
    const parent = node.parent!;
    const grandparent = parent.parent!;

    // Direction from grandparent to parent
    const edgeX = parent.position.x - grandparent.position.x;
    const edgeZ = parent.position.z - grandparent.position.z;
    const edgeLen = Math.sqrt(edgeX * edgeX + edgeZ * edgeZ);

    if (edgeLen < 0.00001) return;

    const normalX = edgeX / edgeLen;
    const normalZ = edgeZ / edgeLen;

    // Desired position: along parent→grandparent line, at parent's radius
    const desiredX = parent.position.x + (parent.radius + node.radius) * normalX;
    const desiredZ = parent.position.z + (parent.radius + node.radius) * normalZ;

    // Force toward desired position
    const forceX = desiredX - node.position.x;
    const forceZ = desiredZ - node.position.z;

    node.applyForce(forceX, forceZ);
  }

  /**
   * Force 4: Sibling spacing (spread evenly around parent)
   */
  private applySiblingSpacing(node: PhysicsNode): void {
    const siblings = node.parent!.children.filter(s => s !== node);
    if (siblings.length === 0) return;

    let repulsionX = 0;
    let repulsionZ = 0;
    let visibleCount = 1;

    for (const sibling of siblings) {
      visibleCount++;

      // Repel from sibling
      const dir = node.directionTo(sibling);
      repulsionX -= dir.x;
      repulsionZ -= dir.y;
    }

    // Scale by parent circumference divided by sibling count
    const sliceSize = (node.parent!.radius * Math.PI) / (visibleCount + 1);
    repulsionX *= sliceSize;
    repulsionZ *= sliceSize;

    node.applyForce(repulsionX, repulsionZ);
  }

  /**
   * Update file positions to orbit their parent directories (Gource style)
   * Files use relative offsets, calculate absolute position from parent
   */
  private updateFilePositions(): void {
    for (const fileInfo of this.fileOrbitInfo) {
      const parent = fileInfo.parentPhysicsNode;

      // Calculate absolute position (relative offset + parent position)
      fileInfo.layoutNode.position.x = parent.position.x + fileInfo.relativeOffset.x;
      fileInfo.layoutNode.position.y = 0; // Always Y=0 (true flat 2D)
      fileInfo.layoutNode.position.z = parent.position.z + fileInfo.relativeOffset.y;
    }
  }

  /**
   * This layout needs continuous updates
   */
  needsContinuousUpdate(): boolean {
    return true;
  }
}
