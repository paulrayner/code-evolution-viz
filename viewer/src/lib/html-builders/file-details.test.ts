import { describe, it, expect } from 'vitest';
import { buildFileDetailsHTML, FileDetailsData } from './file-details';
import { FileNode } from '../../types';
import { Cluster, CouplingEdge } from '../../coupling-types';

// Helper function to create mock file nodes
function createMockFile(overrides: Partial<FileNode> = {}): FileNode {
  return {
    path: overrides.path || '/src/utils/test.ts',
    name: overrides.name || 'test.ts',
    type: 'file',
    loc: overrides.loc ?? 250,
    extension: overrides.extension || 'ts',
    lastModified: overrides.lastModified || '2025-10-15T10:30:00Z',
    lastAuthor: overrides.lastAuthor || 'John Doe',
    lastCommitHash: overrides.lastCommitHash || 'abc123def456789',
    commitCount: overrides.commitCount ?? 15,
    contributorCount: overrides.contributorCount ?? 3,
    firstCommitDate: overrides.firstCommitDate || '2023-01-15T08:00:00Z',
    recentLinesChanged: overrides.recentLinesChanged ?? 120,
    avgLinesPerCommit: overrides.avgLinesPerCommit ?? 25,
    daysSinceLastModified: overrides.daysSinceLastModified ?? 8,
  };
}

