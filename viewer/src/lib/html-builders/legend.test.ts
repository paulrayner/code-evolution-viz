import { describe, it, expect } from 'vitest';
import {
  buildDirectoryLegendItemHTML,
  buildFileTypeLegendItemHTML,
  buildOtherLegendItemHTML,
  buildIntervalLegendItemHTML,
  buildGenericLegendItemHTML,
  buildAuthorLegendItemHTML,
  buildOverflowMessageHTML,
  type FileTypeInfo,
  type LegendItemWithCountAndPercent,
  type GenericLegendItem,
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

describe('buildIntervalLegendItemHTML', () => {
  it('should render interval legend item with count and percentage', () => {
    const item: LegendItemWithCountAndPercent = {
      name: 'Last 7 days',
      hex: '#c0392b',
      count: 15,
      percentage: '25.5',
    };
    const html = buildIntervalLegendItemHTML(item, 'files');

    expect(html).toMatchSnapshot();
    expect(html).toContain('checkbox');
    expect(html).toContain('data-category="Last 7 days"');
    expect(html).toContain('#c0392b');
    expect(html).toContain('Last 7 days');
    expect(html).toContain('15 files');
    expect(html).toContain('25.5%');
  });

  it('should handle singular file label', () => {
    const item: LegendItemWithCountAndPercent = {
      name: 'Yesterday',
      hex: '#e74c3c',
      count: 1,
      percentage: '5.0',
    };
    const html = buildIntervalLegendItemHTML(item, 'file');

    expect(html).toMatchSnapshot();
    expect(html).toContain('1 file');
  });

  it('should handle different interval names', () => {
    const item: LegendItemWithCountAndPercent = {
      name: '30-60 days',
      hex: '#3498db',
      count: 100,
      percentage: '42.3',
    };
    const html = buildIntervalLegendItemHTML(item, 'files');

    expect(html).toMatchSnapshot();
    expect(html).toContain('30-60 days');
    expect(html).toContain('100 files');
    expect(html).toContain('42.3%');
  });

  it('should display stats in muted color', () => {
    const item: LegendItemWithCountAndPercent = {
      name: 'Test',
      hex: '#000',
      count: 5,
      percentage: '10.0',
    };
    const html = buildIntervalLegendItemHTML(item, 'files');

    expect(html).toContain('color: #888;');
  });
});

describe('buildGenericLegendItemHTML', () => {
  it('should render generic legend item with name and color only', () => {
    const item: GenericLegendItem = { name: 'High Churn', hex: '#c0392b' };
    const html = buildGenericLegendItemHTML(item);

    expect(html).toMatchSnapshot();
    expect(html).toContain('checkbox');
    expect(html).toContain('data-category="High Churn"');
    expect(html).toContain('#c0392b');
    expect(html).toContain('High Churn');
  });

  it('should not include count or percentage', () => {
    const item: GenericLegendItem = { name: 'Test', hex: '#000' };
    const html = buildGenericLegendItemHTML(item);

    expect(html).not.toContain('(');
    expect(html).not.toContain(')');
    expect(html).not.toContain('%');
  });

  it('should handle different category names', () => {
    const item: GenericLegendItem = { name: 'Low complexity', hex: '#2ecc71' };
    const html = buildGenericLegendItemHTML(item);

    expect(html).toMatchSnapshot();
    expect(html).toContain('Low complexity');
    expect(html).toContain('data-category="Low complexity"');
  });
});

describe('buildAuthorLegendItemHTML', () => {
  it('should render author legend item with count and percentage', () => {
    const html = buildAuthorLegendItemHTML('John Doe', '#e74c3c', 87, '42.3', 'files');

    expect(html).toMatchSnapshot();
    expect(html).toContain('checkbox');
    expect(html).toContain('data-category="John Doe"');
    expect(html).toContain('#e74c3c');
    expect(html).toContain('John Doe');
    expect(html).toContain('87 files');
    expect(html).toContain('42.3%');
  });

  it('should handle singular file label', () => {
    const html = buildAuthorLegendItemHTML('Alice', '#3498db', 1, '0.5', 'file');

    expect(html).toMatchSnapshot();
    expect(html).toContain('1 file');
  });

  it('should handle author names with special characters', () => {
    const html = buildAuthorLegendItemHTML("O'Brien", '#000', 10, '5.0', 'files');

    expect(html).toMatchSnapshot();
    expect(html).toContain("O'Brien");
  });

  it('should display stats in muted color', () => {
    const html = buildAuthorLegendItemHTML('Test', '#000', 5, '10.0', 'files');

    expect(html).toContain('color: #888;');
  });
});

describe('buildOverflowMessageHTML', () => {
  it('should render overflow message with count and coverage', () => {
    const html = buildOverflowMessageHTML(15, '85.2');

    expect(html).toMatchSnapshot();
    expect(html).toContain('...and 15 more');
    expect(html).toContain('85.2% coverage shown');
    expect(html).toContain('color: #888;');
    expect(html).toContain('font-style: italic;');
  });

  it('should not include checkbox', () => {
    const html = buildOverflowMessageHTML(10, '80.0');

    expect(html).not.toContain('checkbox');
    expect(html).not.toContain('input');
  });

  it('should handle single overflow item', () => {
    const html = buildOverflowMessageHTML(1, '90.0');

    expect(html).toMatchSnapshot();
    expect(html).toContain('...and 1 more');
  });

  it('should handle large overflow counts', () => {
    const html = buildOverflowMessageHTML(999, '50.0');

    expect(html).toMatchSnapshot();
    expect(html).toContain('...and 999 more');
  });
});
