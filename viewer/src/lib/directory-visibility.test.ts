import { describe, it, expect } from 'vitest';
import { shouldHideDirectoryNodes } from './directory-visibility';

describe('shouldHideDirectoryNodes', () => {
  it('should return true when in 2D layout mode', () => {
    const result = shouldHideDirectoryNodes(true);
    expect(result).toBe(true);
  });

  it('should return false when in 3D layout mode', () => {
    const result = shouldHideDirectoryNodes(false);
    expect(result).toBe(false);
  });
});
