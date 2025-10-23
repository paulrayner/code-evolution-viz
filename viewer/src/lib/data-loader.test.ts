import { describe, it, expect } from 'vitest';
import { determineFileToLoad, detectDataFormat, extractSnapshot } from './data-loader';
import type { RepositorySnapshot, TimelineData, TimelineDataV2 } from '../types';

describe('determineFileToLoad', () => {
  describe('timeline mode with timeline available', () => {
    it('should return timeline files in priority order', () => {
      const result = determineFileToLoad('gource', 'timeline', true);

      expect(result).toEqual({
        files: [
          'gource-timeline-full',
          'gource-timeline',
          'gource'
        ],
        fallbackToHead: false
      });
    });

    it('should handle repo names with hyphens', () => {
      const result = determineFileToLoad('my-repo-name', 'timeline', true);

      expect(result).toEqual({
        files: [
          'my-repo-name-timeline-full',
          'my-repo-name-timeline',
          'my-repo-name'
        ],
        fallbackToHead: false
      });
    });
  });

  describe('timeline mode without timeline available', () => {
    it('should return base file only and signal fallback needed', () => {
      const result = determineFileToLoad('gource', 'timeline', false);

      expect(result).toEqual({
        files: ['gource'],
        fallbackToHead: true
      });
    });
  });

  describe('head mode', () => {
    it('should return base file only when timeline available', () => {
      const result = determineFileToLoad('gource', 'head', true);

      expect(result).toEqual({
        files: ['gource'],
        fallbackToHead: false
      });
    });

    it('should return base file only when timeline not available', () => {
      const result = determineFileToLoad('gource', 'head', false);

      expect(result).toEqual({
        files: ['gource'],
        fallbackToHead: false
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty repo name', () => {
      const result = determineFileToLoad('', 'timeline', true);

      expect(result).toEqual({
        files: ['-timeline-full', '-timeline', ''],
        fallbackToHead: false
      });
    });

    it('should handle repo name with special characters', () => {
      const result = determineFileToLoad('repo_v1.2', 'timeline', true);

      expect(result).toEqual({
        files: [
          'repo_v1.2-timeline-full',
          'repo_v1.2-timeline',
          'repo_v1.2'
        ],
        fallbackToHead: false
      });
    });
  });
});

describe('detectDataFormat', () => {
  it('should detect timeline-v2 format', () => {
    const data = {
      format: 'timeline-v2',
      metadata: { totalCommits: 100 },
      commits: []
    };

    expect(detectDataFormat(data)).toBe('timeline-v2');
  });

  it('should detect timeline-v1 format', () => {
    const data = {
      format: 'timeline-v1',
      headSnapshot: {},
      timeline: {}
    };

    expect(detectDataFormat(data)).toBe('timeline-v1');
  });

  it('should detect static format when no format field present', () => {
    const data = {
      repositoryPath: '/repo',
      tree: { type: 'directory' },
      stats: {}
    };

    expect(detectDataFormat(data)).toBe('static');
  });

  it('should detect static format when format field is unrecognized', () => {
    const data = {
      format: 'unknown-format',
      tree: {}
    };

    expect(detectDataFormat(data)).toBe('static');
  });

  it('should handle empty object', () => {
    const data = {};

    expect(detectDataFormat(data)).toBe('static');
  });

  it('should handle null data', () => {
    expect(detectDataFormat(null)).toBe('static');
  });

  it('should handle undefined data', () => {
    expect(detectDataFormat(undefined)).toBe('static');
  });
});

describe('extractSnapshot', () => {
  const mockTree = {
    path: '/',
    name: 'root',
    type: 'directory' as const,
    children: []
  };

  describe('timeline-v2 format', () => {
    it('should return null (signal for special loading path)', () => {
      const data: TimelineDataV2 = {
        format: 'timeline-v2',
        repositoryPath: '/repo',
        metadata: {
          totalCommits: 100,
          dateRange: { first: '2020-01-01', last: '2024-01-01' },
          tags: ['v1.0.0']
        },
        commits: []
      };

      const result = extractSnapshot(data, 'timeline-v2');

      expect(result).toBeNull();
    });
  });

  describe('timeline-v1 format', () => {
    it('should extract headSnapshot', () => {
      const headSnapshot: RepositorySnapshot = {
        repositoryPath: '/repo',
        commit: 'abc123',
        timestamp: '2024-01-01',
        author: 'Alice',
        message: 'Initial commit',
        tree: mockTree,
        commitMessages: {},
        stats: {
          totalFiles: 10,
          totalLoc: 1000,
          filesByExtension: { '.ts': 10 }
        }
      };

      const data: TimelineData = {
        format: 'timeline-v1',
        repositoryPath: '/repo',
        headSnapshot,
        timeline: {
          totalCommits: 50,
          dateRange: { first: '2020-01-01', last: '2024-01-01' },
          baseSampling: {
            algorithm: 'adaptive-v2',
            targetCount: 50,
            actualCount: 50,
            commits: []
          }
        }
      };

      const result = extractSnapshot(data, 'timeline-v1');

      expect(result).toBe(headSnapshot);
      expect(result?.commit).toBe('abc123');
    });
  });

  describe('static format', () => {
    it('should return data as-is', () => {
      const data: RepositorySnapshot = {
        repositoryPath: '/repo',
        commit: 'def456',
        timestamp: '2024-01-01',
        author: 'Bob',
        message: 'Update files',
        tree: mockTree,
        commitMessages: {},
        stats: {
          totalFiles: 5,
          totalLoc: 500,
          filesByExtension: { '.js': 5 }
        }
      };

      const result = extractSnapshot(data, 'static');

      expect(result).toBe(data);
      expect(result?.commit).toBe('def456');
    });

    it('should handle static data with all fields populated', () => {
      const data: RepositorySnapshot = {
        repositoryPath: '/complex/repo',
        commit: 'xyz789',
        timestamp: '2024-12-25T10:30:00Z',
        author: 'Charlie <charlie@example.com>',
        message: 'Add new feature\n\nDetailed description here',
        tree: {
          path: '/',
          name: 'root',
          type: 'directory',
          children: [
            {
              path: '/file.ts',
              name: 'file.ts',
              type: 'file',
              loc: 100,
              extension: '.ts',
              lastModified: '2024-12-01',
              lastAuthor: 'Charlie',
              lastCommitHash: 'xyz789',
              commitCount: 5,
              contributorCount: 2,
              firstCommitDate: '2024-01-01',
              recentLinesChanged: 50,
              avgLinesPerCommit: 10,
              daysSinceLastModified: 3
            }
          ]
        },
        commitMessages: {
          'xyz789': 'Add new feature'
        },
        stats: {
          totalFiles: 1,
          totalLoc: 100,
          filesByExtension: { '.ts': 1 }
        }
      };

      const result = extractSnapshot(data, 'static');

      expect(result).toBe(data);
      expect(result?.tree.children).toHaveLength(1);
    });
  });
});
