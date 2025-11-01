import { ILayoutStrategy } from '../ILayoutStrategy';
import { HierarchicalLayoutStrategy } from '../HierarchicalLayoutStrategy';
import { ForceDirectedLayoutStrategy } from '../ForceDirectedLayoutStrategy';

/**
 * Saved user preferences from localStorage
 */
export interface SavedPreferences {
  labelMode: 'always' | 'hover' | null;
  colorMode: string | null; // ColorMode type
  viewMode: 'navigate' | 'overview' | null;
  layoutMode: string | null; // 'hierarchical' | 'forceDirected'
}

/**
 * Configuration object describing how to initialize a visualizer
 * Pure data structure with no side effects
 */
export interface VisualizerConfiguration {
  theme: 'light' | 'dark';
  labelMode: 'always' | 'hover' | null;
  colorMode: string | null;
  viewMode: 'navigate' | 'overview' | null;
  layoutStrategy: ILayoutStrategy;
}

/**
 * Create a layout strategy instance based on the mode string
 *
 * @param layoutMode - Layout mode string ('hierarchical' or 'forceDirected')
 * @returns Layout strategy instance
 */
export function createLayoutStrategy(layoutMode: string | null): ILayoutStrategy {
  if (layoutMode === 'forceDirected') {
    return new ForceDirectedLayoutStrategy();
  } else {
    // Default to hierarchical
    return new HierarchicalLayoutStrategy();
  }
}

/**
 * Build visualizer configuration from user preferences and theme
 *
 * Pure function - no DOM access, no localStorage access, no side effects
 * Just transforms input preferences into a configuration object
 *
 * @param theme - Current theme ('light' or 'dark')
 * @param preferences - Saved user preferences from localStorage
 * @returns Configuration object describing how to initialize the visualizer
 */
export function buildVisualizerConfig(
  theme: 'light' | 'dark',
  preferences: SavedPreferences
): VisualizerConfiguration {
  return {
    theme,
    labelMode: preferences.labelMode,
    colorMode: preferences.colorMode,
    viewMode: preferences.viewMode,
    layoutStrategy: createLayoutStrategy(preferences.layoutMode),
  };
}
