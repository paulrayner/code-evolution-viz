/**
 * Pure functions for calculating node sizes in visualization
 * Extracted from TreeVisualizer for testability
 */

/**
 * Calculate directory visual size
 *
 * For 2D Force-Directed layouts: uniform size for all directories
 * For 3D Hierarchical layouts: size based on total LOC
 *
 * @param totalLoc Total lines of code in directory (recursive)
 * @param maxDirLoc Maximum LOC across all directories (for normalization)
 * @param is2DLayout Whether using 2D Force-Directed layout
 * @returns Normalized size for directory cube
 */
export function calculateDirectorySize(
  totalLoc: number,
  maxDirLoc: number,
  is2DLayout: boolean
): number {
  if (is2DLayout) {
    // 2D Force-Directed: uniform size for all directories
    // This prevents massive root nodes from dominating the visualization
    return 0.8;
  }

  // 3D Hierarchical: size based on total LOC
  // Using sqrt to give small directories more visible size while keeping large ones manageable
  const ratio = Math.sqrt(totalLoc / maxDirLoc);
  return 0.5 + (ratio * 2.5); // Range: 0.5 to 3.0
}

/**
 * Calculate file visual size
 *
 * For 2D Force-Directed layouts: uniform size for all files
 * For 3D Hierarchical layouts: size based on LOC
 *
 * @param loc Lines of code in file
 * @param maxLoc Maximum LOC across all files (for normalization)
 * @param is2DLayout Whether using 2D Force-Directed layout
 * @param timelineMode Timeline mode ('off', 'scrub', 'play')
 * @returns Normalized size for file sphere
 */
export function calculateFileSize(
  loc: number,
  maxLoc: number,
  is2DLayout: boolean,
  timelineMode: string
): number {
  if (is2DLayout) {
    // 2D Force-Directed: uniform size for all files
    // This improves force simulation stability and visual clarity
    return 0.5;
  }

  // 3D Hierarchical: size based on LOC
  // Timeline mode uses smaller sizes since LOC values are placeholders
  const sizeMultiplier = timelineMode !== 'off' ? 0.3 : 2;
  const minSize = 0.3;
  return Math.max(minSize, (loc / maxLoc) * sizeMultiplier);
}
