# Full Delta Timeline: Gource-Style Animation Plan

**Status:** Proposed
**Date:** 2025-10-20
**Author:** Claude (based on user proposal)

## Executive Summary

Replace the current sampled timeline approach with a **full commit history using delta-based reconstruction**, similar to Gource. Instead of storing 200 sampled commits, store ALL 21K+ commits as lightweight deltas, then build the tree incrementally from the first commit forward.

**Key Insight:** This solves the fundamental limitation of not being able to visualize deleted files or historical tree structure, while keeping file sizes reasonable (~150 MB for React, ~40 MB gzipped).

---

## The Core Proposal

### Current Approach (Sampled Timeline)
```
HEAD tree (full snapshot) + 200 CommitSnapshots (deltas only)
↓
Highlight changes on static HEAD tree
❌ Cannot show deleted files
❌ Cannot reconstruct historical structure
```

### Proposed Approach (Full Delta Timeline)
```
Empty tree + ALL 21,078 CommitSnapshots (deltas only)
↓
Apply deltas sequentially to build tree over time
✅ True historical reconstruction
✅ Deleted files appear and disappear naturally
✅ Gource-style commit-by-commit animation
```

### Gource's Format (for reference)
```
timestamp|author|type|filepath
1234567890|John Doe|A|src/main.js      # Add
1234567891|Jane Smith|M|src/main.js     # Modify
1234567892|John Doe|D|src/old.js        # Delete
```

### Our Format (already perfect for this!)
```json
{
  "commits": [
    {
      "hash": "abc123...",
      "date": "2013-05-28T17:04:45Z",
      "author": "Jordan Walke",
      "message": "Initial commit",
      "changes": {
        "filesAdded": ["src/React.js", "package.json"],
        "filesModified": [],
        "filesDeleted": []
      }
    },
    // ... all 21,078 commits
  ]
}
```

---

## Data Analysis: React Repository

### Current State
- **Total commits:** 21,078
- **Current sample:** 200 commits (8.2 MB)
- **Average files per commit:** 132
- **Largest commit:** 3,664 files changed
- **Commits with >1000 files:** 4

### File Size Estimates

| Approach | Commits | File Size | Gzipped | Load Time |
|----------|---------|-----------|---------|-----------|
| **Current (sampled)** | 200 | 8.2 MB | ~2 MB | 500ms |
| **Proposed (full)** | 21,078 | ~150 MB | ~40 MB | 2-4s |
| **cBioPortal (full)** | 22,854 | ~400 MB | ~100 MB | 5-8s |

**Calculation:**
```python
commits = 21,078
avg_files_per_commit = 132
avg_path_length = 50 chars

overhead_per_commit = 200 bytes  # hash, date, author, message, metadata
overhead_per_path = 55 bytes     # "path/to/file.js" + JSON overhead

total_bytes = (commits × 200) + (commits × 132 × 55)
            ≈ 150 MB uncompressed
            ≈ 40 MB gzipped (70% compression typical for JSON)
```

**Verdict:** ✅ Manageable with compression + lazy loading

---

## Technical Architecture

### 1. File Format: Timeline V2

```typescript
interface TimelineDataV2 {
  format: 'timeline-v2';
  repositoryPath: string;

  // Remove headSnapshot - build from deltas instead
  metadata: {
    totalCommits: number;
    dateRange: { first: string; last: string };
    tags: string[];  // All version tags
  };

  // ALL commits, not just sampled
  commits: CommitSnapshot[];

  // Keyframes for fast seeking
  keyframes: {
    interval: number;  // e.g., every 100 commits
    snapshots: Array<{
      commitIndex: number;
      tree: DirectoryNode;  // Full tree at this point
    }>;
  };
}
```

### 2. Delta Application Engine

