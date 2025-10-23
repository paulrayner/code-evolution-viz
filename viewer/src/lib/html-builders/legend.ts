/**
 * Pure HTML builders for legend items
 * Extracted from main.ts populateLegend function
 */

export interface FileTypeInfo {
  name: string;
  hex: string;
  count: number;
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
