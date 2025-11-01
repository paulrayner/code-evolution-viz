import { Router, Request, Response } from 'express';
import { DataLoader } from './data-loader';
import { QueryService } from './query-service';
import {
  createRepoNotFoundError,
  createInvalidParameterError,
  createMissingParameterError
} from './error-helper';

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
          const allRepos = await dataLoader.listRepos();
          const error = createRepoNotFoundError(url as string, allRepos);
          return res.status(404).json(error);
        }

        // Add HATEOAS links to single repo response
        const enrichedRepo = {
          ...repo,
          _links: {
            self: { href: `/api/repos/${repo.id}` },
            stats: {
              href: `/api/repos/${repo.id}/stats`,
              description: 'Get repository statistics'
            },
            contributors: {
              href: `/api/repos/${repo.id}/contributors{?since,until,limit}`,
              templated: true,
              description: 'Get contributors with optional date filtering and limit'
            },
            files: {
              href: `/api/repos/${repo.id}/files{?path,metric}`,
              templated: true,
              description: 'Get files with optional path prefix and metric sorting'
            },
            hotspots: {
              href: `/api/repos/${repo.id}/hotspots{?limit}`,
              templated: true,
              description: 'Get top N high-churn/high-contributor files'
            }
          }
        };

        return res.json(enrichedRepo);
      }

      // List all repos with HATEOAS links
      const repos = await dataLoader.listRepos();
      const enrichedRepos = repos.map(repo => ({
        ...repo,
        _links: {
          self: { href: `/api/repos/${repo.id}` },
          stats: {
            href: `/api/repos/${repo.id}/stats`,
            description: 'Get repository statistics'
          },
          contributors: {
            href: `/api/repos/${repo.id}/contributors{?since,until,limit}`,
            templated: true,
            description: 'Get contributors with optional date filtering and limit'
          },
          files: {
            href: `/api/repos/${repo.id}/files{?path,metric}`,
            templated: true,
            description: 'Get files with optional path prefix and metric sorting'
          },
          hotspots: {
            href: `/api/repos/${repo.id}/hotspots{?limit}`,
            templated: true,
            description: 'Get top N high-churn/high-contributor files'
          }
        }
      }));

      res.json({
        repos: enrichedRepos,
        _links: {
          self: { href: '/api/repos' },
          find: {
            href: '/api/repos{?url}',
            templated: true,
            description: 'Find repository by GitHub URL'
          }
        }
      });
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
      const allRepos = await dataLoader.listRepos();
      const errorResponse = createRepoNotFoundError(req.params.repoId, allRepos);
      res.status(404).json(errorResponse);
    }
  });

  /**
   * GET /api/repos/:repoId/contributors
   * Get contributors with optional date filtering and limit
   */
  router.get('/repos/:repoId/contributors', async (req: Request, res: Response) => {
    try {
      const { repoId } = req.params;
      const { since, until, limit } = req.query;

      // Validate limit parameter if provided
      let limitNum: number | undefined;
      if (limit) {
        limitNum = parseInt(limit as string, 10);
        if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
          const error = createInvalidParameterError(
            'limit',
            limit,
            'must be between 1 and 100',
            `https://codecohesion-api.railway.app/api/repos/${repoId}/contributors?limit=10`
          );
          return res.status(400).json(error);
        }
      }

      const contributors = await queryService.getContributors(
        repoId,
        since as string | undefined,
        until as string | undefined,
        limitNum
      );

      res.json(contributors);
    } catch (error) {
      console.error('Error getting contributors:', error);
      const allRepos = await dataLoader.listRepos();
      const errorResponse = createRepoNotFoundError(req.params.repoId, allRepos);
      res.status(404).json(errorResponse);
    }
  });

  /**
   * GET /api/contributors
   * Convenience endpoint: query contributors by URL with days and limit parameters
   */
  router.get('/contributors', async (req: Request, res: Response) => {
    try {
      const { url, days, since, until, limit } = req.query;

      if (!url) {
        const error = createMissingParameterError(
          'url',
          'string',
          'GitHub repository URL (e.g., https://github.com/facebook/react)',
          'https://codecohesion-api.railway.app/api/contributors?url=https://github.com/facebook/react&days=30&limit=5'
        );
        return res.status(400).json(error);
      }

      const repo = await queryService.findRepoByUrl(url as string);
      if (!repo) {
        const allRepos = await dataLoader.listRepos();
        const error = createRepoNotFoundError(url as string, allRepos);
        return res.status(404).json(error);
      }

      // Validate limit parameter if provided
      let limitNum: number | undefined;
      if (limit) {
        limitNum = parseInt(limit as string, 10);
        if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
          const error = createInvalidParameterError(
            'limit',
            limit,
            'must be between 1 and 100',
            `https://codecohesion-api.railway.app/api/contributors?url=${encodeURIComponent(url as string)}&days=90&limit=10`
          );
          return res.status(400).json(error);
        }
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
        until as string | undefined,
        limitNum
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
      const allRepos = await dataLoader.listRepos();
      const errorResponse = createRepoNotFoundError(req.params.repoId, allRepos);
      res.status(404).json(errorResponse);
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
        const error = createInvalidParameterError(
          'limit',
          limitNum,
          'must be between 1 and 100',
          `https://codecohesion-api.railway.app/api/repos/${repoId}/hotspots?limit=20`
        );
        return res.status(400).json(error);
      }

      const hotspots = await queryService.getHotspots(repoId, limitNum);
      res.json(hotspots);
    } catch (error) {
      console.error('Error getting hotspots:', error);
      const allRepos = await dataLoader.listRepos();
      const errorResponse = createRepoNotFoundError(req.params.repoId, allRepos);
      res.status(404).json(errorResponse);
    }
  });

  return router;
}