describe('buildFileDetailsHTML', () => {
  it('should render complete file details with all data present', () => {
    const file = createMockFile();
    const data: FileDetailsData = {
      file,
      githubFileUrl: 'https://github.com/test/repo/blob/main/src/utils/test.ts',
      commitInfo: {
        commitHashStr: 'abc123d',
        message: 'Add new utility function for data transformation',
        siblings: [
          createMockFile({ path: '/src/utils/helper.ts', name: 'helper.ts' }),
          createMockFile({ path: '/src/index.ts', name: 'index.ts' }),
        ],
      },
      clusterInfo: {
        cluster: {
          id: 1,
          name: 'Utilities Cluster',
          files: ['/src/utils/test.ts', '/src/utils/helper.ts'],
          fileCount: 15,
          avgInternalCoupling: 0.75,
        },
        topEdges: [
          {
            fileA: '/src/utils/test.ts',
            fileB: '/src/utils/parser.ts',
            coChangeCount: 42,
            coupling: 0.85,
          },
          {
            fileA: '/src/utils/test.ts',
            fileB: '/src/utils/validator.ts',
            coChangeCount: 28,
            coupling: 0.62,
          },
        ],
      },
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toMatchSnapshot();
  });

  it('should render file details without GitHub URL', () => {
    const file = createMockFile();
    const data: FileDetailsData = {
      file,
      githubFileUrl: null,
      commitInfo: null,
      clusterInfo: null,
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toMatchSnapshot();
    expect(html).not.toContain('View on GitHub');
  });

  it('should render file details without coupling data', () => {
    const file = createMockFile();
    const data: FileDetailsData = {
      file,
      githubFileUrl: 'https://github.com/test/repo/blob/main/src/utils/test.ts',
      commitInfo: {
        commitHashStr: 'abc123d',
        message: 'Update test file',
        siblings: [],
      },
      clusterInfo: null,
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toMatchSnapshot();
    expect(html).not.toContain('Coupling Cluster');
    expect(html).not.toContain('Most Frequently Changes With');
  });

  it('should render file details without commit info', () => {
    const file = createMockFile();
    const data: FileDetailsData = {
      file,
      githubFileUrl: 'https://github.com/test/repo/blob/main/src/utils/test.ts',
      commitInfo: null,
      clusterInfo: null,
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toMatchSnapshot();
    expect(html).not.toContain('Commit Siblings');
  });

  it('should render commit siblings without commit message', () => {
    const file = createMockFile();
    const data: FileDetailsData = {
      file,
      githubFileUrl: null,
      commitInfo: {
        commitHashStr: 'abc123d',
        message: '',
        siblings: [
          createMockFile({ path: '/src/app.ts', name: 'app.ts' }),
        ],
      },
      clusterInfo: null,
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toMatchSnapshot();
    expect(html).toContain('Commit Siblings');
    expect(html).not.toContain('Commit: <span');
  });

  it('should render commit message without siblings', () => {
    const file = createMockFile();
    const data: FileDetailsData = {
      file,
      githubFileUrl: null,
      commitInfo: {
        commitHashStr: 'def456a',
        message: 'Fix critical bug in parser',
        siblings: [],
      },
      clusterInfo: null,
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toMatchSnapshot();
    expect(html).toContain('Fix critical bug in parser');
    expect(html).not.toContain('Commit Siblings');
  });

  it('should handle file with minimal metadata (nulls)', () => {
    const file: FileNode = {
      path: '/src/minimal.ts',
      name: 'minimal.ts',
      type: 'file',
      loc: 100,
      extension: 'ts',
      lastModified: null,
      lastAuthor: null,
      lastCommitHash: null,
      commitCount: null,
      contributorCount: null,
      firstCommitDate: null,
      recentLinesChanged: null,
      avgLinesPerCommit: null,
      daysSinceLastModified: null,
    };

    const data: FileDetailsData = {
      file,
      githubFileUrl: null,
      commitInfo: null,
      clusterInfo: null,
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toMatchSnapshot();
    expect(html).toContain('Unknown');
  });

  it('should format file age correctly for legacy files (5+ years)', () => {
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 6);

    const file = createMockFile({
      firstCommitDate: fiveYearsAgo.toISOString(),
    });

    const data: FileDetailsData = {
      file,
      githubFileUrl: null,
      commitInfo: null,
      clusterInfo: null,
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toContain('years (Legacy)');
  });

  it('should format file age correctly for old files (3-5 years)', () => {
    const fourYearsAgo = new Date();
    fourYearsAgo.setFullYear(fourYearsAgo.getFullYear() - 4);

    const file = createMockFile({
      firstCommitDate: fourYearsAgo.toISOString(),
    });

    const data: FileDetailsData = {
      file,
      githubFileUrl: null,
      commitInfo: null,
      clusterInfo: null,
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toContain('years (Old)');
  });

  it('should format file age correctly for recent files (months)', () => {
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

    const file = createMockFile({
      firstCommitDate: fourMonthsAgo.toISOString(),
    });

    const data: FileDetailsData = {
      file,
      githubFileUrl: null,
      commitInfo: null,
      clusterInfo: null,
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toContain('months (Recent)');
  });

  it('should render coupling cluster with no edges', () => {
    const file = createMockFile();
    const data: FileDetailsData = {
      file,
      githubFileUrl: null,
      commitInfo: null,
      clusterInfo: {
        cluster: {
          id: 2,
          name: 'Isolated Cluster',
          files: ['/src/utils/test.ts'],
          fileCount: 1,
          avgInternalCoupling: 0.0,
        },
        topEdges: [],
      },
    };

    const html = buildFileDetailsHTML(data);
    expect(html).toMatchSnapshot();
    expect(html).toContain('Coupling Cluster');
    expect(html).toContain('Isolated Cluster');
    expect(html).not.toContain('Most Frequently Changes With');
  });

  it('should render commit count pluralization correctly', () => {
    const fileOne = createMockFile({ commitCount: 1 });
    const fileMany = createMockFile({ commitCount: 42 });

    const dataOne: FileDetailsData = {
      file: fileOne,
      githubFileUrl: null,
      commitInfo: null,
      clusterInfo: null,
    };

    const dataMany: FileDetailsData = {
      file: fileMany,
      githubFileUrl: null,
      commitInfo: null,
      clusterInfo: null,
    };

    const htmlOne = buildFileDetailsHTML(dataOne);
    const htmlMany = buildFileDetailsHTML(dataMany);

    expect(htmlOne).toContain('1 commit<');
    expect(htmlMany).toContain('42 commits<');
  });
});
