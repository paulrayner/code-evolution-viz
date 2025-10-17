import { FileNode } from './types';
import { getColorForExtension } from './colorScheme';

export type ColorMode = 'fileType' | 'lastModified' | 'author';

export interface ColorInfo {
  hex: string;
  name: string;
}

/**
 * Generate a consistent color for an author name using hash-based HSL
 */
function getColorForAuthor(author: string | null): ColorInfo {
  if (!author) {
    return { hex: '#666666', name: 'Unknown' };
  }

  // Simple string hash function
  let hash = 0;
  for (let i = 0; i < author.length; i++) {
    hash = author.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Map hash to hue (60-300° to avoid red which is used for other things)
  const hue = (Math.abs(hash) % 240) + 60;
  const saturation = 70;
  const lightness = 60;

  // Convert HSL to hex
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = '#' + toHex(r) + toHex(g) + toHex(b);
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