```typescript
class TreeBuilder {
  private tree: DirectoryNode;

  constructor() {
    this.tree = createEmptyTree();
  }

  // Apply a single commit's changes
  applyDelta(commit: CommitSnapshot): DirectoryNode {
    // Add files
    for (const path of commit.changes.filesAdded) {
      this.addFile(path, {
        author: commit.author,
        date: commit.date,
        loc: 100  // Placeholder until we reach HEAD
      });
    }

    // Modify files
    for (const path of commit.changes.filesModified) {
      this.modifyFile(path, {
        lastAuthor: commit.author,
        lastModified: commit.date,
        commitCount: (file.commitCount || 0) + 1
      });
    }

    // Delete files
    for (const path of commit.changes.filesDeleted) {
      this.deleteFile(path);
      this.pruneEmptyDirectories(path);
    }

    return this.tree;
  }

  // Internal tree manipulation
  private addFile(path: string, metadata: FileMetadata) {
    const parts = path.split('/');
    let node = this.tree;

    // Create intermediate directories
    for (const dir of parts.slice(0, -1)) {
      if (!node.children.find(c => c.name === dir)) {
        node.children.push(createDirectory(dir));
      }
      node = node.children.find(c => c.name === dir);
    }

    // Add file
    node.children.push(createFile(parts.at(-1), metadata));
  }

  private deleteFile(path: string) {
    const parts = path.split('/');
    const parent = this.findNode(parts.slice(0, -1));
    parent.children = parent.children.filter(c => c.name !== parts.at(-1));
  }

  private pruneEmptyDirectories(path: string) {
    // Walk up tree, remove empty dirs
    const parts = path.split('/');
    for (let i = parts.length - 2; i >= 0; i--) {
      const dir = this.findNode(parts.slice(0, i + 1));
      if (dir.children.length === 0) {
        const parent = this.findNode(parts.slice(0, i));
        parent.children = parent.children.filter(c => c.name !== dir.name);
      } else {
        break;  // Stop at first non-empty parent
      }
    }
  }
}
```

### 3. Keyframe Strategy

**Problem:** Can't store 21K tree states in memory (40+ GB)
**Solution:** Sparse keyframes for fast seeking

```typescript
interface KeyframeStrategy {
  // Always keyframe these
  critical: [
    0,                    // First commit
    ...tagCommitIndices,  // All version tags (v1.0.0, etc.)
    commits.length - 1    // HEAD
  ];

  // Regular intervals
  interval: 100;  // Every 100th commit

  // Adaptive (future)
  adaptive: {
    // More keyframes during high-activity periods
    // Fewer during quiet periods
  };
}

// Example for React:
// - 1 first + 1 HEAD = 2
// - 69 version tags = 69
// - ~210 interval (21078 / 100) = 210
// = ~282 keyframes total
//
// Storage: 282 × ~500 KB = ~140 MB (separate from deltas)
// Could be generated on-demand or pre-computed
```

**Seeking Algorithm:**
```typescript
function seekToCommit(targetIndex: number): DirectoryNode {
  // Find nearest keyframe before target
  const keyframe = findNearestKeyframe(targetIndex);

  // Load keyframe tree
  let tree = loadKeyframe(keyframe.commitIndex);

  // Apply deltas from keyframe to target
  for (let i = keyframe.commitIndex + 1; i <= targetIndex; i++) {
    tree = applyDelta(tree, commits[i]);
  }

  return tree;
}

// Performance:
// - Worst case: 100 deltas to apply (if keyframe every 100)
// - Typical: 50 deltas
// - Best case: 0 deltas (landed on keyframe)
// - Time: ~100-500ms for 100 deltas
```

### 4. Memory Management

**Three Strategies:**

#### Option A: Stateful Replay (Simplest)
```typescript
// Gource approach: maintain single current state
let currentTree = createEmptyTree();
let currentCommitIndex = 0;

function playNext() {
  currentTree = applyDelta(currentTree, commits[currentCommitIndex]);
  render(currentTree);
  currentCommitIndex++;
}

function playPrevious() {
  // ❌ Must replay from start or nearest keyframe
  const keyframe = findNearestKeyframe(currentCommitIndex - 1);
  currentTree = loadKeyframe(keyframe);
  for (let i = keyframe.index; i < currentCommitIndex - 1; i++) {
    currentTree = applyDelta(currentTree, commits[i]);
  }
  currentCommitIndex--;
}
```

**Pros:**
- ✅ Minimal memory (~5 MB for single tree)
- ✅ Simple implementation
- ✅ Fast forward playback

**Cons:**
- ❌ Backward seeking requires replay
- ❌ Random access is slow

---

