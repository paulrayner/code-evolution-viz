import { TreeVisualizer } from './TreeVisualizer';
import { RepositorySnapshot, FileNode, DirectoryNode, TreeNode } from './types';
import { FILE_COLORS, DIRECTORY_COLOR } from './colorScheme';

/**
 * Load repository data
 */
async function loadData(): Promise<RepositorySnapshot> {
  // In development, we'll load from a static file
  // Later, this could be dynamic or from a URL parameter
  const response = await fetch('/data/repo-data.json');

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

  contentEl.innerHTML = `
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
  `;

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
    tooltip.textContent = `📄 ${node.name} (${node.loc} LOC)`;
  } else {
    tooltip.textContent = `📁 ${node.name} (${node.children.length} items)`;
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
  if (!legendContent) return;

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

  // Make legend collapsible
  const legendHeader = document.querySelector('#legend h3');
  const legend = document.getElementById('legend');
  if (legendHeader && legend) {
    legendHeader.addEventListener('click', () => {
      legend.classList.toggle('collapsed');
    });
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

/**
 * Main application
 */
async function main() {
  try {
    console.log('Loading repository data...');
    const snapshot = await loadData();

    console.log('Data loaded:', snapshot);
    updateHeader(snapshot);
    populateStats(snapshot);
    populateLegend(snapshot);

    // Initialize visualizer
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('Canvas element not found');
    }

    const visualizer = new TreeVisualizer(canvas);

    // Set up interaction handlers
    visualizer.setOnFileClick(showFileDetails);
    visualizer.setOnDirClick(showDirectoryDetails);
    visualizer.setOnHover(showTooltip);

    // Visualize the tree
    visualizer.visualize(snapshot.tree);

    // Start animation
    visualizer.start();

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
          Make sure you've run the processor and placed repo-data.json in public/data/
        </p>
      `;
    }
  }
}

// Start the application
main();
