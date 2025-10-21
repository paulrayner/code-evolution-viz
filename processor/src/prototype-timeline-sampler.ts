#!/usr/bin/env node

/**
 * Prototype: Timeline Commit Sampling with Importance Scoring
 *
 * This script analyzes a git repository's full history and scores commits
 * by importance to enable intelligent sampling for timeline animations.
 *
 * Output: HTML report showing which commits would be selected at different
 * sampling densities (50, 100, 200, 500 commits).
 */

import * as fs from 'fs';
import * as path from 'path';
import simpleGit, { SimpleGit, DefaultLogFields, LogResult } from 'simple-git';

interface CommitAnalysis {
  hash: string;
  shortHash: string;
  date: Date;
  timestamp: number;
  author: string;
  message: string;

  // File changes
  filesAdded: number;
  filesDeleted: number;
  filesModified: number;
  totalFilesChanged: number;

  // LOC changes
  linesAdded: number;
  linesDeleted: number;
  totalLinesChanged: number;

  // Structural changes
  directoriesChanged: number;
  hasFileRenames: boolean;
  isMergeCommit: boolean;

  // Special markers
  isFirstCommit: boolean;
  isLastCommit: boolean;
  tags: string[];

  // Time context
  daysSincePrevious: number;

  // Scoring (populated later)
  importanceScore: number;
  scoreBreakdown: Array<{ reason: string; points: number }>;
}

interface ScoredCommit extends CommitAnalysis {
  rank: number;
  selected: boolean;
}

interface SamplingScenario {
  name: string;
  targetCount: number;
  commits: ScoredCommit[];
}

interface RepositoryStats {
  totalCommits: number;
  dateRange: { start: Date; end: Date };
  totalFiles: number;
  contributors: number;
  tags: number;
}

interface AdaptiveThresholds {
  filesChanged: {
    p50: number;
    p75: number;
    p90: number;
    p95: number;
    p99: number;
  };
  linesChanged: {
    p50: number;
    p75: number;
    p90: number;
    p95: number;
    p99: number;
  };
}

class TimelineSampler {
  private git: SimpleGit;
  private repoPath: string;
  private commits: CommitAnalysis[] = [];
  private tags: Map<string, string[]> = new Map(); // hash -> tag names

  constructor(repoPath: string) {
    this.repoPath = path.resolve(repoPath);
    this.git = simpleGit(this.repoPath);
  }

  /**
   * Load full commit history with stats
   */
  async loadHistory(): Promise<void> {
    console.log(`Loading commit history from: ${this.repoPath}`);

    // Get all tags first
    await this.loadTags();

    // Get all commits
    const log: LogResult<DefaultLogFields> = await this.git.log(['--all']);

    console.log(`Found ${log.all.length} commits`);

    // Process each commit
    for (let i = 0; i < log.all.length; i++) {
      const commit = log.all[i];

      // Get detailed stats for this commit
      const stats = await this.getCommitStats(commit.hash);

      // Check if it's a merge commit (has multiple parents)
      const isMergeCommit = /^Merge (pull request|branch)/i.test(commit.message) ||
                            (commit.message.toLowerCase().includes('merge') && stats.filesAdded + stats.filesDeleted + stats.filesModified > 3);

      this.commits.push({
        hash: commit.hash,
        shortHash: commit.hash.substring(0, 7),
        date: new Date(commit.date),
        timestamp: new Date(commit.date).getTime(),
        author: commit.author_name,
        message: commit.message,

        filesAdded: stats.filesAdded,
        filesDeleted: stats.filesDeleted,
        filesModified: stats.filesModified,
        totalFilesChanged: stats.filesAdded + stats.filesDeleted + stats.filesModified,

        linesAdded: stats.linesAdded,
        linesDeleted: stats.linesDeleted,
        totalLinesChanged: stats.linesAdded + stats.linesDeleted,

        directoriesChanged: stats.directoriesChanged,
        hasFileRenames: stats.hasRenames,
        isMergeCommit,

        isFirstCommit: i === log.all.length - 1, // Git log is reverse chronological
        isLastCommit: i === 0,
        tags: this.tags.get(commit.hash) || [],

        daysSincePrevious: 0, // Will calculate after sorting

        importanceScore: 0,
        scoreBreakdown: []
      });

      // Progress indicator
      if ((i + 1) % 100 === 0) {
        console.log(`  Processed ${i + 1}/${log.all.length} commits...`);
      }
    }

    // Sort by date (oldest first)
    this.commits.sort((a, b) => a.timestamp - b.timestamp);

    // Calculate time gaps
    for (let i = 1; i < this.commits.length; i++) {
      const daysDiff = (this.commits[i].timestamp - this.commits[i - 1].timestamp) / (1000 * 60 * 60 * 24);
      this.commits[i].daysSincePrevious = daysDiff;
    }

    console.log(`History loaded: ${this.commits.length} commits`);
  }

