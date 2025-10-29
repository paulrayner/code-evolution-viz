/**
 * Pure function for determining grid visibility based on layout mode
 * Extracted from TreeVisualizer for testability
 */

/**
 * Determine if ground grid should be visible
 *
 * Grid provides spatial reference for 3D depth perception.
 * In 2D overhead view, there's no depth/perspective, so grid is unnecessary.
 *
 * @param is2DLayout Whether using 2D Force-Directed layout (overhead view)
 * @returns True if grid should be visible, false if hidden
 */
export function shouldShowGrid(is2DLayout: boolean): boolean {
  // Hide grid in 2D overhead view (no depth/perspective)
  // Show grid in 3D view (provides spatial reference)
  return !is2DLayout;
}
