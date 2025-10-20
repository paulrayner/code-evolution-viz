import simpleGit, { SimpleGit, DefaultLogFields } from 'simple-git';
import * as path from 'path';
import { TimelineDataV2, CommitSnapshot } from './types.js';

interface GitCommit {
  hash: string;
  date: Date;
  author: string;
  message: string;
  refs: string;  // Tags and branches
}

/**
 * Full Delta Analyzer - Extracts ALL commits as deltas (no sampling)
 * Phase 1 POC for delta-based tree reconstruction
 */
export class FullDeltaAnalyzer {
  private git: SimpleGit;
  private repoPath: string;

  constructor(repoPath: string) {
    this.repoPath = path.resolve(repoPath);
    this.git = simpleGit(this.repoPath);
  }

  /**
   * Analyze repository and generate timeline-v2 format
   */
  async analyzeFullDelta(): Promise<TimelineDataV2> {
    console.log(`\n🔍 Analyzing repository: ${this.repoPath}`);
    console.log('Extracting full commit history (no sampling)...\n');

    // 1. Get ALL commits
    const allCommits = await this.getAllCommits();
    console.log(`📊 Found ${allCommits.length} total commits`);

    // 2. Extract tags
    const tags = await this.extractAllTags();
    console.log(`🏷️  Found ${tags.length} version tags`);

    // 3. Build commit snapshots with deltas
    console.log(`\n⚙️  Building commit snapshots...`);
    const commitSnapshots = await this.buildCommitSnapshots(allCommits);
    console.log(`✅ Generated ${commitSnapshots.length} commit snapshots\n`);

    // 4. Build metadata
    const metadata = {
      totalCommits: allCommits.length,
      dateRange: {
        first: allCommits[0].date.toISOString(),
        last: allCommits[allCommits.length - 1].date.toISOString()
      },
      tags
    };

    return {
      format: 'timeline-v2',
      repositoryPath: this.repoPath,
      metadata,
      commits: commitSnapshots
    };
  }

  /**
   * Get ALL commits in chronological order (oldest first)
   */
  private async getAllCommits(): Promise<GitCommit[]> {
    // Use raw git command for more control
    const result = await this.git.raw([
      'log',
      '--all',
      '--reverse',  // Oldest first
      '--format=%H|%aI|%an|%s|%D'  // hash|date|author|message|refs
    ]);

    const commits: GitCommit[] = [];
    const lines = result.split('\n').filter(l => l.trim());

    for (const line of lines) {
      const parts = line.split('|');
      if (parts.length >= 4) {
        commits.push({
          hash: parts[0],
          date: new Date(parts[1]),
          author: parts[2],
          message: parts[3],
          refs: parts[4] || ''
        });
      }
    }

    return commits;
  }

  /**
   * Extract all git tags
   */
  private async extractAllTags(): Promise<string[]> {
    try {
      const tagList = await this.git.tags();
      return tagList.all || [];
    } catch (error) {
      console.warn('Could not extract tags:', error);
      return [];
    }
  }

  /**
   * Build CommitSnapshot objects with file change deltas
   */
  private async buildCommitSnapshots(commits: GitCommit[]): Promise<CommitSnapshot[]> {
    const snapshots: CommitSnapshot[] = [];

    for (let i = 0; i < commits.length; i++) {
      const commit = commits[i];

      if (i % 100 === 0) {
        console.log(`  Processing commit ${i + 1}/${commits.length}...`);
      }

      // Extract file changes for this commit
      const changes = await this.extractFileChanges(commit.hash, i === 0);

      // Extract tags from refs (format: "tag: v1.0.0, tag: v1.0.1")
      const tags = this.parseTagsFromRefs(commit.refs);

      // Check if merge commit (has multiple parents)
      const isMergeCommit = await this.isMergeCommit(commit.hash);

      snapshots.push({
        hash: commit.hash,
        date: commit.date.toISOString(),
        author: commit.author,
        message: commit.message,
        tags,
        isMergeCommit,
        importanceScore: this.calculateImportanceScore(changes, tags, isMergeCommit),
        changes
      });
    }

    return snapshots;
  }

