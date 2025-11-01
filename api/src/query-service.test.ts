import { describe, it, expect, beforeAll } from 'vitest';
import path from 'path';
import { DataLoader } from './data-loader';
import { QueryService } from './query-service';

describe('QueryService', () => {
  let queryService: QueryService;
  let testRepoId: string;

  beforeAll(async () => {
    const testDataDir = path.join(__dirname, '../test/data');
    const dataLoader = new DataLoader(testDataDir);
    queryService = new QueryService(dataLoader);

    // Use static format test fixture (has tree data)
    const repos = await dataLoader.listRepos();
    const staticRepo = repos.find(r => r.name.includes('static'));
    if (!staticRepo) throw new Error('Static test fixture not found');
    testRepoId = staticRepo.id;
  });

  describe('getStats', () => {
    it('should return repository statistics', async () => {
      const stats = await queryService.getStats(testRepoId);

      expect(stats).toHaveProperty('repository');
      expect(stats).toHaveProperty('analyzedAt');
      expect(stats).toHaveProperty('commit');
      expect(stats).toHaveProperty('stats');

      expect(stats.repository.id).toBe(testRepoId);
      expect(stats.stats).toHaveProperty('totalFiles');
      expect(stats.stats).toHaveProperty('totalLoc');
      expect(stats.stats).toHaveProperty('filesByExtension');

      expect(stats.stats.totalFiles).toBeGreaterThan(0);
      expect(stats.stats.totalLoc).toBeGreaterThan(0);
    });

    it('should throw error for non-existent repository', async () => {
      await expect(queryService.getStats('non-existent')).rejects.toThrow();
    });
  });

  describe('getContributors', () => {
    it('should return all contributors without date filter', async () => {
      const result = await queryService.getContributors(testRepoId);

      expect(result).toHaveProperty('repository');
      expect(result).toHaveProperty('contributors');
      expect(result).toHaveProperty('total');

      expect(result.contributors).toBeInstanceOf(Array);
      expect(result.total).toBeGreaterThan(0);

      const contributor = result.contributors[0];
      expect(contributor).toHaveProperty('email');
      expect(contributor).toHaveProperty('filesChanged');
      expect(contributor).toHaveProperty('lastModified');
    });

    it('should sort contributors by filesChanged descending', async () => {
      const result = await queryService.getContributors(testRepoId);

      if (result.contributors.length > 1) {
        const first = result.contributors[0];
        const second = result.contributors[1];
        expect(first.filesChanged).toBeGreaterThanOrEqual(second.filesChanged);
      }
    });

    it('should filter contributors by date range', async () => {
      const allContributors = await queryService.getContributors(testRepoId);

      // Filter to last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const since = thirtyDaysAgo.toISOString().split('T')[0];

      const filtered = await queryService.getContributors(testRepoId, since);

      // Filtered result should have same or fewer contributors
      expect(filtered.total).toBeLessThanOrEqual(allContributors.total);
      expect(filtered.period.since).toBe(since);
    });

    it('should limit contributors to top N', async () => {
      const limit = 5;
      const result = await queryService.getContributors(testRepoId, undefined, undefined, limit);

      expect(result.contributors.length).toBeLessThanOrEqual(limit);
      expect(result.period.limit).toBe(limit);

      // Total should still reflect all contributors
      expect(result.total).toBeGreaterThanOrEqual(result.contributors.length);
    });

    it('should return all contributors when no limit specified', async () => {
      const result = await queryService.getContributors(testRepoId);

      expect(result.contributors.length).toBe(result.total);
      expect(result.period.limit).toBeUndefined();
    });

    it('should combine date filtering and limit', async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const since = thirtyDaysAgo.toISOString().split('T')[0];
      const limit = 3;

      const result = await queryService.getContributors(testRepoId, since, undefined, limit);

      expect(result.contributors.length).toBeLessThanOrEqual(limit);
      expect(result.period.since).toBe(since);
      expect(result.period.limit).toBe(limit);
    });
  });

  describe('getFiles', () => {
    it('should return all files', async () => {
      const result = await queryService.getFiles(testRepoId);

      expect(result).toHaveProperty('files');
      expect(result).toHaveProperty('total');
      expect(result.files).toBeInstanceOf(Array);
      expect(result.total).toBeGreaterThan(0);

      const file = result.files[0];
      expect(file).toHaveProperty('path');
      expect(file).toHaveProperty('name');
      expect(file).toHaveProperty('type');
      expect(file.type).toBe('file');
    });

    it('should filter files by path prefix', async () => {
      const allFiles = await queryService.getFiles(testRepoId);
      const firstFilePath = allFiles.files[0].path;
      const pathPrefix = firstFilePath.split('/')[0];

      const filtered = await queryService.getFiles(testRepoId, pathPrefix);

      expect(filtered.total).toBeLessThanOrEqual(allFiles.total);
      filtered.files.forEach(file => {
        expect(file.path).toMatch(new RegExp(`^${pathPrefix}`));
      });
    });

    it('should sort files by churn (commitCount)', async () => {
      const result = await queryService.getFiles(testRepoId, undefined, 'churn');

      if (result.files.length > 1) {
        const filesWithChurn = result.files.filter(f => f.commitCount !== null);
        if (filesWithChurn.length > 1) {
          const first = filesWithChurn[0];
          const second = filesWithChurn[1];
          expect(first.commitCount).toBeGreaterThanOrEqual(second.commitCount);
        }
      }
    });

    it('should sort files by contributors', async () => {
      const result = await queryService.getFiles(testRepoId, undefined, 'contributors');

      if (result.files.length > 1) {
        const filesWithContributors = result.files.filter(f => f.contributorCount !== null);
        if (filesWithContributors.length > 1) {
          const first = filesWithContributors[0];
          const second = filesWithContributors[1];
          expect(first.contributorCount).toBeGreaterThanOrEqual(second.contributorCount);
        }
      }
    });

    it('should sort files by LOC', async () => {
      const result = await queryService.getFiles(testRepoId, undefined, 'loc');

      if (result.files.length > 1) {
        const first = result.files[0];
        const second = result.files[1];
        expect(first.loc).toBeGreaterThanOrEqual(second.loc);
      }
    });
  });

  describe('getHotspots', () => {
    it('should return top churn and top contributor files', async () => {
      const result = await queryService.getHotspots(testRepoId, 10);

      expect(result).toHaveProperty('topChurn');
      expect(result).toHaveProperty('topContributors');

      expect(result.topChurn).toBeInstanceOf(Array);
      expect(result.topContributors).toBeInstanceOf(Array);

      expect(result.topChurn.length).toBeLessThanOrEqual(10);
      expect(result.topContributors.length).toBeLessThanOrEqual(10);
    });

    it('should respect limit parameter', async () => {
      const result = await queryService.getHotspots(testRepoId, 5);

      expect(result.topChurn.length).toBeLessThanOrEqual(5);
      expect(result.topContributors.length).toBeLessThanOrEqual(5);
    });

    it('should sort topChurn by commitCount descending', async () => {
      const result = await queryService.getHotspots(testRepoId, 10);

      if (result.topChurn.length > 1) {
        const first = result.topChurn[0];
        const second = result.topChurn[1];
        expect(first.commitCount).toBeGreaterThanOrEqual(second.commitCount);
      }
    });

    it('should sort topContributors by contributorCount descending', async () => {
      const result = await queryService.getHotspots(testRepoId, 10);

      if (result.topContributors.length > 1) {
        const first = result.topContributors[0];
        const second = result.topContributors[1];
        expect(first.contributorCount).toBeGreaterThanOrEqual(second.contributorCount);
      }
    });
  });

  describe('findRepoByUrl', () => {
    it('should find repository by URL', async () => {
      const repo = await queryService.findRepoByUrl('https://github.com/test/ecommerce');

      expect(repo).toBeDefined();
      expect(repo?.id).toContain('ecommerce');
    });
  });
});
