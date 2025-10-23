# main.ts Refactoring Analysis

**Date:** 2025-10-23
**File:** `viewer/src/main.ts`
**Purpose:** Identify opportunities to extract pure, testable functions from the main application orchestrator

---

## File Statistics

- **Total Lines:** 3,024
- **Total Functions:** 57
- **Module-level State Variables:** ~20+
- **Primary Role:** Application orchestrator, DOM manipulation, event handling

---

## High-Priority Refactoring Candidates

### 1. Pure Calculation Functions (Easy wins - already side-effect free or close)

#### ✅ `calculateDirectoryStats` (Line 373)

```typescript
function calculateDirectoryStats(dir: DirectoryNode): { totalLoc: number; filesByExt: Record<string, number> }
```

- **Current:** Pure function - takes input, returns output, no side effects
- **Testability:** ✅ Already testable
- **Recommendation:** Extract to separate module `tree-stats.ts`
- **Test cases:** Empty directory, single file, nested structure, mixed extensions

#### ✅ `calculateMaxDepth` (Used in tree traversal)

```typescript
function calculateMaxDepth(node: TreeNode, depth: number = 0): number
```

- **Current:** Pure recursive function
- **Testability:** ✅ Already testable
- **Recommendation:** Extract to `tree-stats.ts`
- **Test cases:** Flat tree, deep nesting, unbalanced tree

#### ✅ `countDirectories` (Used in stats)

```typescript
function countDirectories(node: TreeNode): number
```

- **Current:** Pure recursive function
- **Testability:** ✅ Already testable
- **Recommendation:** Extract to `tree-stats.ts`

#### ✅ `countVisibleStats` (Used in filtering)

```typescript
function countVisibleStats(tree: TreeNode): { files: number; loc: number }
```

- **Current:** Pure function
- **Testability:** ✅ Already testable
- **Recommendation:** Extract to `tree-stats.ts`

#### ⚠️ `collectModificationDates` (Line ~1996)

```typescript
function collectModificationDates(tree: DirectoryNode): string[]
```

- **Current:** Pure function but mixed with impure calling context
- **Testability:** ✅ Easy to test
- **Recommendation:** Extract to `date-utils.ts` or `tree-stats.ts`

---

### 2. Data Transformation Functions (Medium complexity - can be made pure)

#### 🔄 `buildCommitIndex` (Line ~1023)

```typescript
function buildCommitIndex(tree: DirectoryNode): Map<string, FileNode[]>
```

- **Current:** Pure function - builds index from tree
- **Side effects:** None
- **Testability:** ✅ Easy to test
- **Recommendation:** Extract to `tree-indexers.ts`
- **Test cases:**
  - Files with same commit hash
  - Files with unique commits
  - Files without commit hashes
  - Empty tree

#### 🔄 `buildPathIndex` (Line ~1050)

```typescript
function buildPathIndex(tree: DirectoryNode): Map<string, FileNode>
```

- **Current:** Pure function - builds path lookup
- **Side effects:** None
- **Testability:** ✅ Easy to test
- **Recommendation:** Extract to `tree-indexers.ts`
- **Test cases:**
  - Duplicate paths (error case)
  - Nested paths
  - Root files

#### 🔄 `findFileInTree` (Line ~734)

```typescript
function findFileInTree(tree: any, targetPath: string): any | null
```

- **Current:** Pure recursive search
- **Side effects:** None
- **Testability:** ✅ Easy to test
- **Recommendation:** Extract to `tree-utils.ts`
- **Test cases:**
  - File exists at root
  - File in nested directory
  - File not found
  - Empty path

---

### 3. String/URL Formatting Functions (Low hanging fruit)

#### ✅ `getBaseRepoName` (Line 933)

```typescript
function getBaseRepoName(repoName: string): string
```

