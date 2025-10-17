# Contributing Guidelines

## Adding New Color Modes

When adding a new visualization color mode (like "author", "lastModified", etc.), follow these steps to ensure everything works correctly:

### 1. Processor Changes

**File: `processor/src/analyze.ts`**

- Add a new method to collect the git metadata (e.g., `getLastAuthor()`)
- Update the `analyze()` method to collect this data for each file
- Optimize: Combine multiple git queries into one when possible to avoid performance issues
- Update the `buildTree()` method's type signature if needed

**File: `processor/src/types.ts`**

- Add the new field to the `FileNode` interface (e.g., `lastAuthor: string | null`)

### 2. Viewer Type Updates

**File: `viewer/src/types.ts`**

- Mirror the processor's `FileNode` interface changes exactly
- This ensures type safety between processor output and viewer input

### 3. Color Mode Manager

**File: `viewer/src/colorModeManager.ts`**

Add the new mode in these specific locations:

1. **Update ColorMode type:**
   ```typescript
   export type ColorMode = 'fileType' | 'lastModified' | 'author' | 'newMode';
   ```

2. **Add coloring function:**
   ```typescript
   function getColorForNewMode(value: string | null): ColorInfo {
     // Your color logic here
     return { hex: '#...', name: 'Label' };
   }
   ```

3. **Update getColorForFile():**
   ```typescript
   case 'newMode':
     return getColorForNewMode(file.newField);
   ```

4. **Update getLegendItems():**
   ```typescript
   case 'newMode':
     // Return static legend items, OR
     return [];  // if legend is populated dynamically
   ```

5. **Update getColorModeName():**
   ```typescript
   case 'newMode':
     return 'Display Name';
   ```

### 4. UI Integration

**File: `viewer/index.html`**

- Add the new option to the color mode dropdown:
  ```html
  <option value="newMode">Display Name</option>
  ```

**File: `viewer/src/main.ts`**

#### Update Global State (if needed)
- Ensure `currentSnapshot` is available if your legend needs it

#### Update Legend Logic

In `updateLegendForColorMode()`, handle your new mode:

```typescript
else if (mode === 'newMode' && currentSnapshot) {
  // Collect unique values from repository
  const values = new Set<string>();
  const collectValues = (node: TreeNode) => {
    if (node.type === 'file' && node.newField) {
      values.add(node.newField);
    } else if (node.type === 'directory') {
      for (const child of node.children) {
        collectValues(child);
      }
    }
  };
  collectValues(currentSnapshot.tree);

  // Generate legend items with colors
  for (const value of Array.from(values).sort()) {
    const colorInfo = getColorForFile({ newField: value } as FileNode, 'newMode');
    // ... create legend item
  }
}
```

#### Update Color Mode Selector Event Handler

In the `colorModeSelector.addEventListener('change')` handler:

```typescript
// Update legend for new color mode
if (newMode === 'fileType' && currentSnapshot) {
  populateLegend(currentSnapshot);
} else {
  updateLegendForColorMode(newMode);
}
```

**CRITICAL:** Always check if `newMode === 'fileType'` first and call `populateLegend()` for file type mode!

#### Update TreeVisualizer Color Application

**File: `viewer/src/TreeVisualizer.ts`**

The color mode manager handles file coloring automatically via `getColorForFile()`, but you need to ensure:

1. **Files are colored correctly:** Already handled if you updated `getColorForFile()`
2. **Directories are colored correctly:** Update directory coloring logic if needed

For directories, add logic in the `createVisuals()` method:

```typescript
// Color based on current mode
let color: number;
if (this.colorMode === 'newMode') {
  // Find representative file in directory
  const representativeFile = this.findRepresentativeFile(dirNode);
  if (representativeFile && representativeFile.newField) {
    const colorInfo = getColorForFile(representativeFile, this.colorMode);
    color = parseInt(colorInfo.hex.replace('#', ''), 16);
  } else {
    color = 0x666666; // Gray for unknown
  }
} else if (this.colorMode === 'lastModified') {
  // ... existing logic
}
```

### 5. UI Details Display (Optional)

If users should see the new field value when clicking nodes:

**File: `viewer/src/main.ts`**

Update these functions:

1. **showFileDetails():** Add info row for the new field
2. **showDirectoryDetails():** Add logic to find representative value from children
3. **showTooltip():** Add the new field to hover tooltips

