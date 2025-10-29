import { describe, it, expect } from 'vitest';
import { getCameraFOV, getControlsConfig } from './camera-configuration';

describe('getCameraFOV', () => {
  /**
   * 2D Force-Directed layouts use narrower FOV (30°) to reduce
   * perspective distortion in overhead view.
   */
  it('should return 30 degrees for 2D layout', () => {
    const fov = getCameraFOV(true);
    expect(fov).toBe(30);
  });

  /**
   * 3D Hierarchical layouts use standard FOV (60°) for
   * proper perspective depth perception.
   */
  it('should return 60 degrees for 3D layout', () => {
    const fov = getCameraFOV(false);
    expect(fov).toBe(60);
  });
});

describe('getControlsConfig', () => {
  /**
   * 2D overhead view should disable rotation - users can only pan and zoom.
   * Rotation doesn't make sense when camera is locked directly above scene.
   */
  it('should disable rotation for 2D layout', () => {
    const config = getControlsConfig(true);
    expect(config.enableRotate).toBe(false);
  });

  /**
   * 3D perspective view should enable rotation - users can orbit around scene.
   * Full 3D navigation requires rotation capability.
   */
  it('should enable rotation for 3D layout', () => {
    const config = getControlsConfig(false);
    expect(config.enableRotate).toBe(true);
  });
});
