import { describe, it, expect } from 'vitest';
import { calculateDirectorySize, calculateFileSize } from './node-sizing';

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

describe('calculateFileSize', () => {
  it('should use uniform size for all files in 2D layout', () => {
    const maxLoc = 1000;

    // Large file: 1000 LOC
    const largeFileSize = calculateFileSize(1000, maxLoc, true, 'off');

    // Small file: 10 LOC
    const smallFileSize = calculateFileSize(10, maxLoc, true, 'off');

    // In 2D mode, all files should have same size
    expect(largeFileSize).toBe(smallFileSize);
    expect(largeFileSize).toBe(0.5);
  });

  it('should use LOC-based sizing for files in 3D layout', () => {
    const maxLoc = 1000;

    // Large file: 1000 LOC (max)
    const largeFileSize = calculateFileSize(1000, maxLoc, false, 'off');

    // Small file: 10 LOC
    const smallFileSize = calculateFileSize(10, maxLoc, false, 'off');

    // In 3D mode, large file should be bigger than small file
    expect(largeFileSize).toBeGreaterThan(smallFileSize);

    // Large file has max LOC → should be max size (2.0 in normal mode)
    expect(largeFileSize).toBe(2.0);

    // Small file has 1% of max → should be minimum size (0.3)
    expect(smallFileSize).toBe(0.3);
  });

  it('should use smaller sizing in timeline mode', () => {
    const maxLoc = 1000;

    // Timeline mode should use smaller multiplier
    const timelineSize = calculateFileSize(1000, maxLoc, false, 'scrub');

    // Normal mode for comparison
    const normalSize = calculateFileSize(1000, maxLoc, false, 'off');

    // Timeline mode should be smaller
    expect(timelineSize).toBeLessThan(normalSize);
    expect(timelineSize).toBe(0.3);
  });
});
