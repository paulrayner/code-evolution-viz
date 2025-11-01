/**
 * Processor Data Types (shared with processor/src/types.ts)
 * These are copied here to avoid cross-directory TypeScript imports
 */

export interface FileNode {
  path: string;
  name: string;
  type: 'file';
  loc: number;
  extension: string;
  lastModified: string | null;
  lastAuthor: string | null;
  lastCommitHash: string | null;
  commitCount: number | null;
  contributorCount: number | null;
  firstCommitDate: string | null;
  recentLinesChanged: number | null;
  avgLinesPerCommit: number | null;
  daysSinceLastModified: number | null;
  isGenerated?: boolean;
}

export interface DirectoryNode {
  path: string;
  name: string;
  type: 'directory';
  children: TreeNode[];
}

export type TreeNode = FileNode | DirectoryNode;

export interface RepositorySnapshot {
  repositoryPath: string;
  commit: string;
  timestamp: string;
  author: string;
  message: string;
  tree: DirectoryNode;
  commitMessages: Record<string, string>;
  stats: {
    totalFiles: number;
    totalLoc: number;
    filesByExtension: Record<string, number>;
  };
}

export interface TimelineData {
  format: 'timeline-v1';
  repositoryPath: string;
  headSnapshot: RepositorySnapshot;
  timeline: any;
}

export interface TimelineDataV2 {
  format: 'timeline-v2';
  repositoryPath: string;
  metadata: any;
  commits: any[];
}

/**
 * API Response Types for CodeCohesion API
 */

/**
 * HATEOAS Link Types
 */

export interface Link {
  href: string;
  description?: string;
  templated?: boolean;
}

export interface Links {
  [rel: string]: Link;
}

export interface Action {
  method: string;
  href: string;
  description: string;
}

export interface Actions {
  [name: string]: Action;
}

export interface RepoListItem {
  id: string;
  name: string;
  format?: string;
  _links?: Links;
  _actions?: Actions;
}

export interface RepoInfo extends RepoListItem {
  url?: string;
}

export interface ReposResponse {
  repos: RepoListItem[];
  _links?: Links;
}

export interface StatsResponse {
  repository: {
    id: string;
    path: string;
  };
  analyzedAt: string;
  commit: string;
  stats: {
    totalFiles: number;
    totalLoc: number;
    filesByExtension: Record<string, number>;
  };
}

export interface ContributorInfo {
  email: string;
  filesChanged: number;
  lastModified: string;
}

export interface ContributorsResponse {
  repository: {
    id: string;
    url?: string;
  };
  period: {
    since?: string;
    until?: string;
    days?: number;
  };
  contributors: ContributorInfo[];
  total: number;
}

export interface FilesResponse {
  files: FileNode[];
  total: number;
}

export interface HotspotsResponse {
  topChurn: FileNode[];
  topContributors: FileNode[];
}

export interface HelpAction {
  description: string;
  method: string;
  url: string;
  example?: string;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  message?: string;
  details?: any;
  help?: {
    message?: string;
    actions?: HelpAction[];
  };
  docs?: string;
}

export interface Example {
  description: string;
  request: string;
}

export interface RootResponse {
  service: string;
  version: string;
  description: string;
  _links: Links;
  examples: {
    [name: string]: Example;
  };
  capabilities: string[];
}

export interface HealthResponse {
  status: string;
  uptime: number;
  timestamp: string;
}
