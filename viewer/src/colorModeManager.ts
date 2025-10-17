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
 * State for percentile-based last modified intervals
 */
interface LastModifiedInterval {
  minDate: Date;  // Lower bound of this interval (inclusive)
  maxDate: Date;  // Upper bound of this interval (inclusive)
  label: string;  // e.g., "Newest 20%: 2022-2025"
  hex: string;    // Color for this interval
}

let lastModifiedIntervals: LastModifiedInterval[] = [];

/**
 * Reset the author color cache
 * Called when switching repositories
 */
export function resetAuthorColors(): void {
  authorColorCache.clear();
  nextColorIndex = 0;
}

/**
 * Calculate percentile-based intervals for last modified dates
 * This creates 7 buckets with finer granularity for newer files
 * Only uses percentile intervals for "stale" repos (no changes in last 90 days)
 */
export function calculateLastModifiedIntervals(dates: string[]): void {
  if (dates.length === 0) {
    lastModifiedIntervals = [];
    return;
  }

  // Sort dates chronologically
  const sortedDates = dates
    .map(d => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  const count = sortedDates.length;

  // Check if repo is active by looking at the 80th percentile
  // If 80% of files have been modified in the last 90 days, consider it "active"
  const now = new Date();
  const p80Index = Math.floor(count * 0.8);
  const date80thPercentile = sortedDates[p80Index];
  const daysSince80thPercentile = (now.getTime() - date80thPercentile.getTime()) / (1000 * 60 * 60 * 24);

  // If 80% of files are newer than 90 days, use fixed intervals (active repo)
  // Otherwise use percentile intervals (stale repo)
  if (daysSince80thPercentile < 90) {
    lastModifiedIntervals = [];
    return;
  }

  // Calculate percentile indices (5%, 10%, 20%, 40%, 60%, 80%, 90%, 95%, 100%)
  const p20 = Math.floor(count * 0.2) - 1;
  const p40 = Math.floor(count * 0.4) - 1;
  const p60 = Math.floor(count * 0.6) - 1;
  const p80 = Math.floor(count * 0.8) - 1;
  const p90 = Math.floor(count * 0.9) - 1;
  const p95 = Math.floor(count * 0.95) - 1;
  const p100 = count - 1;

  // Get the dates at each percentile
  const oldestDate = sortedDates[0];
  const date20 = sortedDates[Math.max(0, p20)];
  const date40 = sortedDates[Math.max(0, p40)];
  const date60 = sortedDates[Math.max(0, p60)];
  const date80 = sortedDates[Math.max(0, p80)];
  const date90 = sortedDates[Math.max(0, p90)];
  const date95 = sortedDates[Math.max(0, p95)];
  const newestDate = sortedDates[count - 1];

  // Helper to format year range
  const formatYearRange = (start: Date, end: Date): string => {
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    return startYear === endYear ? `${startYear}` : `${startYear}-${endYear}`;
  };

  // Create intervals (ordered from newest to oldest for display)
  lastModifiedIntervals = [
    {
      minDate: date95,
      maxDate: newestDate,
      label: `Newest 5%: ${formatYearRange(date95, newestDate)}`,
      hex: '#00ff88'  // Bright green
    },
    {
      minDate: date90,
      maxDate: date95,
      label: `5-10%: ${formatYearRange(date90, date95)}`,
      hex: '#ccff00'  // Yellow
    },
    {
      minDate: date80,
      maxDate: date90,
      label: `10-20%: ${formatYearRange(date80, date90)}`,
      hex: '#ffaa00'  // Orange-yellow
    },
    {
      minDate: date60,
      maxDate: date80,
      label: `20-40%: ${formatYearRange(date60, date80)}`,
      hex: '#ff8800'  // Orange
    },
    {
      minDate: date40,
      maxDate: date60,
      label: `40-60%: ${formatYearRange(date40, date60)}`,
      hex: '#ff5500'  // Red-orange
    },
    {
      minDate: date20,
      maxDate: date40,
      label: `60-80%: ${formatYearRange(date20, date40)}`,
      hex: '#cc3333'  // Red
    },
    {
      minDate: oldestDate,
      maxDate: date20,
      label: `Oldest 20%: ${formatYearRange(oldestDate, date20)}`,
      hex: '#666666'  // Gray
    }
  ];
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
 * Uses percentile-based intervals if calculated, otherwise falls back to fixed intervals
 */
function getColorByLastModified(lastModified: string | null): ColorInfo {
  if (!lastModified) {
    return { hex: '#666666', name: 'Unknown' };
  }

  const modifiedDate = new Date(lastModified);

  // Use percentile intervals if available
  if (lastModifiedIntervals.length > 0) {
    for (const interval of lastModifiedIntervals) {
      if (modifiedDate >= interval.minDate && modifiedDate <= interval.maxDate) {
        return { hex: interval.hex, name: interval.label };
      }
    }
    // Fallback to oldest interval if date is older than all intervals
    const oldestInterval = lastModifiedIntervals[lastModifiedIntervals.length - 1];
    return { hex: oldestInterval.hex, name: oldestInterval.label };
  }

  // Fallback to extended fixed time intervals if percentiles not calculated
  const now = new Date();
  const daysSince = (now.getTime() - modifiedDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSince < 7) {
    return { hex: '#00ff88', name: 'Last week' };
  } else if (daysSince < 30) {
    return { hex: '#ccff00', name: '1 week - 1 month' };
  } else if (daysSince < 90) {
    return { hex: '#ffaa00', name: '1-3 months' };
  } else if (daysSince < 180) {
    return { hex: '#ff8800', name: '3-6 months' };
  } else if (daysSince < 365) {
    return { hex: '#ff5500', name: '6 months - 1 year' };
  } else if (daysSince < 730) {
    return { hex: '#cc3333', name: '1-2 years' };
  } else {
    return { hex: '#666666', name: 'Older than 2 years' };
  }
}

/**
 * Check if percentile-based intervals are active
 */
export function isUsingPercentileIntervals(): boolean {
  return lastModifiedIntervals.length > 0;
}

/**
 * Get legend items for the current color mode
 */
export function getLegendItems(mode: ColorMode): ColorInfo[] {
  switch (mode) {
    case 'lastModified':
      // Use percentile intervals if calculated
      if (lastModifiedIntervals.length > 0) {
        return lastModifiedIntervals.map(interval => ({
          hex: interval.hex,
          name: interval.label
        }));
      }
      // Fallback to extended fixed intervals
      return [
        { hex: '#00ff88', name: 'Last week' },
        { hex: '#ccff00', name: '1 week - 1 month' },
        { hex: '#ffaa00', name: '1-3 months' },
        { hex: '#ff8800', name: '3-6 months' },
        { hex: '#ff5500', name: '6 months - 1 year' },
        { hex: '#cc3333', name: '1-2 years' },
        { hex: '#666666', name: 'Older than 2 years' }
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
