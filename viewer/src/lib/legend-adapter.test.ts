/**
 * Tests for legend-adapter.ts
 * Comprehensive coverage of DOM creation and event handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createLegendItem } from './legend-adapter';

describe('createLegendItem', () => {
  let mockCallback: () => void;

  beforeEach(() => {
    mockCallback = vi.fn();
  });

  describe('Element Creation', () => {
    it('should create a label element by default', () => {
      const html = '<span>Test</span>';
      const element = createLegendItem(html, mockCallback);

      expect(element.tagName).toBe('LABEL');
    });

    it('should create a label element when explicitly specified', () => {
      const html = '<span>Test</span>';
      const element = createLegendItem(html, mockCallback, 'label');

      expect(element.tagName).toBe('LABEL');
    });

    it('should create a div element when specified', () => {
      const html = '<span>Test</span>';
      const element = createLegendItem(html, mockCallback, 'div');

      expect(element.tagName).toBe('DIV');
    });

    it('should add legend-item class to created element', () => {
      const html = '<span>Test</span>';
      const element = createLegendItem(html, mockCallback);

      expect(element.className).toBe('legend-item');
    });

    it('should set innerHTML from provided HTML content', () => {
      const html = '<span class="test">Content</span>';
      const element = createLegendItem(html, mockCallback);

      expect(element.innerHTML).toBe(html);
    });
  });

  describe('Event Handling - Label Elements', () => {
    it('should attach change event to checkbox in label element', () => {
      const html = '<input type="checkbox" class="legend-checkbox"><span>Test</span>';
      const element = createLegendItem(html, mockCallback, 'label');

      const checkbox = element.querySelector('.legend-checkbox') as HTMLInputElement;
      expect(checkbox).toBeTruthy();

      checkbox.dispatchEvent(new Event('change'));
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('should not throw error if checkbox is missing in label element', () => {
      const html = '<span>No checkbox here</span>';

      expect(() => {
        createLegendItem(html, mockCallback, 'label');
      }).not.toThrow();
    });

    it('should handle multiple checkboxes by attaching to first .legend-checkbox', () => {
      const mockCallback2 = vi.fn();
      const html = `
        <input type="checkbox" class="legend-checkbox">
        <input type="checkbox" class="other-checkbox">
        <span>Test</span>
      `;
      const element = createLegendItem(html, mockCallback2, 'label');

      const legendCheckbox = element.querySelector('.legend-checkbox') as HTMLInputElement;
      const otherCheckbox = element.querySelector('.other-checkbox') as HTMLInputElement;

      legendCheckbox.dispatchEvent(new Event('change'));
      expect(mockCallback2).toHaveBeenCalledTimes(1);

      // Other checkbox should not trigger callback (no listener attached)
      mockCallback2.mockClear();
      otherCheckbox.dispatchEvent(new Event('change'));
      expect(mockCallback2).not.toHaveBeenCalled();
    });
  });

  describe('Event Handling - Div Elements', () => {
    it('should not attach event listeners to div elements', () => {
      const html = '<input type="checkbox" class="legend-checkbox"><span>Test</span>';
      const element = createLegendItem(html, mockCallback, 'div');

      const checkbox = element.querySelector('.legend-checkbox') as HTMLInputElement;
      expect(checkbox).toBeTruthy();

      checkbox.click();
      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should handle div with no checkbox gracefully', () => {
      const html = '<span>Static content</span>';

      expect(() => {
        createLegendItem(html, mockCallback, 'div');
      }).not.toThrow();
    });
  });

  describe('Real-World HTML Content', () => {
    it('should handle file type legend item HTML', () => {
      const html = `
        <input type="checkbox" class="legend-checkbox" data-category="TypeScript" checked>
        <div class="legend-color" style="background: #3178c6;"></div>
        <span class="legend-label">TypeScript (42)</span>
      `;
      const element = createLegendItem(html, mockCallback, 'label');

      expect(element.tagName).toBe('LABEL');
      expect(element.className).toBe('legend-item');

      const checkbox = element.querySelector('.legend-checkbox') as HTMLInputElement;
      expect(checkbox.getAttribute('data-category')).toBe('TypeScript');
      expect(checkbox.checked).toBe(true);

      checkbox.dispatchEvent(new Event('change'));
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should handle interval legend item HTML with count and percentage', () => {
      const html = `
        <input type="checkbox" class="legend-checkbox" data-category="Last 7 days" checked>
        <div class="legend-color" style="background: #c0392b;"></div>
        <span class="legend-label">Last 7 days <span style="color: #888;">(15 files, 25.5%)</span></span>
      `;
      const element = createLegendItem(html, mockCallback, 'label');

      const checkbox = element.querySelector('.legend-checkbox') as HTMLInputElement;
      expect(checkbox.getAttribute('data-category')).toBe('Last 7 days');

      const label = element.querySelector('.legend-label');
      expect(label?.textContent).toContain('Last 7 days');
      expect(label?.textContent).toContain('15 files');
      expect(label?.textContent).toContain('25.5%');
    });

    it('should handle author legend item HTML', () => {
      const html = `
        <input type="checkbox" class="legend-checkbox" data-category="John Doe" checked>
        <div class="legend-color" style="background: #e74c3c;"></div>
        <span class="legend-label">John Doe <span style="color: #888;">(87 files, 42.3%)</span></span>
      `;
      const element = createLegendItem(html, mockCallback, 'label');

      const checkbox = element.querySelector('.legend-checkbox') as HTMLInputElement;
      expect(checkbox.getAttribute('data-category')).toBe('John Doe');
    });

    it('should handle overflow message HTML (div element)', () => {
      const html = `
        <span class="legend-label" style="color: #888; font-style: italic;">...and 15 more (85.2% coverage shown)</span>
      `;
      const element = createLegendItem(html, mockCallback, 'div');

      expect(element.tagName).toBe('DIV');
      expect(element.className).toBe('legend-item');

      const label = element.querySelector('.legend-label');
      expect(label?.textContent).toContain('...and 15 more');
      expect(label?.textContent).toContain('85.2% coverage shown');
    });

    it('should handle directory legend item HTML (div element)', () => {
      const html = `
        <div class="legend-cube" style="background: #3498db;"></div>
        <span class="legend-label">Directory</span>
      `;
      const element = createLegendItem(html, mockCallback, 'div');

      expect(element.tagName).toBe('DIV');
      const cube = element.querySelector('.legend-cube');
      expect(cube).toBeTruthy();
    });
  });

  describe('Callback Behavior', () => {
    it('should preserve callback reference across multiple calls', () => {
      const html = '<input type="checkbox" class="legend-checkbox"><span>Test</span>';
      const element = createLegendItem(html, mockCallback, 'label');

      const checkbox = element.querySelector('.legend-checkbox') as HTMLInputElement;

      checkbox.dispatchEvent(new Event('change'));
      checkbox.dispatchEvent(new Event('change'));
      checkbox.dispatchEvent(new Event('change'));

      expect(mockCallback).toHaveBeenCalledTimes(3);
    });

    it('should allow different callbacks for different elements', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const html = '<input type="checkbox" class="legend-checkbox"><span>Test</span>';

      const element1 = createLegendItem(html, callback1, 'label');
      const element2 = createLegendItem(html, callback2, 'label');

      const checkbox1 = element1.querySelector('.legend-checkbox') as HTMLInputElement;
      const checkbox2 = element2.querySelector('.legend-checkbox') as HTMLInputElement;

      checkbox1.dispatchEvent(new Event('change'));
      checkbox2.dispatchEvent(new Event('change'));

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });
});
