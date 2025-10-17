# Code Evolution Visualizer - Progress Summary

## Project Overview

A web-based 3D visualization tool for exploring code repository structure, inspired by Gource but optimized for interactive exploration with metrics. Built with TypeScript, Three.js, and Node.js.

**Repository:** `/Users/paul/Documents/code-evolution-viz/`

---

## Slice Status

### 🚧 Slice 1: View My Codebase Structure with File Sizes (IN PROGRESS)

**Goal:** Visualize repository structure at HEAD with file sizes and color-coded file types.

**Status:** Core features complete, additional git metadata visualization in progress

**Implemented Features:**

#### Core Visualization
- **Processor:** TypeScript-based repository analyzer
  - Reads git repositories at HEAD using simple-git
  - Calculates lines of code per file
  - Builds hierarchical tree structure
  - Exports to JSON format
  - Tested on Gource repository: 120 files, 28,011 LOC

- **Viewer:** Three.js-based 3D visualization
  - Solar system layout: directories as planets, files as orbiting moons
  - File size mapped to sphere diameter (0.3-2.0 units based on LOC)
  - Color coded by file extension (50+ types)
  - Interactive camera controls (orbit, zoom, pan via OrbitControls)

#### Layout & Spacing
- **Radial circle layout:** Each directory's children arranged in full 360° ring
- **Tight file orbits:** radius = 6 + sqrt(childCount) × 2.5 (~21 units for 35 files)
- **Moderate vertical spacing:** 12 units between parent and children
- **Hierarchical focus mode:** Show one subtree at a time to prevent overlap

#### Navigation & Focus
- **Initial view:** Root + first level directories only
- **Click to drill down:** Focus on directory to see its children
- **Context preservation:** Always show full ancestor chain + all siblings at ancestor levels
- **Click focused directory again:** Navigate back up to parent
- **Stable camera:** No disorienting resets during navigation

#### Visual Feedback
- **Hover highlighting:**
  - Files: Highlight file + all ancestor directories
  - Directories: Highlight directory + ancestors + all descendants
  - Emissive intensity 0.6 for highlighted nodes

- **Directory labels:** Floating CSS2D labels above each directory cube
- **Edges:** Lines connecting parents to children (visible for ownership)
- **Directory aggregation:**
  - Size by total LOC (0.8-3.0 scale)
  - Color by dominant file type in subtree

#### Color Scheme
- **Comprehensive palette:** 50+ file types with semantic grouping
  - Source code: Distinct bright colors (C++ pink, Python blue, JS yellow, etc.)
  - Markup: HTML orange, CSS blue, Markdown blue
  - Shaders: GLSL teal
  - Build/config: Warm colors (Automake orange, YAML red)
  - Data: JSON dark, text gray
  - Assets: Images magenta, fonts dark gray
- **Single source of truth:** `viewer/src/colorScheme.ts`
- **Zero unknown files:** All 120 Gource files have explicit colors

#### UI Panels
- **Header:** Repository name, commit hash, date, file count, total LOC
- **Stats Panel (collapsible):**
  - Total files, total LOC, directory count, max depth
  - Top 5 languages with color-coded bar charts
  - Positioned bottom-right (non-blocking)
  - Click header to collapse/expand

- **Info Panel:** File/directory details on click
  - Files: path, LOC, extension
  - Directories: path, total LOC, file count, subdirectory count, dominant type

- **Legend (collapsible):**
  - Shows file types present in current repository
  - Sorted by frequency
  - Click header to collapse/expand

- **Tooltip:** Hover shows node name and quick stats
- **Controls hint:** Bottom-center instructions

#### Technical Architecture
- **Viewer structure:**
  - `TreeVisualizer.ts`: Core 3D rendering and interaction
  - `main.ts`: UI population and data loading
  - `colorScheme.ts`: Centralized color definitions
  - `types.ts`: Shared type definitions

