import { TreeVisualizer } from './TreeVisualizer';
import { RepositorySnapshot, FileNode, DirectoryNode, TreeNode, TimelineData } from './types';
import { FILE_COLORS, DIRECTORY_COLOR } from './colorScheme';
import { ColorMode, getLegendItems, getColorModeName, getColorForFile, assignAuthorColors, calculateLastModifiedIntervals, isUsingPercentileIntervals } from './colorModeManager';

/**
 * Get list of available repositories
 */
async function getAvailableRepos(): Promise<string[]> {
  try {
    const response = await fetch('/data/repos.json');
    if (response.ok) {
      const data = await response.json();
      return data.repos || [];
    }
  } catch (error) {
    console.warn('Could not load repos list, using default');
  }
  return ['gource']; // Default fallback
}

/**
 * Load repository data (supports both static and timeline formats)
 */
async function loadData(repoName: string = 'gource'): Promise<RepositorySnapshot | TimelineData> {
  const response = await fetch(`/data/${repoName}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load data: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update UI with repository info
 */
function updateHeader(snapshot: RepositorySnapshot) {
  const repoName = document.getElementById('repo-name');
  const commitInfo = document.getElementById('commit-info');

  if (repoName) {
    repoName.textContent = snapshot.repositoryPath.split('/').pop() || 'Repository';
  }

  if (commitInfo) {
    const date = new Date(snapshot.timestamp).toLocaleDateString();
    commitInfo.textContent = `${snapshot.commit.substring(0, 7)} • ${date} • ${snapshot.stats.totalFiles} files • ${snapshot.stats.totalLoc.toLocaleString()} LOC`;
  }
}

/**
 * Show file details panel
 */
function showFileDetails(file: FileNode) {
  const panel = document.getElementById('info-panel');
  const nameEl = document.getElementById('selected-name');
  const contentEl = document.getElementById('info-content');

  if (!panel || !nameEl || !contentEl) return;

  nameEl.textContent = file.name;

  // Format last modified date
  const lastModifiedStr = file.lastModified
    ? new Date(file.lastModified).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Unknown';

  const authorStr = file.lastAuthor || 'Unknown';
  const commitHashStr = file.lastCommitHash ? file.lastCommitHash.substring(0, 7) : 'Unknown';

  let detailsHtml = `
    <div class="info-row">
      <span class="label">Type</span>
      <span class="value">File</span>
    </div>
    <div class="info-row">
      <span class="label">Path</span>
      <span class="value">${file.path}</span>
    </div>
    <div class="info-row">
      <span class="label">Lines of Code</span>
      <span class="value">${file.loc.toLocaleString()}</span>
    </div>
    <div class="info-row">
      <span class="label">Extension</span>
      <span class="value">.${file.extension}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Modified</span>
      <span class="value">${lastModifiedStr}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Author</span>
      <span class="value">${authorStr}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Commit</span>
      <span class="value">${commitHashStr}</span>
    </div>
  `;

  // Handle commit sibling highlighting with toggle behavior
  if (highlightCommitEnabled && file.lastCommitHash) {
    // Check if clicking on a file that's part of the currently highlighted commit
    if (currentHighlightedCommit === file.lastCommitHash) {
      // Toggle OFF - clear highlighting
      if (currentVisualizer) {
        currentVisualizer.clearHighlight();
      }
      currentHighlightedCommit = null;
    } else {
      // New commit or first time - show highlighting
      const commitSiblings = commitToFilesIndex.get(file.lastCommitHash) || [];
      const otherFiles = commitSiblings.filter(f => f.path !== file.path);

      // Get commit message if available
      const commitMessage = currentSnapshot?.commitMessages?.[file.lastCommitHash];

      if (commitMessage || otherFiles.length > 0) {
        detailsHtml += `
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        `;

        // Show commit info if message is available
        if (commitMessage) {
          detailsHtml += `
            <div style="margin-bottom: 12px;">
              <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
                Commit: <span style="color: #4a9eff; font-family: monospace;">${commitHashStr}</span>
              </div>
              <div style="font-size: 12px; color: #ddd; font-style: italic; line-height: 1.4;">
                "${commitMessage}"
              </div>
            </div>
          `;
        }

        // Show commit siblings if any
        if (otherFiles.length > 0) {
          detailsHtml += `
            <div style="font-size: 12px; font-weight: 600; color: #4a9eff; margin-bottom: 8px;">
              Commit Siblings (${otherFiles.length} file${otherFiles.length !== 1 ? 's' : ''})
            </div>
            <div style="max-height: 200px; overflow-y: auto; font-size: 11px;">
          `;

          for (const sibling of otherFiles) {
            detailsHtml += `
              <div style="padding: 4px 0; color: #ccc; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                ${sibling.path}
              </div>
            `;
          }

          detailsHtml += `
            </div>
          `;
        }

        detailsHtml += `
          </div>
        `;
      }

      // Apply visual highlighting to all files in the commit (including the selected file)
      if (currentVisualizer) {
        const allCommitFiles = commitSiblings.map(f => f.path);
        currentVisualizer.highlightFiles(allCommitFiles);
      }
      currentHighlightedCommit = file.lastCommitHash;
    }
  } else {
    // Clear highlighting if mode is off
    if (currentVisualizer) {
      currentVisualizer.clearHighlight();
    }
    currentHighlightedCommit = null;
  }

  contentEl.innerHTML = detailsHtml;

  panel.classList.add('visible');
}

/**
 * Calculate directory statistics (total LOC, file types)
 */
function calculateDirectoryStats(dir: DirectoryNode): { totalLoc: number; filesByExt: Record<string, number> } {
  const stats = { totalLoc: 0, filesByExt: {} as Record<string, number> };

  const processNode = (node: TreeNode) => {
    if (node.type === 'file') {
      stats.totalLoc += node.loc;
      const ext = node.extension;
      stats.filesByExt[ext] = (stats.filesByExt[ext] || 0) + 1;
    } else {
      for (const child of node.children) {
        processNode(child);
      }
    }
  };

  for (const child of dir.children) {
    processNode(child);
  }

  return stats;
}

/**
 * Show directory details panel
 */
function showDirectoryDetails(dir: DirectoryNode) {
  const panel = document.getElementById('info-panel');
  const nameEl = document.getElementById('selected-name');
  const contentEl = document.getElementById('info-content');

  if (!panel || !nameEl || !contentEl) return;

  nameEl.textContent = dir.name;

  const fileCount = dir.children.filter(c => c.type === 'file').length;
  const dirCount = dir.children.filter(c => c.type === 'directory').length;
  const stats = calculateDirectoryStats(dir);

  // Find dominant file type
  let dominantExt = 'none';
  let maxCount = 0;
  for (const [ext, count] of Object.entries(stats.filesByExt)) {
    if (count > maxCount) {
      maxCount = count;
      dominantExt = ext;
    }
  }

  const dominantName = FILE_COLORS[dominantExt]?.name || dominantExt;

  // Find most recently modified file in directory
  let mostRecentDate: string | null = null;
  let mostRecentAuthor: string | null = null;
  const findMostRecent = (node: TreeNode) => {
    if (node.type === 'file' && node.lastModified) {
      if (!mostRecentDate || new Date(node.lastModified) > new Date(mostRecentDate)) {
        mostRecentDate = node.lastModified;
        mostRecentAuthor = node.lastAuthor;
      }
    } else if (node.type === 'directory') {
      for (const child of node.children) {
        findMostRecent(child);
      }
    }
  };
  for (const child of dir.children) {
    findMostRecent(child);
  }

  const lastModifiedStr = mostRecentDate
    ? new Date(mostRecentDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Unknown';

  const authorStr = mostRecentAuthor || 'Unknown';

  contentEl.innerHTML = `
    <div class="info-row">
      <span class="label">Type</span>
      <span class="value">Directory</span>
    </div>
    <div class="info-row">
      <span class="label">Path</span>
      <span class="value">${dir.path || '(root)'}</span>
    </div>
    <div class="info-row">
      <span class="label">Total LOC</span>
      <span class="value">${stats.totalLoc.toLocaleString()}</span>
    </div>
    <div class="info-row">
      <span class="label">Files</span>
      <span class="value">${fileCount}</span>
    </div>
    <div class="info-row">
      <span class="label">Subdirectories</span>
      <span class="value">${dirCount}</span>
    </div>
    <div class="info-row">
      <span class="label">Dominant Type</span>
      <span class="value">${dominantName}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Modified</span>
      <span class="value">${lastModifiedStr}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Author</span>
      <span class="value">${authorStr}</span>
    </div>
  `;

  panel.classList.add('visible');
}

/**
 * Show tooltip on hover
 */
function showTooltip(node: TreeNode | null, event?: MouseEvent) {
  const tooltip = document.getElementById('tooltip');
  if (!tooltip) return;

  if (!node || !event) {
    tooltip.style.display = 'none';
    return;
  }

  if (node.type === 'file') {
    const lastModified = node.lastModified
      ? new Date(node.lastModified).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : 'Unknown';
    const author = node.lastAuthor || 'Unknown';
    tooltip.textContent = `📄 ${node.name} | ${node.loc} LOC | ${author} | ${lastModified}`;
  } else {
    // Find most recent file in directory
    let mostRecentDate: string | null = null;
    let mostRecentAuthor: string | null = null;
    const findMostRecent = (n: TreeNode) => {
      if (n.type === 'file' && n.lastModified) {
        if (!mostRecentDate || new Date(n.lastModified) > new Date(mostRecentDate)) {
          mostRecentDate = n.lastModified;
          mostRecentAuthor = n.lastAuthor;
        }
      } else if (n.type === 'directory') {
        for (const child of n.children) {
          findMostRecent(child);
        }
      }
    };
    for (const child of node.children) {
      findMostRecent(child);
    }

    const lastModified = mostRecentDate
      ? new Date(mostRecentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : 'Unknown';
    const author = mostRecentAuthor || 'Unknown';
    tooltip.textContent = `📁 ${node.name} | ${node.children.length} items | ${author} | ${lastModified}`;
  }

  tooltip.style.display = 'block';
  tooltip.style.left = `${event.clientX + 15}px`;
  tooltip.style.top = `${event.clientY + 15}px`;
}

/**
 * Calculate max tree depth
 */
function calculateMaxDepth(node: TreeNode, depth: number = 0): number {
  if (node.type === 'file') return depth;

  let maxDepth = depth;
  for (const child of node.children) {
    maxDepth = Math.max(maxDepth, calculateMaxDepth(child, depth + 1));
  }
  return maxDepth;
}

/**
 * Count directories in tree
 */
function countDirectories(node: TreeNode): number {
  if (node.type === 'file') return 0;

  let count = 1; // This directory
  for (const child of node.children) {
    count += countDirectories(child);
  }
  return count;
}

/**
 * Populate statistics panel
 */
function populateStats(snapshot: RepositorySnapshot) {
  document.getElementById('stat-files')!.textContent = snapshot.stats.totalFiles.toLocaleString();
  document.getElementById('stat-loc')!.textContent = snapshot.stats.totalLoc.toLocaleString();
  document.getElementById('stat-dirs')!.textContent = (countDirectories(snapshot.tree) - 1).toString(); // -1 for root
  document.getElementById('stat-depth')!.textContent = calculateMaxDepth(snapshot.tree).toString();

  // Calculate LOC by language for top languages
  const locByExt: Record<string, { loc: number; name: string; color: string }> = {};

  const processNode = (node: TreeNode) => {
    if (node.type === 'file') {
      const ext = node.extension;
      const colorInfo = FILE_COLORS[ext];
      if (!locByExt[ext]) {
        locByExt[ext] = {
          loc: 0,
          name: colorInfo?.name || ext,
          color: colorInfo?.hex || '#888'
        };
      }
      locByExt[ext].loc += node.loc;
    } else {
      for (const child of node.children) {
        processNode(child);
      }
    }
  };

  processNode(snapshot.tree);

  // Sort by LOC and take top 5
  const topLanguages = Object.values(locByExt)
    .sort((a, b) => b.loc - a.loc)
    .slice(0, 5);

  const totalLoc = snapshot.stats.totalLoc;
  const langBreakdown = document.getElementById('lang-breakdown')!;
  langBreakdown.innerHTML = '<div style="margin-top: 10px; font-size: 10px; color: #888;">Top Languages:</div>';

  for (const lang of topLanguages) {
    const percentage = (lang.loc / totalLoc) * 100;
    const bar = document.createElement('div');
    bar.className = 'stat-bar';
    bar.innerHTML = `
      <div class="stat-bar-label">${lang.name}</div>
      <div class="stat-bar-fill">
        <div class="stat-bar-fill-inner" style="width: ${percentage}%; background: ${lang.color};">
          <span class="stat-bar-text">${percentage.toFixed(1)}%</span>
        </div>
      </div>
    `;
    langBreakdown.appendChild(bar);
  }

}

/**
 * Populate legend with file extension colors
 * See viewer/docs/color-scheme.md for design rationale
 */
function populateLegend(snapshot: RepositorySnapshot) {
  const legendContent = document.getElementById('legend-content');
  const legendTitle = document.getElementById('legend-title');
  if (!legendContent) return;

  // Update legend title for file type mode
  if (legendTitle) {
    legendTitle.textContent = 'File Type';
  }

  // Clear previous legend content
  legendContent.innerHTML = '';

  // Get unique extensions present in this repo
  const extensions = Object.keys(snapshot.stats.filesByExtension);
  const presentExtensions = extensions
    .filter(ext => FILE_COLORS[ext])
    .sort((a, b) => snapshot.stats.filesByExtension[b] - snapshot.stats.filesByExtension[a]);

  // Add directory entry first
  const dirItem = document.createElement('div');
  dirItem.className = 'legend-item';
  dirItem.innerHTML = `
    <div class="legend-cube" style="background: ${DIRECTORY_COLOR.hex};"></div>
    <span class="legend-label">${DIRECTORY_COLOR.name}</span>
  `;
  legendContent.appendChild(dirItem);

  // Add present extensions
  for (const ext of presentExtensions) {
    const info = FILE_COLORS[ext];
    const count = snapshot.stats.filesByExtension[ext];
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <div class="legend-color" style="background: ${info.hex};"></div>
      <span class="legend-label">${info.name} (${count})</span>
    `;
    legendContent.appendChild(item);
  }

  // Add "Other" if there are unknown extensions
  const unknownCount = extensions
    .filter(ext => !FILE_COLORS[ext])
    .reduce((sum, ext) => sum + snapshot.stats.filesByExtension[ext], 0);

  if (unknownCount > 0) {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <div class="legend-color" style="background: #aaa;"></div>
      <span class="legend-label">Other (${unknownCount})</span>
    `;
    legendContent.appendChild(item);
  }
}

/**
 * Hide loading indicator
 */
function hideLoading() {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.classList.add('hidden');
  }
}

let currentVisualizer: TreeVisualizer | null = null;
let currentSnapshot: RepositorySnapshot | null = null;
let currentTimelineData: TimelineData | null = null; // Timeline format if loaded
let commitToFilesIndex: Map<string, FileNode[]> = new Map();
let highlightCommitEnabled: boolean = true;
let currentHighlightedCommit: string | null = null;

// Timeline playback state
let timelineIndex: number = 0;
let timelinePlaying: boolean = false;
let timelineIntervalId: number | null = null;
let timelineSpeed: number = 1; // 1x speed

/**
 * Build an index mapping commit hashes to files
 * This allows quick lookup of all files changed in the same commit
 */
function buildCommitIndex(tree: DirectoryNode): Map<string, FileNode[]> {
  const index = new Map<string, FileNode[]>();

  const processNode = (node: TreeNode) => {
    if (node.type === 'file') {
      if (node.lastCommitHash) {
        const files = index.get(node.lastCommitHash) || [];
        files.push(node);
        index.set(node.lastCommitHash, files);
      }
    } else {
      for (const child of node.children) {
        processNode(child);
      }
    }
  };

  for (const child of tree.children) {
    processNode(child);
  }

  return index;
}

/**
 * Collect all lastModified dates from the tree
 * Used to calculate percentile-based color intervals
 */
function collectModificationDates(tree: DirectoryNode): string[] {
  const dates: string[] = [];

  const processNode = (node: TreeNode) => {
    if (node.type === 'file') {
      if (node.lastModified) {
        dates.push(node.lastModified);
      }
    } else {
      for (const child of node.children) {
        processNode(child);
      }
    }
  };

  for (const child of tree.children) {
    processNode(child);
  }

  return dates;
}

/**
 * Load and display a repository
 */
async function loadRepository(repoName: string) {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.classList.remove('hidden');
    loading.innerHTML = '<div class="spinner"></div><p>Loading visualization...</p>';
  }

  try {
    console.log(`Loading repository: ${repoName}`);
    const data = await loadData(repoName);

    // Detect format and extract snapshot
    let snapshot: RepositorySnapshot;
    if ('format' in data && data.format === 'timeline-v1') {
      // Timeline format
      console.log('Timeline format detected');
      currentTimelineData = data;
      snapshot = data.headSnapshot;
      console.log(`Timeline data: ${data.timeline.totalCommits} total commits, ${data.timeline.baseSampling.actualCount} sampled`);
    } else {
      // Static snapshot format
      console.log('Static snapshot format detected');
      currentTimelineData = null;
      snapshot = data as RepositorySnapshot;
    }

    currentSnapshot = snapshot;
    console.log('Data loaded:', snapshot);

    // Build commit hash index
    commitToFilesIndex = buildCommitIndex(snapshot.tree);
    console.log(`Built commit index: ${commitToFilesIndex.size} unique commits`);

    // Calculate percentile-based intervals for last modified dates
    const modificationDates = collectModificationDates(snapshot.tree);
    calculateLastModifiedIntervals(modificationDates);
    console.log(`Calculated last modified intervals from ${modificationDates.length} files`);

    // Clear UI state from previous repo
    const infoPanel = document.getElementById('info-panel');
    if (infoPanel) {
      infoPanel.classList.remove('visible');
    }
    currentHighlightedCommit = null;
    if (currentVisualizer) {
      currentVisualizer.clearHighlight();
    }

    updateHeader(snapshot);
    populateStats(snapshot);

    // Show/hide timeline controls based on format
    const timelineControls = document.getElementById('timeline-controls');
    if (timelineControls) {
      if (currentTimelineData) {
        timelineControls.style.display = 'flex';
      } else {
        timelineControls.style.display = 'none';
      }
    }

    // Initialize or reuse visualizer
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('Canvas element not found');
    }

    if (!currentVisualizer) {
      currentVisualizer = new TreeVisualizer(canvas);

      // Set up interaction handlers
      currentVisualizer.setOnFileClick(showFileDetails);
      currentVisualizer.setOnDirClick(showDirectoryDetails);
      currentVisualizer.setOnHover(showTooltip);

      // Load saved label mode
      const savedMode = localStorage.getItem('labelMode') as 'always' | 'hover' | null;
      if (savedMode) {
        currentVisualizer.setLabelMode(savedMode);
      }

      // Load saved color mode
      const savedColorMode = localStorage.getItem('colorMode') as ColorMode | null;
      if (savedColorMode) {
        currentVisualizer.setColorMode(savedColorMode);
      }

      // Start animation
      currentVisualizer.start();
    }

    // Visualize the tree
    currentVisualizer.visualize(snapshot.tree);

    // Update legend based on current color mode
    const currentColorMode = (localStorage.getItem('colorMode') as ColorMode) || 'fileType';
    if (currentColorMode === 'fileType') {
      populateLegend(snapshot);
    } else {
      updateLegendForColorMode(currentColorMode);
    }

    hideLoading();

    console.log('Visualization ready!');
  } catch (error) {
    console.error('Error initializing visualization:', error);
    const loading = document.getElementById('loading');
    if (loading) {
      loading.innerHTML = `
        <p style="color: #ff4444;">Error loading visualization</p>
        <p style="font-size: 12px; margin-top: 10px; color: #888;">
          ${error instanceof Error ? error.message : 'Unknown error'}
        </p>
        <p style="font-size: 12px; margin-top: 10px; color: #888;">
          Make sure you've run the processor and placed the data file in public/data/
        </p>
      `;
    }
  }
}

/**
 * Main application initialization
 */
async function main() {
  // Get available repositories
  const repos = await getAvailableRepos();

  // Populate selector
  const selector = document.getElementById('repo-selector') as HTMLSelectElement;
  if (selector) {
    selector.innerHTML = '';
    repos.forEach(repo => {
      const option = document.createElement('option');
      option.value = repo;
      option.textContent = repo;
      selector.appendChild(option);
    });

    // Load first repo by default
    if (repos.length > 0) {
      await loadRepository(repos[0]);
    }

    // Handle repo switching
    selector.addEventListener('change', async (e) => {
      const target = e.target as HTMLSelectElement;
      await loadRepository(target.value);
    });
  }

  // Set up color mode selector
  const colorModeSelector = document.getElementById('color-mode-selector') as HTMLSelectElement;
  if (colorModeSelector) {
    // Load saved preference from localStorage
    const savedColorMode = localStorage.getItem('colorMode') as ColorMode | null;
    if (savedColorMode) {
      colorModeSelector.value = savedColorMode;
    }

    // Handle color mode change
    colorModeSelector.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      const newMode = target.value as ColorMode;
      localStorage.setItem('colorMode', newMode);

      if (currentVisualizer) {
        currentVisualizer.setColorMode(newMode);
      }

      // Update legend for new color mode
      if (newMode === 'fileType' && currentSnapshot) {
        populateLegend(currentSnapshot);
      } else {
        updateLegendForColorMode(newMode);
      }
    });
  }

  // Set up label toggle (after first repo loads so currentVisualizer exists)
  const labelToggle = document.getElementById('label-toggle') as HTMLButtonElement;
  if (labelToggle) {
    // Load saved preference from localStorage, default to 'hover'
    const savedMode = localStorage.getItem('labelMode') as 'always' | 'hover' | null;
    const initialMode = savedMode || 'hover';

    // Set button text to match saved mode
    labelToggle.textContent = initialMode === 'always' ? 'Always On' : 'Hover Only';

    // Handle toggle clicks
    labelToggle.addEventListener('click', () => {
      const currentMode = labelToggle.textContent === 'Always On' ? 'always' : 'hover';
      const newMode = currentMode === 'always' ? 'hover' : 'always';

      labelToggle.textContent = newMode === 'always' ? 'Always On' : 'Hover Only';
      localStorage.setItem('labelMode', newMode);

      if (currentVisualizer) {
        currentVisualizer.setLabelMode(newMode);
      }
    });
  }

  // Set up highlight commit toggle
  const highlightCommitToggle = document.getElementById('highlight-commit-toggle') as HTMLButtonElement;
  if (highlightCommitToggle) {
    // Load saved preference from localStorage, default to true if not set
    const savedHighlightCommit = localStorage.getItem('highlightCommit');
    highlightCommitEnabled = savedHighlightCommit !== null ? savedHighlightCommit === 'true' : true;

    // Set button text to match saved mode
    highlightCommitToggle.textContent = highlightCommitEnabled ? 'On' : 'Off';

    // Handle toggle clicks
    highlightCommitToggle.addEventListener('click', () => {
      highlightCommitEnabled = !highlightCommitEnabled;
      highlightCommitToggle.textContent = highlightCommitEnabled ? 'On' : 'Off';
      localStorage.setItem('highlightCommit', highlightCommitEnabled.toString());

      // Clear any existing commit highlighting when toggled off
      if (!highlightCommitEnabled && currentVisualizer) {
        currentVisualizer.clearHighlight();
        currentHighlightedCommit = null;
      }

      console.log('Highlight commit mode:', highlightCommitEnabled ? 'enabled' : 'disabled');
    });
  }

  // Set up collapsible panels (one-time setup)
  const statsPanel = document.getElementById('stats-panel');
  const statsHeader = document.querySelector('#stats-panel h3');
  if (statsHeader && statsPanel) {
    statsHeader.addEventListener('click', () => {
      statsPanel.classList.toggle('collapsed');
    });
  }

  const legendHeader = document.querySelector('#legend h3');
  const legend = document.getElementById('legend');
  if (legendHeader && legend) {
    legendHeader.addEventListener('click', () => {
      legend.classList.toggle('collapsed');
    });
  }
}

/**
 * Update legend based on color mode
 */
function updateLegendForColorMode(mode: ColorMode) {
  const legendContent = document.getElementById('legend-content');
  const legendTitle = document.getElementById('legend-title');
  if (!legendContent) return;

  // Update legend title to match color mode
  if (legendTitle) {
    let modeTitle = getColorModeName(mode);
    if (mode === 'lastModified' && isUsingPercentileIntervals()) {
      modeTitle = 'Last Modified (Relative)';
    }
    legendTitle.textContent = modeTitle;
  }

  legendContent.innerHTML = '';

  const items = getLegendItems(mode);

  if (items.length > 0 && mode === 'lastModified' && currentSnapshot) {
    // Calculate file counts for each interval
    const intervalCounts = new Map<string, number>();
    const collectIntervalCounts = (node: TreeNode) => {
      if (node.type === 'file' && node.lastModified) {
        const colorInfo = getColorForFile(node, 'lastModified');
        intervalCounts.set(colorInfo.name, (intervalCounts.get(colorInfo.name) || 0) + 1);
      } else if (node.type === 'directory') {
        for (const child of node.children) {
          collectIntervalCounts(child);
        }
      }
    };
    collectIntervalCounts(currentSnapshot.tree);

    const totalFiles = currentSnapshot.stats.totalFiles;

    // Show intervals with counts and percentages
    for (const item of items) {
      const count = intervalCounts.get(item.name) || 0;
      const percentage = ((count / totalFiles) * 100).toFixed(1);
      const fileLabel = count === 1 ? 'file' : 'files';

      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      legendItem.innerHTML = `
        <div class="legend-color" style="background: ${item.hex};"></div>
        <span class="legend-label">${item.name} <span style="color: #888;">(${count} ${fileLabel}, ${percentage}%)</span></span>
      `;
      legendContent.appendChild(legendItem);
    }
  } else if (items.length > 0) {
    // Show color mode specific legend without counts (fallback for other modes)
    for (const item of items) {
      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      legendItem.innerHTML = `
        <div class="legend-color" style="background: ${item.hex};"></div>
        <span class="legend-label">${item.name}</span>
      `;
      legendContent.appendChild(legendItem);
    }
  } else if (mode === 'author' && currentSnapshot) {
    // For author mode, collect authors with file counts
    const authorCounts = new Map<string, number>();
    const collectAuthors = (node: TreeNode) => {
      if (node.type === 'file' && node.lastAuthor) {
        authorCounts.set(node.lastAuthor, (authorCounts.get(node.lastAuthor) || 0) + 1);
      } else if (node.type === 'directory') {
        for (const child of node.children) {
          collectAuthors(child);
        }
      }
    };
    collectAuthors(currentSnapshot.tree);

    // Sort by file count (descending), then show top 20
    const sortedAuthors = Array.from(authorCounts.entries())
      .sort((a, b) => b[1] - a[1]); // Sort by count descending

    // Assign colors based on contributor rank (most active get most distinct colors)
    const authorNames = sortedAuthors.map(([author]) => author);
    assignAuthorColors(authorNames);

    const displayAuthors = sortedAuthors.slice(0, 20);

    const totalFiles = currentSnapshot.stats.totalFiles;

    for (const [author, count] of displayAuthors) {
      const percentage = ((count / totalFiles) * 100).toFixed(1);
      const colorInfo = getColorForFile({ lastAuthor: author } as FileNode, 'author');
      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      const fileLabel = count === 1 ? 'file' : 'files';
      legendItem.innerHTML = `
        <div class="legend-color" style="background: ${colorInfo.hex};"></div>
        <span class="legend-label">${author} <span style="color: #888;">(${count} ${fileLabel}, ${percentage}%)</span></span>
      `;
      legendContent.appendChild(legendItem);
    }

    if (sortedAuthors.length > 20) {
      // Calculate coverage of top 20
      const top20FileCount = displayAuthors.reduce((sum, [, count]) => sum + count, 0);
      const coveragePercent = ((top20FileCount / totalFiles) * 100).toFixed(1);

      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      legendItem.innerHTML = `
        <span class="legend-label" style="color: #888; font-style: italic;">...and ${sortedAuthors.length - 20} more (${coveragePercent}% coverage shown)</span>
      `;
      legendContent.appendChild(legendItem);
    }
  }
  // Note: For fileType mode, legend is populated by populateLegend() which shows actual files present
}

// Start the application
main();