  /**
   * Load all tags and map them to commit hashes
   */
  private async loadTags(): Promise<void> {
    const tagList = await this.git.tags();

    for (const tag of tagList.all) {
      try {
        const show = await this.git.show([tag, '--format=%H', '--no-patch']);
        const hash = show.trim().split('\n')[0];

        if (!this.tags.has(hash)) {
          this.tags.set(hash, []);
        }
        this.tags.get(hash)!.push(tag);
      } catch (error) {
        // Ignore tags that can't be resolved
      }
    }

    console.log(`Loaded ${tagList.all.length} tags`);
  }

  /**
   * Get detailed stats for a single commit
   */
  private async getCommitStats(hash: string): Promise<{
    filesAdded: number;
    filesDeleted: number;
    filesModified: number;
    linesAdded: number;
    linesDeleted: number;
    directoriesChanged: number;
    hasRenames: boolean;
  }> {
    try {
      // Get diff summary
      const diffSummary = await this.git.diffSummary([`${hash}^`, hash]);

      // Parse numstat for detailed stats
      const numstat = await this.git.raw(['diff', '--numstat', `${hash}^`, hash]);

      let filesAdded = 0;
      let filesDeleted = 0;
      let filesModified = 0;
      let linesAdded = 0;
      let linesDeleted = 0;
      const directories = new Set<string>();
      let hasRenames = false;

      // Parse numstat output
      const lines = numstat.trim().split('\n');
      for (const line of lines) {
        if (!line) continue;

        const parts = line.split('\t');
        if (parts.length < 3) continue;

        const added = parts[0] === '-' ? 0 : parseInt(parts[0], 10);
        const deleted = parts[1] === '-' ? 0 : parseInt(parts[1], 10);
        const filePath = parts[2];

        // Check for renames
        if (filePath.includes('=>')) {
          hasRenames = true;
        }

        // Track directory
        const dir = path.dirname(filePath);
        if (dir !== '.') {
          directories.add(dir);
        }

        // Categorize file change
        if (added > 0 && deleted === 0) {
          filesAdded++;
        } else if (added === 0 && deleted > 0) {
          filesDeleted++;
        } else if (added > 0 && deleted > 0) {
          filesModified++;
        }

        linesAdded += added;
        linesDeleted += deleted;
      }

      return {
        filesAdded,
        filesDeleted,
        filesModified,
        linesAdded,
        linesDeleted,
        directoriesChanged: directories.size,
        hasRenames
      };
    } catch (error) {
      // First commit or error - return zeros
      return {
        filesAdded: 0,
        filesDeleted: 0,
        filesModified: 0,
        linesAdded: 0,
        linesDeleted: 0,
        directoriesChanged: 0,
        hasRenames: false
      };
    }
  }

  /**
   * Calculate adaptive thresholds based on repository-specific percentiles
   */
  private calculateAdaptiveThresholds(): AdaptiveThresholds {
    console.log('Calculating adaptive thresholds...');

    // Extract all values
    const filesChangedValues = this.commits.map(c => c.totalFilesChanged).sort((a, b) => a - b);
    const linesChangedValues = this.commits.map(c => c.totalLinesChanged).sort((a, b) => a - b);

    const percentile = (arr: number[], p: number): number => {
      const index = Math.ceil((p / 100) * arr.length) - 1;
      return arr[Math.max(0, index)];
    };

    const thresholds: AdaptiveThresholds = {
      filesChanged: {
        p50: percentile(filesChangedValues, 50),
        p75: percentile(filesChangedValues, 75),
        p90: percentile(filesChangedValues, 90),
        p95: percentile(filesChangedValues, 95),
        p99: percentile(filesChangedValues, 99)
      },
      linesChanged: {
        p50: percentile(linesChangedValues, 50),
        p75: percentile(linesChangedValues, 75),
        p90: percentile(linesChangedValues, 90),
        p95: percentile(linesChangedValues, 95),
        p99: percentile(linesChangedValues, 99)
      }
    };

    console.log('Adaptive thresholds:');
    console.log(`  Files changed - p50: ${thresholds.filesChanged.p50}, p75: ${thresholds.filesChanged.p75}, p90: ${thresholds.filesChanged.p90}, p95: ${thresholds.filesChanged.p95}, p99: ${thresholds.filesChanged.p99}`);
    console.log(`  Lines changed - p50: ${thresholds.linesChanged.p50}, p75: ${thresholds.linesChanged.p75}, p90: ${thresholds.linesChanged.p90}, p95: ${thresholds.linesChanged.p95}, p99: ${thresholds.linesChanged.p99}`);

    return thresholds;
  }

