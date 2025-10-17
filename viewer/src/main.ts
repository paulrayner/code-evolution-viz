import { TreeVisualizer } from './TreeVisualizer';
import { RepositorySnapshot, FileNode } from './types';

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

    // Initialize visualizer
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('Canvas element not found');
    }

    const visualizer = new TreeVisualizer(canvas);

    // Set up file click handler
    visualizer.setOnFileClick(showFileDetails);

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
