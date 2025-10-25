# CodeCohesion TODO

Future enhancements, ideas, and known limitations.

## Force-Directed Layout (Marco's Request)

- [ ] **Dynamic force-directed graph layout**
  - Replace static tree layout with physics-based force simulation
  - Files/directories attract based on coupling/relationship strength
  - Files/directories repel when weakly related
  - Creates organic clustering visualization
  - **Implementation options:**
    - Use D3-force in 3D space
    - Custom physics engine with Three.js
    - Spring forces for connections, repulsion for spacing
  - **Relationship metrics for attraction:**
    - Code coupling (shared dependencies)
    - Temporal coupling (files changed together)
    - Directory proximity
    - Contributor overlap
  - **UX considerations:**
    - Toggle between static tree and force-directed layouts
    - Damping/stabilization controls
    - Animation speed controls
    - Pin/freeze specific nodes

## Lines of Code Mode - Enhancements

### Known Limitations to Address

- [ ] **Generated/Minified File Detection** (Multi-phase implementation)
  - Current LOC calculation treats all files equally
  - Generated files (bundled JS, compiled output) skew distribution
  - Minified files appear "huge" but may not be concerning

  **Phase 1: Pattern-based detection (MVP)** ✅ VERIFIED COMPLETE (2025-10-25)
  - [x] Add `isGenerated` field to FileNode type (processor & viewer)
  - [x] Implement pattern matching in processor (10 patterns)
  - [x] Add "Hide generated files" checkbox in viewer (unchecked by default)
  - [x] Filter tree before rendering when checkbox is checked
  - [x] Fixed detection logic to prepend leading slash for accurate pattern matching
  - [x] Fixed buildTree() to pass through isGenerated field
  - [x] Added file count indicator to checkbox label: "Hide generated files (N found)"
  - [x] Checkbox auto-disables when no generated files detected
  - [x] Console logging shows generated file count during analysis
  - Patterns: `.min.js`, `.min.css`, `/dist/`, `/build/`, `/out/`, `/node_modules/`, `/vendor/`, `.bundle.js`, `/bundle.js`, `/__generated__/`
  - **Tested with:** Test repository with build/, dist/, node_modules/ files ✓

  **Phase 1.5: Re-analyze Existing Repositories** ⏳ PENDING
  - [ ] Re-analyze Gource repository (2 minutes, ~120 files)
  - [ ] Re-analyze React repository (10-15 minutes, ~6,784 files)
  - [ ] Re-analyze cBioPortal repository (10-15 minutes, large)
  - [ ] Re-analyze cBioPortal-Frontend repository (10-15 minutes, large)
  - [ ] Verify isGenerated fields in updated JSON files
  - [ ] Test checkbox functionality with each newly analyzed repo

  **Why:** Existing data files were generated before the isGenerated fix, so they have 0 generated files detected. Need HEAD snapshot re-analysis to enable filtering.

  **Strategy:** Re-analyze HEAD snapshots only (fast ~30 min total). Skip timeline files for now (much slower, can do later if needed).

  **Commands:**
  ```bash
  # Gource (2 min)
  cd processor
  npm run dev -- /Users/paul/Documents/Gource output/gource-new.json
  cp output/gource-new.json ../viewer/public/data/gource.json

  # React (10-15 min)
  npm run dev -- /Users/paul/Documents/react output/react-new.json
  cp output/react-new.json ../viewer/public/data/react.json

  # cBioPortal repos (10-15 min each)
  npm run dev -- /Users/paul/Documents/cbioportal/cbioportal output/cbioportal-new.json
  npm run dev -- /Users/paul/Documents/cbioportal/cbioportal-frontend output/cbioportal-frontend-new.json
  cp output/cbioportal-new.json ../viewer/public/data/cbioportal.json
  cp output/cbioportal-frontend-new.json ../viewer/public/data/cbioportal-frontend.json
  ```

  **Expected results:**
  - Gource: 0 generated files (clean C++ project)
  - React: Some generated files detected (build/, fixtures/, dist/ if present)
  - cBioPortal: Possibly generated files in build outputs

  **Phase 2: Content heuristics & enhanced UX**
  - [ ] Add content-based detection (line length, whitespace ratio, alphanumeric density)
  - [ ] Implement dual-mode: "Lines of Code" vs "Lines of Code (All Files)"
  - [ ] Enhanced stats panel showing hand-written vs generated breakdown
  - [ ] Visual distinction for generated files when visible (gray color)
  - [ ] Detection reason metadata (`generatedReason` field)

  **Phase 3: Advanced features**
  - [ ] Configuration file support (`.codecohesion.json`)
  - [ ] Custom exclusion patterns per repository
  - [ ] Git metadata signals (zero-commit large files, bot authors)
  - [ ] Configurable heuristic thresholds
  - [ ] Export detection report showing why files were marked
  - [ ] Per-language threshold tuning

  **Detection Strategy (Phases 2-3):**
  - Layer 1: Path/name patterns (fast, deterministic)
  - Layer 2: Content heuristics (avgLineLength > 500, whitespaceRatio < 0.05)
  - Layer 3: Git metadata (commitCount, lastAuthor)
  - Target: >95% precision on common repos

  **Edge Cases to Handle:**
  - False positives: Large hand-written data files (only apply to code extensions)
  - False negatives: Well-formatted generated TypeScript (rely on markers)
  - Custom build tools: Support user configuration

