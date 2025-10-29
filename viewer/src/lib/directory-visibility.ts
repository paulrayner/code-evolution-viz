/**
 * Determines whether directory nodes should be hidden in the visualization.
 *
 * In 2D Force-Directed layouts, directories are hidden to show only files,
 * providing a cleaner view focused on file-level structure and relationships.
 *
 * In 3D Hierarchical layouts, directories are shown as visual containers
 * to represent the folder hierarchy.
 *
 * @param is2DLayout Whether the current layout is 2D Force-Directed
 * @returns true if directories should be hidden, false otherwise
 */
export function shouldHideDirectoryNodes(is2DLayout: boolean): boolean {
  return is2DLayout;
}
