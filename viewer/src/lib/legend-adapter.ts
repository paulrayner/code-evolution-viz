/**
 * Adapter layer for legend item creation
 * Bridges pure HTML builders with DOM manipulation and event handling
 */

/**
 * Creates a legend item DOM element from HTML content and attaches event handlers
 *
 * @param htmlContent - The inner HTML for the legend item (from builder functions)
 * @param onFilterChange - Callback function for checkbox change events
 * @param elementType - The element type to create ('label' for items with checkboxes, 'div' for static items)
 * @returns The constructed DOM element ready to be appended to the legend
 */
export function createLegendItem(
  htmlContent: string,
  onFilterChange: () => void,
  elementType: 'label' | 'div' = 'label'
): HTMLElement {
  const legendItem = document.createElement(elementType);
  legendItem.className = 'legend-item';
  legendItem.innerHTML = htmlContent;

  // Only attach event listeners if this is a label element (which contains checkboxes)
  if (elementType === 'label') {
    const checkbox = legendItem.querySelector('.legend-checkbox') as HTMLInputElement;
    if (checkbox) {
      checkbox.addEventListener('change', onFilterChange);
    }
  }

  return legendItem;
}