  /**
   * Score commits by importance (V2: Adaptive Algorithm)
   */
  scoreCommits(): ScoredCommit[] {
    console.log('Scoring commits by importance (V2: Adaptive)...');

    // Calculate adaptive thresholds
    const thresholds = this.calculateAdaptiveThresholds();

    const scored: ScoredCommit[] = this.commits.map(commit => {
      const breakdown: Array<{ reason: string; points: number }> = [];
      let score = 0;

      // Base score
      score += 10;
      breakdown.push({ reason: 'Base score', points: 10 });

      // ========================================
      // CRITICAL MILESTONES (Highest Priority)
      // ========================================

      if (commit.isFirstCommit) {
        score += 100;
        breakdown.push({ reason: 'First commit', points: 100 });
      }
      if (commit.isLastCommit) {
        score += 100;
        breakdown.push({ reason: 'Last commit (HEAD)', points: 100 });
      }

      // VERSION TAGS: Boosted to 100 to guarantee capture
      if (commit.tags.length > 0) {
        const points = 100;
        score += points;
        breakdown.push({ reason: `Version tag: ${commit.tags.join(', ')}`, points });
      }

      // ========================================
      // ADAPTIVE STRUCTURAL SIGNIFICANCE
      // ========================================

      // Files changed (adaptive percentile-based)
      if (commit.totalFilesChanged >= thresholds.filesChanged.p99) {
        score += 50;
        breakdown.push({ reason: `${commit.totalFilesChanged} files (p99)`, points: 50 });
      } else if (commit.totalFilesChanged >= thresholds.filesChanged.p95) {
        score += 35;
        breakdown.push({ reason: `${commit.totalFilesChanged} files (p95)`, points: 35 });
      } else if (commit.totalFilesChanged >= thresholds.filesChanged.p90) {
        score += 20;
        breakdown.push({ reason: `${commit.totalFilesChanged} files (p90)`, points: 20 });
      } else if (commit.totalFilesChanged >= thresholds.filesChanged.p75) {
        score += 10;
        breakdown.push({ reason: `${commit.totalFilesChanged} files (p75)`, points: 10 });
      }

      // Lines changed (adaptive percentile-based)
      if (commit.totalLinesChanged >= thresholds.linesChanged.p99) {
        score += 40;
        breakdown.push({ reason: `${commit.totalLinesChanged} lines (p99)`, points: 40 });
      } else if (commit.totalLinesChanged >= thresholds.linesChanged.p95) {
        score += 25;
        breakdown.push({ reason: `${commit.totalLinesChanged} lines (p95)`, points: 25 });
      } else if (commit.totalLinesChanged >= thresholds.linesChanged.p90) {
        score += 15;
        breakdown.push({ reason: `${commit.totalLinesChanged} lines (p90)`, points: 15 });
      } else if (commit.totalLinesChanged >= thresholds.linesChanged.p75) {
        score += 8;
        breakdown.push({ reason: `${commit.totalLinesChanged} lines (p75)`, points: 8 });
      }

      // Directory changes (still useful with adaptive context)
      const dirP95 = Math.max(5, Math.floor(thresholds.filesChanged.p95 / 3));
      const dirP75 = Math.max(3, Math.floor(thresholds.filesChanged.p75 / 3));

      if (commit.directoriesChanged > dirP95) {
        score += 25;
        breakdown.push({ reason: `${commit.directoriesChanged} directories (high)`, points: 25 });
      } else if (commit.directoriesChanged > dirP75) {
        score += 12;
        breakdown.push({ reason: `${commit.directoriesChanged} directories (med)`, points: 12 });
      }

      // File renames (structural refactoring)
      if (commit.hasFileRenames) {
        score += 20;
        breakdown.push({ reason: 'File renames detected', points: 20 });
      }

      // Merge commits (feature completions, PR merges)
      if (commit.isMergeCommit) {
        score += 30;
        breakdown.push({ reason: 'Merge commit (feature/PR)', points: 30 });
      }

      // Time gaps (commits after long silence)
      if (commit.daysSincePrevious > 180) {
        score += 50;
        breakdown.push({ reason: `${Math.round(commit.daysSincePrevious)} days since previous`, points: 50 });
      } else if (commit.daysSincePrevious > 90) {
        score += 30;
        breakdown.push({ reason: `${Math.round(commit.daysSincePrevious)} days since previous`, points: 30 });
      } else if (commit.daysSincePrevious > 30) {
        score += 15;
        breakdown.push({ reason: `${Math.round(commit.daysSincePrevious)} days since previous`, points: 15 });
      }

      // Commit message keywords
      const msg = commit.message.toLowerCase();
      if (/refactor|restructure|reorganize|rewrite/i.test(msg)) {
        score += 15;
        breakdown.push({ reason: 'Refactoring keyword in message', points: 15 });
      }
      if (/v?\d+\.\d+\.\d+/.test(commit.message)) {
        score += 20;
        breakdown.push({ reason: 'Version number in message', points: 20 });
      }
      if (/breaking|major|significant/i.test(msg)) {
        score += 25;
        breakdown.push({ reason: 'Major change keyword in message', points: 25 });
      }
      if (/initial|first/i.test(msg) && commit.totalFilesChanged > 10) {
        score += 20;
        breakdown.push({ reason: 'Initial implementation', points: 20 });
      }

      return {
        ...commit,
        importanceScore: Math.min(score, 200), // Cap at 200
        scoreBreakdown: breakdown,
        rank: 0,
        selected: false
      };
    });

    // Assign ranks
    scored.sort((a, b) => b.importanceScore - a.importanceScore);
    scored.forEach((commit, index) => {
      commit.rank = index + 1;
    });

    const highestScore = scored.length > 0 ? scored[0].importanceScore : 0;

    // Re-sort by date
    scored.sort((a, b) => a.timestamp - b.timestamp);

    console.log(`Scoring complete. Highest score: ${highestScore}`);
    return scored;
  }

