# Claude Code Context for CodeCohesion

## Critical Development Notes

### Viewer Source Files & Dev Server Issues

**IMPORTANT:** The `viewer/` app uses **TypeScript source files** (`.ts` extensions):
- Source files: `viewer/src/*.ts` (TreeVisualizer.ts, main.ts, colorModeManager.ts, etc.)
- Vite dev server transpiles TypeScript on-the-fly
- **NEVER** commit compiled `.js` files to `viewer/src/` - they are build artifacts only

#### Common Dev Server Caching Issues

If changes to TypeScript source files aren't appearing in the browser:

1. **Check for stale compiled `.js` files:**
   ```bash
   ls viewer/src/*.js
   # If any exist, they are stale artifacts that shadow the .ts files
   rm viewer/src/*.js  # Delete them
   ```

2. **Restart the Vite dev server:**
   ```bash
   # Kill existing server, then:
   cd viewer && npm run dev
   ```

3. **Clear browser cache:**
   - Open DevTools (F12)
   - Network tab → Check "Disable cache"
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)

4. **Remove stale dist/ directory:**
   ```bash
   cd viewer && rm -rf dist/
   ```

#### Why This Happens

- Previous builds may have generated `.js` files in `src/`
- These compiled files take precedence over `.ts` files in module resolution
- Vite tries to load the `.js` files first, ignoring the updated TypeScript source
- Deleting `.js` files forces Vite to transpile the `.ts` source files properly

### Color Mode Legend Order

Legend items are rendered **top-to-bottom** in the order they appear in the array returned by `getLegendItems()` in `colorModeManager.ts`:
- First item in array → Appears at TOP of legend
- Last item in array → Appears at BOTTOM of legend

For "hotspot" visualizations (Churn, Contributors), order should be **high-to-low** (most significant at top):
```typescript
case 'churn':
  return [
    { hex: '#c0392b', name: 'Extremely high (50+ commits)' },  // TOP
    // ...
    { hex: '#3498db', name: 'Low churn (1-2 commits)' }        // BOTTOM
  ];
```

## Project Structure

```
codecohesion/
├── processor/          # Node.js analyzer (TypeScript)
│   ├── src/*.ts       # TypeScript source files
│   └── output/        # Generated .json analysis files
└── viewer/            # 3D visualization (TypeScript + Vite)
    ├── src/*.ts       # TypeScript source files (NEVER commit .js here!)
    ├── public/data/   # JSON data files (NOT a symlink - copy files here manually)
    └── index.html     # Entry point with inline styles
```

## Common Commands

### Processor (Analysis)
```bash
cd processor
npm run dev -- ../path/to/repo                           # Static analysis (V1 format)
npm run analyze:full-delta -- ../path/to/repo --full-delta  # Timeline V2 (delta-compressed, with tags)
```

**Timeline V2 Format:**
- Uses delta compression for smaller file sizes
- Supports git tags and tag navigation
- Outputs to `processor/output/{repo-name}-timeline-full.json`
- Format identifier: `"format": "timeline-v2"`

### Viewer (Visualization)
```bash
cd viewer
npm run dev      # Start dev server (usually port 3000, or next available)
npm run build    # Build for production (outputs to dist/)
```

## Development Workflow

1. **Analyzing a repository:**
   - Run processor to generate `.json` file in `processor/output/`
   - **IMPORTANT:** Manually copy the generated file to `viewer/public/data/`
   - Example: `cp processor/output/repo-timeline-full.json viewer/public/data/`

2. **Adding new repository to viewer:**
   - After copying the JSON file, update `viewer/public/data/repos.json`
   - Add the filename (without `.json` extension) to the `repos` array
   - V2 timeline files use `-timeline-full` suffix (e.g., `cbioportal-timeline-full`)
   - The order in `repos.json` determines the dropdown order (V2 files should be listed first)

3. **Making viewer changes:**
   - Edit TypeScript files in `viewer/src/*.ts`
   - Vite hot-reloads automatically
   - If changes don't appear, see "Common Dev Server Caching Issues" above

## Key Files

- `viewer/src/colorModeManager.ts` - Color scheme logic and legend generation
- `viewer/src/main.ts` - Main application logic, UI event handlers
- `viewer/src/TreeVisualizer.ts` - Three.js 3D rendering engine
- `processor/src/analyze.ts` - Git metadata collection and analysis


### Git Commit Strategy

- **Auto-commit by default**: Commit and push changes automatically after significant work, unless user specifically asks to review first
- **Group related changes**: Bundle logical changes together in single commits
- **Descriptive commit messages**: Use clear, structured commit messages explaining the changes and impact


### Conventional Commits Format
Use the following format for commit messages:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature for the user
- `fix`: Bug fix for the user
- `docs`: Changes to documentation
- `config`: Changes to configuration files, Claude settings, or environment setup (no application code changes)
- `tidy`: Refactoring production code (eg. renaming a variable), or change formatting (e.g. change line spacing, etc); no behavioral change to application
- `test`: Adding missing tests or correcting existing tests (no production code change, only changes to tests)

**Examples:**
- `feat: add payment validation`
- `fix: correct date formatting in payment processor`
- `config: add notification preferences to CLAUDE.md`
- `tidy: extract payment validation logic`
- `test: add edge cases for payment validation`
- `feat(auth): add OAuth2 integration`
- `fix(ui): resolve button alignment on mobile devices`

**Guidelines:**
- Include test changes with feature changes in the same commit when they're directly related
- Use lowercase for type and description
- Keep the description under 50 characters when possible
- Use the body to explain what and why vs. how
- Breaking changes should include `BREAKING CHANGE:` in the footer or `!` after the type/scope

## Planning work

- when planning features, organize steps/tasks based on slices of user value (i.e. user flows/use cases) rather than technical areas
- Each slice should be independently testable and deliver user value

## Changelog Maintenance

When releasing a new version:
1. Add new section at top: `## [X.Y.Z] - YYYY-MM-DD`
2. List changes as flat bullet points (no category headers)
3. Maintain ordering: Added items first, then Changed items, then Fixed items
4. Update version in `viewer/package.json` and `processor/package.json`

**Versioning (SemVer):**
- Minor (0.x.0): Major new features (Timeline, Filtering, etc.)
- Patch (0.x.y): Bug fixes and incremental enhancements

Keep entries simple, user-facing, no technical jargon.
