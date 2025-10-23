# main.ts Refactoring Analysis

**Date:** 2025-10-23
**Status:** Phase 1 Complete ✅ | Phase 2 Complete ✅ | Phase 3 Next 📋
**File:** `viewer/src/main.ts`

---

## Next Steps (Priority Order)

### Phase 2: HTML Builders ✅ COMPLETE

**Target functions for extraction:**

1. **`showFileDetails` (Line 82)** - Extract HTML building logic
   - Current: ~290 lines, massive function with DOM manipulation
   - Extract to: `lib/html-builders/file-details.ts`

```typescript
// Pure: Build HTML string
export function buildFileDetailsHTML(
  file: FileNode,
  githubUrl: string | null,
  clusterInfo: ClusterInfo | null,
  couplingEdges: CouplingEdge[]
): string

// Keep showFileDetails as thin orchestrator
```

2. **`showDirectoryDetails` (Line 398)** - Extract HTML building logic
   - Current: ~120 lines
   - Extract to: `lib/html-builders/directory-details.ts`

```typescript
export function buildDirectoryDetailsHTML(
  dir: DirectoryNode,
  stats: DirectoryStats,
  githubUrl: string | null
): string
```

3. **`populateLegend` (Line 812)** - Extract calculation and HTML building
   - Current: ~75 lines
   - Extract to: `lib/html-builders/legend.ts`

```typescript
// Pure: Generate HTML for legend items
export function buildLegendHTML(items: LegendItem[]): string
```

**Testing approach:**
- Use snapshot tests for HTML generation
- Test with/without optional data (GitHub links, coupling data)
- Verify HTML structure doesn't break

---

### Phase 3: Business Logic (3-5 days)

**Target: Extract decision logic from mega-functions**

1. **`loadRepository` (Line 1874)** - Extract decision logic
   - Keep as orchestrator, but extract:

```typescript
// Pure: Determine which file to load
export function determineFileToLoad(
  repoName: string,
  mode: 'head' | 'timeline',
  timelineAvailable: boolean
): { fileName: string; fallbackToHead: boolean }

// Pure: Detect data format
export function detectDataFormat(data: any): 'timeline-v2' | 'timeline-v1' | 'static'

// Pure: Extract snapshot from various formats
export function extractSnapshot(data: any, format: DataFormat): RepositorySnapshot
```

2. **Highlight toggle logic** - Extract from `showFileDetails`

```typescript
// Pure: Determine highlight action
export function shouldToggleHighlight(
  currentHash: string | null,
  fileHash: string | null,
  enabled: boolean
): 'toggle-on' | 'toggle-off' | 'none'
```

---

### Phase 4: DOM Abstraction (2-3 days)

1. Create typed DOM helper functions
2. Refactor DOM readers to accept elements as params
3. Mock DOM in tests via dependency injection

**Example refactor:**

```typescript
// Before (impure - reads DOM directly)
function getSelectedMode(): 'head' | 'timeline'

// After (pure - accepts DOM elements)
export function getSelectedModeFromRadio(
  headRadio: HTMLInputElement | null,
  timelineRadio: HTMLInputElement | null
): 'head' | 'timeline'
```

---

## Remaining Refactoring Candidates

### Medium-Priority Functions (Phase 2-3)

#### ⚠️ `getGitHubFileUrl` (Line 947)
```typescript
function getGitHubFileUrl(repoBaseName: string, filePath: string): string | null
```
- **Action:** Extract to `lib/github-utils.ts`
- **Refactor:** Pass config as parameter for full purity
- **Test cases:** Known repo, unknown repo, various file paths

#### ⚠️ `getGitHubDirUrl`
```typescript
function getGitHubDirUrl(repoBaseName: string, dirPath: string): string | null
```
- **Action:** Extract to `lib/github-utils.ts`
- Same recommendations as `getGitHubFileUrl`

---

## Testing Strategy

### Unit Tests (Pure Functions) ✅ DONE for Phase 1
- See `viewer/src/lib/*.test.ts`
- 49 tests passing
- 100% coverage on extracted functions

### Snapshot Tests (HTML Builders) - Phase 2
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

### Integration Tests (Orchestrator Functions) - Phase 3
```typescript
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

### ✅ Achieved (Phase 1)
- 8 pure functions with 100% test coverage
- Reduced main.ts by ~166 lines
- Reusable utilities for future features
- Testing infrastructure established

### ✅ Achieved (Phase 2)
- 3 HTML builder modules with 31 snapshot tests (100% coverage)
- Reduced main.ts by ~284 lines of HTML generation logic
- Snapshot tests catch UI regressions
- HTML structure now easily modifiable and testable

### Upcoming (Phase 3-4)
- Business logic extraction (format detection, file loading, highlight logic)
- DOM abstraction for full testability

### Long-term (Phase 4)
- 70-80% test coverage overall
- Main.ts becomes thin orchestrator (~1000 lines)
- All business logic unit tested
- Refactoring becomes low-risk

---

## Risk Assessment

| Phase | Risk Level | Mitigation | Status |
|-------|-----------|------------|--------|
| Phase 1 | 🟢 Low | Pure functions, no breaking changes | ✅ COMPLETE |
| Phase 2 | 🟡 Medium | Use snapshot tests, manual QA | ✅ COMPLETE |
| Phase 3 | 🟡 Medium | Feature flags, incremental rollout | 📋 NEXT |
| Phase 4 | 🔴 High | Lots of event handlers, need E2E tests | 📋 PLANNED |

---

## Completed Work

### Phase 1: Pure Function Extraction ✅ (Completed 2025-10-23)

**Extracted Modules:**
```
viewer/src/lib/
├── tree-stats.ts (4 functions, 20 tests)
│   ├── calculateDirectoryStats
│   ├── calculateMaxDepth
│   ├── countDirectories
│   └── collectModificationDates
│
├── tree-indexers.ts (2 functions, 12 tests)
│   ├── buildCommitIndex
│   └── buildPathIndex
│
├── tree-utils.ts (1 function, 9 tests)
│   └── findFileInTree
│
└── repo-utils.ts (1 function, 8 tests)
    └── getBaseRepoName
