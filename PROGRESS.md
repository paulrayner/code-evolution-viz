# CodeCohesion - Development Progress

## Project Overview

Open-source 3D visualization tool for analyzing code cohesion and architectural evolution. Interactive spatial exploration with timeline playback to understand structure, detect bounded contexts, and identify coupling patterns. Built with TypeScript, Three.js, and Node.js.

**Current Version:** 0.4.0 (see [CHANGELOG.md](CHANGELOG.md) for version history)
**Status:** Production deployed with live demo at [thepaulrayner.com/codecohesion](https://thepaulrayner.com/codecohesion)

---

## ✅ Completed Features

### Core 3D Visualization
- Solar system layout (directories as planets, files as moons orbiting in 360° rings)
- Interactive camera controls (orbit, zoom, pan)
- Hierarchical focus mode with drill-down navigation
- Click-to-focus directory navigation
- Hover highlighting with ancestor path visualization
- File size representation based on lines of code
- Directory sizing by total LOC with square root scaling
- Edges connecting parents to children

### Color Modes (9 total)
1. **File Type** - 50+ extensions with semantic grouping
2. **Last Modified** - Adaptive time intervals (active vs stale repos)
3. **Author** - Consistent hash-based colors per contributor
4. **Churn** - Lifetime commit frequency heatmap
5. **Contributors** - Number of unique contributors per file
6. **File Age** - Time since first commit
7. **Recent Activity** - Lines changed in last 90 days
8. **Stability** - Change frequency patterns
9. **Recency** - Time since last modification

### Timeline & Evolution
- **Timeline V1**: Adaptive commit sampling (guarantees version tag capture)
- **Timeline V2**: Full commit history with Gource-style delta reconstruction
- VCR-style playback controls (play/pause, step forward/backward)
- Variable speed control (1x to 1000x)
- Interactive timeline scrubber with mouse drag
- Tag markers for version navigation
- Ghost file rendering for deletions
- Live repository statistics during playback
- File change visualization with color-coded highlights
- Commit information display (hash, date, message, author, file counts)
- Mode switcher (HEAD Analysis vs Timeline)

### UI & Interaction
- Collapsible panels (File Details, Repository Stats, Legend)
- Legend-based filtering (Top/All/None/Invert buttons)
- Overview mode (bird's-eye view) and Navigate mode (exploration)
- Label toggle (Always On / Hover Only)
- Repository switcher for multiple datasets
- Commit siblings highlighting
- Tooltips on hover

### Production Deployment
- GitHub Pages deployment configuration
- Production build optimizations
- Live demo with 12+ analyzed repositories (React, Gource, cBioPortal, etc.)

---

## 📋 Remaining Work

### Known Bugs

**1. Timeline highlighting uses HEAD paths instead of historical paths**
- **Impact:** Files deleted/moved/renamed after a historical commit won't highlight
- **Result:** Many commits show grey edges instead of yellow highlighting
- **Root cause:** File path lookup fails for files that don't exist in HEAD
- **Fix required:** Timeline data needs full file snapshots at each commit, not just change lists

**2. Camera zoom limitation on large repositories**
- **Issue:** Hard-coded `maxDistance = 150` prevents zooming out far enough in timeline mode
- **Impact:** Can't see entire tree structure for large repos (React: 6,784 files)
- **Status:** Attempted fix reverted due to black screen issues - needs investigation

**3. Large repository timeline generation is slow**
- **Example:** React repo takes ~40 minutes to generate timeline data
- **Breakdown:** 35 min git metadata, 5 min commit parsing
- **Potential optimization:** Parallel git operations, caching, incremental updates

**4. Deleted files can't be highlighted in timeline**
- **Issue:** Deleted files aren't in current tree structure
- **Impact:** Timeline shows deletion counts but can't visually highlight which files

**5. Line width may not work on all platforms**
- **Issue:** `THREE.js LineBasicMaterial.linewidth` not supported on all WebGL implementations
- **Impact:** Yellow highlight edges may not appear thicker on some systems
- **Workaround:** Color change (grey → yellow) still provides feedback

**6. Timeline drill-down layers not implemented**
- **Status:** Phase 4 feature with TODO marker
- **Impact:** Can't zoom into specific date ranges for detailed analysis

### Unimplemented Features

**Coupling Visualization**
- Show which files are frequently modified together
- Visual connections between co-modified files
- Strength indicators (line thickness/opacity)
- Filter by coupling strength threshold

**Complexity Analysis**
- Integrate cyclomatic complexity analysis tool
- Visual indicators (size, color, or glow)
- Threshold filtering
- List view of most complex files

**Dedicated Churn Heatmap View**
- Interactive heatmap view (color mode exists, but not dedicated view)
- Time window selection (last week, month, year, all time)
- Identify hotspots in codebase

**Enhanced Ownership Tracking**
- Filter visualizations by author
- Show author contribution over time
- Ownership percentage per file/directory

---

## Current Architecture

### Technology Stack
- **Frontend:** TypeScript, Three.js, CSS2DRenderer, Vite
- **Backend/Processor:** TypeScript, Node.js, simple-git
- **Build:** Vite for hot-reload development
- **Deployment:** GitHub Pages (automated via gh-pages)

### Project Structure
```
codecohesion/
├── processor/           # Repository analyzer
│   ├── src/
│   │   ├── analyze.ts   # Git repository scanner
│   │   └── types.ts     # Shared data structures
│   └── package.json
├── viewer/              # 3D visualization
│   ├── src/
│   │   ├── TreeVisualizer.ts       # Core 3D rendering
│   │   ├── main.ts                 # UI logic
│   │   ├── colorModeManager.ts     # Color mode logic
│   │   ├── colorScheme.ts          # File extension colors
│   │   ├── DeltaReplayController.ts # Timeline V2 delta engine
│   │   ├── TreeBuilder.ts          # Tree reconstruction
│   │   └── types.ts                # Type definitions
│   ├── public/data/     # Analyzed repo JSON files
│   ├── index.html       # Main UI layout
│   └── package.json
├── docs/
│   └── gource-reference/    # Gource study notes
├── .claude/
│   └── claude.md            # Project guidance for Claude Code
├── CHANGELOG.md             # Version history
├── README.md                # Project overview
└── PROGRESS.md              # This file
```

### Key Design Decisions

1. **Solar System Metaphor:** Directories as planets, files as moons
   - Clear visual ownership
   - Prevents overlap through hierarchical focus
   - Scales to any directory size

2. **Hierarchical Focus Mode:** Show one subtree at a time
   - Initial view: Overview (root + level 1)
   - Click to drill down: Focus + context (ancestors + siblings)
   - Prevents visual clutter while maintaining spatial stability

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
   - Orbit radius = 6 + sqrt(childCount) × 2.5
   - Vertical spacing = 12 units (clear parent-child relationship)

6. **Timeline V2 Delta Architecture:**
   - Gource-style commit-by-commit tree reconstruction
   - Full file addition/modification/deletion tracking
   - Adaptive keyframe strategy for performance
   - Ghost rendering for visualizing deletions

---

## Lessons Learned

### What Worked Well
1. **Incremental approach:** Building features completely before moving on
2. **User feedback loop:** Iterative UX improvements based on testing
3. **Solar system metaphor:** Intuitive and scales well
4. **Focus mode:** Elegant solution to overlap problem
5. **Color scheme refactoring:** Single source of truth prevented bugs
6. **Timeline V2:** Delta-based reconstruction provides full historical accuracy

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

5. **Timeline performance:**
   - Initial: Full tree regeneration every frame
   - Solution: Delta-based updates with adaptive keyframes

### Open Questions
1. How to handle repositories with 10K+ files?
2. Performance optimization for timeline generation on large repos?
3. Alternative layouts for very deep hierarchies (10+ levels)?
4. Best UI for coupling visualization?

---

## Testing Notes

**Test Repository 1:** Gource (C++ project)
- 120 files total
- 28,011 lines of code
- Max depth: 3 levels
- Timeline: 988 commits, 22 version tags (100% captured)

**Test Repository 2:** React (JavaScript library)
- 6,784 files total
- 918,533 lines of code
- Mixed file types: JS, MD, TS, TSX, CSS
- Timeline: 21,078 commits, 18 version tags

**Test Repository 3:** cBioPortal (Full-stack application)
- Multiple repositories analyzed
- Frontend and backend separation visible
- Good test case for large monorepos

**Performance:**
- Gource: Loads in <500ms, 53 KB JSON
- React: Loads in ~2s, 4.4 MB JSON
- Smooth 60fps interaction on both
- Hot-reload works reliably
- Repository switching without page reload functional
- Timeline playback smooth up to 100x speed

---

## References

- Gource: https://gource.io (inspiration and reference study)
- Three.js: https://threejs.org (3D rendering library)
- Simple-git: https://www.npmjs.com/package/simple-git (Git integration)
- Keep a Changelog: https://keepachangelog.com (changelog format)
- Semantic Versioning: https://semver.org (version numbering)

---

*For version history and release dates, see [CHANGELOG.md](CHANGELOG.md)*
*For development guidance, see [.claude/claude.md](.claude/claude.md)*