- [ ] **Language-Specific Bucket Tuning**
  - Current percentile buckets work globally across all languages
  - Python/Ruby files typically smaller than Java/C# (more verbose)
  - Single percentile distribution may not be optimal
  - **Solution ideas:**
    - Calculate separate percentiles per language
    - Language-aware color mode toggle
    - Show language breakdown in stats panel
    - Configurable bucket thresholds per language

- [ ] **Very Large File Handling**
  - Files with 10K+ LOC can dwarf everything else
  - May reduce usefulness of color scale for normal files
  - **Current mitigation:** Top bucket is open-ended (461+ LOC)
  - **Solution ideas:**
    - Logarithmic scaling for very large files
    - Separate "outlier" detection and visualization
    - Configurable upper threshold
    - Show size distribution histogram

### Enhancement Ideas

#### LOC Density Visualization
- [ ] Directory-level LOC density metric
  - Total LOC / number of files in directory
  - Identifies "bloated" directories vs "granular" ones
  - Useful for refactoring planning

#### Combined Metrics
- [ ] **LOC × Churn Mode** - Refactoring Priority
  - Large files that change frequently = high-risk
  - Visual heatmap highlighting refactoring candidates
  - Combine size (LOC) with change frequency (churn)
  - Add to color mode dropdown

- [ ] **LOC × Complexity Mode** - Technical Debt Hotspots
  - Requires cyclomatic complexity integration
  - Large + complex files = highest technical debt
  - See "Advanced Analysis" section below

#### Timeline Integration
- [ ] Code Growth/Shrinkage Visualization
  - Show LOC changes over time in Timeline V2
  - Color files by LOC delta (growing vs shrinking)
  - Visualize refactoring impact (file size reduction)
  - Aggregate stats: "Total LOC: 100K → 95K (-5%)"

#### Configuration Options
- [ ] User-configurable LOC buckets
  - Allow custom thresholds instead of percentiles
  - Useful for teams with specific size guidelines
  - Save preferences per repository

- [ ] LOC counting options
  - Current: Non-blank lines
  - Options: Include comments, exclude comments, physical lines
  - Language-specific counting rules

## Directory Color Aggregation - Enhancements

### Current Behavior
- Shows dominant color by **file count** (not LOC)
- Works correctly for all 11 color modes
- Tested with React repository structure

### Future Improvements

- [ ] **Alternative Aggregation Strategies**
  - Option 1: Weighted by LOC (larger files have more influence)
  - Option 2: Show color gradient/pie chart on directory cube
  - Option 3: Configurable per color mode (count vs LOC vs other)

- [ ] **Directory Metrics Panel**
  - Click directory to show color breakdown
  - "This folder: 12 orange, 7 yellow, 2 blue files"
  - Visual pie chart or bar chart
  - Drill-down analysis

- [ ] **Performance Optimization**
  - Cache dominant color calculations more aggressively
  - Lazy calculation (only when directory visible)
  - Incremental updates when filtering

## Testing & Quality

### Performance Testing
- [ ] Test with 10K+ file repositories
  - React is 6,784 files (tested ✓)
  - Find larger repos: Linux kernel, Chromium, etc.
  - Measure render time, frame rate, memory usage
  - Identify performance bottlenecks

- [ ] Deep hierarchy testing
  - Current max tested: ~6 levels
  - Test with 10+ level hierarchies
  - Verify camera framing, layout algorithm

### Edge Cases
- [ ] Empty files (0 LOC) handling
- [ ] Very large files (100K+ LOC) like generated SVGs
- [ ] Binary files incorrectly analyzed as text
- [ ] Symbolic links and special files
- [ ] Repos with no git history

### Test Coverage
- [x] 105 unit tests passing (current)
- [ ] Add integration tests
- [ ] Add E2E tests with real repositories
- [ ] Performance benchmarks
- [ ] Visual regression testing

### Accessibility
- [ ] Color blindness-friendly palettes
  - Current palette uses blue-green-yellow-orange-red
  - Test with deuteranopia, protanopia simulators
  - Provide alternative color schemes