- **Current:** Pure string transformation
- **Side effects:** None
- **Testability:** ✅ Trivial to test
- **Recommendation:** Extract to `repo-utils.ts`
- **Test cases:**
  - With `-timeline-full` suffix
  - With `-timeline` suffix
  - Without suffix
  - Edge cases (empty, null-ish)

#### ⚠️ `getGitHubFileUrl` (Line 947)

```typescript
function getGitHubFileUrl(repoBaseName: string, filePath: string): string | null
```

- **Current:** Depends on `REPO_GITHUB_URLS` constant (acceptable)
- **Side effects:** None
- **Testability:** ✅ Easy to test (inject config)
- **Recommendation:** Extract to `github-utils.ts`
- **Refactor:** Pass config as parameter for full purity
- **Test cases:**
  - Known repo
  - Unknown repo
  - Various file paths

#### ⚠️ `getGitHubDirUrl` (Similar to above)

```typescript
function getGitHubDirUrl(repoBaseName: string, dirPath: string): string | null
```

- Same recommendations as `getGitHubFileUrl`

---

### 4. DOM Reading Functions (Can be made pure by accepting DOM elements as params)

#### 🔄 `getSelectedMode` (Line ~1790)

```typescript
function getSelectedMode(): 'head' | 'timeline'
```

- **Current:** Reads from DOM directly
- **Side effects:** DOM reading
- **Refactor to:**

```typescript
function getSelectedModeFromRadio(
  headRadio: HTMLInputElement | null,
  timelineRadio: HTMLInputElement | null
): 'head' | 'timeline'
```

- **Testability:** ✅ Easy once refactored
- **Benefits:** Can test without jsdom

#### 🔄 Similar pattern for state readers

- Extract all "get current state" functions to accept elements as parameters
- Create wrapper functions that do DOM queries and call pure versions

---

### 5. Complex Business Logic (High value refactoring targets)

#### ❌ `showFileDetails` (Line 82) - **HIGHEST PRIORITY**

- **Current state:** ~290 lines, massive function
- **Side effects:**
  - DOM queries (10+ `getElementById` calls)
  - DOM mutations (innerHTML assignments)
  - State mutations (currentHighlightedCommit)
  - Calls to visualizer methods
  - Console logging
- **Recommendation:** Split into:

```typescript
// Pure: Build HTML string
function buildFileDetailsHTML(
  file: FileNode,
  githubUrl: string | null,
  clusterInfo: ClusterInfo | null,
  couplingEdges: CouplingEdge[]
): string

// Pure: Determine highlight action
function shouldToggleHighlight(
  currentHash: string | null,
  fileHash: string | null,
  enabled: boolean
): 'toggle-on' | 'toggle-off' | 'none'

// Impure: Orchestrator (thin)
function showFileDetails(file: FileNode, handleCommitHighlighting: boolean)
```

- **Test coverage potential:** 80% with pure functions
- **Test cases:**
  - HTML generation with/without coupling data
  - HTML generation with/without GitHub link
  - Highlight toggle logic (all combinations)

#### ❌ `showDirectoryDetails` (Line 398) - **HIGH PRIORITY**

- **Current:** ~120 lines, similar issues to showFileDetails
- **Recommendation:** Same pattern - extract HTML building

```typescript
function buildDirectoryDetailsHTML(
  dir: DirectoryNode,
  stats: DirectoryStats,
  githubUrl: string | null
): string
```

#### ❌ `populateLegend` (Line 812) - **MEDIUM-HIGH PRIORITY**

- **Current:** ~75 lines, mixes calculation and DOM manipulation
- **Recommendation:**

```typescript
// Pure: Calculate what should be shown
function calculateLegendItems(
  snapshot: RepositorySnapshot
): LegendItem[]

// Pure: Generate HTML for legend items
function buildLegendHTML(items: LegendItem[]): string

// Impure: Render to DOM and attach handlers
function populateLegend(snapshot: RepositorySnapshot)
```

#### ❌ `loadRepository` (Line 1874) - **MEGA FUNCTION - CRITICAL**