  /**
   * Extract file changes for a specific commit
   */
  private async extractFileChanges(hash: string, isFirstCommit: boolean): Promise<{
    filesAdded: string[];
    filesModified: string[];
    filesDeleted: string[];
    totalFilesChanged: number;
    linesAdded: number;
    linesDeleted: number;
  }> {
    try {
      // For first commit, all files are "added"
      if (isFirstCommit) {
        const files = await this.getFilesInCommit(hash);
        return {
          filesAdded: files,
          filesModified: [],
          filesDeleted: [],
          totalFilesChanged: files.length,
          linesAdded: 0,  // Unknown for first commit
          linesDeleted: 0
        };
      }

      // For other commits, use git show with --name-status and --numstat
      const nameStatus = await this.git.show([
        hash,
        '--name-status',
        '--format=',
        '--no-renames'  // Treat renames as delete + add for simplicity
      ]);

      const numstat = await this.git.show([
        hash,
        '--numstat',
        '--format='
      ]);

      // Parse file changes
      const filesAdded: string[] = [];
      const filesModified: string[] = [];
      const filesDeleted: string[] = [];

      const lines = nameStatus.split('\n').filter(l => l.trim());
      for (const line of lines) {
        const parts = line.trim().split(/\t/);  // Git uses TAB, not space!
        if (parts.length >= 2) {
          const status = parts[0];
          const filePath = parts[1];

          // Skip binary files and submodules
          if (!filePath || filePath.includes('Subproject commit')) continue;

          if (status === 'A') {
            filesAdded.push(filePath);
          } else if (status === 'M') {
            filesModified.push(filePath);
          } else if (status === 'D') {
            filesDeleted.push(filePath);
          } else if (status.startsWith('R')) {
            // Rename (shouldn't happen with --no-renames, but handle anyway)
            if (parts.length >= 3) {
              filesDeleted.push(parts[1]);
              filesAdded.push(parts[2]);
            }
          } else if (status.startsWith('C')) {
            // Copy - treat as add
            if (parts.length >= 3) {
              filesAdded.push(parts[2]);
            }
          } else if (status.startsWith('T')) {
            // Type change (file<->symlink) - treat as modify
            filesModified.push(filePath);
          }
          // Ignore other status codes (X, U for unmerged, etc.)
        }
      }

      // Parse line changes
      let linesAdded = 0;
      let linesDeleted = 0;

      const numstatLines = numstat.split('\n').filter(l => l.trim());
      for (const line of numstatLines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 2) {
          const added = parts[0] === '-' ? 0 : parseInt(parts[0]) || 0;
          const deleted = parts[1] === '-' ? 0 : parseInt(parts[1]) || 0;
          linesAdded += added;
          linesDeleted += deleted;
        }
      }

      return {
        filesAdded,
        filesModified,
        filesDeleted,
        totalFilesChanged: filesAdded.length + filesModified.length + filesDeleted.length,
        linesAdded,
        linesDeleted
      };
    } catch (error) {
      console.warn(`Warning: Could not extract changes for ${hash}:`, error);
      return {
        filesAdded: [],
        filesModified: [],
        filesDeleted: [],
        totalFilesChanged: 0,
        linesAdded: 0,
        linesDeleted: 0
      };
    }
  }

  /**
   * Get list of all files in a specific commit (for first commit)
   */
  private async getFilesInCommit(hash: string): Promise<string[]> {
    try {
      const result = await this.git.raw(['ls-tree', '-r', '--name-only', hash]);
      return result.split('\n').filter(f => f.trim().length > 0);
    } catch (error) {
      console.warn(`Warning: Could not list files for ${hash}:`, error);
      return [];
    }
  }

  /**
   * Check if commit is a merge commit
   */
  private async isMergeCommit(hash: string): Promise<boolean> {
    try {
      const result = await this.git.raw(['rev-list', '--parents', '-n', '1', hash]);
      const parents = result.trim().split(/\s+/);
      return parents.length > 2;  // More than 1 parent (first item is the commit itself)
    } catch (error) {
      return false;
    }
  }

  /**
   * Parse tags from git refs string
   */
  private parseTagsFromRefs(refs: string): string[] {
    if (!refs) return [];

    const tags: string[] = [];
    const parts = refs.split(',').map(s => s.trim());

    for (const part of parts) {
      if (part.startsWith('tag: ')) {
        tags.push(part.substring(5).trim());
      }
    }

    return tags;
  }

  /**
   * Calculate importance score for commit
   * Simple scoring for v2 (more sophisticated than needed, but keeps consistency)
   */
  private calculateImportanceScore(
    changes: { totalFilesChanged: number; linesAdded: number; linesDeleted: number },
    tags: string[],
    isMerge: boolean
  ): number {
    let score = 0;

    // Base score from changes
    score += changes.totalFilesChanged * 1;
    score += (changes.linesAdded + changes.linesDeleted) * 0.1;

    // Tag bonus
    if (tags.length > 0) {
      score += 100;
    }

    // Merge bonus
    if (isMerge) {
      score += 50;
    }

    return Math.round(score);
  }
}