- [ ] High contrast mode
- [ ] Screen reader support for stats/metrics
- [ ] Keyboard navigation improvements

## Advanced Analysis (From Roadmap)

### Complexity Integration
- [ ] Integrate cyclomatic complexity analysis
  - Use `lizard` or similar tool
  - Add complexity data to processor output
  - **Complexity color mode** - Show complexity heatmap
  - **Complexity × Churn mode** - Hotspot analysis

### Hotspot Analysis
- [ ] **Technical Debt Quadrant** visualization
  - X-axis: Complexity
  - Y-axis: Churn
  - Z-axis: LOC (size of sphere)
  - Color: Age or ownership
  - Interactive 3D scatter plot

### Team Ownership
- [ ] **Knowledge Distribution** visualization
  - Show which developers know which parts of codebase
  - Identify single points of failure (one person owns critical code)
  - Bus factor analysis
  - **Color mode:** Primary owner, shared ownership, orphaned code

### Architecture Drift
- [ ] **Expected vs Actual Structure** comparison
  - Define expected module boundaries
  - Visualize violations (coupling across boundaries)
  - Track drift over time in Timeline mode
  - Alert on new violations

## Code Cleanup & Technical Debt

### Existing TODOs in Code
- [ ] **TreeVisualizer.ts:1507** - Replace incremental scene updates
  - Current: Full scene rebuild on changes
  - Goal: Update only changed meshes
  - Improves performance for filtering, color mode switching

### Known Bugs
- [ ] **Connection line thickness not working on all platforms**
  - Current: Uses `material.linewidth` which is unreliable in WebGL
  - Lines appear 1px on some browsers/systems regardless of value
  - **Solution:** Replace with `THREE.Line2` + `LineMaterial` from three.js examples
  - Uses shader-based rendering for consistent thick lines across all platforms

### Refactoring Opportunities
- [ ] Extract more pure functions from TreeVisualizer
  - Current: Some logic still in class methods
  - Goal: All calculations as testable pure functions
  - Improves testability, maintainability

- [ ] Split colorModeManager.ts into separate files
  - Current: 760 lines, all color modes in one file
  - Goal: One file per color mode
  - Easier to add new modes, better organization

### Code Quality
- [ ] Add JSDoc comments to public APIs
- [ ] Improve TypeScript strict mode compliance
- [ ] Add ESLint with stricter rules
- [ ] Set up Prettier for consistent formatting

## Documentation

### Missing Documentation
- [ ] Video walkthrough of features
- [ ] Tutorial: "Adding a new color mode"
- [ ] Tutorial: "Analyzing your first repository"
- [ ] Architecture decision records (ADRs)
- [ ] Performance optimization guide

### Improvements
- [ ] Add more screenshots to README
  - Show all 11 color modes
  - Show directory color aggregation in action
  - Show LOC mode on different sized repos
- [ ] Create comparison table: CodeCohesion vs competitors
- [ ] Document performance characteristics

## Export & Sharing

### Shareable Reports
- [ ] Export visualization as image/video
  - Screenshot current view
  - Record timeline playback
  - Generate animated GIF

- [ ] Export analysis as PDF/HTML report
  - Stats, charts, insights
  - Hotspot analysis results
  - Recommendations

- [ ] Share specific views via URL
  - Deep link to specific directory
  - Color mode, filter state in URL
  - Timeline position in URL

## UI/UX Improvements

### Visualization Enhancements
- [ ] Minimap for large repositories
  - Bird's eye view always visible
  - Click to navigate
  - Show current viewport rectangle

- [ ] Search functionality
  - Search files by name
  - Highlight matching files
  - Jump to file in 3D space

- [ ] Bookmarks
  - Save interesting views
  - Quick navigation to hotspots
  - Share bookmarks with team

### Performance UI
- [ ] Loading progress indicator
  - Show % complete when loading large repos
  - Estimate time remaining
  - Cancel long-running operations

- [ ] Performance metrics panel
  - FPS counter
  - Render time
  - Memory usage
  - Toggle for debugging

## Related to DDD Vision

See [DDD-VISION.md](DDD-VISION.md) for detailed plans on:
- Bounded context detection via temporal coupling
- Ubiquitous language analysis
- Vocabulary clustering
- Connascence analysis

## Priority Legend

Items marked with these would be highest priority based on user value:
- **LOC × Churn mode** - High value, relatively easy
- **Generated file detection** - Reduces confusion, improves accuracy
- **Performance testing (10K+ files)** - Blockers for larger repos
- **Video tutorials** - Helps onboarding and adoption

---

*Last Updated: 2025-10-24*
*Status: v0.4.2 - 11 Color Modes, Lines of Code Complete*
