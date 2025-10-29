import { describe, it, expect } from 'vitest';
import { calculateDirectorySize } from './node-sizing';

describe('calculateDirectorySize', () => {
  /**
   * In 2D Force-Directed layouts, all directories should have uniform size
   * regardless of their LOC count. This prevents massive root nodes dominating
   * the visualization.
   */
  it('should use uniform size for all directories in 2D layout', () => {
    const maxDirLoc = 10000;

    // Root directory: contains all repo LOC
    const rootSize = calculateDirectorySize(10000, maxDirLoc, true);

    // Small subdirectory: only 100 LOC
    const subdirSize = calculateDirectorySize(100, maxDirLoc, true);

    // In 2D mode, all directories should have same size
    // Current behavior: root = 3.0, subdir = 0.58 (DIFFERENT) → TEST FAILS
    // Desired behavior: both = 0.8 (SAME) → TEST PASSES
    expect(rootSize).toBe(subdirSize);
    expect(rootSize).toBe(0.8);
  });

  /**
   * In 3D Hierarchical layouts, directories should be sized based on LOC
   * to show visual hierarchy (larger directories = more code).
   */
  it('should use LOC-based sizing for directories in 3D layout', () => {
    const maxDirLoc = 10000;

    // Root directory: contains all repo LOC
    const rootSize = calculateDirectorySize(10000, maxDirLoc, false);

    // Small subdirectory: only 100 LOC
    const subdirSize = calculateDirectorySize(100, maxDirLoc, false);

    // In 3D mode, root should be larger than subdir
    expect(rootSize).toBeGreaterThan(subdirSize);

    // Root has all LOC → should be max size (3.0)
    expect(rootSize).toBe(3.0);

    // Subdir has 1% of max LOC → should be small (0.75)
    // Formula: 0.5 + (sqrt(100/10000) * 2.5) = 0.5 + (0.1 * 2.5) = 0.75
    expect(subdirSize).toBe(0.75);
  });
});
