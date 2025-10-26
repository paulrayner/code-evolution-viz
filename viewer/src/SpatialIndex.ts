import * as THREE from 'three';

/**
 * Axis-Aligned Bounding Box for 2D (X/Z plane)
 */
export interface AABB2D {
  minX: number;
  minZ: number;
  maxX: number;
  maxZ: number;
}

/**
 * Item that can be indexed spatially
 */
export interface SpatialItem {
  position: THREE.Vector3;
  radius: number;
  getBounds(): AABB2D;
}

/**
 * QuadTree node for spatial partitioning
 */
class QuadTreeNode {
  private bounds: AABB2D;
  private capacity: number;
  private items: SpatialItem[] = [];
  private divided: boolean = false;
  private northeast?: QuadTreeNode;
  private northwest?: QuadTreeNode;
  private southeast?: QuadTreeNode;
  private southwest?: QuadTreeNode;

  constructor(bounds: AABB2D, capacity: number = 4) {
    this.bounds = bounds;
    this.capacity = capacity;
  }

  /**
   * Insert item into quadtree
   */
  insert(item: SpatialItem): boolean {
    // Check if item is within bounds
    if (!this.contains(item)) {
      return false;
    }

    // If we have capacity, add here
    if (this.items.length < this.capacity && !this.divided) {
      this.items.push(item);
      return true;
    }

    // Otherwise, subdivide and insert into children
    if (!this.divided) {
      this.subdivide();
    }

    // Try inserting into children
    if (this.northeast!.insert(item)) return true;
    if (this.northwest!.insert(item)) return true;
    if (this.southeast!.insert(item)) return true;
    if (this.southwest!.insert(item)) return true;

    return false;
  }

  /**
   * Query items within a bounding box
   */
  query(range: AABB2D, found: SpatialItem[] = []): SpatialItem[] {
    // Check if range intersects this node's bounds
    if (!this.intersects(range)) {
      return found;
    }

    // Check items in this node
    for (const item of this.items) {
      const itemBounds = item.getBounds();
      if (this.boundsIntersect(range, itemBounds)) {
        found.push(item);
      }
    }

    // Query children if divided
    if (this.divided) {
      this.northeast!.query(range, found);
      this.northwest!.query(range, found);
      this.southeast!.query(range, found);
      this.southwest!.query(range, found);
    }

    return found;
  }

  /**
   * Check if item's bounds are within this node's bounds
   */
  private contains(item: SpatialItem): boolean {
    const itemBounds = item.getBounds();
    return (
      itemBounds.minX >= this.bounds.minX &&
      itemBounds.maxX <= this.bounds.maxX &&
      itemBounds.minZ >= this.bounds.minZ &&
      itemBounds.maxZ <= this.bounds.maxZ
    );
  }

  /**
   * Check if range intersects this node's bounds
   */
  private intersects(range: AABB2D): boolean {
    return this.boundsIntersect(this.bounds, range);
  }

  /**
   * Check if two bounding boxes intersect
   */
  private boundsIntersect(a: AABB2D, b: AABB2D): boolean {
    return !(
      a.maxX < b.minX ||
      a.minX > b.maxX ||
      a.maxZ < b.minZ ||
      a.minZ > b.maxZ
    );
  }

  /**
   * Subdivide this node into 4 children
   */
  private subdivide(): void {
    const x = this.bounds.minX;
    const z = this.bounds.minZ;
    const w = (this.bounds.maxX - this.bounds.minX) / 2;
    const h = (this.bounds.maxZ - this.bounds.minZ) / 2;

    this.northeast = new QuadTreeNode(
      { minX: x + w, minZ: z, maxX: x + w * 2, maxZ: z + h },
      this.capacity
    );
    this.northwest = new QuadTreeNode(
      { minX: x, minZ: z, maxX: x + w, maxZ: z + h },
      this.capacity
    );
    this.southeast = new QuadTreeNode(
      { minX: x + w, minZ: z + h, maxX: x + w * 2, maxZ: z + h * 2 },
      this.capacity
    );
    this.southwest = new QuadTreeNode(
      { minX: x, minZ: z + h, maxX: x + w, maxZ: z + h * 2 },
      this.capacity
    );

    this.divided = true;
  }
}

/**
 * SpatialIndex - QuadTree for 2D spatial partitioning
 *
 * Used for efficient collision detection in force-directed layout.
 * Reduces collision checks from O(n²) to O(n log n).
 */
export class SpatialIndex {
  private root: QuadTreeNode;
  private bounds: AABB2D;

  constructor(bounds?: AABB2D) {
    // Default bounds: large area centered at origin
    this.bounds = bounds || {
      minX: -500,
      minZ: -500,
      maxX: 500,
      maxZ: 500
    };
    this.root = new QuadTreeNode(this.bounds);
  }

  /**
   * Insert item into spatial index
   */
  insert(item: SpatialItem): void {
    this.root.insert(item);
  }

  /**
   * Query items within bounding box
   */
  query(range: AABB2D): SpatialItem[] {
    return this.root.query(range);
  }

  /**
   * Query items near a point (within radius)
   */
  queryNearPoint(x: number, z: number, radius: number): SpatialItem[] {
    const range: AABB2D = {
      minX: x - radius,
      minZ: z - radius,
      maxX: x + radius,
      maxZ: z + radius
    };
    return this.query(range);
  }

  /**
   * Clear all items (call before rebuilding each frame)
   */
  clear(): void {
    this.root = new QuadTreeNode(this.bounds);
  }
}