#### Option B: Keyframes + Rebuild (Recommended)
```typescript
// Pre-compute keyframes, rebuild on demand
const keyframes = new Map<number, DirectoryNode>();

// Generate keyframes on load
async function generateKeyframes() {
  let tree = createEmptyTree();
  for (let i = 0; i < commits.length; i++) {
    tree = applyDelta(tree, commits[i]);

    if (i % 100 === 0 || commits[i].tags.length > 0) {
      keyframes.set(i, cloneTree(tree));
    }
  }
}

// Fast seeking in any direction
function seekToCommit(target: number) {
  const keyframe = findNearestKeyframe(target);
  let tree = keyframes.get(keyframe);

  for (let i = keyframe + 1; i <= target; i++) {
    tree = applyDelta(tree, commits[i]);
  }

  return tree;
}
```

**Pros:**
- ✅ Fast seeking (~100-500ms)
- ✅ Bidirectional navigation
- ✅ Scrubbing support

**Cons:**
- ❌ More memory (~50-150 MB for keyframes)
- ❌ Initial keyframe generation (2-5 seconds)

**Memory Breakdown:**
- 282 keyframes × ~500 KB each = ~140 MB
- Can limit to 50-100 keyframes = ~25-50 MB
- Or generate on-demand and cache (LRU)

---

#### Option C: Smart LRU Cache (Advanced)
```typescript
// Cache recently computed states
const treeCache = new LRUCache<number, DirectoryNode>({
  maxSize: 50,      // Last 50 visited commits
  maxMemory: 25_000_000  // 25 MB
});

function seekToCommit(target: number) {
  // Check cache first
  if (treeCache.has(target)) {
    return treeCache.get(target);
  }

  // Rebuild from nearest cached or keyframe
  const nearest = findNearestCachedOrKeyframe(target);
  let tree = nearest.tree;

  for (let i = nearest.index + 1; i <= target; i++) {
    tree = applyDelta(tree, commits[i]);
  }

  treeCache.set(target, tree);
  return tree;
}
```

**Pros:**
- ✅ Adaptive to usage patterns
- ✅ Good for scrubbing within a range
- ✅ Bounded memory

**Cons:**
- ❌ Cache misses still require rebuild
- ❌ More complex to implement

---

**Recommendation:** Start with **Option B** (Keyframes), add **Option C** (LRU) later if needed.

---

## Visualization & Animation

### File Lifecycle States

```typescript
enum FileState {
  APPEARING,   // Just added - grow in, fade in
  ACTIVE,      // Normal state
  MODIFIED,    // Pulse effect on change
  DISAPPEARING // Being deleted - shrink, fade out
}
```

### Animation Timeline

```
Commit 1 (Initial):
  +src/React.js      [Grow from point, green glow]
  +package.json      [Grow from point, green glow]

Commit 2 (+245ms):
  +test/basic.js     [New file appears]
  ~src/React.js      [Pulse yellow, back to normal]

Commit 3 (+180ms):
  +utils/math.js     [New file in new directory]
  -old/legacy.js     [Shrink, fade out, remove]
  ~test/basic.js     [Pulse]
```

### Camera Behavior

```typescript
interface CameraStrategy {
  // Follow the action
  focusOnChanges: boolean;  // Pan to modified areas

  // Auto-zoom
  zoomToFit: boolean;       // Keep all files in view

  // Smooth transitions
  easingDuration: 500;      // ms for camera movements

  // User override
  allowManualControl: boolean;
}
```

### Performance Optimizations

#### Three.js Rendering
```typescript
class OptimizedTreeRenderer {
  private objectPool: FileObject[] = [];

  // Reuse removed file objects
  addFile(path: string) {
    const obj = this.objectPool.pop() || createNewFileObject();
    obj.reset(path);
    obj.playAddAnimation();
    this.scene.add(obj);
  }

  removeFile(path: string) {
    const obj = this.findObject(path);
    obj.playRemoveAnimation(() => {
      this.scene.remove(obj);
      this.objectPool.push(obj);  // Recycle
    });
  }

  // Batch updates
  applyCommit(commit: CommitSnapshot) {
    this.scene.freeze();  // Pause rendering

    commit.changes.filesAdded.forEach(p => this.addFile(p));
    commit.changes.filesModified.forEach(p => this.modifyFile(p));
    commit.changes.filesDeleted.forEach(p => this.removeFile(p));

    this.scene.unfreeze();  // Single render update
  }
}
```

