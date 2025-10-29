import { describe, it, expect } from 'vitest';
import { shouldShowGrid } from './grid-visibility';

describe('shouldShowGrid', () => {
  /**
   * In 2D Force-Directed overhead view, the grid is distracting and unnecessary.
   * There's no perspective/depth in pure overhead view, so spatial reference isn't needed.
   */
  it('should hide grid in 2D Force-Directed layout', () => {
    const is2DLayout = true;
    const result = shouldShowGrid(is2DLayout);

    // Current behavior: returns true (always show) → TEST FAILS
    // Desired behavior: returns false (hide in 2D) → TEST PASSES
    expect(result).toBe(false);
  });

  /**
   * In 3D Hierarchical perspective view, the grid provides spatial reference
   * for depth perception and helps users orient themselves in 3D space.
   */
  it('should show grid in 3D Hierarchical layout', () => {
    const is2DLayout = false;
    const result = shouldShowGrid(is2DLayout);

    // Grid should be visible in 3D mode
    expect(result).toBe(true);
  });
});
