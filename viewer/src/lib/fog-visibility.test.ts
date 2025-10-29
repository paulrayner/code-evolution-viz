import { describe, it, expect } from 'vitest';
import { shouldShowFog } from './fog-visibility';

describe('shouldShowFog', () => {
  it('should hide fog in 2D Force-Directed layout (overhead view)', () => {
    // 2D overhead view: no depth perception, fog causes unwanted dimming when zoomed out
    expect(shouldShowFog(true)).toBe(false);
  });

  it('should show fog in 3D Hierarchical layout (perspective view)', () => {
    // 3D perspective view: fog provides depth cues for spatial understanding
    expect(shouldShowFog(false)).toBe(true);
  });
});