#### Level of Detail (LOD)
```typescript
// Simplify distant objects
class FileLOD {
  update(cameraDistance: number) {
    if (cameraDistance > 1000) {
      this.geometry = SIMPLE_BOX;  // Just a box
    } else if (cameraDistance > 500) {
      this.geometry = MEDIUM_DETAIL;  // Basic shape
    } else {
      this.geometry = FULL_DETAIL;  // All details
    }
  }
}
```

### Playback Controls

```typescript
interface PlaybackControls {
  speed: 1 | 10 | 50 | 100 | 500 | 1000;  // Commits per second

  // Transport controls
  play(): void;
  pause(): void;
  stepForward(): void;    // Next commit
  stepBackward(): void;   // Previous commit

  // Seeking
  seekToCommit(index: number): void;
  seekToDate(date: Date): void;
  seekToTag(tag: string): void;  // "v1.0.0"

  // Range playback
  playRange(start: number, end: number): void;
}
```

**Speed Examples:**
- 1x: 1 commit/sec = 35 minutes for full React history
- 10x: 10 commits/sec = 3.5 minutes
- 100x: 100 commits/sec = 3.5 minutes
- 1000x: 1000 commits/sec = 21 seconds (fast overview)

---

## Implementation Challenges & Solutions

### Challenge 1: Missing Per-File Metrics

**Problem:** Current `CommitSnapshot` only has total lines changed, not per-file:
```json
{
  "changes": {
    "filesAdded": ["a.js", "b.js"],
    "totalFilesChanged": 2,
    "linesAdded": 100,      // ❌ Total, not per-file
    "linesDeleted": 50      // ❌ Total, not per-file
  }
}
```

**Impact:**
- Can't accurately set `file.loc` at each commit
- Can't show file growth over time
- Can't animate proportional to change size

**Solutions:**

#### Option A: Use HEAD Metrics (Pragmatic)
```typescript
// All files start with average size
const DEFAULT_LOC = 100;

function addFile(path: string) {
  return {
    path,
    loc: DEFAULT_LOC,  // Use placeholder
    // ... other fields
  };
}

// At final commit (HEAD), update with real values
function finalize() {
  for (const file of allFiles) {
    file.loc = headSnapshot.files[file.path]?.loc || DEFAULT_LOC;
  }
}
```

