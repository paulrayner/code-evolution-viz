/**
 * Pure functions for camera and controls configuration
 * Extracted from TreeVisualizer.setLayoutStrategy() for testability
 */

/**
 * Get camera field of view for layout mode
 *
 * 2D layouts use narrower FOV to reduce perspective distortion.
 * 3D layouts use standard FOV for perspective depth.
 *
 * @param is2DLayout Whether using 2D Force-Directed layout (overhead view)
 * @returns Camera FOV in degrees
 */
export function getCameraFOV(is2DLayout: boolean): number {
  return is2DLayout ? 30 : 60;
}

/**
 * Get OrbitControls rotation configuration for layout mode
 *
 * 2D layouts disable rotation (pan and zoom only).
 * 3D layouts enable rotation (full orbit control).
 *
 * @param is2DLayout Whether using 2D Force-Directed layout (overhead view)
 * @returns Configuration object with enableRotate flag
 */
export function getControlsConfig(is2DLayout: boolean): { enableRotate: boolean } {
  return { enableRotate: !is2DLayout };
}
