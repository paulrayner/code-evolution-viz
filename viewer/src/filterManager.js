import { getColorForFile } from './colorModeManager';
/**
 * Manages filtering of files based on legend category selection
 * HEAD view only - not used in timeline modes
 */
export class FilterManager {
    constructor() {
        this.activeCategories = new Set();
        this.currentMode = 'fileType';
    }
    /**
     * Set which legend categories are currently active (visible)
     * @param categories - Array of category names (e.g., ["High churn", "Very high churn"])
     */
    setActiveCategories(categories, mode) {
        this.activeCategories = new Set(categories);
        this.currentMode = mode;
    }
    /**
     * Clear all active filters
     */
    clearFilters() {
        this.activeCategories.clear();
    }
    /**
     * Check if any filters are active
     */
    hasActiveFilters() {
        return this.activeCategories.size > 0;
    }
    /**
     * Get the set of currently active category names
     */
    getActiveCategories() {
        return Array.from(this.activeCategories);
    }
    /**
     * Check if a file matches the current filter criteria
     * If no filters are active, all files match
     * @param file - File node to check
     * @param mode - Current color mode
     * @returns true if file should be visible, false if filtered out
     */
    matchesFilter(file, mode) {
        // No filters active = everything visible
        if (this.activeCategories.size === 0) {
            return true;
        }
        // Get the category this file belongs to for the current color mode
        const colorInfo = getColorForFile(file, mode);
        // File matches if its category is in the active set
        return this.activeCategories.has(colorInfo.name);
    }
    /**
     * Get set of file paths that match current filter
     * Used for efficient lookup during rendering
     * @param tree - Root directory node
     * @param mode - Current color mode
     * @returns Set of file paths that should be visible
     */
    getFilteredFilePaths(tree, mode) {
        const visiblePaths = new Set();
        const traverse = (node) => {
            if (node.type === 'file') {
                if (this.matchesFilter(node, mode)) {
                    visiblePaths.add(node.path);
                }
            }
            else {
                // Recursively check directory children
                for (const child of node.children) {
                    traverse(child);
                }
            }
        };
        traverse(tree);
        return visiblePaths;
    }
    /**
     * Check if a directory should be visible based on descendant files
     * A directory is visible if ANY descendant file matches the filter
     * @param dir - Directory node to check
     * @param mode - Current color mode
     * @returns true if directory has visible descendants
     */
    hasVisibleDescendants(dir, mode) {
        // No filters = all directories visible
        if (this.activeCategories.size === 0) {
            return true;
        }
        const checkDescendants = (node) => {
            if (node.type === 'file') {
                return this.matchesFilter(node, mode);
            }
            else {
                // Directory: check if any child matches
                for (const child of node.children) {
                    if (checkDescendants(child)) {
                        return true;
                    }
                }
                return false;
            }
        };
        // Check all children
        for (const child of dir.children) {
            if (checkDescendants(child)) {
                return true;
            }
        }
        return false;
    }
}