**Pros:**
- ✅ No format changes needed
- ✅ Structure is accurate (that's what matters visually)
- ✅ Simple implementation

**Cons:**
- ❌ File sizes not historically accurate
- ❌ Can't show "this file grew from 10 → 1000 LOC"

---

#### Option B: Enhanced CommitSnapshot (Ideal)
```typescript
interface EnhancedCommitSnapshot {
  // ... existing fields
  changes: {
    files: Array<{
      path: string;
      type: 'added' | 'modified' | 'deleted';
      linesAdded: number;      // ✅ Per-file
      linesDeleted: number;    // ✅ Per-file
      locAfter: number;        // ✅ Total LOC after this commit
    }>;
  };
}
```

**Git Command:**
```bash
# Get per-file stats
git log --numstat --format='%H|%ad|%an|%s'

# Output:
abc123|2013-05-28|Jordan Walke|Initial commit
10  5   src/React.js
3   0   package.json
```

**Pros:**
- ✅ Historically accurate file sizes
- ✅ Can show file growth animations
- ✅ Better churn visualization

**Cons:**
- ❌ ~2x file size increase
- ❌ More complex parser
- ❌ Slower generation

**File Size Impact:**
```python
# Current: path only (~50 bytes per file)
150 MB for 21K commits

# Enhanced: path + 3 numbers (~70 bytes per file)
210 MB for 21K commits (40% increase)
~60 MB gzipped
```

**Recommendation:** Start with **Option A**, add **Option B** as "Timeline V3" later if needed.

---

### Challenge 2: File Renames

**Problem:** Git reports renames ambiguously:
```
{src/old.js => src/new.js}  # Rename detected
src/old.js                   # Or: separate delete + add
src/new.js
```

**Solution: Rename Detection**
```typescript
function parseGitPath(path: string): FileChange {
  // Check for rename pattern
  const renameMatch = path.match(/\{(.+) => (.+)\}/);

  if (renameMatch) {
    return {
      type: 'renamed',
      oldPath: renameMatch[1],
      newPath: renameMatch[2]
    };
  }

  return { type: 'modified', path };
}

function applyRename(tree: Tree, oldPath: string, newPath: string) {
  const file = this.findFile(oldPath);
  this.deleteFile(oldPath);
  this.addFile(newPath, file.metadata);

  // Animation: slide file to new location
  animateMove(oldPath, newPath, duration: 500);
}
```

---

### Challenge 3: Directory Moves

**Problem:** Moving `src/utils/` → `lib/utils/` shows as many deletions + additions

**Detection Heuristic:**
```typescript
function detectDirectoryMove(commit: CommitSnapshot): DirectoryMove[] {
  const moves: DirectoryMove[] = [];

  // Group by directory prefix
  const deleted = groupByDirectory(commit.changes.filesDeleted);
  const added = groupByDirectory(commit.changes.filesAdded);

  // Find matching sets
  for (const [delDir, delFiles] of deleted) {
    for (const [addDir, addFiles] of added) {
      if (filesMatch(delFiles, addFiles)) {
        moves.push({ from: delDir, to: addDir, files: delFiles });
      }
    }
  }

  return moves;
}

function filesMatch(set1: string[], set2: string[]): boolean {
  const names1 = set1.map(p => p.split('/').at(-1)).sort();
  const names2 = set2.map(p => p.split('/').at(-1)).sort();

  // Same filenames = likely a move
  return JSON.stringify(names1) === JSON.stringify(names2);
}
```

**Animation:**
- Entire subtree slides from old location to new
- More visually intuitive than delete + recreate

---

### Challenge 4: Merge Commits

**Problem:** Merge commits often have 0 file changes (just a merge node)

**Handling:**
```typescript
function shouldDisplay(commit: CommitSnapshot): boolean {
  // Skip empty merges
  if (commit.isMergeCommit && commit.changes.totalFilesChanged === 0) {
    return false;
  }

  // Show milestone merges
  if (commit.tags.length > 0) {
    return true;  // Always show tagged commits
  }

  return commit.changes.totalFilesChanged > 0;
}
```

**Alternative:** Show merge commits as timeline markers (not animations)

---

## Performance Analysis

### Generation Time (Processor)

```bash
# Current (sampled): ~2-3 minutes for React
git log --all --numstat  # Read all commits
score and select 200     # Adaptive sampling
git show each commit     # Get file lists

# Proposed (full): ~5-10 minutes for React
git log --all --numstat  # Read all commits ✅ Same
(no scoring/selection)   # Skip this step ⚡ Faster
git show each commit     # ❌ 100x more commits
```

**Optimization:**
```bash
# Single pass - get everything in one git command
git log --all --numstat --format='%H|%ad|%an|%s|%D' > full.log
# Then parse in-memory (much faster than 21K git show calls)
```

**Expected Time:**
- Small repo (Gource, 1K commits): 30 seconds
- Medium repo (React, 21K commits): 5-10 minutes
- Large repo (cBioPortal, 23K commits): 10-15 minutes

---

### Loading Time (Viewer)

```typescript
// Cold start timeline
async function loadFullTimeline(url: string) {
  // 1. Fetch compressed file
  const response = await fetch(url);  // ~40 MB gzipped
  // Time: ~2-5 seconds on fast connection

  // 2. Decompress (browser automatic)
  const json = await response.json();
  // Time: ~500-1000ms

  // 3. Generate keyframes
  const keyframes = generateKeyframes(json.commits);
  // Time: ~1-3 seconds (apply 21K deltas)

  // 4. Render first frame
  renderCommit(0);
  // Time: ~500ms

  // Total: 4-10 seconds
}
```

**Progressive Loading:**
```typescript
// Show something immediately
async function loadProgressive(url: string) {
  // 1. Load first 1000 commits (chunked file)
  const chunk1 = await fetch(`${url}?range=0-1000`);
  renderCommit(0);  // ⚡ Show in 1-2 seconds

  // 2. Load rest in background
  const rest = await fetch(`${url}?range=1000-end`);
  mergeChunks(chunk1, rest);

  // User can start watching immediately!
}
```

---

### Runtime Performance

**Playback at Different Speeds:**

| Speed | Commits/Sec | Deltas/Sec | Frame Budget | Feasible? |
|-------|-------------|------------|--------------|-----------|
| 1x | 1 | 132 files | 1000ms | ✅ Easy |
| 10x | 10 | 1320 files | 100ms | ✅ Good |
| 100x | 100 | 13,200 files | 10ms | ⚠️ Challenging |
| 1000x | 1000 | 132,000 files | 1ms | ❌ Too fast |

**Optimization for High Speeds:**
```typescript
// Skip rendering intermediate frames at very high speeds
function playAtSpeed(speed: number) {
  if (speed >= 100) {
    // Render every Nth commit only
    const skipFactor = Math.floor(speed / 10);

    for (let i = 0; i < commits.length; i += skipFactor) {
      applyDeltaBatch(commits.slice(i, i + skipFactor));
      render();
      await sleep(100);  // 10 FPS
    }
  } else {
    // Normal frame-by-frame
    for (const commit of commits) {
      applyDelta(commit);
      render();
      await sleep(1000 / speed);
    }
  }
}
```

---

### Memory Profile

```
Timeline V2 in Browser:

Loaded Data:
  - Commit array (JSON):       ~150 MB
  - Parsed structures:         ~50 MB

Generated Keyframes:
  - 282 tree snapshots:        ~140 MB
  OR
  - 50 keyframes (sparse):     ~25 MB

Current Rendering State:
  - Active tree (one):         ~5 MB
  - Three.js scene:            ~20 MB
  - Textures/materials:        ~10 MB

LRU Cache (optional):
  - Last 50 trees:             ~25 MB

TOTAL: 260-400 MB (manageable for modern browsers)
```

**For Comparison:**
- YouTube: 200-500 MB for video player
- Google Maps: 300-600 MB for heavy usage
- VS Code (web): 400-800 MB

**Verdict:** ✅ Acceptable memory usage for web app

---

## Comparison Matrix

| Feature | Current (Sampled) | Proposed (Full Delta) | Gource |
|---------|-------------------|------------------------|--------|
| **Commits Shown** | 200 | 21,078 (all) | All |
| **File Size** | 8 MB | 150 MB (40 MB gzipped) | N/A (streams) |
| **Historical Accuracy** | ❌ Highlights only | ✅ Full reconstruction | ✅ Full |
| **Deleted Files** | ❌ Not visible | ✅ Visible until deletion | ✅ Visible |
| **Animation Style** | Jump between samples | ✅ Smooth commit-by-commit | ✅ Smooth |
| **Seeking** | ✅ Instant | ✅ Fast (<1s) | ❌ Slow (replay) |
| **Memory Usage** | 5 MB | 50-150 MB | 20-50 MB |
| **Load Time** | 500ms | 4-10s | N/A (native app) |
| **File Metrics** | ✅ Rich (LOC, churn, etc.) | ✅ Rich | ❌ Basic |
| **3D Visualization** | ✅ Yes | ✅ Yes | ❌ 2D only |
| **Interactive** | ✅ Yes | ✅ Yes | ❌ Limited |
| **Web-Based** | ✅ Yes | ✅ Yes | ❌ No (install required) |
| **Color Modes** | ✅ 7 modes | ✅ 7 modes | ❌ Basic |
| **Tag Navigation** | ✅ Via dropdown | ✅ Jump to tag | ❌ No |
| **Speed Control** | N/A | ✅ 1x - 1000x | ✅ Basic |

---

## Development Roadmap

### Phase 1: Proof of Concept (1-2 weeks)
**Goal:** Validate delta replay approach on small repository

- [ ] Generate full-history timeline for Gource repo (988 commits)
- [ ] Implement `TreeBuilder` class with delta application
- [ ] Build simple stateful replay (Option A architecture)
- [ ] Verify tree reconstruction matches `git ls-tree` at each commit
- [ ] Implement basic file lifecycle animations (add/modify/delete)
- [ ] Test playback performance at various speeds

**Success Criteria:**
- ✅ Tree structure matches git exactly at all commits
- ✅ Can play through 988 commits smoothly
- ✅ Animation looks visually similar to Gource

---

### Phase 2: Optimization & Scaling (2-3 weeks)
**Goal:** Make it work for large repositories

- [ ] Implement keyframe generation (every 100th commit + tags)
- [ ] Add seeking/scrubbing support
- [ ] Implement LRU cache for recent trees
- [ ] Add gzip compression for transfer
- [ ] Test with React timeline (21K commits)
- [ ] Profile memory usage and optimize
- [ ] Optimize Three.js rendering (object pooling, batching)
- [ ] Add progressive loading (show first 1000, load rest in background)

**Success Criteria:**
- ✅ React timeline loads in <5 seconds
- ✅ Memory stays under 200 MB
- ✅ Seeking to arbitrary commit takes <1 second
- ✅ Playback at 100x speed is smooth (>30 FPS)

---

### Phase 3: Polish & Features (2-3 weeks)
**Goal:** Make it production-ready

- [ ] Enhanced file lifecycle animations
  - [ ] Grow/shrink with easing
  - [ ] Pulse effect on modification
  - [ ] Color flashes (green=add, yellow=modify, red=delete)
- [ ] Speed controls UI (1x, 10x, 50x, 100x, 500x, 1000x)
- [ ] Timeline scrubber with preview
- [ ] "Jump to tag" feature (dropdown of all version tags)
- [ ] Commit info overlay (show hash, author, message during playback)
- [ ] File rename/move detection and smooth animation
- [ ] Directory reorganization animations
- [ ] Camera auto-tracking (follow the action)
- [ ] Export video capability (render to WebM/MP4)

**Success Criteria:**
- ✅ Animations are smooth and professional
- ✅ UI is intuitive and responsive
- ✅ Can export high-quality video of full timeline

---

### Phase 4: Enhanced Metrics (Optional, 1-2 weeks)
**Goal:** Add per-file historical metrics

- [ ] Extend `CommitSnapshot` format with per-file stats
- [ ] Update processor to extract per-file LOC changes
- [ ] Implement file size growth animation
- [ ] Add churn heatmap over time
- [ ] Show contributor territories evolving
- [ ] Display "hottest files" changing throughout history

**Success Criteria:**
- ✅ File sizes are historically accurate
- ✅ Can see files growing/shrinking over time
- ✅ Churn patterns emerge naturally

---

## Migration Strategy

### Dual Format Support

Don't replace the current sampled format - offer both!

```typescript
// Detect format automatically
function loadTimeline(url: string) {
  const data = await fetch(url).then(r => r.json());

  if (data.format === 'timeline-v1') {
    // Current sampled approach
    return new SampledTimelineViewer(data);
  } else if (data.format === 'timeline-v2') {
    // New full delta approach
    return new FullTimelineViewer(data);
  }
}
```

### User Choice

Add dropdown to let users choose:
```
[ ] Quick View (Sampled) - 200 commits, instant load
[✓] Full History - 21,078 commits, ~5s load
```

### Repository Size Recommendations

```typescript
function recommendFormat(totalCommits: number): 'sampled' | 'full' {
  if (totalCommits < 5000) {
    return 'full';  // Small enough, go full
  } else if (totalCommits < 50000) {
    return 'full';  // Offer both, default full
  } else {
    return 'sampled';  // Very large, default sampled
  }
}
```

---

## Open Questions

### 1. Should we generate both formats by default?

**Option A:** Generate both
```bash
npm run analyze:timeline -- /path/to/repo
# Outputs:
# - repo-timeline.json (sampled, 200 commits, 8 MB)
# - repo-timeline-full.json (full, 21K commits, 150 MB)
```

**Option B:** Choose one via flag
```bash
npm run analyze:timeline -- /path/to/repo --mode=sampled  # Default
npm run analyze:timeline -- /path/to/repo --mode=full
```

**Recommendation:** Option B (choose one) to save disk space and processing time.

---

### 2. How many keyframes should we generate?

**Trade-off:**
- More keyframes = faster seeking, more memory/storage
- Fewer keyframes = slower seeking, less memory/storage

**Options:**
- **Minimal:** First + tags + HEAD (~70 for React) = ~35 MB
- **Moderate:** Every 100 commits (~210 for React) = ~100 MB
- **Dense:** Every 50 commits (~420 for React) = ~200 MB

**Recommendation:** **Moderate (every 100)** - good balance of seek time (<1s) and storage.

**Alternative:** Generate keyframes on-demand and cache locally (IndexedDB).

---

### 3. Should keyframes be embedded or separate files?

**Option A:** Embedded in main file
```json
{
  "commits": [...],
  "keyframes": [
    { "index": 0, "tree": {...} },
    { "index": 100, "tree": {...} },
    ...
  ]
}
```
- ✅ Single file to manage
- ❌ Larger initial download

**Option B:** Separate files
```
repo-timeline-full.json       (150 MB - commits only)
repo-timeline-keyframes.json  (100 MB - trees only)
```
- ✅ Can load commits first, keyframes later
- ✅ Can skip keyframes if doing forward-only playback
- ❌ More complex file management

**Recommendation:** **Option A** (embedded) for simplicity. Can split later if needed.

---

### 4. Should we implement per-file metrics now or later?

**Now (Enhanced CommitSnapshot):**
- ✅ Better visualization immediately
- ❌ ~2x file size
- ❌ More complex parser

**Later (Separate enhancement):**
- ✅ Ship faster
- ✅ Validate delta approach first
- ❌ Will need format migration

**Recommendation:** **Later** - prove the delta concept first with basic metrics, enhance in V3.

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **File sizes too large** | Low | Medium | Gzip compression, lazy loading, chunking |
| **Memory leaks** | Medium | High | Careful object pooling, memory profiling, LRU caching |
| **Slow seeking** | Low | Medium | Keyframes + optimized delta application |
| **Poor animation performance** | Medium | High | Three.js optimization, LOD, frame skipping at high speeds |
| **Generation takes too long** | Medium | Medium | Single-pass git log parsing, show progress |
| **Browser compatibility** | Low | Medium | Use standard APIs, test on major browsers |
| **User confusion** | Low | Low | Clear UI, good defaults, documentation |

**Overall Risk Level:** ⚠️ **Medium** - Technical challenges but all solvable

---

## Success Metrics

### Technical Metrics
- ✅ File size: <200 MB uncompressed, <60 MB gzipped
- ✅ Load time: <10 seconds on average connection
- ✅ Memory usage: <300 MB peak
- ✅ Seeking time: <1 second to any commit
- ✅ Playback: 60 FPS at 1-10x speed, 30 FPS at 100x
- ✅ Accuracy: 100% match with `git ls-tree` at all commits

### User Experience Metrics
- ✅ Can see deleted files in their historical context
- ✅ Animation feels smooth and natural (like Gource)
- ✅ Can jump to version tags instantly
- ✅ Can export video of timeline
- ✅ Loading experience doesn't feel slow

### Business Metrics
- ✅ Unique feature differentiator vs Gource (3D, web-based, interactive)
- ✅ Positive user feedback
- ✅ Increased usage/sharing

---

## Conclusion

### Summary

This proposal to implement **full delta-based timeline reconstruction** is:
- ✅ **Technically feasible** with manageable file sizes (~150 MB, ~40 MB gzipped)
- ✅ **Architecturally sound** using sparse keyframes for seeking
- ✅ **Performant** with careful optimization
- ✅ **Valuable** - solves core limitation of not visualizing deleted files
- ✅ **Unique** - combines Gource-style animation with 3D visualization and rich metrics

### Recommended Next Steps

1. **Validate concept** - Build POC with Gource repo (Phase 1)
2. **Get user feedback** - Show working prototype, gather input
3. **Iterate** - Optimize based on real-world usage (Phase 2)
4. **Polish** - Add animations and UX improvements (Phase 3)
5. **Consider enhancement** - Add per-file metrics in V3 if validated (Phase 4)

### Go/No-Go Decision

**Recommendation: 🟢 GO**

The benefits (true historical visualization, Gource-style animation, unique 3D approach) outweigh the costs (larger files, more complex implementation). With proper optimization (compression, keyframes, lazy loading), this is achievable and will significantly enhance the value proposition of the tool.

---

## Related Documents

- [timeline-format.md](../timeline-format.md) - Current timeline format documentation
- [processor/src/types.ts](../../processor/src/types.ts) - Type definitions
- [processor/src/timeline-analyzer.ts](../../processor/src/timeline-analyzer.ts) - Current implementation
- [viewer/src/TreeVisualizer.ts](../../viewer/src/TreeVisualizer.ts) - Visualization engine

---

**Last Updated:** 2025-10-20
**Next Review:** After Phase 1 POC completion
