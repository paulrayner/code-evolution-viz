import { TreeBuilder } from './TreeBuilder';
import { TimelineDataV2, DirectoryNode, CommitSnapshot, RepositorySnapshot } from './types';

/**
 * Event data emitted during playback
 */
export interface CommitEvent {
  index: number;
  commit: CommitSnapshot;
  tree: DirectoryNode;
}

/**
 * DeltaReplayController - Manages playback of timeline-v2 data
 * Generates keyframes and provides VCR-style controls
 * Phase 1 POC for full delta timeline
 */
export class DeltaReplayController {
  private data: TimelineDataV2;
  private treeBuilder: TreeBuilder;
  private keyframes: Map<number, DirectoryNode> = new Map();
  private currentIndex: number = 0;
  private isPlaying: boolean = false;
  private playbackSpeed: number = 50; // commits per second (default 50x speed)
  private listeners: Map<string, Function[]> = new Map();
  private playbackInterval: number | null = null;

  constructor(data: TimelineDataV2) {
    this.data = data;
    this.treeBuilder = new TreeBuilder();
  }

  /**
   * Generate all keyframes by applying deltas sequentially
   * For Gource (988 commits), we generate a keyframe for EVERY commit
   */
  async generateKeyframes(onProgress?: (index: number, total: number) => void): Promise<void> {
    console.log(`🔨 Generating keyframes for ${this.data.commits.length} commits...`);
    const startTime = Date.now();

    for (let i = 0; i < this.data.commits.length; i++) {
      // Apply delta
      this.treeBuilder.applyDelta(this.data.commits[i]);

      // Store keyframe (clone the tree)
      this.keyframes.set(i, this.treeBuilder.clone());

      // Report progress every 100 commits
      if (onProgress && (i % 100 === 0 || i === this.data.commits.length - 1)) {
        onProgress(i + 1, this.data.commits.length);
      }
    }

    const elapsed = Date.now() - startTime;
    const stats = this.treeBuilder.getStats();

    console.log(`✅ Generated ${this.keyframes.size} keyframes in ${elapsed}ms`);
    console.log(`📊 Final tree: ${stats.totalFiles} files, ${stats.totalDirs} directories, depth ${stats.depth}`);
  }

  /**
   * Get tree at specific commit index
   */
  getTreeAtCommit(index: number): DirectoryNode | null {
    return this.keyframes.get(index) || null;
  }

  /**
   * Get commit at specific index
   */
  getCommitAtIndex(index: number): CommitSnapshot | null {
    if (index >= 0 && index < this.data.commits.length) {
      return this.data.commits[index];
    }
    return null;
  }

  /**
   * Get current commit index
   */
  getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * Get total number of commits
   */
  getTotalCommits(): number {
    return this.data.commits.length;
  }

  /**
   * Play from current position
   */
  play(): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.emit('playStateChanged', { isPlaying: true });