- **Key algorithms:**
  - Radial tree layout with adaptive spacing
  - Fibonacci sphere distribution (implemented but not used)
  - Bounding box calculation for camera framing
  - Parent tracking for ancestry highlighting
  - Focus scope filtering for hierarchical navigation

#### Documentation
- `README.md`: Project overview and roadmap
- `viewer/docs/color-scheme.md`: Color design rationale
- `docs/gource-reference/`: Learnings from studying Gource

**Commit History:**
- `e3ddbbb`: Initial implementation
- `7a39260`: Comprehensive color scheme overhaul
- `a4b9b67`: Major UX improvements (camera framing, adaptive layout, stats, labels)
- `c23ce55`: Advanced interaction (hover highlighting, collapse/expand)
- `9de1632`: Hierarchical focus mode with solar system visualization
- `d851d18`: Fix directory sizing and add label toggle
- `bdd5bf3`: Improve directory sizing with square root scaling
- `03ccf59`: MVP Slice 1 part 1: Add lastModified date to processor
- `87603cc`: MVP Slice 1 part 2: Color mode UI and manager
- `1241f52`: Apply color mode to all tree nodes and add lastModified to UI
- `3172875`: MVP Slice 2: Add commit author coloring and visualization
- `eb05d1a`: Sort author legend by file count instead of alphabetically
- `c71b03d`: Add commit siblings highlighting feature
- `af32d02`: Adaptive "Last Modified" color mode with extended time intervals
- `027821a`: Fix label visibility bug for invisible nodes
- `ee66046`: Update README with comprehensive project documentation
- `efe81b4`: Change UI defaults: enable Highlight Commit and set labels to Hover Only
- `0eb8751`: Add commit message display in highlight commit mode

---

### Remaining Work for Slice 1

**Bug Fixes:**
- **Fix directory sizing calculation** - Currently normalizing against max file LOC instead of max directory LOC, causing large directories to appear same size

**Git Metadata Collection:**

Enhance processor to collect per-file metrics using `git log --follow --format="%ai|%an|%H" -- <filepath>`

#### High Priority Metrics

