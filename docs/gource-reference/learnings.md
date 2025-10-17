# Learnings from Gource

**Gource Repository**: https://github.com/acaudwell/Gource
**Local Reference**: ~/Documents/Gource

Gource is a well-designed C++/OpenGL visualization tool for source control. While we're building a different product (web-based, metric-focused, bidirectional), there are valuable architectural patterns and design decisions to learn from.

## Key Architectural Insights

### 1. VCS Format Abstraction (`src/formats/`)

**What they do well**:
- Clean abstraction: `RCommitLog` base class with format-specific implementations
- Each VCS parser (git, svn, hg, bzr, cvs) inherits and implements `parseCommit()`
- Handles edge cases and variations in VCS output formats
- Can auto-detect repository type

**Files to reference**:
- `src/formats/commitlog.h` - Base class defining the interface
- `src/formats/git.cpp` - Git-specific implementation
- `src/logmill.cpp` - Repository detection and log fetching

**What we can adopt**:
- The idea of format-agnostic commit representation (`RCommit` → our TypeScript equivalent)
- Separation between log parsing and visualization logic
- Though we'll use JavaScript/Node.js libraries rather than reimplementing

### 2. Tree Structure (`src/dirnode.cpp`, `src/dirnode.h`)

**What they do well**:
- Hierarchical directory node structure with parent/child relationships
- Each `RDirNode` maintains its position, children, and visual state
- Efficient spatial queries using QuadTree (`src/core/quadtree`)
- Force-directed layout with spring physics for organic movement

**Key concepts**:
- Nodes are positioned relative to parent
- Use of polar coordinates (angle, radius) for child placement
- Smooth transitions when structure changes
- Culling and LOD (level of detail) for performance

**Files to reference**:
- `src/dirnode.cpp` - Tree node implementation and layout logic
- `src/gource.cpp` - `updateDirs()` method for tree updates

**What we can adopt**:
- Hierarchical positioning approach
- Radial layout pattern (children arranged in arc around parent)
- Though we'll pre-compute layouts rather than doing physics simulation

### 3. File and User Entities (`src/file.cpp`, `src/user.cpp`)

**What they do well**:
- Clean entity model: Files and Users as first-class objects
- Files track: position, size, color, actions, last-modified time
- Users track: position, velocity, target file, action history
- Smooth animation between states

**User movement**:
- Users "travel" to files they're modifying
- Pathfinding through directory tree
- Velocity and friction for natural motion
- See `src/user.cpp`: `setTargetFile()`, `updatePosition()`

**What we can adopt**:
- Entity model with state + visual representation
- Smooth interpolation for position changes
- Though we may skip user avatars initially for Slice 1

### 4. Rendering Pipeline (`src/gource.cpp`)

**Gource's render order** (see `draw()` method):
1. Background
2. Bloom effect (optional)
3. Tree edges (lines between directories)
4. File shadows (depth)
5. User shadows
6. Files (main elements)
7. Users (avatars)
8. Actions (visual effects when files change)
9. UI overlay (date, captions)

**Rendering optimizations**:
- VBO (Vertex Buffer Objects) for batched rendering
- Frustum culling (only render visible objects)
- Shader-based effects (bloom, shadows)
- Separate passes for shadows and main scene

**What we can adopt**:
- Render back-to-front for proper transparency
- Use instanced rendering for many similar objects (files)
- Shader effects for polish (bloom, glow)
- Three.js provides these primitives already

### 5. Time Management and Animation

**Key insight**: Gource separates logical time from render time
- `logic(t, dt)` - Update game state
- `draw(t, dt)` - Render current state
- Allows playback speed adjustments without breaking animation

**Commit processing**:
- Commits queued and processed gradually
- `commitqueue` allows time-based reveal of changes
- See `processCommit()` in `src/gource.cpp`

**What we DON'T need**:
- Streaming/queueing (we'll have random access to any point in time)
- But DO need smooth interpolation when seeking

### 6. Camera System (`src/zoomcamera.cpp`)

**Two camera modes**:
1. **Track mode**: Follow activity (center on recent changes)
2. **Overview mode**: Show entire tree

**Camera features**:
- Smooth transitions between positions
- Bounds calculation (where is everything?)
- Automatic zoom to fit content
- Manual control override

**What we can adopt**:
- Automatic framing of content
- Smooth camera transitions
- But Three.js OrbitControls gives us most of this

## What We're Building Differently

### Architecture Differences

| Aspect | Gource | Our Tool |
|--------|--------|----------|
| Language | C++ | TypeScript |
| Rendering | OpenGL | WebGL (Three.js) |
| Timeline | Forward-only stream | Bidirectional, random access |
| Data Model | In-memory state | Snapshot + delta system |
| Metrics | None (just add/modify/delete) | LOC, complexity, churn, coupling |
| Use Case | One-time visualization/video | Interactive exploration & analysis |

### New Features We're Adding

1. **Metrics Analysis** - Complexity, churn, temporal coupling (doesn't exist in Gource)
2. **Timeline Scrubbing** - Jump to any point in time
3. **Comparison Mode** - Side-by-side or diff view
4. **Code Quality Heatmaps** - Color by metrics
5. **Hotspot Detection** - High complexity × high churn
6. **Team Analytics** - Knowledge distribution, ownership

## Implementation Strategy

**Phase 1** (Current - Slice 1):
- Adopt Gource's tree hierarchy concept
- Use radial layout for simplicity
- Focus on getting basic structure rendered
- Skip user avatars, animation, and time for now

**Future Phases**:
- Reference their animation smoothness for timeline playback
- Study their layout algorithm for large codebases
- Look at their performance optimizations if we hit scaling issues

## Conclusion

Gource provides a proven conceptual foundation, but we're building something fundamentally different. Use it as inspiration for layout, animation, and polish, but don't try to port their code. Modern web tools (Three.js, TypeScript) give us better starting points for our specific use case.