```

**Achievements:**
- Total: 49 tests passing
- Coverage: 100% on all extracted functions
- Framework: Vitest with vitest.config.ts
- All extracted functions verified as EXACT copies
- TypeScript compilation: ✅ No errors
- Manual smoke test: ✅ Passed
- Git diff: ✅ Only structural changes

**Metrics:**
- Lines removed from main.ts: ~166
- Original file size: 3,024 lines
- Current file size: ~2,858 lines

**Commits:**
- `d5bd88a` - Phase 1 refactoring (extracted functions + tests)
- `9a3e842` - Added refactoring guidelines to CLAUDE.md
- `4c39fbb` - Cleanup
- `d6f654a` - Emphasized critical nature of guidelines

### Completed Extractions from Original List

#### ✅ `calculateDirectoryStats` (Line 373) - EXTRACTED
- **Status:** Moved to `lib/tree-stats.ts`
- **Tests:** 5 test cases covering all scenarios

#### ✅ `calculateMaxDepth` (Line 551) - EXTRACTED
- **Status:** Moved to `lib/tree-stats.ts`
- **Tests:** 5 test cases including edge cases

#### ✅ `countDirectories` (Line 564) - EXTRACTED
- **Status:** Moved to `lib/tree-stats.ts`
- **Tests:** 5 test cases

#### ✅ `collectModificationDates` (Line ~1182) - EXTRACTED
- **Status:** Moved to `lib/tree-stats.ts`
- **Tests:** 5 test cases

#### ✅ `buildCommitIndex` (Line ~987) - EXTRACTED
- **Status:** Moved to `lib/tree-indexers.ts`
- **Tests:** 6 test cases

#### ✅ `buildPathIndex` (Line ~1015) - EXTRACTED
- **Status:** Moved to `lib/tree-indexers.ts`
- **Tests:** 6 test cases

#### ✅ `findFileInTree` (Line ~720) - EXTRACTED
- **Status:** Moved to `lib/tree-utils.ts`
- **Tests:** 9 test cases

#### ✅ `getBaseRepoName` (Line 933) - EXTRACTED
- **Status:** Moved to `lib/repo-utils.ts`
- **Tests:** 8 test cases including edge cases

---

### Phase 2: HTML Builders ✅ (Completed 2025-10-23)

**Extracted Modules:**
```
viewer/src/lib/html-builders/
├── file-details.ts (1 function, 12 snapshot tests)
│   └── buildFileDetailsHTML
│
├── directory-details.ts (1 function, 9 snapshot tests)
│   └── buildDirectoryDetailsHTML
│
└── legend.ts (3 functions, 10 snapshot tests)
    ├── buildDirectoryLegendItemHTML
    ├── buildFileTypeLegendItemHTML
    └── buildOtherLegendItemHTML
```

**Achievements:**
- Total: 31 snapshot tests passing
- Coverage: 100% on all HTML builder functions
- All extracted functions verified as EXACT copies
- TypeScript compilation: ✅ No errors
- Manual smoke test: ✅ Passed (file details, directory details, legend)
- Git diff: ✅ Only structural changes
- Zero behavioral changes confirmed

**Metrics:**
- Lines removed from main.ts: ~284 (HTML generation logic)
- Original file size (post Phase 1): ~2,858 lines
- Current file size: ~2,574 lines
- Total reduction from original: ~450 lines (15%)

**Commits:**
- `fe631a4` - Phase 2.1: Extract file details HTML builder
- `620eac7` - Phase 2.2: Extract directory details HTML builder
- `477f6a5` - Phase 2.3: Extract legend HTML builders

**Refactored Functions:**
- `showFileDetails` (Line ~86): Now uses `buildFileDetailsHTML`
- `showDirectoryDetails` (Line ~223): Now uses `buildDirectoryDetailsHTML`
- `populateLegend` (Line ~567): Now uses legend builder functions

#### ❌ `countVisibleStats` (Line 577) - SKIPPED
- **Reason:** NOT pure - depends on global state (`currentVisualizer`, `currentSnapshot`)
- **Action:** Leave in main.ts for now, revisit in Phase 3 or 4

---

## File Statistics (Original Analysis)

- **Total Lines:** 3,024
- **Total Functions:** 57
- **Module-level State Variables:** ~20+
- **Primary Role:** Application orchestrator, DOM manipulation, event handling

---

## Notes

- Analysis generated 2025-10-23 based on main.ts at commit `de48e0c`
- Phase 1 completed 2025-10-23 at commit `d5bd88a`
- Refactoring safety guidelines moved to `.claude/claude.md`
- Key principle: **Extract before abstract** - pull out pure logic first, then consider abstractions
- Goal is not to eliminate all impurity, but to **isolate** it and make core logic testable
