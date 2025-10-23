import { describe, it, expect } from 'vitest';
import { getBaseRepoName } from './repo-utils';

describe('getBaseRepoName', () => {
  it('should strip -timeline-full suffix', () => {
    expect(getBaseRepoName('gource-timeline-full')).toBe('gource');
  });

  it('should strip -timeline suffix', () => {
    expect(getBaseRepoName('gource-timeline')).toBe('gource');
  });

  it('should return unchanged name without suffix', () => {
    expect(getBaseRepoName('gource')).toBe('gource');
  });

  it('should handle repo names with hyphens', () => {
    expect(getBaseRepoName('cbioportal-frontend-timeline-full')).toBe('cbioportal-frontend');
    expect(getBaseRepoName('cbioportal-frontend-timeline')).toBe('cbioportal-frontend');
    expect(getBaseRepoName('cbioportal-frontend')).toBe('cbioportal-frontend');
  });

  it('should handle empty string', () => {
    expect(getBaseRepoName('')).toBe('');
  });

  it('should handle single word repo names', () => {
    expect(getBaseRepoName('react-timeline-full')).toBe('react');
    expect(getBaseRepoName('vue-timeline')).toBe('vue');
    expect(getBaseRepoName('angular')).toBe('angular');
  });

  it('should only remove suffix at end of string', () => {
    // Shouldn't remove -timeline if it's in the middle
    expect(getBaseRepoName('my-timeline-repo')).toBe('my-timeline-repo');
    expect(getBaseRepoName('timeline-full-project')).toBe('timeline-full-project');
  });

  it('should handle consecutive suffixes correctly', () => {
    // Edge case: what if someone named their repo oddly?
    expect(getBaseRepoName('repo-timeline-timeline-full')).toBe('repo-timeline');
  });
});
