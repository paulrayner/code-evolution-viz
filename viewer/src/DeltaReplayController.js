import { TreeBuilder } from './TreeBuilder';
import { LRUCache } from './LRUCache';
// Threshold for switching between full vs sparse keyframe generation
// Repos with ≤ this many commits: Full keyframe generation (every commit)
// Repos with > this many commits: Sparse keyframe generation (strategic commits only)
const FULL_KEYFRAME_THRESHOLD = 2000;
// For sparse mode: Generate keyframe every N commits
const SPARSE_KEYFRAME_INTERVAL = 500;
// Maximum number of dynamically-generated keyframes to cache
const DYNAMIC_CACHE_SIZE = 200;
/**
 * DeltaReplayController - Manages playback of timeline-v2 data
 * Uses adaptive keyframe strategy based on repository size:
 * - Small repos (≤2000 commits): Full keyframe generation for instant seeking
 * - Large repos (>2000 commits): Sparse keyframes + on-demand generation
 */
export class DeltaReplayController {
    constructor(data) {
        this.baseKeyframes = new Map(); // Strategic/pre-generated keyframes
        this.currentIndex = 0;
        this.isPlaying = false;
        this.playbackSpeed = 50; // commits per second (default 50x speed)
        this.listeners = new Map();
        this.playbackInterval = null;
        this.useSparseMode = false;
        this.data = data;
        this.treeBuilder = new TreeBuilder();
        this.dynamicCache = new LRUCache(DYNAMIC_CACHE_SIZE);
        this.useSparseMode = data.commits.length > FULL_KEYFRAME_THRESHOLD;
    }
    /**
     * Generate keyframes using adaptive strategy
     */
    async generateKeyframes(onProgress) {
        const startTime = Date.now();
        if (this.useSparseMode) {
            await this.generateSparseKeyframes(onProgress);
        }
        else {
            await this.generateFullKeyframes(onProgress);
        }
        const elapsed = Date.now() - startTime;
        const stats = this.treeBuilder.getStats();
        console.log(`✅ Generated ${this.baseKeyframes.size} base keyframes in ${elapsed}ms`);
        console.log(`📊 Final tree: ${stats.totalFiles} files, ${stats.totalDirs} directories, depth ${stats.depth}`);
    }
    /**
     * Full keyframe generation for small repos
     * Generates a keyframe for EVERY commit
     */
    async generateFullKeyframes(onProgress) {
        console.log(`🔨 Full keyframe mode: Generating keyframe for all ${this.data.commits.length} commits`);
        for (let i = 0; i < this.data.commits.length; i++) {
            // Apply delta
            this.treeBuilder.applyDelta(this.data.commits[i]);
            // Store keyframe (clone the tree)
            this.baseKeyframes.set(i, this.treeBuilder.clone());
            // Report progress every 100 commits
            if (onProgress && (i % 100 === 0 || i === this.data.commits.length - 1)) {
                onProgress(i + 1, this.data.commits.length);
            }
        }
    }
    /**
     * Sparse keyframe generation for large repos
     * Generates keyframes at strategic intervals + all version tags
     */
    async generateSparseKeyframes(onProgress) {
        console.log(`🔨 Sparse keyframe mode: Generating strategic keyframes for ${this.data.commits.length} commits`);
        console.log(`   Interval: Every ${SPARSE_KEYFRAME_INTERVAL} commits + all version tags`);
        // Collect indices where we want keyframes
        const keyframeIndices = new Set();
        // Add start and end
        keyframeIndices.add(0);
        keyframeIndices.add(this.data.commits.length - 1);
        // Add every Nth commit
        for (let i = 0; i < this.data.commits.length; i += SPARSE_KEYFRAME_INTERVAL) {
            keyframeIndices.add(i);
        }
        // Add all version tags
        for (let i = 0; i < this.data.commits.length; i++) {
            if (this.data.commits[i].tags.length > 0) {
                keyframeIndices.add(i);
            }
        }
        const sortedIndices = Array.from(keyframeIndices).sort((a, b) => a - b);
        console.log(`   Total strategic keyframes: ${sortedIndices.length}`);
        // Generate keyframes by replaying deltas
        let lastGeneratedIndex = -1;
        for (const targetIndex of sortedIndices) {
            // Replay deltas from last generated index to target
            for (let i = lastGeneratedIndex + 1; i <= targetIndex; i++) {
                this.treeBuilder.applyDelta(this.data.commits[i]);
            }
            // Store keyframe
            this.baseKeyframes.set(targetIndex, this.treeBuilder.clone());
            lastGeneratedIndex = targetIndex;
            // Report progress
            if (onProgress) {
                const progress = sortedIndices.indexOf(targetIndex) + 1;
                onProgress(progress, sortedIndices.length);
            }
        }
    }
    /**
     * Get tree at specific commit index
     * Uses adaptive strategy: return pre-generated keyframe or generate on-demand
     */
    getTreeAtCommit(index) {
        if (index < 0 || index >= this.data.commits.length) {
            return null;
        }
        // Check base keyframes first
        if (this.baseKeyframes.has(index)) {
            return this.baseKeyframes.get(index);
        }
        // Check dynamic cache
        if (this.dynamicCache.has(index)) {
            return this.dynamicCache.get(index);
        }
        // Need to generate on-demand
        return this.generateTreeOnDemand(index);
    }
    /**
     * Generate tree on-demand by replaying deltas from nearest base keyframe
     */
    generateTreeOnDemand(targetIndex) {
        // Find nearest base keyframe before targetIndex
        let startIndex = -1;
        let startTree = null;
        for (let i = targetIndex; i >= 0; i--) {
            if (this.baseKeyframes.has(i)) {
                startIndex = i;
                startTree = this.baseKeyframes.get(i);
                break;
            }
        }
        if (startIndex === -1 || !startTree) {
            console.error(`No base keyframe found before index ${targetIndex}`);
            return null;
        }
        // If we're generating the exact keyframe we started from, just return it
        if (startIndex === targetIndex) {
            return startTree;
        }
        // Clone the start tree and replay deltas
        const builder = new TreeBuilder();
        // Initialize builder with cloned start tree
        builder.setTree(JSON.parse(JSON.stringify(startTree)));
        // Replay deltas from startIndex+1 to targetIndex
        for (let i = startIndex + 1; i <= targetIndex; i++) {
            builder.applyDelta(this.data.commits[i]);
        }
        const tree = builder.clone();
        // Cache the generated tree
        this.dynamicCache.set(targetIndex, tree);
        return tree;
    }
    /**
     * Get commit at specific index
     */
    getCommitAtIndex(index) {
        if (index >= 0 && index < this.data.commits.length) {
            return this.data.commits[index];
        }
        return null;
    }
    /**
     * Get current commit index
     */
    getCurrentIndex() {
        return this.currentIndex;
    }
    /**
     * Get total number of commits
     */
    getTotalCommits() {
        return this.data.commits.length;
    }
    /**
     * Get keyframe generation mode
     */
    getKeyframeMode() {
        return this.useSparseMode ? 'sparse' : 'full';
    }
    /**
     * Get keyframe stats
     */
    getKeyframeStats() {
        return {
            mode: this.getKeyframeMode(),
            baseKeyframes: this.baseKeyframes.size,
            dynamicCacheSize: this.dynamicCache.size(),
            totalCommits: this.data.commits.length
        };
    }
    /**
     * Play from current position
     */
    play() {
        if (this.isPlaying)
            return;
        this.isPlaying = true;
        this.emit('playStateChanged', { isPlaying: true });
        this.playLoop();
    }
    /**
     * Pause playback
     */
    pause() {
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
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        }
        else {
            this.play();
        }
    }
    /**
     * Playback loop
     */
    playLoop() {
        if (!this.isPlaying)
            return;
        if (this.currentIndex < this.data.commits.length - 1) {
            this.currentIndex++;
            this.emitCommitEvent();
            const delay = 1000 / this.playbackSpeed;
            this.playbackInterval = window.setTimeout(() => this.playLoop(), delay);
        }
        else {
            // Reached end
            this.pause();
            this.emit('playbackEnded', {});
        }
    }
    /**
     * Step forward one commit
     */
    stepForward() {
        if (this.currentIndex < this.data.commits.length - 1) {
            this.currentIndex++;
            this.emitCommitEvent();
        }
    }
    /**
     * Step backward one commit
     */
    stepBackward() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.emitCommitEvent();
        }
    }
    /**
     * Jump to start
     */
    goToStart() {
        this.currentIndex = 0;
        this.emitCommitEvent();
    }
    /**
     * Jump to end
     */
    goToEnd() {
        this.currentIndex = this.data.commits.length - 1;
        this.emitCommitEvent();
    }
    /**
     * Seek to specific commit index
     */
    seekToCommit(index) {
        if (index >= 0 && index < this.data.commits.length) {
            this.currentIndex = index;
            this.emitCommitEvent();
        }
    }
    /**
     * Seek to specific tag
     */
    seekToTag(tagName) {
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
    setSpeed(speed) {
        this.playbackSpeed = speed;
        this.emit('speedChanged', { speed });
    }
    /**
     * Get current playback speed
     */
    getSpeed() {
        return this.playbackSpeed;
    }
    /**
     * Check if currently playing
     */
    getIsPlaying() {
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
    emitCommitEvent() {
        const tree = this.getTreeAtCommit(this.currentIndex);
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
    validateFinalTree(headSnapshot) {
        const finalTree = this.getTreeAtCommit(this.data.commits.length - 1);
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
    extractPaths(node) {
        const paths = [];
        const traverse = (n) => {
            if (n.type === 'file') {
                paths.push(n.path);
            }
            else if (n.type === 'directory' && n.children) {
                n.children.forEach(traverse);
            }
        };
        traverse(node);
        return paths;
    }
    /**
     * Event listener registration
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }
    /**
     * Remove event listener
     */
    off(event, callback) {
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
    emit(event, data) {
        const callbacks = this.listeners.get(event) || [];
        callbacks.forEach(cb => {
            try {
                cb(data);
            }
            catch (error) {
                console.error(`Error in event listener for '${event}':`, error);
            }
        });
    }
    /**
     * Cleanup resources
     */
    destroy() {
        this.pause();
        this.listeners.clear();
        this.baseKeyframes.clear();
        this.dynamicCache.clear();
    }
}