- **Current:** ~250 lines, does EVERYTHING
- **Side effects:** ALL OF THEM
- **Recommendation:** This is actually fine as orchestrator, but extract:

```typescript
// Pure: Determine which file to load
function determineFileToLoad(
  repoName: string,
  mode: 'head' | 'timeline',
  timelineAvailable: boolean
): { fileName: string; fallbackToHead: boolean }

// Pure: Detect data format
function detectDataFormat(data: any): 'timeline-v2' | 'timeline-v1' | 'static'

// Pure: Extract snapshot from various formats
function extractSnapshot(data: any, format: DataFormat): RepositorySnapshot
```

- **Keep `loadRepository` as orchestrator** - that's its job
- **But make it testable** by extracting decision logic

---

## Proposed Module Structure

```
viewer/src/
├── main.ts                    # Orchestrator (thin, mostly impure)
├── lib/
│   ├── tree-stats.ts         # Pure calculation functions
│   │   ├── calculateDirectoryStats
│   │   ├── calculateMaxDepth
│   │   ├── countDirectories
│   │   ├── countVisibleStats
│   │
│   ├── tree-indexers.ts      # Pure index building
│   │   ├── buildCommitIndex
│   │   ├── buildPathIndex
│   │
│   ├── tree-utils.ts         # Pure tree operations
│   │   ├── findFileInTree
│   │   ├── collectModificationDates
│   │
│   ├── repo-utils.ts         # Pure repo name handling
│   │   ├── getBaseRepoName
│   │   ├── stripTimelineSuffix
│   │
│   ├── github-utils.ts       # URL building (injectable config)
│   │   ├── buildGitHubFileUrl
│   │   ├── buildGitHubDirUrl
│   │
│   ├── html-builders/        # Pure HTML generation
│   │   ├── file-details.ts
│   │   ├── directory-details.ts
│   │   ├── legend.ts
│   │   └── stats-panel.ts
│   │
│   ├── data-loaders.ts       # Format detection & parsing
│   │   ├── detectDataFormat
│   │   ├── extractSnapshot
│   │   ├── determineFileToLoad
│   │
│   └── dom-helpers.ts        # DOM utilities (still impure but isolated)
│       ├── getElementById (typed wrapper)
│       ├── setInnerHTML
│       └── addEventListeners
```

---

## Refactoring Priority Order

### Phase 1: Quick Wins (1-2 days)

1. Extract all pure calculation functions → `tree-stats.ts`
2. Extract tree indexers → `tree-indexers.ts`
3. Extract string utils → `repo-utils.ts`
4. **Write comprehensive tests for all of the above**

### Phase 2: HTML Builders (2-3 days)

1. Extract `buildFileDetailsHTML` from `showFileDetails`
2. Extract `buildDirectoryDetailsHTML` from `showDirectoryDetails`
3. Extract `buildLegendHTML` from `populateLegend`
4. **Write snapshot tests for HTML generation**

### Phase 3: Business Logic (3-5 days)

1. Extract data format detection logic
2. Extract file loading decision logic
3. Extract highlight toggle logic
4. **Write tests for decision trees**

### Phase 4: DOM Abstraction (2-3 days)

1. Create typed DOM helper functions
2. Refactor DOM readers to accept elements as params
3. **Mock DOM in tests via dependency injection**

---

## Testing Strategy

### Unit Tests (Pure Functions)

```typescript
// tree-stats.test.ts
describe('calculateDirectoryStats', () => {
  it('should count files by extension', () => {
    const dir = createMockDir([
      { name: 'a.ts', ext: 'ts' },
      { name: 'b.ts', ext: 'ts' },
      { name: 'c.js', ext: 'js' }
    ]);

    const result = calculateDirectoryStats(dir);

    expect(result.filesByExt).toEqual({ ts: 2, js: 1 });
  });

  it('should sum total LOC', () => {
    const dir = createMockDir([
      { name: 'a.ts', loc: 100 },
      { name: 'b.ts', loc: 50 }
    ]);

    const result = calculateDirectoryStats(dir);

    expect(result.totalLoc).toBe(150);
  });
});
```

