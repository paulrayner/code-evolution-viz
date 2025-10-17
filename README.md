# Code Evolution Visualizer

Interactive 3D visualization of code repository structure with git metadata insights. Explore your codebase as a solar system where directories are planets and files are orbiting moons.

**Inspired by:** [Gource](https://gource.io) for visualization approach, [CodeScene](https://codescene.io) for metrics focus.

## 🎯 Project Goals

Visualize code repositories to understand:
- **Repository structure** - Hierarchical organization at a glance
- **File relationships** - Parent-child connections and directory ownership
- **Code distribution** - File sizes mapped to lines of code
- **Recent activity** - See which files were recently modified
- **Team ownership** - Who last touched each file
- **File coupling** - Which files change together in commits

## ✨ Current Features

### Core Visualization
- **Solar System Layout** - Directories as planets, files as moons orbiting in 360° rings
- **Hierarchical Focus Mode** - Drill down into directories while maintaining context
- **Adaptive Sizing** - File sphere size represents lines of code, directories sized by total LOC
- **Smart Spacing** - Automatic layout prevents overlap using square-root scaling

### Interactive Exploration
- **Orbit Controls** - Left-click drag to rotate, right-click to pan, scroll to zoom
- **Click Navigation** - Click directories to focus, click again to navigate back up
- **Hover Highlighting** - Highlights files/directories and their ancestors on hover
- **Smooth Camera** - Stable camera framing without disorienting resets

### Git Metadata Visualization

#### 3 Color Modes
1. **File Type** (default) - 50+ file extensions with semantic color grouping
2. **Last Modified** - Adaptive time buckets showing recent changes
   - Active repos: 7 time intervals (last week → 1-2 years)
   - Stale repos: Percentile-based intervals with year ranges
3. **Author** - Consistent hash-based colors per contributor

#### Commit Siblings Highlighting
- Click any file with "Highlight Commit" enabled
- See all files changed in the same commit (at HEAD)
- Dramatic visual highlighting with bright yellow glow
- Connection lines from highlighted files to parent directories
- Toggle to clear highlighting

### UI Features
- **Collapsible Stats Panel** - File count, LOC, directory count, max depth, top 5 languages
- **Dynamic Legend** - Updates based on color mode (file types, time ranges, or authors)
- **Info Panel** - Click files/directories to see detailed metadata
- **Repository Switcher** - Load different analyzed repos without page reload
- **Label Toggle** - "Always On" or "Hover Only" for directory labels
- **Tooltips** - Quick stats on hover

## 🚀 Quick Start

### 1. Analyze a Repository

```bash
cd processor
npm install
npm run dev -- /path/to/your/repository
```

This generates a JSON file in `processor/output/` with:
- Repository structure (hierarchical tree)
- Lines of code per file
- Git metadata (last modified date, last author, commit hash)

**Example repositories tested:**
- Gource (120 files, 28K LOC)
- React (6,784 files, 918K LOC)

### 2. Copy Data to Viewer

```bash
# The output is in processor/output/repo-data.json
# Copy it to viewer with a descriptive name
cp processor/output/repo-data.json viewer/public/data/my-repo.json
```

### 3. Start Viewer

```bash
cd viewer
npm install
npm run dev
```

Open http://localhost:3000 (or http://localhost:3001 if port 3000 is in use)

### 4. Explore Your Codebase

**Mouse Controls:**
- **Left-click + drag** - Rotate camera around the visualization
- **Right-click + drag** - Pan the camera
- **Scroll wheel** - Zoom in/out
- **Click file/directory** - View details and drill down into directories

**UI Controls:**
- **Color Mode dropdown** - Switch between File Type, Last Modified, and Author
- **Labels toggle** - Toggle directory labels between Always On and Hover Only
- **Repository selector** - Switch between different analyzed repositories
- **Highlight Commit** - Toggle commit siblings highlighting mode
- **Panel headers** - Click to collapse/expand Stats and Legend panels

## 📁 Project Structure

```
code-evolution-viz/
├── processor/              # Repository analyzer
│   ├── src/
│   │   ├── analyze.ts      # Git repository scanner with metadata collection
│   │   └── types.ts        # Shared data structures
│   └── output/             # Generated JSON files
│
├── viewer/                 # 3D visualization
│   ├── src/
│   │   ├── main.ts                # Entry point and UI logic
│   │   ├── TreeVisualizer.ts      # Core 3D rendering with Three.js
│   │   ├── colorModeManager.ts    # Color mode logic (fileType, lastModified, author)
│   │   ├── colorScheme.ts         # File extension color mappings
│   │   └── types.ts               # Type definitions
│   ├── public/data/               # Analyzed repository data files
│   └── index.html                 # Main UI layout
│
├── docs/
│   └── gource-reference/          # Learnings from studying Gource
│
├── PROGRESS.md                    # Detailed development history
├── CONTRIBUTING.md                # Guidelines for adding new features
└── README.md                      # This file
```

## 🎨 Design Decisions

### Solar System Metaphor
Directories are planets, files are moons. This provides:
- Clear visual ownership (files orbit their parent directory)
- Natural scaling (any number of children can orbit in a full 360° ring)
- Intuitive navigation (zoom into planets to see their moons)

### Hierarchical Focus Mode
Instead of showing the entire tree at once (which creates visual chaos), the system shows:
- **Initial view:** Root + first-level directories (overview)
- **Focused view:** Selected directory + its children + full ancestor chain
- **Context preservation:** Always see where you are in the hierarchy

### Adaptive Color Modes
Rather than hard-coded time intervals, the Last Modified mode adapts:
- **Active repos** (80% files changed in last 90 days): Fine-grained intervals
- **Stale repos** (80% files older than 90 days): Percentile-based buckets showing actual year ranges

### Radial Layout Algorithm
- Full 360° circles (no angular subdivision constraints)
- Orbit radius = 6 + sqrt(childCount) × 2.5 (prevents overlap while keeping files close)
- Vertical spacing = 12 units (clear parent-child relationship)
- Bounding box calculation for automatic camera framing

## 🛣️ Roadmap

### ✅ Completed: MVP Slices 1 & 2

**Slice 1: Repository Structure Visualization**
- Repository analysis at HEAD commit
- Lines of code calculation
- Hierarchical tree visualization with solar system layout
- File type color coding (50+ extensions)
- Interactive navigation and focus mode

**Slice 2: Git Metadata Visualization**
- Last modified date collection and coloring
- Commit author tracking and coloring
- Commit siblings highlighting
- Adaptive time intervals for active vs stale repos

### 🚧 In Progress

**Testing & Polish**
- Re-analyze React repository with commit hash metadata
- Comprehensive testing of all color modes
- Performance validation on large repositories

### 📋 Planned Features

**Slice 3: Commit Frequency (Churn) Coloring**
- Count commits per file
- Heatmap coloring (cool blue → hot red)
- Identify frequently modified files (refactoring candidates)

**Slice 4: Unique Contributors Count**
- Track number of distinct authors per file
- Visualize coordination complexity
- Identify single-owner vs team-owned files

**Slice 5: File Age Visualization**
- First commit date per file
- Color by age (new → legacy)
- Distinguish recent code from old systems

**Slice 6: Animate History Forward**
- Process full commit history (not just HEAD)
- Timeline playback controls
- Watch repository structure evolve over time

**Slice 7-10: Advanced Features**
- Temporal coupling detection (files that change together)
- Complexity heatmap integration
- Hotspot analysis (complexity × churn)
- Team ownership and knowledge distribution
- Architecture drift detection
- Shareable reports and exports

## 🔧 Technology Stack

**Processor:**
- TypeScript
- Node.js
- simple-git (Git integration)

**Viewer:**
- TypeScript
- Three.js (3D rendering)
- CSS2DRenderer (floating labels)
- OrbitControls (camera controls)
- Vite (build tool with hot-reload)

**Future Additions:**
- lizard (cyclomatic complexity analysis)
- D3.js (charts and timeline UI)

## 📊 Performance

**Tested Repositories:**
- **Gource** (120 files, 28K LOC): Loads in <500ms, 60fps interaction
- **React** (6,784 files, 918K LOC): Loads in ~2s, smooth 60fps rendering
- **Hot-reload:** Works reliably during development
- **Repository switching:** No page reload required

## 🧑‍💻 Development

### Running Locally

**Processor:**
```bash
cd processor
npm install
npm run dev -- /path/to/repo    # Analyze and generate JSON
npm run build                    # Compile TypeScript
```

**Viewer:**
```bash
cd viewer
npm install
npm run dev        # Start dev server with hot-reload
npm run build      # Build for production
npm run preview    # Preview production build
```

### Adding New Color Modes

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:
- Adding new git metadata collection
- Implementing new color modes
- Testing checklist
- Common pitfalls

### Documentation

- **PROGRESS.md** - Comprehensive development history and lessons learned
- **CONTRIBUTING.md** - Guidelines for extending the application
- **docs/gource-reference/** - Architectural insights from Gource study

## 📈 Testing Notes

**Current Test Coverage:**
- Solar system layout with various tree depths
- Hierarchical focus mode navigation
- All 3 color modes (file type, last modified, author)
- Commit siblings highlighting
- Label visibility in Always On and Hover modes
- Repository switching
- Collapsible UI panels
- Hover highlighting and tooltips

**Known Limitations:**
- Very large repositories (10K+ files) not yet tested
- Performance with deep hierarchies (10+ levels) unknown
- No automated tests yet (manual testing only)

## 📄 License

MIT

## 🙏 Acknowledgments

- **Gource** - Inspiration for real-time repository visualization
- **CodeScene** - Inspiration for code quality metrics focus
- **Three.js** - Excellent 3D rendering library
- **React team** - For providing a large, real-world test repository

---

**Repository:** https://github.com/paulrayner/code-evolution-viz

*Last Updated: 2025-10-18*
*Status: MVP Slices 1 & 2 Complete*
*Next: Testing & Slice 3 (Commit Frequency)*
