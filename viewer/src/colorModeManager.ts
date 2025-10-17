import { FileNode } from './types';
import { getColorForExtension } from './colorScheme';

export type ColorMode = 'fileType' | 'lastModified' | 'author';

export interface ColorInfo {
  hex: string;
  name: string;
}

/**
 * Palette of maximally distinct colors for author visualization
 * Ordered to maximize contrast between adjacent colors
 */
const AUTHOR_COLORS = [
  '#e6194B', // Red
  '#3cb44b', // Green
  '#4363d8', // Blue
  '#f58231', // Orange
  '#911eb4', // Purple
  '#42d4f4', // Cyan
  '#f032e6', // Magenta
  '#bfef45', // Lime
  '#800000', // Maroon
  '#aaffc3', // Mint
  '#000075', // Navy
  '#ffe119', // Yellow
  '#469990', // Teal
  '#fabed4', // Pink
  '#9A6324', // Brown
  '#dcbeff', // Lavender
  '#808000', // Olive
  '#00ffff', // Aqua
  '#a9a9a9', // Gray
  '#ffd8b1', // Apricot
  '#e6beff', // Mauve
  '#aa6e28', // Tan
  '#fffac8', // Beige
  '#ffffff', // White
];

/**
 * Cache for author name to color index mapping
 * Used to ensure consistent colors across the application
 */
const authorColorCache = new Map<string, number>();
let nextColorIndex = 0;

/**
 * Reset the author color cache
 * Called when switching repositories
 */
export function resetAuthorColors(): void {
  authorColorCache.clear();
  nextColorIndex = 0;
}

/**
 * Pre-assign colors to authors based on their rank (by file count)
 * This ensures top contributors get the most distinct colors
 */
export function assignAuthorColors(authorsByRank: string[]): void {
  resetAuthorColors();
  for (const author of authorsByRank) {
    if (!authorColorCache.has(author)) {
      authorColorCache.set(author, nextColorIndex % AUTHOR_COLORS.length);
      nextColorIndex++;
    }
  }
}

/**
 * Generate a consistent color for an author name using a distinct color palette
 * Colors are assigned based on first-seen order (typically by contributor rank)
 */
function getColorForAuthor(author: string | null): ColorInfo {
  if (!author) {
    return { hex: '#666666', name: 'Unknown' };
  }

  // Get or assign color index
  let index = authorColorCache.get(author);
  if (index === undefined) {
    index = nextColorIndex % AUTHOR_COLORS.length;
    authorColorCache.set(author, index);
    nextColorIndex++;
  }

  const hex = AUTHOR_COLORS[index];

  return { hex, name: author };
}

/**
 * Get color for a file based on the selected color mode
 */
export function getColorForFile(file: FileNode, mode: ColorMode): ColorInfo {
  switch (mode) {
    case 'fileType':
      return getColorForExtension(file.extension);

    case 'lastModified':
      return getColorByLastModified(file.lastModified);

    case 'author':
      return getColorForAuthor(file.lastAuthor);

    default:
      return getColorForExtension(file.extension);
  }
}

/**
 * Color files based on when they were last modified
 */
function getColorByLastModified(lastModified: string | null): ColorInfo {
  if (!lastModified) {
    return { hex: '#666666', name: 'Unknown' };
  }

  const now = new Date();
  const modifiedDate = new Date(lastModified);
  const daysSince = (now.getTime() - modifiedDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSince < 1) {
    return { hex: '#00ff88', name: 'Last 24 hours' };
  } else if (daysSince < 7) {
    return { hex: '#a4dd00', name: 'Last week' };
  } else if (daysSince < 30) {
    return { hex: '#ff9500', name: 'Last month' };
  } else if (daysSince < 90) {
    return { hex: '#ff4444', name: 'Last 3 months' };
  } else {
    return { hex: '#666666', name: 'Older than 3 months' };
  }
}

/**
 * Get legend items for the current color mode
 */
export function getLegendItems(mode: ColorMode): ColorInfo[] {
  switch (mode) {
    case 'lastModified':
      return [
        { hex: '#00ff88', name: 'Last 24 hours' },
        { hex: '#a4dd00', name: 'Last week' },
        { hex: '#ff9500', name: 'Last month' },
        { hex: '#ff4444', name: 'Last 3 months' },
        { hex: '#666666', name: 'Older than 3 months' }
      ];

    case 'author':
      // For author mode, legend is populated dynamically based on authors present
      return [];

    case 'fileType':
      // For file type mode, legend is populated dynamically based on files present
      return [];

    default:
      return [];
  }
}

/**
 * Get display name for color mode
 */
export function getColorModeName(mode: ColorMode): string {
  switch (mode) {
    case 'fileType':
      return 'File Type';
    case 'lastModified':
      return 'Last Modified';
    case 'author':
      return 'Author';
    default:
      return 'Unknown';
  }
}