**1. Last Modified Date**
- **Collection:** Parse most recent commit timestamp from git log
- **Storage:** ISO timestamp string
- **Legend display:** Time ranges with gradient colors
  - 🟢 "Last 24 hours" (bright green #00ff88)
  - 🟡 "Last week" (yellow-green #a4dd00)
  - 🟠 "Last month" (orange #ff9500)
  - 🔴 "Last 3 months" (red-orange #ff4444)
  - ⚫ "Older than 3 months" (gray #666666)
- **Calculation:** `now - lastModifiedDate` in days, bucketed by range

**2. Last Commit Author**
- **Collection:** Parse author name from most recent commit
- **Storage:** String (author name)
- **Legend display:** Dynamic list of authors present in visible files
  - "Alice Johnson" (color: #3498db - hashed from name)
  - "Bob Smith" (color: #e74c3c)
  - "Carol White" (color: #2ecc71)
  - ... (up to 10 authors shown, then "Others")
- **Color assignment:** Hash author name → consistent HSL color (60-300° hue, 70% saturation, 60% lightness)
- **Note:** Ensures same author always gets same color across repositories

**3. Commit Frequency (Churn)**
- **Collection:** Count total commits in `git log --follow -- <filepath>`
- **Storage:** Integer count
- **Legend display:** Heatmap with quantile-based buckets
  - ❄️ "Low churn (1-5 commits)" (cool blue #3498db)
  - 🌤️ "Moderate (6-15 commits)" (yellow #f39c12)
  - 🔥 "High (16-50 commits)" (orange #e67e22)
  - 🔥🔥 "Very high (51+ commits)" (red #e74c3c)
- **Calculation:** Parse line count from `git log --follow --oneline -- <filepath> | wc -l`
- **Normalization:** Use repository-specific quantiles (25th, 50th, 75th, 95th percentile) to determine buckets
- **Interpretation:** High churn = potential refactoring target or critical hotspot

**4. Unique Contributors**
- **Collection:** Count distinct authors from `git log --follow --format="%an" -- <filepath> | sort -u | wc -l`
- **Storage:** Integer count
- **Legend display:** Discrete color scale
  - 🟦 "Solo (1 contributor)" (blue #3498db)
  - 🟩 "Pair (2 contributors)" (green #2ecc71)
  - 🟨 "Team (3-4 contributors)" (yellow #f1c40f)
  - 🟧 "Squad (5-9 contributors)" (orange #e67e22)
  - 🟥 "Many (10+ contributors)" (red #e74c3c)
- **Interpretation:** Higher count = more coordination needed, potential ownership ambiguity

**5. File Age**
- **Collection:** Parse oldest commit timestamp from `git log --follow --reverse --format="%ai" -- <filepath> | head -1`
- **Storage:** ISO timestamp string
- **Legend display:** Time ranges with gradient
  - 🌟 "New (<3 months)" (bright cyan #00d9ff)
  - 💎 "Recent (3-12 months)" (blue #3498db)
  - 📘 "Mature (1-3 years)" (purple #9b59b6)
  - 📕 "Old (3-5 years)" (brown #795548)
  - 🏛️ "Legacy (5+ years)" (dark gray #34495e)
- **Calculation:** `now - firstCommitDate` in days, converted to months/years
- **Interpretation:** Helps distinguish new code from legacy systems

#### Medium Priority Metrics

**6. Recent Change Magnitude**
- **Collection:** Parse stats from `git log -1 --numstat --format="" -- <filepath>`
- **Storage:** Object `{ added: number, deleted: number, total: number }`
- **Legend display:** Size-based buckets
  - 📝 "Tiny change (1-10 lines)" (light blue #ecf0f1)
  - 📄 "Small change (11-50 lines)" (blue #3498db)
  - 📋 "Medium change (51-200 lines)" (yellow #f39c12)
  - 📚 "Large change (201-500 lines)" (orange #e67e22)
  - 🏗️ "Massive change (500+ lines)" (red #e74c3c)
- **Calculation:** `added + deleted` from numstat output
- **Interpretation:** Shows impact of most recent modification

**7. Commit Message Keywords**
- **Collection:** Parse last 10 commit messages with `git log -10 --format="%s" -- <filepath>`
- **Storage:** Array of detected keywords `['fix', 'refactor']`
- **Legend display:** Categorical with semantic colors
  - ✅ "Clean (no signals)" (green #2ecc71)
  - 🔧 "Maintenance (refactor, update)" (blue #3498db)
  - ⚠️ "Issues (fix, bug, workaround)" (yellow #f39c12)
  - 🚨 "Problems (hack, TODO, FIXME)" (red #e74c3c)
- **Keyword categories:**
  - Clean: No keywords detected
  - Maintenance: "refactor", "update", "improve", "cleanup", "optimize"
  - Issues: "fix", "bug", "resolve", "correct", "patch"
  - Problems: "hack", "workaround", "temporary", "TODO", "FIXME", "broken"
- **Priority:** If multiple categories present in recent commits, show worst one (Problems > Issues > Maintenance > Clean)
- **Interpretation:** Code health indicator based on recent development activity

**8. Branch Activity**
- **Collection:** Count commits per branch with `git log --all --format="%D" -- <filepath>`
- **Storage:** Object `{ main: number, feature: number, total: number }`
- **Legend display:** Ratio-based categories
  - 🎯 "Stable (0% feature branches)" (dark blue #2c3e50)
  - 📊 "Balanced (1-25% feature)" (blue #3498db)
  - 🔀 "Active (26-50% feature)" (yellow #f39c12)
  - ⚡ "Experimental (51-75% feature)" (orange #e67e22)
  - 🚀 "Volatile (76-100% feature)" (red #e74c3c)
- **Calculation:** `(featureBranchCommits / totalCommits) * 100`
- **Branch detection:** Parse branch names from refs, classify as main (main/master/develop) vs feature (everything else)
- **Interpretation:** High % = rapid iteration/experimentation, low % = stable production code

**Visualization Features:**

**Color Mode Switching:**
- Add dropdown selector in header with 9 modes:
  1. File type (current default)
  2. Last modified date
  3. Last commit author
  4. Commit frequency (churn)
  5. Unique contributors
  6. File age
  7. Recent change magnitude
  8. Commit message keywords
  9. Branch activity
- Legend automatically updates based on selected mode
- Directory colors inherit from dominant child value (e.g., highest churn file, most recent modification)
- Mode preference persisted in localStorage

**Label Display Toggle:**
- Add button next to color mode selector: "Labels: Always On / Hover Only"
- Always On: Current behavior (CSS2D labels above all directories)
- Hover Only: Labels only appear when hovering over directory or its files
- Preference persisted in localStorage
- Helps reduce visual clutter for large repositories

**Technical Implementation Notes:**
- All git metadata collected during processor analysis phase
- Output JSON schema updated with new fields per file
- Viewer reads metadata and applies color based on selected mode
- Color calculations done in `colorModeManager.ts` module
- Fallback colors for missing data (e.g., files with no git history)

---

### 🚧 Slice 2: Animate History Forward (NOT STARTED)

**Goal:** Watch repository structure evolve over time with timeline controls.

**Planned Features:**
- Process full commit history (not just HEAD)
- Timeline scrubber to navigate through history
- Play/pause animation controls
- Speed controls
- Files appear/disappear as they're added/deleted
- Watch complexity grow over time

**Technical Requirements:**
- Processor: Parse full git log with file diffs
- Data format: Array of snapshots with timestamps
- Viewer: Transition animations between states
- UI: Timeline controls, date display

**Status:** Not started - Slice 1 must be complete first

---

### 📋 Slice 3: Show Churn Heatmap (NOT STARTED)

**Goal:** Identify frequently modified files as potential refactoring targets.

**Planned Features:**
- Color intensity based on modification frequency
- Toggle between churn view and file type view
- Time window selection (last week, month, year, all time)
- Identify hotspots in codebase

**Technical Requirements:**
- Processor: Count commits per file
- Heatmap color scale (cool to hot)
- View mode toggle in UI

**Status:** Not started

---

### 📋 Slice 4: Identify Coupling (NOT STARTED)

**Goal:** Show which files are frequently modified together.

**Planned Features:**
- Visual connections between frequently co-modified files
- Strength indicator (line thickness/opacity)
- Filter by coupling strength threshold
- Click to see modification patterns

**Technical Requirements:**
- Processor: Analyze commit diffs for co-modifications
- Graph rendering for connections
- Filtering UI

**Status:** Not started

---

### 📋 Slice 5: Show Ownership (NOT STARTED)

**Goal:** See who works on what parts of the codebase.

**Planned Features:**
- Color by primary author
- Author legend
- Filter by author
- Show author contribution over time

**Technical Requirements:**
- Processor: Parse git blame or commit authors
- Per-file author tracking
- UI: Author filter controls

**Status:** Not started

---

### 📋 Slice 6: Highlight Complexity (NOT STARTED)

**Goal:** Surface files with high cognitive complexity.

**Planned Features:**
- Calculate cyclomatic complexity
- Visual indicators (size, color, or glow)
- Threshold filtering
- List view of most complex files

**Technical Requirements:**
- Processor: Integrate complexity analysis tool
- Language-specific parsers
- Complexity visualization

**Status:** Not started

---

### 📋 Slice 7-10: Additional Features (NOT STARTED)

Remaining slices (search, dependencies, comparisons, etc.) to be planned after completing first 6 slices.

---

## Current Architecture

### Technology Stack
- **Frontend:** TypeScript, Three.js, CSS2DRenderer, Vite
- **Backend/Processor:** TypeScript, Node.js, simple-git
- **Build:** Vite for hot-reload development
- **Version Control:** Git (separate repo from Gource)

### Project Structure
```
code-evolution-viz/
├── processor/           # Repository analyzer
│   ├── src/
│   │   ├── analyze.ts   # Git repository scanner
│   │   └── types.ts     # Shared data structures
│   └── package.json
├── viewer/              # 3D visualization
│   ├── src/
│   │   ├── TreeVisualizer.ts   # Core 3D rendering
│   │   ├── main.ts             # UI logic
│   │   ├── colorScheme.ts      # Color definitions
│   │   └── types.ts            # Shared types
│   ├── public/data/            # Analyzed repo data
│   ├── index.html              # Main UI layout
│   └── package.json
├── docs/
│   └── gource-reference/       # Gource study notes
├── CLAUDE.md                   # Project guidance
├── README.md                   # Project overview
└── PROGRESS.md                 # This file
```

### Key Design Decisions

1. **Solar System Metaphor:** Directories as planets, files as moons
   - Clear visual ownership
   - Prevents overlap through hierarchical focus
   - Scales to any directory size

2. **Hierarchical Focus Mode:** Show one subtree at a time
   - Initial view: Overview (root + level 1)
   - Click to drill down: Focus + context (ancestors + siblings at ancestor levels)
   - Prevents visual clutter
   - Maintains spatial stability

3. **Color Coding:** Semantic grouping by file purpose
   - Source code: Bright, distinct colors
   - Build/config: Warm colors
   - Assets: Magenta family
   - 50+ explicit types, zero unknowns

4. **Radial Layout:** Full 360° circle per directory
   - No angular subdivision constraints
   - Simple, predictable spacing
   - Works with focus mode

5. **Adaptive Spacing:** Based on child count
   - Tight orbits: sqrt scaling keeps files close
   - Moderate vertical: Clear parent-child relationship
   - 12 units vertical spacing

---

## Lessons Learned

### What Worked Well
1. **Incremental approach:** Building Slice 1 completely before moving on
2. **User feedback loop:** Iterative UX improvements based on testing
3. **Solar system metaphor:** Intuitive and scales well
4. **Focus mode:** Elegant solution to overlap problem
5. **Color scheme refactoring:** Single source of truth prevented bugs

### Challenges Overcome
1. **File overlap in dense directories:**
   - Initial: Angular subdivision crushed files together
   - Solution: Full 360° circles + hierarchical focus mode

2. **Visual clutter:**
   - Initial: All subtrees visible = chaos
   - Solution: Focus mode with ancestor context preservation

3. **Disorienting navigation:**
   - Initial: Camera resets on focus change
   - Solution: Stable camera position

4. **Stats panel blocking view:**
   - Initial: Top-right placement overlapped visualization
   - Solution: Moved to bottom-right, made collapsible

### Open Questions
1. How to handle repositories with 1000+ files?
2. Performance optimization for large trees?
3. Alternative layouts for very deep hierarchies?
4. Multi-ring layout for extremely dense directories?

---

## Next Steps

### Completed
- [x] Fix directory sizing bug (sqrt scaling)
- [x] Implement label display toggle (always on / hover only)

### MVP Approach: Vertical Slices

Building git metadata visualizations incrementally, delivering one complete feature at a time:

#### MVP Slice 1: Last Modified Date Coloring ✅ COMPLETE
- [x] Add `lastModified` date to processor (git log per file) - commit 03ccf59
- [x] Update FileNode type definition with lastModified field - commit 03ccf59
- [x] Create colorModeManager.ts with date coloring logic - commit 87603cc, enhanced af32d02
- [x] Add UI dropdown with 2 modes: "File Type" and "Last Modified" - commit 87603cc
- [x] Re-analyze Gource repository with all metadata - Oct 18 00:57 ✅
- [x] Re-analyze React repository with all metadata - Oct 18 01:05 ✅
- [x] Test all features on both repositories ✅

**Value:** See which files were recently touched with adaptive time buckets
**Bonus:** Adaptive intervals for active vs stale repos (commit af32d02)

#### MVP Slice 2: Commit Author Coloring ✅ COMPLETE
- [x] Add `lastAuthor` to processor - commit 3172875
- [x] Add author coloring to color mode manager - commit 3172875
- [x] Add "By Author" mode to UI dropdown - commit 3172875
- [x] Re-analyze Gource repository - Oct 18 00:57 ✅
- [x] Re-analyze React repository - Oct 18 01:05 ✅
- [x] Test author coloring on both repos ✅

**Value:** See who last touched each file with consistent hash-based colors

**Bonus Features Implemented:**
- Commit siblings highlighting (commit c71b03d) - shows files changed together in same commit
- Commit message display (commit 0eb8751) - shows commit message in info panel with repository-level index
- UI defaults optimized (commit efe81b4) - Highlight Commit on by default, Labels set to Hover Only
- Label visibility bug fix (commit 027821a) - labels hidden for invisible nodes in Always On mode

#### MVP Slice 3: Commit Frequency (Churn) Coloring (NOT STARTED)
- [ ] Add `commitCount` to processor
- [ ] Add churn heatmap coloring to manager
- [ ] Add "Churn Heatmap" mode to UI
- [ ] Re-analyze repos
- [ ] Test churn visualization

**Value:** Identify frequently modified files (refactoring targets)

#### MVP Slice 4: Unique Contributors Coloring (NOT STARTED)
- [ ] Add `contributorCount` to processor
- [ ] Add contributor coloring to manager
- [ ] Add "Contributors" mode to UI
- [ ] Re-analyze repos

**Value:** See coordination complexity

#### MVP Slice 5: File Age Coloring (NOT STARTED)
- [ ] Add `firstCommitDate` to processor
- [ ] Add age coloring to manager
- [ ] Add "File Age" mode to UI
- [ ] Re-analyze repos

**Value:** Distinguish new code from legacy

#### MVP Slice 6-8: Additional Metrics (BACKLOG)
- Recent change magnitude
- Commit message keywords
- Branch activity

### Future Polish (Post-Git Metadata)
- [ ] Test on different repositories (small, medium, large)
- [ ] Keyboard shortcuts (ESC to unfocus, arrow keys for navigation)
- [ ] Breadcrumb navigation display
- [ ] Performance profiling with full git metadata

### Slice 2 Preparation
- [ ] Design snapshot data structure for history
- [ ] Processor: Full git log parsing
- [ ] Timeline UI mockup
- [ ] Transition animation strategy

---

## Testing Notes

**Test Repository 1:** Gource (C++ project)
- 120 files total
- 28,011 lines of code
- Max depth: 3 levels
- Largest directory: src/ with 35 files
- File types: C++ (34), headers (29), build files (29), configs (13), markdown (1), YAML (1)

**Test Repository 2:** React (JavaScript library)
- 6,784 files total
- 918,533 lines of code
- Mixed file types: JS (3,762), MD (1,850), TS (408), TSX (121), CSS (108)
- 1,173 unique commit messages at HEAD
- Repository switching tested and working

**Performance:**
- Gource: Loads and renders in <500ms, 53 KB JSON (65 unique commits)
- React: Loads in ~2s (56x larger), 4.4 MB JSON (1,173 unique commits)
- Smooth 60fps interaction on both
- Hot-reload works reliably
- Repository switching without page reload functional

**Git Metadata Collection:**
- Gource: 65 unique commits covering 120 files
- React: 1,173 unique commits covering 6,784 files
- Commit messages stored in repository-level index (0.2% file size increase vs 9% for per-file storage)

---

## References

- Gource: https://gource.io (inspiration and reference study)
- Three.js: https://threejs.org (3D rendering library)
- Simple-git: https://www.npmjs.com/package/simple-git (Git integration)
- Fibonacci Sphere: https://arxiv.org/abs/0912.4540 (point distribution algorithm)

---

*Last Updated: 2025-10-18*
*Current Slice: 1 & 2 COMPLETE ✅ (all features tested and working)*
*Bonus Features: Commit siblings highlighting, commit message display, UI defaults optimization*
*Next Slice: 3 (Commit Frequency/Churn) or original Slice 2 (Animate History)*