    this.playLoop();
  }

  /**
   * Pause playback
   */
  pause(): void {
    this.isPlaying = false;
    this.emit('playStateChanged', { isPlaying: false });

    if (this.playbackInterval !== null) {
      clearTimeout(this.playbackInterval);
      this.playbackInterval = null;
    }
  }

  /**
   * Toggle play/pause
   */
  togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
   * Playback loop
   */
  private playLoop(): void {
    if (!this.isPlaying) return;

    if (this.currentIndex < this.data.commits.length - 1) {
      this.currentIndex++;
      this.emitCommitEvent();

      const delay = 1000 / this.playbackSpeed;
      this.playbackInterval = window.setTimeout(() => this.playLoop(), delay);
    } else {
      // Reached end
      this.pause();
      this.emit('playbackEnded', {});
    }
  }

  /**
   * Step forward one commit
   */
  stepForward(): void {
    if (this.currentIndex < this.data.commits.length - 1) {
      this.currentIndex++;
      this.emitCommitEvent();
    }
  }

  /**
   * Step backward one commit
   */
  stepBackward(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.emitCommitEvent();
    }
  }

  /**
   * Jump to start
   */
  goToStart(): void {
    this.currentIndex = 0;
    this.emitCommitEvent();
  }

  /**
   * Jump to end
   */
  goToEnd(): void {
    this.currentIndex = this.data.commits.length - 1;
    this.emitCommitEvent();
  }

  /**
   * Seek to specific commit index
   */
  seekToCommit(index: number): void {
    if (index >= 0 && index < this.data.commits.length) {
      this.currentIndex = index;
      this.emitCommitEvent();
    }
  }

  /**
   * Seek to specific tag
   */
  seekToTag(tagName: string): boolean {
    for (let i = 0; i < this.data.commits.length; i++) {
      if (this.data.commits[i].tags.includes(tagName)) {
        this.seekToCommit(i);
        return true;
      }
    }
    return false;
  }

  /**
   * Set playback speed (commits per second)
   */
  setSpeed(speed: number): void {
    this.playbackSpeed = speed;
    this.emit('speedChanged', { speed });
  }

  /**
   * Get current playback speed
   */
  getSpeed(): number {
    return this.playbackSpeed;
  }

  /**
   * Check if currently playing
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Get metadata
   */
  getMetadata() {
    return this.data.metadata;
  }

  /**
   * Emit commit event with current state
   */
  private emitCommitEvent(): void {
    const tree = this.keyframes.get(this.currentIndex);
    const commit = this.data.commits[this.currentIndex];

    if (tree && commit) {
      this.emit('commit', {
        index: this.currentIndex,
        commit,
        tree
      });
    }
  }

  /**
   * Validate final tree against HEAD snapshot
   * Returns true if trees match exactly
   */
  validateFinalTree(headSnapshot: RepositorySnapshot): {
    isValid: boolean;
    builtFiles: number;
    headFiles: number;
    missing: string[];
    extra: string[];
  } {
    const finalTree = this.keyframes.get(this.data.commits.length - 1);

    if (!finalTree) {
      return {
        isValid: false,
        builtFiles: 0,
        headFiles: 0,
        missing: [],
        extra: []
      };
    }

    // Extract paths from both trees
    const builtPaths = this.extractPaths(finalTree).sort();
    const headPaths = this.extractPaths(headSnapshot.tree).sort();

    // Find differences
    const missing = headPaths.filter(p => !builtPaths.includes(p));
    const extra = builtPaths.filter(p => !headPaths.includes(p));

    const isValid = missing.length === 0 && extra.length === 0;

    console.log('\n=== VALIDATION RESULTS ===');
    console.log(`Built tree: ${builtPaths.length} files`);
    console.log(`HEAD tree: ${headPaths.length} files`);
    console.log(`Result: ${isValid ? '✅ PASS' : '❌ FAIL'}`);

    if (!isValid) {
      if (missing.length > 0) {
        console.warn(`Missing ${missing.length} files (in HEAD but not in built tree):`);
        console.warn(missing.slice(0, 10));
      }
      if (extra.length > 0) {
        console.warn(`Extra ${extra.length} files (in built tree but not in HEAD):`);
        console.warn(extra.slice(0, 10));
      }
    }

    return {
      isValid,
      builtFiles: builtPaths.length,
      headFiles: headPaths.length,
      missing,
      extra
    };
  }

  /**
   * Extract all file paths from a tree
   */
  private extractPaths(node: any): string[] {
    const paths: string[] = [];

    const traverse = (n: any) => {
      if (n.type === 'file') {
        paths.push(n.path);
      } else if (n.type === 'directory' && n.children) {
        n.children.forEach(traverse);
      }
    };

    traverse(node);
    return paths;
  }

  /**
   * Event listener registration
   */
  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  /**
   * Remove event listener
   */
  off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Emit event to all listeners
   */
  private emit(event: string, data: any): void {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(cb => {
      try {
        cb(data);
      } catch (error) {
        console.error(`Error in event listener for '${event}':`, error);
      }
    });
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.pause();
    this.listeners.clear();
    this.keyframes.clear();
  }
}
