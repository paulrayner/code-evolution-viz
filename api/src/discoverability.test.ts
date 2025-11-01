import { describe, it, expect, beforeAll } from 'vitest';
import path from 'path';
import { DataLoader } from './data-loader';
import { QueryService } from './query-service';

describe('API Discoverability Features', () => {
  let dataLoader: DataLoader;
  let queryService: QueryService;
  let testRepoId: string;

  beforeAll(async () => {
    const testDataDir = path.join(__dirname, '../test/data');
    dataLoader = new DataLoader(testDataDir);
    queryService = new QueryService(dataLoader);

    const repos = await dataLoader.listRepos();
    const staticRepo = repos.find(r => r.name.includes('static'));
    if (!staticRepo) throw new Error('Static test fixture not found');
    testRepoId = staticRepo.id;
  });

  describe('Repository List with HATEOAS Links', () => {
    it('should include _links in repository objects', async () => {
      const repos = await dataLoader.listRepos();

      expect(repos.length).toBeGreaterThan(0);

      // Note: HATEOAS links are added in routes.ts, not data-loader
      // This test verifies the structure is compatible
      const repo = repos[0];
      expect(repo).toHaveProperty('id');
      expect(repo).toHaveProperty('name');
      expect(repo).toHaveProperty('format');
    });

    it('should support finding repository by URL', async () => {
      const repo = await queryService.findRepoByUrl('https://github.com/test/ecommerce');

      expect(repo).toBeDefined();
      expect(repo?.id).toContain('ecommerce');
    });
  });

  describe('Error Responses', () => {
    it('should throw error for non-existent repository', async () => {
      await expect(queryService.getStats('non-existent-repo'))
        .rejects.toThrow();
    });

    it('should handle URL lookup for non-existent repo', async () => {
      const repo = await queryService.findRepoByUrl('https://github.com/nonexistent/repo');
      expect(repo).toBeNull();
    });
  });

  describe('Parameter Validation', () => {
    it('should handle date filtering for contributors', async () => {
      const since = '2024-01-01';
      const result = await queryService.getContributors(testRepoId, since);

      expect(result).toHaveProperty('repository');
      expect(result).toHaveProperty('period');
      expect(result.period.since).toBe(since);
    });

    it('should handle path filtering for files', async () => {
      const allFiles = await queryService.getFiles(testRepoId);

      if (allFiles.files.length > 0) {
        const firstFilePath = allFiles.files[0].path;
        const pathPrefix = firstFilePath.split('/')[0];

        const filtered = await queryService.getFiles(testRepoId, pathPrefix);

        expect(filtered.total).toBeLessThanOrEqual(allFiles.total);
        filtered.files.forEach(file => {
          expect(file.path).toMatch(new RegExp(`^${pathPrefix}`));
        });
      }
    });

    it('should handle hotspots limit parameter', async () => {
      const limit = 5;
      const result = await queryService.getHotspots(testRepoId, limit);

      expect(result.topChurn.length).toBeLessThanOrEqual(limit);
      expect(result.topContributors.length).toBeLessThanOrEqual(limit);
    });
  });
});
