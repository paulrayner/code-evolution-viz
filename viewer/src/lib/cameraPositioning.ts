/**
 * Pure functions for camera positioning calculations
 * Extracted from TreeVisualizer.autoFrameCamera() for testability
 */

export interface BoundingBox {
  center: { x: number; y: number; z: number };
  size: { x: number; y: number; z: number };
}

export interface CameraDefaults {
  position: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
}

export interface CameraConfiguration {
  position: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  shouldSaveState: boolean;
}

/**
 * Calculate camera position to frame bounding box
 *
 * Pure function - EXACT copy from TreeVisualizer.autoFrameCamera() lines 1007-1036
 * No behavioral changes, just extracted for testability
 *
 * @param boundingBox - Scene bounding box (center and size)
 * @param cameraDefaults - Layout strategy's default camera position
 * @param fovDegrees - Camera field of view in degrees
 * @returns Camera configuration with position, target, and whether to save state
 */
export function calculateFramingPosition(
  boundingBox: BoundingBox,
  cameraDefaults: CameraDefaults,
  fovDegrees: number
): CameraConfiguration {
  const { center, size } = boundingBox;

  // Calculate distance needed to fit everything in view
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = fovDegrees * (Math.PI / 180);
  let cameraDistance = Math.abs(maxDim / Math.sin(fov / 2));

  // Add some padding (20%)
  cameraDistance *= 1.2;

  // Get camera orientation from layout strategy
  const { position: defaultPos } = cameraDefaults;

  // Check if this is a top-down 2D layout (camera looking straight down from above)
  const isTopDown2D = defaultPos.x === 0 && defaultPos.z < 1 && defaultPos.y > 0;

  if (isTopDown2D) {
    // Top-down 2D view: position camera directly above center
    return {
      position: {
        x: center.x,
        y: center.y + cameraDistance,
        z: center.z
      },
      target: center,
      shouldSaveState: true
    };
  } else {
    // 3D view: position camera at an angle for perspective
    const angle = Math.PI / 4; // 45 degrees
    return {
      position: {
        x: center.x + cameraDistance * Math.cos(angle),
        y: center.y + cameraDistance * 0.5,
        z: center.z + cameraDistance * Math.sin(angle)
      },
      target: center,
      shouldSaveState: true
    };
  }
}
