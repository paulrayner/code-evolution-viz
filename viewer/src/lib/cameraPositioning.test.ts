import { describe, it, expect } from 'vitest';
import { calculateFramingPosition, BoundingBox, CameraDefaults } from './cameraPositioning';

describe('calculateFramingPosition', () => {
  /**
   * Test 2D overhead camera positioning
   * Camera should be directly above bounding box center, looking down
   */
  it('should position camera overhead for 2D layouts', () => {
    const boundingBox: BoundingBox = {
      center: { x: 10, y: 0, z: 20 },
      size: { x: 50, y: 1, z: 50 }
    };

    const cameraDefaults: CameraDefaults = {
      position: { x: 0, y: 150, z: 0.1 }, // Force-Directed overhead
      lookAt: { x: 0, y: 0, z: 0 }
    };

    const config = calculateFramingPosition(boundingBox, cameraDefaults, 30);

    // Should be directly above bounding box center (x and z match center)
    expect(config.position.x).toBe(10); // center.x
    expect(config.position.z).toBe(20); // center.z

    // Should be high above scene (y > center.y)
    expect(config.position.y).toBeGreaterThan(50);

    // Should point at center
    expect(config.target).toEqual({ x: 10, y: 0, z: 20 });

    // Should indicate state needs saving (documents expected behavior)
    expect(config.shouldSaveState).toBe(true);
  });

  /**
   * Test 3D angled camera positioning
   * Camera should be at angle (not directly above), looking at center
   */
  it('should position camera at angle for 3D layouts', () => {
    const boundingBox: BoundingBox = {
      center: { x: 0, y: 0, z: 0 },
      size: { x: 50, y: 50, z: 50 }
    };

    const cameraDefaults: CameraDefaults = {
      position: { x: 30, y: 30, z: 30 }, // Hierarchical angle
      lookAt: { x: 0, y: 0, z: 0 }
    };

    const config = calculateFramingPosition(boundingBox, cameraDefaults, 60);

    // Should be at an angle (not directly above center)
    expect(config.position.x).not.toBe(0);
    expect(config.position.z).not.toBe(0);

    // Should be offset from center in all dimensions
    expect(config.position.y).toBeGreaterThan(0);

    // Should point at center
    expect(config.target).toEqual({ x: 0, y: 0, z: 0 });

    // Should indicate state needs saving
    expect(config.shouldSaveState).toBe(true);
  });

  /**
   * Test that shouldSaveState is always true
   * This documents the bug fix: after framing, OrbitControls state must be saved
   */
  it('should always indicate state should be saved after framing', () => {
    const boundingBox: BoundingBox = {
      center: { x: 0, y: 0, z: 0 },
      size: { x: 100, y: 100, z: 100 }
    };

    // Test with 2D defaults
    const defaults2D: CameraDefaults = {
      position: { x: 0, y: 150, z: 0.1 },
      lookAt: { x: 0, y: 0, z: 0 }
    };
    const config2D = calculateFramingPosition(boundingBox, defaults2D, 30);
    expect(config2D.shouldSaveState).toBe(true);

    // Test with 3D defaults
    const defaults3D: CameraDefaults = {
      position: { x: 30, y: 30, z: 30 },
      lookAt: { x: 0, y: 0, z: 0 }
    };
    const config3D = calculateFramingPosition(boundingBox, defaults3D, 60);
    expect(config3D.shouldSaveState).toBe(true);
  });

  /**
   * Test camera distance calculation with padding
   * Distance should account for bounding box size + 20% padding
   */
  it('should calculate correct camera distance with padding', () => {
    const boundingBox: BoundingBox = {
      center: { x: 0, y: 0, z: 0 },
      size: { x: 100, y: 50, z: 100 } // maxDim = 100
    };

    const cameraDefaults: CameraDefaults = {
      position: { x: 0, y: 150, z: 0.1 },
      lookAt: { x: 0, y: 0, z: 0 }
    };

    const config = calculateFramingPosition(boundingBox, cameraDefaults, 60);

    // Calculate expected distance manually
    const maxDim = 100;
    const fov = 60 * (Math.PI / 180);
    const baseDistance = Math.abs(maxDim / Math.sin(fov / 2));
    const paddedDistance = baseDistance * 1.2; // 20% padding

    // Camera Y should be approximately center.y + paddedDistance
    expect(config.position.y).toBeCloseTo(paddedDistance, 1);
  });
});