  /**
   * Select commits with temporal spread (V2: Priority Milestones First)
   */
  selectCommits(scored: ScoredCommit[], targetCount: number): ScoredCommit[] {
    console.log(`Selecting ${targetCount} commits...`);

    // Reset selection
    scored.forEach(c => c.selected = false);

    const selected: ScoredCommit[] = [];

    // ========================================
    // PHASE 1: Select ALL critical milestones (guaranteed)
    // ========================================
    const milestones = scored.filter(c => c.tags.length > 0 || c.isFirstCommit || c.isLastCommit);
    for (const milestone of milestones) {
      milestone.selected = true;
      selected.push(milestone);
    }

    console.log(`  Phase 1: Selected ${selected.length} critical milestones (tags + first/last)`);

    // If we've already exceeded target, just return the milestones
    if (selected.length >= targetCount) {
      console.log(`  Milestone count (${selected.length}) >= target (${targetCount}), returning milestones only`);
      return selected.sort((a, b) => a.timestamp - b.timestamp);
    }

    // ========================================
    // PHASE 2: Fill remaining with temporal + importance hybrid
    // ========================================
    const remaining = targetCount - selected.length;
    const unselected = scored.filter(c => !c.selected);

    // Divide timeline into buckets
    const firstTimestamp = scored[0].timestamp;
    const lastTimestamp = scored[scored.length - 1].timestamp;
    const totalDuration = lastTimestamp - firstTimestamp;
    const bucketCount = Math.min(remaining, Math.ceil(remaining / 2));
    const bucketSize = totalDuration / bucketCount;

    // Create time buckets
    const buckets: ScoredCommit[][] = Array.from({ length: bucketCount }, () => []);

    for (const commit of unselected) {
      const bucketIndex = Math.min(
        Math.floor((commit.timestamp - firstTimestamp) / bucketSize),
        bucketCount - 1
      );
      if (buckets[bucketIndex]) {
        buckets[bucketIndex].push(commit);
      }
    }

    // Select highest-scored commit from each bucket
    let bucketSelected = 0;
    for (const bucket of buckets) {
      if (bucket.length === 0) continue;

      // Sort bucket by score
      bucket.sort((a, b) => b.importanceScore - a.importanceScore);

      const best = bucket[0];
      best.selected = true;
      selected.push(best);
      bucketSelected++;
    }

    console.log(`  Phase 2: Selected ${bucketSelected} commits from temporal buckets`);

    // Fill any remaining slots with highest global scores
    if (selected.length < targetCount) {
      const stillRemaining = targetCount - selected.length;
      const stillUnselected = scored.filter(c => !c.selected);
      stillUnselected.sort((a, b) => b.importanceScore - a.importanceScore);

      let globalSelected = 0;
      for (let i = 0; i < stillRemaining && i < stillUnselected.length; i++) {
        stillUnselected[i].selected = true;
        selected.push(stillUnselected[i]);
        globalSelected++;
      }

      console.log(`  Phase 3: Selected ${globalSelected} commits from global high scores`);
    }

    // Sort by date
    selected.sort((a, b) => a.timestamp - b.timestamp);

    console.log(`  Total selected: ${selected.length} commits`);
    return selected;
  }

