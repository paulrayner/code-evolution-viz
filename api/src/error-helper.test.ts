import { describe, it, expect } from 'vitest';
import {
  createRepoNotFoundError,
  createInvalidParameterError,
  createMissingParameterError
} from './error-helper';

describe('error-helper', () => {
  describe('createRepoNotFoundError', () => {
    it('should create structured error with suggestions', () => {
      const allRepos = [
        { id: 'react-timeline-full', name: 'react-timeline-full' },
        { id: 'react', name: 'react' },
        { id: 'vue', name: 'vue' }
      ];

      const error = createRepoNotFoundError('react-full', allRepos);

      expect(error.error).toBe('Repository not found');
      expect(error.code).toBe('REPO_NOT_FOUND');
      expect(error.message).toBe("Repository 'react-full' not found");
      expect(error.details?.requested).toBe('react-full');
      // Fuzzy matching should find similar repos
      expect(error.details?.suggestions).toBeDefined();
      expect(error.details?.suggestions?.length).toBeGreaterThan(0);
      // The help message should suggest the first match
      expect(error.help?.message).toBeDefined();
      expect(error.help?.actions).toBeDefined();
      expect(error.help?.actions?.length).toBeGreaterThan(0);
      expect(error.docs).toBeDefined();
    });

    it('should provide helpful actions', () => {
      const allRepos = [{ id: 'react', name: 'react' }];
      const error = createRepoNotFoundError('nonexistent', allRepos);

      const actions = error.help?.actions || [];
      expect(actions.length).toBeGreaterThan(0);

      const listAction = actions.find(a => a.description.includes('List all'));
      expect(listAction).toBeDefined();
      expect(listAction?.method).toBe('GET');
      expect(listAction?.url).toBe('/api/repos');
      expect(listAction?.example).toContain('curl');
    });

    it('should handle no similar repos', () => {
      const allRepos = [
        { id: 'completely-different', name: 'completely-different' }
      ];

      const error = createRepoNotFoundError('xyz', allRepos);

      expect(error.details?.suggestions).toBeUndefined();
      expect(error.help?.message).toBeUndefined();
    });
  });

  describe('createInvalidParameterError', () => {
    it('should create error with parameter details', () => {
      const error = createInvalidParameterError(
        'limit',
        150,
        'must be between 1 and 100',
        'https://example.com/api/hotspots?limit=20'
      );

      expect(error.error).toBe('Invalid parameter');
      expect(error.code).toBe('INVALID_PARAMETER');
      expect(error.message).toContain('limit');
      expect(error.message).toContain('must be between 1 and 100');
      expect(error.details?.parameter).toBe('limit');
      expect(error.details?.value).toBe(150);
      expect(error.details?.constraint).toBe('must be between 1 and 100');
      expect(error.help?.actions?.[0].example).toContain('curl');
    });
  });

  describe('createMissingParameterError', () => {
    it('should create error with parameter requirements', () => {
      const error = createMissingParameterError(
        'url',
        'string',
        'GitHub repository URL',
        'https://example.com/api/contributors?url=https://github.com/facebook/react&days=30'
      );

      expect(error.error).toBe('Missing required parameter');
      expect(error.code).toBe('MISSING_PARAMETER');
      expect(error.message).toContain('url');
      expect(error.message).toContain('required');
      expect(error.details?.parameter).toBe('url');
      expect(error.details?.type).toBe('string');
      expect(error.help?.actions).toBeDefined();
      expect(error.help?.actions?.[0].description).toContain('Example');
    });
  });
});
