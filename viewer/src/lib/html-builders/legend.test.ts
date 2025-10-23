import { describe, it, expect } from 'vitest';
import {
  buildDirectoryLegendItemHTML,
  buildFileTypeLegendItemHTML,
  buildOtherLegendItemHTML,
  FileTypeInfo,
} from './legend';

describe('buildDirectoryLegendItemHTML', () => {
  it('should render directory legend item HTML', () => {
    const directoryColor = {
      name: 'Directory',
      hex: '#8b8b8b',
    };

    const html = buildDirectoryLegendItemHTML(directoryColor);
    expect(html).toMatchSnapshot();
    expect(html).toContain('legend-cube');
    expect(html).toContain('#8b8b8b');
    expect(html).toContain('Directory');
  });

  it('should handle different directory color', () => {
    const directoryColor = {
      name: 'Folder',
      hex: '#ff0000',
    };

    const html = buildDirectoryLegendItemHTML(directoryColor);
    expect(html).toMatchSnapshot();
    expect(html).toContain('#ff0000');
    expect(html).toContain('Folder');
  });
});

describe('buildFileTypeLegendItemHTML', () => {
  it('should render TypeScript file type legend item', () => {
    const fileType: FileTypeInfo = {
      name: 'TypeScript',
      hex: '#3178c6',
      count: 42,
    };

    const html = buildFileTypeLegendItemHTML(fileType);
    expect(html).toMatchSnapshot();
    expect(html).toContain('checkbox');
    expect(html).toContain('data-category="TypeScript"');
    expect(html).toContain('#3178c6');
    expect(html).toContain('TypeScript (42)');
  });

  it('should render JavaScript file type legend item', () => {
    const fileType: FileTypeInfo = {
      name: 'JavaScript',
      hex: '#f7df1e',
      count: 15,
    };

    const html = buildFileTypeLegendItemHTML(fileType);
    expect(html).toMatchSnapshot();
    expect(html).toContain('JavaScript (15)');
  });

  it('should render file type with single file', () => {
    const fileType: FileTypeInfo = {
      name: 'Python',
      hex: '#3572a5',
      count: 1,
    };

    const html = buildFileTypeLegendItemHTML(fileType);
    expect(html).toMatchSnapshot();
    expect(html).toContain('Python (1)');
  });

  it('should render file type with large count', () => {
    const fileType: FileTypeInfo = {
      name: 'Java',
      hex: '#b07219',
      count: 1234,
    };

    const html = buildFileTypeLegendItemHTML(fileType);
    expect(html).toMatchSnapshot();
    expect(html).toContain('Java (1234)');
  });

  it('should handle special characters in file type name', () => {
    const fileType: FileTypeInfo = {
      name: 'TypeScript React',
      hex: '#3178c6',
      count: 28,
    };

    const html = buildFileTypeLegendItemHTML(fileType);
    expect(html).toMatchSnapshot();
    expect(html).toContain('TypeScript React');
  });
});

describe('buildOtherLegendItemHTML', () => {
  it('should render Other legend item with count', () => {
    const html = buildOtherLegendItemHTML(5);
    expect(html).toMatchSnapshot();
    expect(html).toContain('checkbox');
    expect(html).toContain('data-category="Other"');
    expect(html).toContain('#aaa');
    expect(html).toContain('Other (5)');
  });

  it('should render Other legend item with single file', () => {
    const html = buildOtherLegendItemHTML(1);
    expect(html).toMatchSnapshot();
    expect(html).toContain('Other (1)');
  });

  it('should render Other legend item with large count', () => {
    const html = buildOtherLegendItemHTML(127);
    expect(html).toMatchSnapshot();
    expect(html).toContain('Other (127)');
  });
});