### Snapshot Tests (HTML Builders)

```typescript
// html-builders/file-details.test.ts
describe('buildFileDetailsHTML', () => {
  it('should render file with coupling data', () => {
    const html = buildFileDetailsHTML(
      mockFile,
      mockGithubUrl,
      mockCluster,
      mockEdges
    );
    expect(html).toMatchSnapshot();
  });

  it('should render file without coupling data', () => {
    const html = buildFileDetailsHTML(mockFile, mockGithubUrl, null, []);
    expect(html).toMatchSnapshot();
  });
});
```

### Integration Tests (Orchestrator Functions)

```typescript
// Can still test orchestrators with mocked dependencies
describe('loadRepository', () => {
  it('should load timeline-full before timeline-v1', async () => {
    const mockFetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => mockTimelineV2Data
      });

    await loadRepository('gource');

    expect(mockFetch).toHaveBeenCalledWith(
      './data/gource-timeline-full.json'
    );
  });
});
```

---

## Expected Benefits

### Immediate (Phase 1)

- ✅ 15-20 pure functions with 100% test coverage
- ✅ Reduced cognitive load when reading main.ts
- ✅ Reusable utilities for future features

### Medium-term (Phase 2-3)

- ✅ 40-50% of main.ts logic testable without DOM
- ✅ Snapshot tests catch UI regressions
- ✅ Easier to modify HTML structure

### Long-term (Phase 4)

- ✅ 70-80% test coverage overall
- ✅ Main.ts becomes thin orchestrator (~1000 lines)
- ✅ All business logic unit tested
- ✅ Refactoring becomes low-risk

---

## Risk Assessment

| Phase | Risk Level | Mitigation |
|-------|-----------|------------|
| Phase 1 | 🟢 Low | Pure functions, no breaking changes |
| Phase 2 | 🟡 Medium | Use snapshot tests, manual QA |
| Phase 3 | 🟡 Medium | Feature flags, incremental rollout |
| Phase 4 | 🔴 High | Lots of event handlers, need E2E tests |

**Recommendation:** Do Phase 1-2 immediately, Phase 3-4 as time permits.

---

## Refactoring Safety Guidelines

### Core Principles

1. **ZERO Behavioral Changes to Production Code**
   - All refactoring must be purely structural
   - Extracted functions must be exact copies with zero logic changes
   - Use copy-paste, not rewrite
   - Production behavior MUST remain identical

2. **Test New Code, Not Existing Code**
   - Write tests ONLY for the newly extracted modules
   - Do NOT add tests to existing main.ts functions
   - Tests validate the extracted code works correctly
   - Existing production code continues to use original functions until proven safe

3. **Extract-and-Prove Pattern**
   ```
   Step 1: Copy function to new module (exact duplicate)
   Step 2: Write comprehensive tests for new module
   Step 3: Verify tests pass with 100% coverage
   Step 4: ONLY THEN replace usage in main.ts
   ```

### Safe Refactoring Process

#### Phase 1: Extract Pure Functions (SAFEST)

**Example: Extracting `calculateDirectoryStats`**