Example:
```typescript
const newFieldStr = file.newField || 'Unknown';

contentEl.innerHTML = `
  ...
  <div class="info-row">
    <span class="label">Field Label</span>
    <span class="value">${newFieldStr}</span>
  </div>
`;
```

### 6. Re-analyze Repositories

After making all code changes:

```bash
cd processor
npm run dev /path/to/repo repo-name
cp repo-name ../viewer/public/data/repo-name.json
```

Re-analyze all test repositories to include the new metadata.

## Common Pitfalls

### Legend Not Showing

**Problem:** New color mode legend appears empty

**Solution:**
- Check that `updateLegendForColorMode()` handles your mode correctly
- If using dynamic legend, ensure `currentSnapshot` is available
- Verify the color mode selector event handler calls the right function

### Files All Same Color

**Problem:** All files show the same color despite having different values

**Solutions:**
- Ensure processor actually collected the data (check generated JSON)
- Verify `getColorForFile()` switch statement includes your case
- Check that your color generation function returns unique colors
- For hash-based colors, ensure hash function produces good distribution

### TypeScript Compilation Errors

**Problem:** Type errors after adding new field

**Solutions:**
- Update both `processor/src/types.ts` AND `viewer/src/types.ts` identically
- Update the `buildTree()` method's type signature in processor
- Ensure all places that construct `FileNode` objects include the new field

### Performance Issues

**Problem:** Analysis takes too long for large repositories

**Solutions:**
- Combine multiple git queries into one method
- Use progress indicators (every 100 files)
- Cache git metadata lookups if possible
- Consider batching git operations

### Data Not Persisting After Reload

**Problem:** New data field is null after re-analyzing

**Solutions:**
- Verify the processor method actually runs (add console.log)
- Check git log command returns expected data
- Ensure error handling doesn't silently fail and return null
- Verify the field is included in the JSON output

## Testing Checklist

Before committing new color mode changes:

- [ ] Processor compiles without errors
- [ ] Viewer compiles without errors
- [ ] Re-analyzed at least 2 different repositories
- [ ] Verified data appears in generated JSON files
- [ ] Tested switching between all color modes
- [ ] Verified legend updates correctly for each mode
- [ ] File type mode legend still works when switching back
- [ ] Checked file details panel shows new data
- [ ] Checked directory details panel shows new data
- [ ] Checked hover tooltips show new data
- [ ] Tested with repository that has missing data (nulls)
- [ ] Verified performance is acceptable on large repos (React)

## Architecture Overview

```
Data Flow:
processor/analyze.ts → Git queries → Build tree with metadata
                                    ↓
                            JSON file output
                                    ↓
viewer/main.ts → Load data → currentSnapshot (global)
                                    ↓
                        TreeVisualizer.visualize()
                                    ↓
                        Color files/dirs using colorModeManager
                                    ↓
                        Update legend via updateLegendForColorMode()
```

## File Responsibilities

| File | Responsibility |
|------|----------------|
| `processor/src/analyze.ts` | Git metadata collection, tree building |
| `processor/src/types.ts` | Data structure definitions (processor side) |
| `viewer/src/types.ts` | Data structure definitions (viewer side, must match processor) |
| `viewer/src/colorModeManager.ts` | All color calculation logic, centralized |
| `viewer/src/TreeVisualizer.ts` | 3D rendering, applies colors from manager |
| `viewer/src/main.ts` | UI coordination, legend updates, event handlers |
| `viewer/index.html` | UI structure, dropdown options |

## Color Mode Manager Contract

The color mode manager must implement these functions for each mode:

1. **`getColorForFile(file, mode)`** - Returns color for a single file
2. **`getLegendItems(mode)`** - Returns static legend items, or `[]` for dynamic
3. **`getColorModeName(mode)`** - Returns human-readable name

If `getLegendItems()` returns `[]`, then `main.ts` must handle dynamic legend generation in `updateLegendForColorMode()`.

## Global State Management

The viewer maintains these global variables:

- **`currentVisualizer`** - The TreeVisualizer instance (singleton per page)
- **`currentSnapshot`** - The loaded repository data (updated on repo switch)

Both must be available for:
- Color mode switching
- Dynamic legend generation
- Repository switching

## Questions?

If you're unsure about any step:
1. Look at existing color modes (`lastModified`, `author`) as examples
2. Check git history for how they were implemented
3. Test incrementally - add one piece at a time
