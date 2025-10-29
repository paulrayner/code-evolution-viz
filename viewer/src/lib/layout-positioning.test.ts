import { describe, it, expect } from 'vitest';
import { getRootYPosition, getCameraZOffset } from './layout-positioning';

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

describe('getCameraZOffset', () => {
  /**
   * 2D overhead camera needs tiny Z offset (0.1) to avoid lookAt() ambiguity.
   * When camera is at (0, Y, 0) looking at (0, 0, 0), there are infinite valid
   * orientations. The Z offset breaks this ambiguity.
   */
  it('should return 0.1 for 2D layout (avoid lookAt ambiguity)', () => {
    const zOffset = getCameraZOffset(true);
    expect(zOffset).toBe(0.1);
  });

  /**
   * 3D angled camera doesn't need Z offset - it's already positioned at an angle
   * like (30, 30, 30), so lookAt() has a unique solution.
   */
  it('should return 0 for 3D layout (no offset needed)', () => {
    const zOffset = getCameraZOffset(false);
    expect(zOffset).toBe(0);
  });
});
