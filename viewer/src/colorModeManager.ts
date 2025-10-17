import { FileNode } from './types';
import { getColorForExtension } from './colorScheme';

export type ColorMode = 'fileType' | 'lastModified';

export interface ColorInfo {
  hex: string;
  name: string;
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
    default:
      return 'Unknown';
  }
}
