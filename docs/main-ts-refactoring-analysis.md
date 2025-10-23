# main.ts Refactoring Analysis

**Date:** 2025-10-23
**File:** `viewer/src/main.ts`
**Purpose:** Identify opportunities to extract pure, testable functions from the main application orchestrator

---

## Current Status (Updated 2025-10-23)

**Phase 1: ✅ COMPLETE**
- Extracted 8 pure functions to 4 lib modules
- 49 tests passing (100% coverage on extracted functions)
- Testing infrastructure (Vitest) set up
- All functions verified as exact copies
- Zero behavioral changes confirmed

---

## Next Steps (Priority Order)

### Phase 2: HTML Builders (2-3 days) - NEXT UP

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

### Upcoming (Phase 2-3)
- 40-50% of main.ts logic testable without DOM
- Snapshot tests catch UI regressions
- Easier to modify HTML structure

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
| Phase 2 | 🟡 Medium | Use snapshot tests, manual QA | 📋 NEXT |
| Phase 3 | 🟡 Medium | Feature flags, incremental rollout | 📋 PLANNED |
| Phase 4 | 🔴 High | Lots of event handlers, need E2E tests | 📋 PLANNED |

---

## Refactoring Safety Guidelines

### Core Principles - CRITICAL - MUST BE FOLLOWED EXACTLY

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

#### Mandatory 4-Step Process (Follow EXACTLY)

**Step 1: Extract**
- Copy function to new module (exact duplicate, preserve everything)
- Add only import statements and export keyword
- DO NOT modify logic, variable names, or formatting

**Step 2: Test**
- Write comprehensive tests for new module
- Achieve 100% coverage on extracted functions
- Use descriptive test names

**Step 3: Verify (CRITICAL - DO NOT SKIP)**
- ✅ Run tests - all must pass
- ✅ Run TypeScript compilation - no errors
- ✅ Verify extracted functions match originals EXACTLY (compare side-by-side)

**Step 4: Replace (ONLY after Step 3 passes)**
- Add import statements to original file
- Remove old function definitions
- Keep all call sites unchanged
- Run TypeScript compilation again
- Manual smoke test in browser

### What NOT to Do

❌ **DO NOT:**
- Replace usage in main file before running tests
- Rewrite logic while extracting ("I'll make this cleaner...")
- Add new features during refactoring
- Change variable names for "clarity"
- Optimize algorithms
- Fix bugs (do that separately)
- Change function signatures
- Add error handling that wasn't there
- Test existing main.ts functions directly
- Skip verification steps

✅ **DO:**
- Copy-paste exactly
- Preserve whitespace and formatting
- Keep same variable names
- Test the extracted version thoroughly
- Document what you extracted and why
- Manual QA after each extraction
- Keep commits atomic and reversible

### Safety Checklist
Before modifying original file:
- [ ] New module tests passing (100%)
- [ ] TypeScript compiles without errors
- [ ] Extracted functions are EXACT copies (verified)
- [ ] Ready for Step 4 replacement

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

## Phase 1 Completion Details (Completed 2025-10-23)

### ✅ Extracted Modules

**Created structure:**
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

**Testing:**
- Total: 49 tests passing
- Coverage: 100% on all extracted functions
- Framework: Vitest with vitest.config.ts

**Verification:**
- All extracted functions verified as EXACT copies
- TypeScript compilation: ✅ No errors
- Manual smoke test: ✅ Passed
- Git diff: ✅ Only structural changes

**Commits:**
- `d5bd88a` - Phase 1 refactoring (extracted functions + tests)
- `9a3e842` - Added refactoring guidelines to CLAUDE.md
- `4c39fbb` - Cleanup
- `d6f654a` - Emphasized critical nature of guidelines

---

## Original Analysis (For Reference)

### File Statistics
- **Total Lines:** 3,024
- **Total Functions:** 57
- **Module-level State Variables:** ~20+
- **Primary Role:** Application orchestrator, DOM manipulation, event handling

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

#### ❌ `countVisibleStats` (Line 577) - SKIPPED
- **Reason:** NOT pure - depends on global state (`currentVisualizer`, `currentSnapshot`)
- **Action:** Leave in main.ts for now, revisit in Phase 3 or 4

---

## Notes

- Analysis generated 2025-10-23 based on main.ts at commit `de48e0c`
- Phase 1 completed 2025-10-23 at commit `d5bd88a`
- File reduced from 3,024 lines to ~2,858 lines (-166 lines)
- Key principle: **Extract before abstract** - pull out pure logic first, then consider abstractions
- Goal is not to eliminate all impurity, but to **isolate** it and make core logic testable
- **CRITICAL:** All refactoring must be behavior-preserving - structural changes only
- **Test the new, not the old** - write tests for extracted modules, not existing code
