import { describe, it, expect } from 'vitest';
import { buildVisualizerConfig, createLayoutStrategy, SavedPreferences } from './visualizer-config';
import { HierarchicalLayoutStrategy } from '../HierarchicalLayoutStrategy';
import { ForceDirectedLayoutStrategy } from '../ForceDirectedLayoutStrategy';

describe('createLayoutStrategy', () => {
  it('should return HierarchicalLayoutStrategy when layoutMode is null', () => {
    const strategy = createLayoutStrategy(null);
    expect(strategy).toBeInstanceOf(HierarchicalLayoutStrategy);
  });

  it('should return HierarchicalLayoutStrategy when layoutMode is "hierarchical"', () => {
    const strategy = createLayoutStrategy('hierarchical');
    expect(strategy).toBeInstanceOf(HierarchicalLayoutStrategy);
  });

  it('should return ForceDirectedLayoutStrategy when layoutMode is "forceDirected"', () => {
    const strategy = createLayoutStrategy('forceDirected');
    expect(strategy).toBeInstanceOf(ForceDirectedLayoutStrategy);
  });

  it('should return HierarchicalLayoutStrategy for unknown layoutMode', () => {
    const strategy = createLayoutStrategy('unknown');
    expect(strategy).toBeInstanceOf(HierarchicalLayoutStrategy);
  });
});

describe('buildVisualizerConfig', () => {
  it('should build config with theme and all null preferences', () => {
    const preferences: SavedPreferences = {
      labelMode: null,
      colorMode: null,
      viewMode: null,
      layoutMode: null,
    };

    const config = buildVisualizerConfig('dark', preferences);

    expect(config.theme).toBe('dark');
    expect(config.labelMode).toBeNull();
    expect(config.colorMode).toBeNull();
    expect(config.viewMode).toBeNull();
    expect(config.layoutStrategy).toBeInstanceOf(HierarchicalLayoutStrategy);
  });

  it('should build config with light theme', () => {
    const preferences: SavedPreferences = {
      labelMode: null,
      colorMode: null,
      viewMode: null,
      layoutMode: null,
    };

    const config = buildVisualizerConfig('light', preferences);

    expect(config.theme).toBe('light');
  });

  it('should build config with labelMode preference', () => {
    const preferences: SavedPreferences = {
      labelMode: 'always',
      colorMode: null,
      viewMode: null,
      layoutMode: null,
    };

    const config = buildVisualizerConfig('dark', preferences);

    expect(config.labelMode).toBe('always');
  });

  it('should build config with hover labelMode preference', () => {
    const preferences: SavedPreferences = {
      labelMode: 'hover',
      colorMode: null,
      viewMode: null,
      layoutMode: null,
    };

    const config = buildVisualizerConfig('dark', preferences);

    expect(config.labelMode).toBe('hover');
  });

  it('should build config with colorMode preference', () => {
    const preferences: SavedPreferences = {
      labelMode: null,
      colorMode: 'fileType',
      viewMode: null,
      layoutMode: null,
    };

    const config = buildVisualizerConfig('dark', preferences);

    expect(config.colorMode).toBe('fileType');
  });

  it('should build config with viewMode preference', () => {
    const preferences: SavedPreferences = {
      labelMode: null,
      colorMode: null,
      viewMode: 'overview',
      layoutMode: null,
    };

    const config = buildVisualizerConfig('dark', preferences);

    expect(config.viewMode).toBe('overview');
  });

  it('should build config with navigate viewMode preference', () => {
    const preferences: SavedPreferences = {
      labelMode: null,
      colorMode: null,
      viewMode: 'navigate',
      layoutMode: null,
    };

    const config = buildVisualizerConfig('dark', preferences);

    expect(config.viewMode).toBe('navigate');
  });

  it('should build config with hierarchical layout strategy', () => {
    const preferences: SavedPreferences = {
      labelMode: null,
      colorMode: null,
      viewMode: null,
      layoutMode: 'hierarchical',
    };

    const config = buildVisualizerConfig('dark', preferences);

    expect(config.layoutStrategy).toBeInstanceOf(HierarchicalLayoutStrategy);
  });

  it('should build config with force-directed layout strategy', () => {
    const preferences: SavedPreferences = {
      labelMode: null,
      colorMode: null,
      viewMode: null,
      layoutMode: 'forceDirected',
    };

    const config = buildVisualizerConfig('dark', preferences);

    expect(config.layoutStrategy).toBeInstanceOf(ForceDirectedLayoutStrategy);
  });

  it('should build config with all preferences set', () => {
    const preferences: SavedPreferences = {
      labelMode: 'hover',
      colorMode: 'churn',
      viewMode: 'navigate',
      layoutMode: 'forceDirected',
    };

    const config = buildVisualizerConfig('light', preferences);

    expect(config.theme).toBe('light');
    expect(config.labelMode).toBe('hover');
    expect(config.colorMode).toBe('churn');
    expect(config.viewMode).toBe('navigate');
    expect(config.layoutStrategy).toBeInstanceOf(ForceDirectedLayoutStrategy);
  });

  it('should preserve null values when preferences are null', () => {
    const preferences: SavedPreferences = {
      labelMode: null,
      colorMode: null,
      viewMode: null,
      layoutMode: null,
    };

    const config = buildVisualizerConfig('dark', preferences);

    // Should preserve null values, not convert to defaults
    expect(config.labelMode).toBeNull();
    expect(config.colorMode).toBeNull();
    expect(config.viewMode).toBeNull();
    // Only layoutStrategy gets a default (HierarchicalLayoutStrategy)
    expect(config.layoutStrategy).toBeInstanceOf(HierarchicalLayoutStrategy);
  });

  it('should be pure - same inputs produce same output structure', () => {
    const preferences: SavedPreferences = {
      labelMode: 'always',
      colorMode: 'fileType',
      viewMode: 'overview',
      layoutMode: 'forceDirected',
    };

    const config1 = buildVisualizerConfig('dark', preferences);
    const config2 = buildVisualizerConfig('dark', preferences);

    expect(config1.theme).toBe(config2.theme);
    expect(config1.labelMode).toBe(config2.labelMode);
    expect(config1.colorMode).toBe(config2.colorMode);
    expect(config1.viewMode).toBe(config2.viewMode);
    expect(config1.layoutStrategy).toBeInstanceOf(ForceDirectedLayoutStrategy);
    expect(config2.layoutStrategy).toBeInstanceOf(ForceDirectedLayoutStrategy);
  });
});
