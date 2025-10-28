/**
 * Pure HTML builders for legend items
 * Extracted from main.ts populateLegend and updateLegendForColorMode functions
 */

export interface FileTypeInfo {
  name: string;
  hex: string;
  count: number;
}

export interface LegendItemWithCountAndPercent {
  name: string;
  hex: string;
  count: number;
  percentage: string;
}

export interface GenericLegendItem {
  name: string;
  hex: string;
}

/**
 * Build HTML for a directory legend item (no checkbox)
 * Pure function - no side effects
 */
export function buildDirectoryLegendItemHTML(directoryColor: { name: string; hex: string }): string {
  return `
    <div class="legend-cube" style="background: ${directoryColor.hex};"></div>
    <span class="legend-label">${directoryColor.name}</span>
  `;
}

/**
 * Build HTML for a file type legend item (with checkbox)
 * Pure function - no side effects
 */
export function buildFileTypeLegendItemHTML(fileType: FileTypeInfo): string {
  return `
      <input type="checkbox" class="legend-checkbox" data-category="${fileType.name}" checked>
      <div class="legend-color" style="background: ${fileType.hex};"></div>
      <span class="legend-label">${fileType.name} (${fileType.count})</span>
    `;
}

/**
 * Build HTML for "Other" legend item (with checkbox)
 * Pure function - no side effects
 */
export function buildOtherLegendItemHTML(count: number): string {
  return `
      <input type="checkbox" class="legend-checkbox" data-category="Other" checked>
      <div class="legend-color" style="background: #aaa;"></div>
      <span class="legend-label">Other (${count})</span>
    `;
}

/**
 * Build HTML for interval/time-based legend item with count and percentage (with checkbox)
 * EXACT copy from main.ts:2540-2544
 * Pure function - no side effects
 */
export function buildIntervalLegendItemHTML(item: LegendItemWithCountAndPercent, fileLabel: string): string {
  return `
        <input type="checkbox" class="legend-checkbox" data-category="${item.name}" checked>
        <div class="legend-color" style="background: ${item.hex};"></div>
        <span class="legend-label">${item.name} <span style="color: #888;">(${item.count} ${fileLabel}, ${item.percentage}%)</span></span>
      `;
}

/**
 * Build HTML for generic color mode legend item (with checkbox)
 * EXACT copy from main.ts:2560-2564
 * Pure function - no side effects
 */
export function buildGenericLegendItemHTML(item: GenericLegendItem): string {
  return `
        <input type="checkbox" class="legend-checkbox" data-category="${item.name}" checked>
        <div class="legend-color" style="background: ${item.hex};"></div>
        <span class="legend-label">${item.name}</span>
      `;
}

/**
 * Build HTML for author legend item with count and percentage (with checkbox)
 * EXACT copy from main.ts:2607-2611
 * Pure function - no side effects
 */
export function buildAuthorLegendItemHTML(
  author: string,
  color: string,
  count: number,
  percentage: string,
  fileLabel: string
): string {
  return `
        <input type="checkbox" class="legend-checkbox" data-category="${author}" checked>
        <div class="legend-color" style="background: ${color};"></div>
        <span class="legend-label">${author} <span style="color: #888;">(${count} ${fileLabel}, ${percentage}%)</span></span>
      `;
}

/**
 * Build HTML for overflow message (no checkbox)
 * EXACT copy from main.ts:2628-2630
 * Pure function - no side effects
 */
export function buildOverflowMessageHTML(moreCount: number, coveragePercent: string): string {
  return `
        <span class="legend-label" style="color: #888; font-style: italic;">...and ${moreCount} more (${coveragePercent}% coverage shown)</span>
      `;
}