```typescript
// Step 1: Create viewer/src/lib/tree-stats.ts
export function calculateDirectoryStats(dir: DirectoryNode): { totalLoc: number; filesByExt: Record<string, number> } {
  // EXACT copy-paste from main.ts - DO NOT MODIFY LOGIC
  const stats = { totalLoc: 0, filesByExt: {} as Record<string, number> };

  const processNode = (node: TreeNode) => {
    if (node.type === 'file') {
      stats.totalLoc += node.loc;
      const ext = node.extension;
      stats.filesByExt[ext] = (stats.filesByExt[ext] || 0) + 1;
    } else {
      for (const child of node.children) {
        processNode(child);
      }
    }
  };

  for (const child of dir.children) {
    processNode(child);
  }

  return stats;
}

// Step 2: Create viewer/src/lib/tree-stats.test.ts
describe('calculateDirectoryStats', () => {
  it('should count files by extension', () => { /* ... */ });
  it('should sum total LOC', () => { /* ... */ });
  it('should handle empty directory', () => { /* ... */ });
  it('should handle nested directories', () => { /* ... */ });
});

// Step 3: Verify 100% test coverage, all tests green

// Step 4: Update main.ts
import { calculateDirectoryStats } from './lib/tree-stats';
// Remove old function definition
// Keep usage exactly the same
```

#### Phase 2: Replace Usage (AFTER tests pass)

**Safe Replacement Checklist:**
- ✅ New module has 100% test coverage
- ✅ All tests passing
- ✅ Function signature identical
- ✅ Import statement added
- ✅ Old function definition removed
- ✅ All call sites unchanged
- ✅ Manual smoke test in browser
- ✅ Git diff shows ONLY structural changes (imports, deletions)

### Risk Mitigation Strategies

#### 1. One Function at a Time
- Extract ONE function per commit
- Test thoroughly before moving to next
- Easy to revert if issues found

#### 2. Keep Original Until Proven
- Original function stays in main.ts during testing phase
- Only remove after new version is battle-tested
- Can run both in parallel temporarily for validation

#### 3. Type Safety as Safety Net
- TypeScript will catch signature mismatches
- Use strict mode
- No `any` types in extracted functions

#### 4. Commit Granularity
```bash
# Commit 1: Add new module with tests
git commit -m "test: add tree-stats module with calculateDirectoryStats"

# Commit 2: Replace usage in main.ts (after verification)
git commit -m "tidy: use tree-stats.calculateDirectoryStats in main.ts"
```

### What NOT to Do

❌ **DO NOT:**
- Rewrite logic while extracting ("I'll make this cleaner...")
- Add new features during refactoring
- Change variable names for "clarity"
- Optimize algorithms
- Fix bugs (do that separately)
- Change function signatures
- Add error handling that wasn't there
- Test existing main.ts functions directly

✅ **DO:**
- Copy-paste exactly
- Preserve whitespace and formatting
- Keep same variable names
- Test the extracted version thoroughly
- Document what you extracted and why
- Manual QA after each extraction
- Keep commits atomic and reversible

### Verification Checklist

Before each commit:
- [ ] Extracted function is EXACT copy (use diff to verify)
- [ ] New module has comprehensive test coverage
- [ ] All tests passing
- [ ] TypeScript compiles with no errors
- [ ] Manual smoke test shows no behavior change
- [ ] Git diff shows only structural changes
- [ ] Commit message uses `tidy:` or `test:` prefix

### Emergency Rollback

If any issues discovered after extraction:

```bash
# Immediate rollback
git revert HEAD

# Or reset to before extraction
git reset --hard <previous-commit>

# Re-test with original code
npm run dev
```

---

## Next Steps

1. **Set up testing infrastructure** (Vitest + @testing-library if needed)
2. **Start with Phase 1** - extract ONE pure calculation function
3. **Write tests, verify 100% coverage**
4. **Replace in main.ts only after tests pass**
5. **Repeat for next function**
6. **Iterate incrementally** - one function at a time, prove safety each step

---

## Notes

- This analysis was generated on 2025-10-23 based on main.ts at commit `de48e0c`
- File has grown organically to 3000+ lines - refactoring is overdue
- Key principle: **Extract before abstract** - pull out pure logic first, then consider abstractions
- Goal is not to eliminate all impurity, but to **isolate** it and make core logic testable
- **CRITICAL:** All refactoring must be behavior-preserving - structural changes only
- **Test the new, not the old** - write tests for extracted modules, not existing code
