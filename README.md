# Code Evolution Visualizer

Interactive 3D visualization of code repository evolution with focus on code quality metrics, complexity trends, and team dynamics.

## Project Overview

This tool analyzes Git repositories to visualize:
- Repository structure and file organization
- Code metrics over time (LOC, complexity, churn)
- Temporal coupling between files
- Hotspots (high complexity + high churn)
- Team knowledge distribution

**Inspired by**: [Gource](https://gource.io) for visualization approach, [CodeScene](https://codescene.io) for metrics focus.

## Project Structure

```
code-evolution-viz/
├── processor/          # Backend: Repository analyzer
│   ├── src/
│   │   ├── analyze.ts  # Main analysis script
│   │   └── types.ts    # Shared type definitions
│   └── output/         # Generated JSON files
│
├── viewer/             # Frontend: 3D visualization
│   ├── src/
│   │   ├── main.ts              # Entry point
│   │   ├── TreeVisualizer.ts    # Three.js visualization
│   │   └── types.ts             # Type definitions
│   ├── public/
│   │   └── data/                # Data files
│   └── index.html
│
└── docs/
    └── gource-reference/        # Learnings from Gource
```

## Quick Start

### 1. Analyze a Repository

```bash
cd processor
npm install
npm run dev -- /path/to/your/repo
```

This generates `processor/output/repo-data.json` with repository structure and metrics.

### 2. Visualize

```bash
# Copy data to viewer
cp processor/output/repo-data.json viewer/public/data/

# Start viewer
cd viewer
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

### 3. Explore

- **Left-click + drag**: Rotate camera
- **Right-click + drag**: Pan
- **Scroll**: Zoom
- **Click file**: View details

## Current Status: Slice 1

**"See My Codebase Structure with File Sizes"**

✅ Complete features:
- Repository analysis at HEAD commit
- Lines of code calculation per file
- Hierarchical tree visualization
- 3D rendering with Three.js
- File size mapping (larger spheres = more LOC)
- Color coding by file extension
- Interactive file selection

## Roadmap

### Slice 2: Animate History Forward
- Process full repository history
- Timeline playback controls
- Watch structure evolve over time

### Slice 3: Churn Heatmap
- Calculate file modification frequency
- Color files by churn rate
- Identify unstable code

### Slice 4: Complexity Heatmap
- Cyclomatic complexity analysis
- Color by code complexity
- Track complexity trends

### Slice 5: Temporal Coupling
- Detect files that change together
- Visual coupling indicators
- Hidden dependency discovery

### Slice 6: Hotspot Analysis
- Complexity × Churn metric
- Highlight refactoring targets
- ROI-focused insights

### Slice 7: Team Ownership
- Author attribution
- Knowledge distribution
- Bus factor analysis

### Slice 8: Time Comparison
- Compare two points in history
- Delta visualization
- Measure code health changes

### Slice 9: Architecture Analysis
- Module boundary visualization
- Coupling metrics
- Architectural drift detection

### Slice 10: Reports & Sharing
- Generate health reports
- Shareable URLs
- Export capabilities

## Technology Stack

**Processor**:
- TypeScript
- Node.js
- simple-git (Git interaction)

**Viewer**:
- TypeScript
- Three.js (3D rendering)
- Vite (build tool)

**Future additions**:
- lizard (complexity analysis)
- D3.js (charts/timeline)

## Development

Each component has its own README with detailed instructions:
- [Processor README](processor/README.md)
- [Viewer README](viewer/README.md)

## Reference Materials

See [docs/gource-reference/learnings.md](docs/gource-reference/learnings.md) for architectural insights from Gource.

## License

MIT
