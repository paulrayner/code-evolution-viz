import { describe, it, expect } from 'vitest';
import { getRootYPosition } from './layout-positioning';

describe('getRootYPosition', () => {
  /**
   * 2D Force-Directed layouts position root at Y=0 for true flat 2D.
   * Files orbit directories on the ground plane (XZ plane).
   */
  it('should return 0 for 2D layout (flat ground plane)', () => {
    const rootY = getRootYPosition(true);
    expect(rootY).toBe(0);
  });

  /**
   * 3D Hierarchical layouts position root at Y=10 for vertical hierarchy.
   * Parent directories appear above children in 3D space.
   */
  it('should return 10 for 3D layout (hierarchical elevation)', () => {
    const rootY = getRootYPosition(false);
    expect(rootY).toBe(10);
  });
});
