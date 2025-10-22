# Changelog

## [0.4.1] - 2025-10-22

- File details now show on hover for instant preview (no click required)
- Clicking a file pins the details panel and shows commit siblings
- Clicking the same file twice unpins and restores free hover mode
- GitHub integration: clickable links to view files and directories on GitHub
- Repository dropdown now shows owner/repo (e.g., "gource (acaudwell/Gource)")
- Tag selector UI now hidden when not applicable (V1 timeline or repos without tags)
- Incremental tree generation optimization for improved timeline performance
- Enhanced debug logging for file deletion tracking

## [0.4.0] - 2025-10-21

- GitHub Pages deployment configuration with automatic build and deploy
- Live demo at thepaulrayner.com/codecohesion
- Repository switcher for loading multiple analyzed datasets
- Production build optimizations for subdirectory deployment
- Project renamed from "code-evolution-viz" to "CodeCohesion"
- Updated branding and tagline to "3D visualization of code evolution"
- Fixed data loading using relative paths for production deployment
- Fixed TypeScript compilation errors preventing production builds
- Removed compiled JavaScript artifacts from source directory

## [0.3.1] - 2025-10-21

- Collapsible File Details panel with unified scrolling
- Collapsible Repository Stats panel
- Collapsible Legend panel

## [0.3.0] - 2025-10-21

- Legend-based filtering with Top/All/None/Invert controls
- Overview mode for bird's-eye repository view
- Navigate mode for interactive exploration
- Fixed filter controls now hidden (not just disabled) in timeline mode

## [0.2.2] - 2025-10-21

- Ghost file rendering for visualizing deletions in timeline
- Interactive timeline scrubbing with mouse drag
- Adaptive keyframe strategy for improved timeline performance
- Enhanced commit change indicators showing additions, modifications, deletions (Files: +N ~N -N)
- Unified color mode filtering behavior across Timeline V1 and V2

## [0.2.1] - 2025-10-20

- Complete commit history processing with Gource-style delta reconstruction (Timeline V2)
- Delta-based tree reconstruction at each commit
- File addition, modification, and deletion tracking
- Empty commit handling
- Smart commit highlighting with contextual warnings
- Live repository statistics updating during timeline playback
- Tag markers on timeline scrubber for version navigation
- Jump-to-tag functionality for quick version seeking
- Fixed Timeline V2 highlighting to properly handle file deletions and empty commits

## [0.2.0] - 2025-10-18

- Timeline data collection with adaptive commit sampling
- Timeline playback controls (play/pause, step forward/backward)
- Variable speed control (1x to 1000x playback)
- Interactive timeline scrubber for seeking through history
- File change visualization during timeline playback
- Commit information display (hash, date, message, author)
- Timeline mode detection with automatic UI switching
- Mode switcher (HEAD Analysis vs Timeline)
- Fixed timeline visibility ensuring all files display correctly during playback
- Fixed TypeScript compilation errors in timeline code
- Fixed label visibility for invisible nodes in "Always On" mode

## [0.1.2] - 2025-10-18

- Churn heatmap color mode (lifetime commit frequency)
- Contributors count visualization
- File Age color mode
- Recent Activity (90 days) color mode
- Code Stability metric
- Recency metric
- Enhanced file details panel with comprehensive git metadata
- Commit message display in Highlight Commit mode
- Legend ordering for heatmaps now displays high-to-low (most significant first)
- UI defaults: Highlight Commit enabled by default, labels set to "Hover Only"

## [0.1.1] - 2025-10-18

- Adaptive time intervals for "Last Modified" mode (7 intervals for active repos)
- Commit message display in file details
- UI defaults: Highlight Commit enabled by default, labels set to "Hover Only"
- Fixed label visibility bug for invisible nodes in "Always On" mode

## [0.1.0] - 2025-10-17

- 3D solar system visualization layout (directories as planets, files as moons)
- Interactive camera controls (left-click rotate, right-click pan, scroll zoom)
- Hierarchical focus mode with drill-down navigation
- Click-to-focus directory navigation
- Hover highlighting with ancestor path visualization
- Collapsible directory visualization
- File size representation based on lines of code
- File type color scheme with 50+ extensions
- Last Modified color mode with adaptive time intervals
- Author/Contributor color mode with consistent color hashing
- Color mode manager and switcher UI
- Author legend sorted by file count
- Commit siblings highlighting mode
- Commit hash and metadata in file details panel
- Directory label display with toggle (Always On / Hover Only)
- Square root scaling for directory sizing to prevent overlap
- Repository structure analysis via git processor
- Lines of code calculation per file
- Git metadata collection (last modified, author, commit hash)

---

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
