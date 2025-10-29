/**
 * Pure functions for layout positioning decisions
 * Extracted from TreeVisualizer.visualize() for testability
 */

/**
 * Get root Y position for layout mode
 *
 * 2D layouts use Y=0 (true flat 2D on the ground plane).
 * 3D layouts use Y=10 (hierarchical elevation for perspective).
 *
 * @param is2DLayout Whether using 2D Force-Directed layout (overhead view)
 * @returns Y coordinate for root node position
 */
export function getRootYPosition(is2DLayout: boolean): number {
  return is2DLayout ? 0 : 10;
}
