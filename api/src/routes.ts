import { Router, Request, Response } from 'express';
import { DataLoader } from './data-loader';
import { QueryService } from './query-service';

export function createRoutes(): Router {
  const router = Router();
  const dataLoader = new DataLoader();
  const queryService = new QueryService(dataLoader);

  /**
   * GET /api/repos
   * List all repositories or find by URL
   */
  router.get('/repos', async (req: Request, res: Response) => {
    try {
      const { url } = req.query;

      if (url) {
        const repo = await queryService.findRepoByUrl(url as string);
        if (!repo) {
          return res.status(404).json({ error: 'Repository not found' });
        }
        return res.json(repo);
      }

      const repos = await dataLoader.listRepos();
      res.json({ repos });
    } catch (error) {
      console.error('Error listing repos:', error);
      res.status(500).json({ error: 'Failed to list repositories' });
    }
  });

  /**
   * GET /api/repos/:repoId/stats
   * Get repository statistics
   */
  router.get('/repos/:repoId/stats', async (req: Request, res: Response) => {
    try {
      const { repoId } = req.params;
      const stats = await queryService.getStats(repoId);
      res.json(stats);
    } catch (error) {
      console.error('Error getting stats:', error);
      res.status(404).json({ error: 'Repository not found' });
    }
  });

  /**
   * GET /api/repos/:repoId/contributors
   * Get contributors with optional date filtering
   */
  router.get('/repos/:repoId/contributors', async (req: Request, res: Response) => {
    try {
      const { repoId } = req.params;
      const { since, until } = req.query;

      const contributors = await queryService.getContributors(
        repoId,
        since as string | undefined,
        until as string | undefined
      );

      res.json(contributors);
    } catch (error) {
      console.error('Error getting contributors:', error);
      res.status(404).json({ error: 'Repository not found' });
    }
  });

  /**
   * GET /api/contributors
   * Convenience endpoint: query contributors by URL with days parameter
   */
  router.get('/contributors', async (req: Request, res: Response) => {
    try {
      const { url, days, since, until } = req.query;

      if (!url) {
        return res.status(400).json({ error: 'url parameter required' });
      }

      const repo = await queryService.findRepoByUrl(url as string);
      if (!repo) {
        return res.status(404).json({ error: 'Repository not found' });
      }

      // Calculate date range from 'days' parameter
      let sinceDate = since as string | undefined;
      if (days) {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(days as string, 10));
        sinceDate = daysAgo.toISOString().split('T')[0];
      }

      const contributors = await queryService.getContributors(
        repo.id,
        sinceDate,
        until as string | undefined
      );

      res.json({
        ...contributors,
        repository: { ...contributors.repository, url },
        period: {
          ...contributors.period,
          days: days ? parseInt(days as string, 10) : undefined
        }
      });
    } catch (error) {
      console.error('Error getting contributors by URL:', error);
      res.status(500).json({ error: 'Failed to fetch contributors' });
    }
  });

  /**
   * GET /api/repos/:repoId/files
   * Get all files with optional path filtering and metric sorting
   */
  router.get('/repos/:repoId/files', async (req: Request, res: Response) => {
    try {
      const { repoId } = req.params;
      const { path, metric } = req.query;

      const files = await queryService.getFiles(
        repoId,
        path as string | undefined,
        metric as string | undefined
      );

      res.json(files);
    } catch (error) {
      console.error('Error getting files:', error);
      res.status(404).json({ error: 'Repository not found' });
    }
  });

  /**
   * GET /api/repos/:repoId/hotspots
   * Get top N files by churn and contributor count
   */
  router.get('/repos/:repoId/hotspots', async (req: Request, res: Response) => {
    try {
      const { repoId } = req.params;
      const { limit } = req.query;

      const limitNum = limit ? parseInt(limit as string, 10) : 20;

      if (limitNum < 1 || limitNum > 100) {
        return res.status(400).json({
          error: 'Invalid limit parameter',
          details: 'Limit must be between 1 and 100'
        });
      }

      const hotspots = await queryService.getHotspots(repoId, limitNum);
      res.json(hotspots);
    } catch (error) {
      console.error('Error getting hotspots:', error);
      res.status(404).json({ error: 'Repository not found' });
    }
  });

  return router;
}