  /**
   * Generate scenarios at different sampling densities
   */
  generateScenarios(scored: ScoredCommit[]): SamplingScenario[] {
    const scenarios: SamplingScenario[] = [
      { name: 'Milestones Only', targetCount: 50, commits: [] },
      { name: 'Balanced', targetCount: 100, commits: [] },
      { name: 'Detailed', targetCount: 200, commits: [] },
      { name: 'Comprehensive', targetCount: 500, commits: [] }
    ];

    for (const scenario of scenarios) {
      // Cap at total commits available
      const actualTarget = Math.min(scenario.targetCount, scored.length);
      scenario.commits = this.selectCommits(scored, actualTarget);
    }

    return scenarios;
  }

  /**
   * Get repository statistics
   */
  getStats(): RepositoryStats {
    const contributors = new Set(this.commits.map(c => c.author));
    const allTags = new Set<string>();
    this.commits.forEach(c => c.tags.forEach(t => allTags.add(t)));

    return {
      totalCommits: this.commits.length,
      dateRange: {
        start: this.commits[0].date,
        end: this.commits[this.commits.length - 1].date
      },
      totalFiles: 0, // Would need additional analysis
      contributors: contributors.size,
      tags: allTags.size
    };
  }

  /**
   * Generate HTML report
   */
  generateReport(scored: ScoredCommit[], scenarios: SamplingScenario[], stats: RepositoryStats): string {
    console.log('Generating HTML report...');

    const repoName = path.basename(this.repoPath);

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Timeline Analysis V2: ${repoName}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    h1 { color: #2c3e50; margin-bottom: 10px; }
    h2 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 40px; }
    h3 { color: #7f8c8d; }

    .header { background: white; padding: 30px; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px; }
    .stat-box { background: #ecf0f1; padding: 15px; border-radius: 6px; }
    .stat-box strong { display: block; font-size: 24px; color: #2c3e50; margin-top: 5px; }

    .scenario { background: white; padding: 30px; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

    .timeline-viz {
      position: relative;
      height: 60px;
      background: #ecf0f1;
      border-radius: 4px;
      margin: 20px 0;
      overflow: hidden;
    }
    .timeline-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #3498db;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 0.2s;
    }
    .timeline-dot:hover {
      width: 12px;
      height: 12px;
      background: #2980b9;
    }
    .timeline-dot.milestone {
      background: #e74c3c;
      width: 10px;
      height: 10px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background: white;
      font-size: 13px;
    }
    th {
      background: #34495e;
      color: white;
      padding: 12px 8px;
      text-align: left;
      position: sticky;
      top: 0;
    }
    td {
      padding: 10px 8px;
      border-bottom: 1px solid #ecf0f1;
    }
    tr:hover {
      background: #f8f9fa;
    }

    .score {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: bold;
      color: white;
    }
    .score.high { background: #e74c3c; }
    .score.medium { background: #f39c12; }
    .score.low { background: #95a5a6; }

    .tag {
      display: inline-block;
      background: #3498db;
      color: white;
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 11px;
      margin-right: 4px;
    }

    .breakdown {
      font-size: 11px;
      color: #7f8c8d;
      line-height: 1.4;
    }
    .breakdown-item {
      display: inline-block;
      margin-right: 10px;
      white-space: nowrap;
    }

    .commit-msg {
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .validation {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .validation.good {
      background: #d4edda;
      border-color: #28a745;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📊 Timeline Sampling Analysis <span style="color: #27ae60; font-size: 0.6em;">V2: Adaptive Algorithm</span></h1>
    <h2>${repoName}</h2>
    <div style="background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; margin: 15px 0; border-radius: 4px;">
      <strong>🎯 Algorithm Improvements (V2):</strong>
      <ul style="margin: 10px 0 0 0; padding-left: 20px;">
        <li><strong>Adaptive Thresholds:</strong> Percentile-based scoring (p75, p90, p95, p99) adapts to repo patterns</li>
        <li><strong>Version Tags Boosted:</strong> Tags now score 100 points (was 40) to guarantee capture</li>
        <li><strong>Merge Commit Detection:</strong> PR/branch merges score +30 points</li>
        <li><strong>First/Last Commits:</strong> Boosted to 100 points (was 50)</li>
      </ul>
      <div style="margin-top: 10px; font-size: 0.9em; color: #666;">
        📝 Compare to V1 (fixed thresholds): <code>timeline-report-v1-fixed-thresholds.html</code>
      </div>
    </div>
    <div class="stats">
      <div class="stat-box">
        <div>Total Commits</div>
        <strong>${stats.totalCommits.toLocaleString()}</strong>
      </div>
      <div class="stat-box">
        <div>Date Range</div>
        <strong>${stats.dateRange.start.toLocaleDateString()} - ${stats.dateRange.end.toLocaleDateString()}</strong>
      </div>
      <div class="stat-box">
        <div>Contributors</div>
        <strong>${stats.contributors}</strong>
      </div>
      <div class="stat-box">
        <div>Version Tags</div>
        <strong>${stats.tags}</strong>
      </div>
    </div>
  </div>
`;

    // Generate each scenario
    for (const scenario of scenarios) {
      html += this.generateScenarioHTML(scenario, stats, scored);
    }

    html += `
  <div class="scenario">
    <h2>🎯 Scoring Algorithm V2 (Adaptive)</h2>
    <p>Commits are scored based on multiple factors with <strong>adaptive, percentile-based thresholds</strong>:</p>
    <ul>
      <li><strong>Critical Milestones:</strong> First commit (+100), Last commit (+100), Version tags (+100) 🆕</li>
      <li><strong>Adaptive Files Changed:</strong> p99 (+50), p95 (+35), p90 (+20), p75 (+10) 🆕</li>
      <li><strong>Adaptive Lines Changed:</strong> p99 (+40), p95 (+25), p90 (+15), p75 (+8) 🆕</li>
      <li><strong>Directories:</strong> Adaptive based on file change percentiles 🆕</li>
      <li><strong>Merge Commits:</strong> PR/branch merges (+30) 🆕</li>
      <li><strong>Refactoring:</strong> File renames (+20)</li>
      <li><strong>Time Gaps:</strong> 180+ days (+50), 90+ days (+30), 30+ days (+15)</li>
      <li><strong>Keywords:</strong> Refactor (+15), Version number (+20), Breaking/Major (+25), Initial (+20)</li>
    </ul>
    <p><strong>Selection Strategy:</strong> Hybrid approach combining temporal buckets (ensuring even coverage) with global importance ranking.</p>
    <p><strong>Key Improvement:</strong> Thresholds adapt to each repository's patterns. Works equally well for repos with tiny frequent commits (React) or larger infrequent commits (Gource).</p>
  </div>
</body>
</html>`;

    return html;
  }

  /**
   * Generate HTML for a single scenario
   */
  private generateScenarioHTML(scenario: SamplingScenario, stats: RepositoryStats, allScored: ScoredCommit[]): string {
    const firstTimestamp = stats.dateRange.start.getTime();
    const lastTimestamp = stats.dateRange.end.getTime();
    const totalDuration = lastTimestamp - firstTimestamp;

    // Generate timeline visualization
    let timelineHTML = '<div class="timeline-viz">';
    for (const commit of scenario.commits) {
      const position = ((commit.timestamp - firstTimestamp) / totalDuration) * 100;
      const isMilestone = commit.tags.length > 0 || commit.isFirstCommit || commit.isLastCommit;
      const className = isMilestone ? 'timeline-dot milestone' : 'timeline-dot';
      timelineHTML += `<div class="${className}" style="left: ${position}%" title="${commit.shortHash}: ${commit.message}"></div>`;
    }
    timelineHTML += '</div>';

    // Calculate validation metrics
    const maxGapDays = this.calculateMaxGap(scenario.commits);
    const allTags = allScored.filter(c => c.tags.length > 0);
    const selectedTags = scenario.commits.filter(c => c.tags.length > 0);
    const tagsCovered = selectedTags.length;
    const tagsTotal = allTags.length;

    const validationGood = maxGapDays < 90 && tagsCovered === tagsTotal;

    let html = `
  <div class="scenario">
    <h2>${scenario.name} (${scenario.commits.length} commits)</h2>

    <div class="validation ${validationGood ? 'good' : ''}">
      <strong>Validation:</strong><br>
      ${maxGapDays < 90 ? '✅' : '⚠️'} Maximum time gap: ${Math.round(maxGapDays)} days ${maxGapDays > 90 ? '(Warning: >90 days)' : ''}<br>
      ${tagsCovered === tagsTotal ? '✅' : '⚠️'} Version tags covered: ${tagsCovered}/${tagsTotal}
    </div>

    ${timelineHTML}

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Hash</th>
          <th>Score</th>
          <th>Files</th>
          <th>Lines ±</th>
          <th>Tags</th>
          <th>Message</th>
          <th>Score Breakdown</th>
        </tr>
      </thead>
      <tbody>
`;

    for (const commit of scenario.commits) {
      const scoreClass = commit.importanceScore >= 100 ? 'high' : commit.importanceScore >= 50 ? 'medium' : 'low';
      const tagsHTML = commit.tags.map(t => `<span class="tag">${t}</span>`).join('');
      const breakdownHTML = commit.scoreBreakdown
        .map(b => `<span class="breakdown-item">${b.reason} (+${b.points})</span>`)
        .join('');

      html += `
        <tr>
          <td>${commit.date.toLocaleDateString()}</td>
          <td><code>${commit.shortHash}</code></td>
          <td><span class="score ${scoreClass}">${commit.importanceScore}</span></td>
          <td>${commit.totalFilesChanged}</td>
          <td>+${commit.linesAdded} -${commit.linesDeleted}</td>
          <td>${tagsHTML}</td>
          <td><div class="commit-msg">${commit.message}</div></td>
          <td><div class="breakdown">${breakdownHTML}</div></td>
        </tr>
`;
    }

    html += `
      </tbody>
    </table>
  </div>
`;

    return html;
  }

  /**
   * Calculate maximum time gap between selected commits
   */
  private calculateMaxGap(commits: ScoredCommit[]): number {
    if (commits.length < 2) return 0;

    let maxGap = 0;
    for (let i = 1; i < commits.length; i++) {
      const gap = (commits[i].timestamp - commits[i - 1].timestamp) / (1000 * 60 * 60 * 24);
      maxGap = Math.max(maxGap, gap);
    }
    return maxGap;
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);
  const repoPath = args[0] || path.join(process.env.HOME!, 'Documents/Gource');
  const outputPath = args[1] || path.join(__dirname, '../output/timeline-report.html');

  console.log('='.repeat(60));
  console.log('Timeline Commit Sampling Prototype');
  console.log('='.repeat(60));
  console.log();

  try {
    const sampler = new TimelineSampler(repoPath);

    // Load full history
    await sampler.loadHistory();

    // Score commits
    const scored = sampler.scoreCommits();

    // Generate sampling scenarios
    const scenarios = sampler.generateScenarios(scored);

    // Get stats
    const stats = sampler.getStats();

    // Generate report
    const html = sampler.generateReport(scored, scenarios, stats);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write report
    fs.writeFileSync(outputPath, html);

    console.log();
    console.log('='.repeat(60));
    console.log(`✅ Report generated: ${outputPath}`);
    console.log('='.repeat(60));
    console.log();
    console.log('Scenarios generated:');
    for (const scenario of scenarios) {
      console.log(`  - ${scenario.name}: ${scenario.commits.length} commits`);
    }
  } catch (error) {
    console.error('Error analyzing timeline:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { TimelineSampler };
