import { TreeVisualizer } from './TreeVisualizer';
import { FILE_COLORS, DIRECTORY_COLOR } from './colorScheme';
import { getLegendItems, getColorModeName, getColorForFile, assignAuthorColors, calculateLastModifiedIntervals, isUsingPercentileIntervals } from './colorModeManager';
import { DeltaReplayController } from './DeltaReplayController';
/**
 * Get list of available repositories (base names only, no -timeline variants)
 */
async function getAvailableRepos() {
    try {
        const response = await fetch('/data/repos.json');
        if (response.ok) {
            const data = await response.json();
            const repos = data.repos || [];
            // Remove duplicates by stripping -timeline or -timeline-full suffix
            const baseRepos = new Set();
            for (const repo of repos) {
                // Strip -timeline-full or -timeline suffix to get base name
                const baseName = repo.replace(/-timeline(-full)?$/, '');
                baseRepos.add(baseName);
            }
            return Array.from(baseRepos).sort();
        }
    }
    catch (error) {
        console.warn('Could not load repos list, using default');
    }
    return ['gource']; // Default fallback
}
/**
 * Check if timeline data exists for a repository
 * Checks for both -timeline-full.json and -timeline.json
 */
async function checkTimelineExists(repoName) {
    // Try -timeline-full.json first (V2 format)
    try {
        const response = await fetch(`/data/${repoName}-timeline-full.json`, { method: 'HEAD' });
        if (response.ok)
            return true;
    }
    catch {
        // Fall through to check other variant
    }
    // Try -timeline.json (alternative naming)
    try {
        const response = await fetch(`/data/${repoName}-timeline.json`, { method: 'HEAD' });
        return response.ok;
    }
    catch {
        return false;
    }
}
/**
 * Load repository data (supports both static and timeline formats)
 */
async function loadData(repoName = 'gource') {
    const response = await fetch(`/data/${repoName}.json`);
    if (!response.ok) {
        throw new Error(`Failed to load data: ${response.statusText}`);
    }
    return response.json();
}
/**
 * Update UI with repository info
 * (Repository name is now shown in dropdown only, no separate display)
 */
function updateHeader(snapshot) {
    // Repository name removed from header - shown in dropdown instead
}
/**
 * Show file details panel
 */
function showFileDetails(file) {
    const panel = document.getElementById('info-panel');
    const nameEl = document.getElementById('selected-name');
    const contentEl = document.getElementById('info-content');
    if (!panel || !nameEl || !contentEl)
        return;
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
    // Format file age
    const fileAgeStr = file.firstCommitDate
        ? (() => {
            const now = Date.now();
            const fileDate = new Date(file.firstCommitDate).getTime();
            const ageInDays = (now - fileDate) / (1000 * 60 * 60 * 24);
            const ageInYears = ageInDays / 365;
            if (ageInYears >= 5)
                return `${Math.floor(ageInYears)} years (Legacy)`;
            if (ageInYears >= 3)
                return `${Math.floor(ageInYears)} years (Old)`;
            if (ageInYears >= 1)
                return `${Math.floor(ageInYears)} year${Math.floor(ageInYears) > 1 ? 's' : ''} (Mature)`;
            const ageInMonths = ageInDays / 30;
            if (ageInMonths >= 3)
                return `${Math.floor(ageInMonths)} months (Recent)`;
            return `${Math.floor(ageInDays)} days (New)`;
        })()
        : 'Unknown';
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
    <div class="info-row">
      <span class="label">Churn (Lifetime)</span>
      <span class="value">${file.commitCount !== null ? `${file.commitCount} commit${file.commitCount !== 1 ? 's' : ''}` : 'Unknown'}</span>
    </div>
    <div class="info-row">
      <span class="label">Contributors (Lifetime)</span>
      <span class="value">${file.contributorCount !== null ? file.contributorCount : 'Unknown'}</span>
    </div>
    <div class="info-row">
      <span class="label">File Age</span>
      <span class="value">${fileAgeStr}</span>
    </div>
    <div class="info-row">
      <span class="label">Recent Activity (90 days)</span>
      <span class="value">${file.recentLinesChanged !== null ? `${file.recentLinesChanged} lines changed` : 'Unknown'}</span>
    </div>
    <div class="info-row">
      <span class="label">Avg Change Size (Lifetime)</span>
      <span class="value">${file.avgLinesPerCommit !== null ? `${file.avgLinesPerCommit} lines/commit` : 'Unknown'}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Touched</span>
      <span class="value">${file.daysSinceLastModified !== null ? `${file.daysSinceLastModified} days ago` : 'Unknown'}</span>
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
        }
        else {
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
            <div style="font-size: 11px;">
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
    }
    else {
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
function calculateDirectoryStats(dir) {
    const stats = { totalLoc: 0, filesByExt: {} };
    const processNode = (node) => {
        if (node.type === 'file') {
            stats.totalLoc += node.loc;
            const ext = node.extension;
            stats.filesByExt[ext] = (stats.filesByExt[ext] || 0) + 1;
        }
        else {
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
function showDirectoryDetails(dir) {
    const panel = document.getElementById('info-panel');
    const nameEl = document.getElementById('selected-name');
    const contentEl = document.getElementById('info-content');
    if (!panel || !nameEl || !contentEl)
        return;
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
    let mostRecentDate = null;
    let mostRecentAuthor = null;
    const findMostRecent = (node) => {
        if (node.type === 'file' && node.lastModified) {
            if (!mostRecentDate || new Date(node.lastModified) > new Date(mostRecentDate)) {
                mostRecentDate = node.lastModified;
                mostRecentAuthor = node.lastAuthor;
            }
        }
        else if (node.type === 'directory') {
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
function showTooltip(node, event) {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip)
        return;
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
    }
    else {
        // Find most recent file in directory
        let mostRecentDate = null;
        let mostRecentAuthor = null;
        const findMostRecent = (n) => {
            if (n.type === 'file' && n.lastModified) {
                if (!mostRecentDate || new Date(n.lastModified) > new Date(mostRecentDate)) {
                    mostRecentDate = n.lastModified;
                    mostRecentAuthor = n.lastAuthor;
                }
            }
            else if (n.type === 'directory') {
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
function calculateMaxDepth(node, depth = 0) {
    if (node.type === 'file')
        return depth;
    let maxDepth = depth;
    for (const child of node.children) {
        maxDepth = Math.max(maxDepth, calculateMaxDepth(child, depth + 1));
    }
    return maxDepth;
}
/**
 * Count directories in tree
 */
function countDirectories(node) {
    if (node.type === 'file')
        return 0;
    let count = 1; // This directory
    for (const child of node.children) {
        count += countDirectories(child);
    }
    return count;
}
/**
 * Count visible files and LOC (respecting current filters)
 */
function countVisibleStats(tree) {
    if (!currentVisualizer || !currentSnapshot) {
        return { files: 0, loc: 0 };
    }
    const colorMode = localStorage.getItem('colorMode') || 'fileType';
    let files = 0;
    let loc = 0;
    const processNode = (node) => {
        if (node.type === 'file') {
            // Check if this file matches the current filter
            if (currentVisualizer.hasActiveFilters()) {
                // Get file's category and check if it's in active filters
                const activeCategories = currentVisualizer.getActiveFilterCategories();
                const fileColorInfo = getColorForFile(node, colorMode);
                if (activeCategories.includes(fileColorInfo.name)) {
                    files++;
                    loc += node.loc;
                }
            }
            else {
                files++;
                loc += node.loc;
            }
        }
        else {
            for (const child of node.children) {
                processNode(child);
            }
        }
    };
    processNode(tree);
    return { files, loc };
}
/**
 * Populate statistics panel
 */
function populateStats(snapshot) {
    updateStatsDisplay(snapshot);
}
/**
 * Update statistics display with filter awareness
 * Called when filters change to update counts
 */
function updateStatsDisplay(snapshot) {
    // Check if filters are active
    const hasFilters = currentVisualizer?.hasActiveFilters() || false;
    let visibleFiles = snapshot.stats.totalFiles;
    let visibleLoc = snapshot.stats.totalLoc;
    if (hasFilters) {
        // Count only visible files/LOC when filters are active
        const counts = countVisibleStats(snapshot.tree);
        visibleFiles = counts.files;
        visibleLoc = counts.loc;
    }
    // Update file count (with filter indicator if needed)
    const statFilesEl = document.getElementById('stat-files');
    if (statFilesEl) {
        if (hasFilters && visibleFiles < snapshot.stats.totalFiles) {
            statFilesEl.textContent = `${visibleFiles.toLocaleString()} / ${snapshot.stats.totalFiles.toLocaleString()}`;
            statFilesEl.title = `Showing ${visibleFiles} of ${snapshot.stats.totalFiles} files (filtered)`;
        }
        else {
            statFilesEl.textContent = snapshot.stats.totalFiles.toLocaleString();
            statFilesEl.title = '';
        }
    }
    // Update LOC count (with filter indicator if needed)
    const statLocEl = document.getElementById('stat-loc');
    if (statLocEl) {
        if (hasFilters && visibleLoc < snapshot.stats.totalLoc) {
            statLocEl.textContent = `${visibleLoc.toLocaleString()} / ${snapshot.stats.totalLoc.toLocaleString()}`;
            statLocEl.title = `Showing ${visibleLoc} of ${snapshot.stats.totalLoc} LOC (filtered)`;
        }
        else {
            statLocEl.textContent = snapshot.stats.totalLoc.toLocaleString();
            statLocEl.title = '';
        }
    }
    document.getElementById('stat-dirs').textContent = (countDirectories(snapshot.tree) - 1).toString(); // -1 for root
    document.getElementById('stat-depth').textContent = calculateMaxDepth(snapshot.tree).toString();
    // Calculate LOC by language for top languages
    const locByExt = {};
    const processNode = (node) => {
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
        }
        else {
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
    const langBreakdown = document.getElementById('lang-breakdown');
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
 * Find a file node by path in a tree
 * @param tree - The root directory node to search
 * @param targetPath - The file path to find
 * @returns The FileNode if found, null otherwise
 */
function findFileInTree(tree, targetPath) {
    const traverse = (node) => {
        if (node.type === 'file') {
            if (node.path === targetPath) {
                return node;
            }
            return null;
        }
        else if (node.type === 'directory' && node.children) {
            for (const child of node.children) {
                const result = traverse(child);
                if (result)
                    return result;
            }
        }
        return null;
    };
    return traverse(tree);
}
/**
 * Update statistics panel from tree (for Timeline V2 where we don't have a full snapshot)
 */
function updateStatsForTree(tree, commitIndex, totalCommits) {
    // Count files and calculate total LOC
    let totalFiles = 0;
    let totalLoc = 0;
    const locByExt = {};
    const processNode = (node) => {
        if (node.type === 'file') {
            totalFiles++;
            totalLoc += node.loc;
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
        }
        else {
            for (const child of node.children) {
                processNode(child);
            }
        }
    };
    processNode(tree);
    // Update stats panel
    document.getElementById('stat-files').textContent = totalFiles.toLocaleString();
    document.getElementById('stat-loc').textContent = totalLoc.toLocaleString();
    document.getElementById('stat-dirs').textContent = (countDirectories(tree) - 1).toString(); // -1 for root
    document.getElementById('stat-depth').textContent = calculateMaxDepth(tree).toString();
    // Update stats panel title to show we're in timeline mode
    const statsHeader = document.querySelector('#stats-panel h3');
    if (statsHeader && commitIndex !== undefined && totalCommits !== undefined) {
        statsHeader.textContent = `Repository Stats (Commit ${commitIndex + 1} of ${totalCommits})`;
    }
    // Sort by LOC and take top 5
    const topLanguages = Object.values(locByExt)
        .sort((a, b) => b.loc - a.loc)
        .slice(0, 5);
    const langBreakdown = document.getElementById('lang-breakdown');
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
function populateLegend(snapshot) {
    const legendContent = document.getElementById('legend-content');
    const legendTitle = document.getElementById('legend-title');
    if (!legendContent)
        return;
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
    // Add directory entry first (no checkbox - directories always visible)
    const dirItem = document.createElement('div');
    dirItem.className = 'legend-item';
    dirItem.innerHTML = `
    <div class="legend-cube" style="background: ${DIRECTORY_COLOR.hex};"></div>
    <span class="legend-label">${DIRECTORY_COLOR.name}</span>
  `;
    legendContent.appendChild(dirItem);
    // Add present extensions with checkboxes for filtering
    for (const ext of presentExtensions) {
        const info = FILE_COLORS[ext];
        const count = snapshot.stats.filesByExtension[ext];
        const item = document.createElement('label');
        item.className = 'legend-item';
        item.innerHTML = `
      <input type="checkbox" class="legend-checkbox" data-category="${info.name}" checked>
      <div class="legend-color" style="background: ${info.hex};"></div>
      <span class="legend-label">${info.name} (${count})</span>
    `;
        legendContent.appendChild(item);
        // Add change event listener
        const checkbox = item.querySelector('.legend-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', applyLegendFilters);
        }
    }
    // Add "Other" if there are unknown extensions (with checkbox)
    const unknownCount = extensions
        .filter(ext => !FILE_COLORS[ext])
        .reduce((sum, ext) => sum + snapshot.stats.filesByExtension[ext], 0);
    if (unknownCount > 0) {
        const item = document.createElement('label');
        item.className = 'legend-item';
        item.innerHTML = `
      <input type="checkbox" class="legend-checkbox" data-category="Other" checked>
      <div class="legend-color" style="background: #aaa;"></div>
      <span class="legend-label">Other (${unknownCount})</span>
    `;
        legendContent.appendChild(item);
        // Add change event listener
        const checkbox = item.querySelector('.legend-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', applyLegendFilters);
        }
    }
    // Show filter controls for file type mode
    showFilterControls();
    // Update button states (all checkboxes start checked, so "All" should be disabled)
    updateFilterControlStates();
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
let currentVisualizer = null;
let currentSnapshot = null;
let currentTimelineData = null; // Timeline V1 format if loaded
let currentDeltaController = null; // Timeline V2 controller
let commitToFilesIndex = new Map();
let highlightCommitEnabled = true;
let currentHighlightedCommit = null;
// Mode switcher state
let currentRepoBaseName = '';
let timelineAvailable = false;
// Timeline playback state
let timelineIndex = 0;
let timelinePlaying = false;
let timelineIntervalId = null;
let timelineSpeed = 1; // 1x speed
/**
 * Build an index mapping commit hashes to files
 * This allows quick lookup of all files changed in the same commit
 */
function buildCommitIndex(tree) {
    const index = new Map();
    const processNode = (node) => {
        if (node.type === 'file') {
            if (node.lastCommitHash) {
                const files = index.get(node.lastCommitHash) || [];
                files.push(node);
                index.set(node.lastCommitHash, files);
            }
        }
        else {
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
 * Build an index mapping file paths to FileNode objects
 * This allows quick lookup of files by path for timeline highlighting
 */
function buildPathIndex(tree) {
    const index = new Map();
    const processNode = (node) => {
        if (node.type === 'file') {
            index.set(node.path, node);
        }
        else {
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
let pathToFileIndex = new Map();
// Timeline V2 compatible color modes (only modes that work without lifetime analytics)
const TIMELINE_V2_COMPATIBLE_MODES = ['fileType', 'lastModified', 'author'];
// Store original color mode when entering timeline mode
let savedColorModeBeforeTimeline = null;
// Store original option text (to avoid appending " (requires HEAD analysis)" multiple times)
const originalColorModeOptionText = new Map();
/**
 * Enable Timeline mode UI changes (both V1 and V2)
 */
function enableTimelineMode() {
    // Hide "Highlight Commit" toggle (not applicable in timeline mode)
    const highlightToggle = document.getElementById('highlight-commit-toggle');
    const highlightLabel = highlightToggle?.previousElementSibling;
    if (highlightToggle) {
        highlightToggle.style.display = 'none';
    }
    if (highlightLabel && highlightLabel.textContent?.includes('Highlight Commit')) {
        highlightLabel.style.display = 'none';
    }
    // Hide "View Mode" toggle (not applicable in timeline mode - timeline shows all depths)
    const viewModeToggle = document.getElementById('view-mode-toggle');
    const viewModeLabel = viewModeToggle?.previousElementSibling;
    if (viewModeToggle) {
        viewModeToggle.style.display = 'none';
    }
    if (viewModeLabel && viewModeLabel.textContent?.includes('View')) {
        viewModeLabel.style.display = 'none';
    }
    // Disable filtering in timeline mode
    disableFiltering();
    // Hide incompatible color modes (remove from dropdown)
    const colorModeSelector = document.getElementById('color-mode-selector');
    if (colorModeSelector) {
        // Save current mode
        savedColorModeBeforeTimeline = colorModeSelector.value;
        // Remove incompatible options from dropdown
        const optionsToRemove = [];
        Array.from(colorModeSelector.options).forEach(option => {
            const mode = option.value;
            // Store original option element on first run
            if (!originalColorModeOptionText.has(mode)) {
                originalColorModeOptionText.set(mode, option.outerHTML);
            }
            if (!TIMELINE_V2_COMPATIBLE_MODES.includes(mode)) {
                optionsToRemove.push(option);
            }
        });
        // Remove incompatible options
        optionsToRemove.forEach(option => option.remove());
        // If current mode is incompatible, switch to fileType
        if (!TIMELINE_V2_COMPATIBLE_MODES.includes(savedColorModeBeforeTimeline)) {
            colorModeSelector.value = 'fileType';
            localStorage.setItem('colorMode', 'fileType');
            if (currentVisualizer) {
                currentVisualizer.setColorMode('fileType');
            }
            console.log(`Switched from incompatible mode '${savedColorModeBeforeTimeline}' to 'fileType'`);
        }
    }
}
/**
 * Disable Timeline mode UI changes (restore to static mode)
 */
function disableTimelineMode() {
    // Show "Highlight Commit" toggle
    const highlightToggle = document.getElementById('highlight-commit-toggle');
    const highlightLabel = highlightToggle?.previousElementSibling;
    if (highlightToggle) {
        highlightToggle.style.display = '';
    }
    if (highlightLabel) {
        highlightLabel.style.display = '';
    }
    // Show "View Mode" toggle
    const viewModeToggle = document.getElementById('view-mode-toggle');
    const viewModeLabel = viewModeToggle?.previousElementSibling;
    if (viewModeToggle) {
        viewModeToggle.style.display = '';
    }
    if (viewModeLabel) {
        viewModeLabel.style.display = '';
    }
    // Re-enable filtering in HEAD mode
    enableFiltering();
    // Restore all color modes (re-add removed options)
    const colorModeSelector = document.getElementById('color-mode-selector');
    if (colorModeSelector) {
        // Only restore if we actually removed options (i.e., originalColorModeOptionText has data)
        if (originalColorModeOptionText.size > 0) {
            // Get list of all color modes that should exist
            const allModes = ['fileType', 'lastModified', 'author', 'churn', 'contributors', 'fileAge', 'recentActivity', 'stability', 'recency'];
            // Clear and rebuild the selector with all options in correct order
            const currentValue = colorModeSelector.value;
            colorModeSelector.innerHTML = '';
            for (const mode of allModes) {
                if (originalColorModeOptionText.has(mode)) {
                    // Restore from saved HTML
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = originalColorModeOptionText.get(mode) || '';
                    const option = tempDiv.firstChild;
                    if (option) {
                        colorModeSelector.appendChild(option);
                    }
                }
            }
            // Restore previous color mode if it was changed
            if (savedColorModeBeforeTimeline && !TIMELINE_V2_COMPATIBLE_MODES.includes(savedColorModeBeforeTimeline)) {
                colorModeSelector.value = savedColorModeBeforeTimeline;
                localStorage.setItem('colorMode', savedColorModeBeforeTimeline);
                if (currentVisualizer) {
                    currentVisualizer.setColorMode(savedColorModeBeforeTimeline);
                }
                console.log(`Restored color mode to '${savedColorModeBeforeTimeline}'`);
            }
            else {
                // Keep current value if compatible
                colorModeSelector.value = currentValue;
            }
            savedColorModeBeforeTimeline = null;
        }
    }
}
/**
 * Collect all lastModified dates from the tree
 * Used to calculate percentile-based color intervals
 */
function collectModificationDates(tree) {
    const dates = [];
    const processNode = (node) => {
        if (node.type === 'file') {
            if (node.lastModified) {
                dates.push(node.lastModified);
            }
        }
        else {
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
 * Load Timeline V2 (Full Delta) format
 */
async function loadTimelineV2(data, repoName) {
    const loading = document.getElementById('loading');
    try {
        console.log(`\n=== LOADING TIMELINE V2 ===`);
        console.log(`Repository: ${data.repositoryPath}`);
        console.log(`Total commits: ${data.metadata.totalCommits}`);
        console.log(`Date range: ${data.metadata.dateRange.first.substring(0, 10)} to ${data.metadata.dateRange.last.substring(0, 10)}`);
        console.log(`Tags: ${data.metadata.tags.length}`);
        // Create delta controller
        currentDeltaController = new DeltaReplayController(data);
        currentTimelineData = null; // Clear V1 data
        // Update loading indicator based on keyframe mode
        const mode = currentDeltaController.getKeyframeMode();
        if (loading) {
            loading.innerHTML = `
        <div class="spinner"></div>
        <p>${mode === 'full' ? 'Generating full keyframes...' : 'Generating strategic keyframes...'}</p>
        <p id="progress-text">0 / ${data.metadata.totalCommits}</p>
      `;
        }
        // Generate keyframes (adaptive strategy)
        await currentDeltaController.generateKeyframes((current, total) => {
            const progressText = document.getElementById('progress-text');
            if (progressText) {
                progressText.textContent = `${current} / ${total}`;
            }
        });
        // Log keyframe stats
        const stats = currentDeltaController.getKeyframeStats();
        console.log(`📊 Keyframe strategy: ${stats.mode}`);
        console.log(`   Base keyframes: ${stats.baseKeyframes}`);
        console.log(`   Total commits: ${stats.totalCommits}`);
        // VALIDATION: Try to load static HEAD snapshot for comparison
        const staticName = repoName.replace('-timeline-full', '');
        try {
            console.log(`\n📋 Loading HEAD snapshot for validation: ${staticName}`);
            const headData = await loadData(staticName);
            if ('tree' in headData) {
                const validation = currentDeltaController.validateFinalTree(headData);
                if (!validation.isValid) {
                    console.error(`\n❌ VALIDATION FAILED!`);
                    console.error(`Missing files:`, validation.missing.slice(0, 10));
                    console.error(`Extra files:`, validation.extra.slice(0, 10));
                }
            }
        }
        catch (error) {
            console.warn('Could not load HEAD snapshot for validation:', error);
        }
        // Get first commit's tree
        const firstTree = currentDeltaController.getTreeAtCommit(0);
        if (!firstTree) {
            throw new Error('Failed to generate first keyframe');
        }
        // Create a temporary snapshot for initialization
        const tempSnapshot = {
            repositoryPath: data.repositoryPath,
            commit: data.commits[0].hash,
            timestamp: data.commits[0].date,
            author: data.commits[0].author,
            message: data.commits[0].message,
            tree: firstTree,
            commitMessages: {},
            stats: {
                totalFiles: 0,
                totalLoc: 0,
                filesByExtension: {}
            }
        };
        currentSnapshot = tempSnapshot;
        // Build path index from first tree
        pathToFileIndex = buildPathIndex(firstTree);
        // Initialize visualizer
        const canvas = document.getElementById('canvas');
        if (!canvas) {
            throw new Error('Canvas element not found');
        }
        if (!currentVisualizer) {
            currentVisualizer = new TreeVisualizer(canvas);
            currentVisualizer.setOnFileClick(showFileDetails);
            currentVisualizer.setOnDirClick(showDirectoryDetails);
            currentVisualizer.setOnHover(showTooltip);
            const savedMode = localStorage.getItem('labelMode');
            if (savedMode) {
                currentVisualizer.setLabelMode(savedMode);
            }
            const savedColorMode = localStorage.getItem('colorMode');
            if (savedColorMode) {
                currentVisualizer.setColorMode(savedColorMode);
            }
            currentVisualizer.start();
        }
        // Load first tree
        currentVisualizer.visualize(firstTree);
        currentVisualizer.setTimelineMode('v2');
        // Set up V2 playback controls
        setupTimelineV2Controls();
        // Repository name is shown in dropdown only (no separate header element)
        // Display initial commit info (index 0)
        // The onCommit callback only fires on user interaction, not on initial load
        if (currentDeltaController) {
            const initialCommit = currentDeltaController.getCommitAtIndex(0);
            if (initialCommit) {
                const commitInfo = document.getElementById('commit-info');
                if (commitInfo) {
                    const dateStr = new Date(initialCommit.date).toLocaleDateString();
                    // Build file changes summary with label (only show non-zero counts)
                    const added = initialCommit.changes.filesAdded.length;
                    const modified = initialCommit.changes.filesModified.length;
                    const deleted = initialCommit.changes.filesDeleted?.length || 0;
                    const fileChanges = [];
                    if (added > 0)
                        fileChanges.push(`<span style="color: #27ae60">+${added}</span>`);
                    if (modified > 0)
                        fileChanges.push(`<span style="color: #ffff00">~${modified}</span>`);
                    if (deleted > 0)
                        fileChanges.push(`<span style="color: #e74c3c">-${deleted}</span>`);
                    const filesSummary = fileChanges.length > 0 ? ` • Files: ${fileChanges.join(' ')}` : '';
                    // LOC changes with label (lines of code added/deleted)
                    const linesAdded = initialCommit.changes.linesAdded || 0;
                    const linesDeleted = initialCommit.changes.linesDeleted || 0;
                    const locChanges = [];
                    if (linesAdded > 0)
                        locChanges.push(`<span style="color: #27ae60">+${linesAdded}</span>`);
                    if (linesDeleted > 0)
                        locChanges.push(`<span style="color: #e74c3c">-${linesDeleted}</span>`);
                    const locSummary = locChanges.length > 0 ? ` • LOC: ${locChanges.join(' ')}` : '';
                    // Net file count delta (repository growth/shrinkage)
                    // Only show when different from additions (i.e., when there are deletions)
                    const fileDelta = added - deleted;
                    let fileDeltaSummary = '';
                    if (fileDelta > 0 && fileDelta !== added) {
                        // Has deletions, show net (e.g., +7 -3 = +4 files)
                        fileDeltaSummary = ` • <span style="color: #27ae60">+${fileDelta} ${fileDelta === 1 ? 'file' : 'files'}</span>`;
                    }
                    else if (fileDelta < 0) {
                        // Net negative (more deletions than additions)
                        fileDeltaSummary = ` • <span style="color: #e74c3c">${fileDelta} ${Math.abs(fileDelta) === 1 ? 'file' : 'files'}</span>`;
                    }
                    // Otherwise hide (redundant with Files: +N)
                    // Merge commit indicator
                    const mergeIndicator = initialCommit.isMergeCommit ? ' <span style="color: #888; font-size: 0.9em;">[MERGE]</span>' : '';
                    const tags = initialCommit.tags.length > 0 ? ` 🏷️ ${initialCommit.tags.join(', ')}` : '';
                    commitInfo.innerHTML = `${initialCommit.hash.substring(0, 7)} • ${dateStr} • ${initialCommit.author}${mergeIndicator}${filesSummary}${locSummary}${fileDeltaSummary}${tags}`;
                }
                // Highlight files for initial commit
                highlightTimelineCommitFiles(initialCommit, 0);
                // Update repository stats panel with initial tree state
                const totalCommits = currentDeltaController.getTotalCommits();
                updateStatsForTree(firstTree, 0, totalCommits);
            }
        }
        // Show timeline controls
        const timelineControls = document.getElementById('timeline-controls');
        if (timelineControls) {
            timelineControls.style.display = 'flex';
        }
        // Set up tag navigation
        setupTagNavigation();
        // Enable Timeline mode UI
        enableTimelineMode();
        console.log('\n✅ Timeline V2 loaded successfully!\n');
    }
    catch (error) {
        console.error('Error loading Timeline V2:', error);
        if (loading) {
            loading.innerHTML = `<p style="color: red;">Error loading timeline: ${error}</p>`;
        }
    }
    finally {
        if (loading) {
            setTimeout(() => loading.classList.add('hidden'), 500);
        }
    }
}
/**
 * Set up Timeline V2 playback controls
 */
function setupTimelineV2Controls() {
    if (!currentDeltaController)
        return;
    console.log('Setting up Timeline V2 controls...');
    // Track if this is the first commit (to reset camera only once)
    // Note: Set to false because initial camera reset is handled by visualize(firstTree) call above
    let isFirstCommit = false;
    // Listen for commit changes
    currentDeltaController.on('commit', ({ index, commit, tree }) => {
        const perfStart = performance.now();
        const timings = {};
        // Get previous tree for ghost rendering
        const prevTree = index > 0 ? currentDeltaController?.getTreeAtCommit(index - 1) : null;
        // Update visualizer with current tree (normal flow)
        if (currentVisualizer && tree) {
            // Reset camera only on first commit, then allow manual rotation
            const t0 = performance.now();
            currentVisualizer.visualize(tree, isFirstCommit);
            timings.visualize = performance.now() - t0;
            isFirstCommit = false;
            const t1 = performance.now();
            pathToFileIndex = buildPathIndex(tree);
            timings.pathIndex = performance.now() - t1;
            // Render ghosts for deleted files AFTER visualize (Timeline V2 only)
            if (commit.changes.filesDeleted.length > 0 && prevTree) {
                const t2 = performance.now();
                currentVisualizer.renderDeletedFiles(commit.changes.filesDeleted, prevTree);
                timings.ghosts = performance.now() - t2;
            }
            const t3 = performance.now();
            // Update repository stats panel with current tree state
            const totalCommits = currentDeltaController?.getTotalCommits() || 0;
            updateStatsForTree(tree, index, totalCommits);
            timings.stats = performance.now() - t3;
        }
        // Update commit info
        const commitInfo = document.getElementById('commit-info');
        if (commitInfo) {
            const dateStr = new Date(commit.date).toLocaleDateString();
            // Build file changes summary with label (only show non-zero counts)
            const added = commit.changes.filesAdded.length;
            const modified = commit.changes.filesModified.length;
            const deleted = commit.changes.filesDeleted?.length || 0;
            const fileChanges = [];
            if (added > 0)
                fileChanges.push(`<span style="color: #27ae60">+${added}</span>`);
            if (modified > 0)
                fileChanges.push(`<span style="color: #ffff00">~${modified}</span>`);
            if (deleted > 0)
                fileChanges.push(`<span style="color: #e74c3c">-${deleted}</span>`);
            const filesSummary = fileChanges.length > 0 ? ` • Files: ${fileChanges.join(' ')}` : '';
            // LOC changes with label (lines of code added/deleted)
            const linesAdded = commit.changes.linesAdded || 0;
            const linesDeleted = commit.changes.linesDeleted || 0;
            const locChanges = [];
            if (linesAdded > 0)
                locChanges.push(`<span style="color: #27ae60">+${linesAdded}</span>`);
            if (linesDeleted > 0)
                locChanges.push(`<span style="color: #e74c3c">-${linesDeleted}</span>`);
            const locSummary = locChanges.length > 0 ? ` • LOC: ${locChanges.join(' ')}` : '';
            // Net file count delta (repository growth/shrinkage)
            // Only show when different from additions (i.e., when there are deletions)
            const fileDelta = added - deleted;
            let fileDeltaSummary = '';
            if (fileDelta > 0 && fileDelta !== added) {
                // Has deletions, show net (e.g., +7 -3 = +4 files)
                fileDeltaSummary = ` • <span style="color: #27ae60">+${fileDelta} ${fileDelta === 1 ? 'file' : 'files'}</span>`;
            }
            else if (fileDelta < 0) {
                // Net negative (more deletions than additions)
                fileDeltaSummary = ` • <span style="color: #e74c3c">${fileDelta} ${Math.abs(fileDelta) === 1 ? 'file' : 'files'}</span>`;
            }
            // Otherwise hide (redundant with Files: +N)
            // Merge commit indicator
            const mergeIndicator = commit.isMergeCommit ? ' <span style="color: #888; font-size: 0.9em;">[MERGE]</span>' : '';
            const tags = commit.tags.length > 0 ? ` 🏷️ ${commit.tags.join(', ')}` : '';
            commitInfo.innerHTML = `${commit.hash.substring(0, 7)} • ${dateStr} • ${commit.author}${mergeIndicator}${filesSummary}${locSummary}${fileDeltaSummary}${tags}`;
        }
        // Highlight files changed in this commit
        const t4 = performance.now();
        highlightTimelineCommitFiles(commit, index);
        timings.highlight = performance.now() - t4;
        // Update timeline UI
        const t5 = performance.now();
        updateTimelineV2UI(index);
        timings.ui = performance.now() - t5;
        // Log performance metrics (only for slow commits)
        const totalTime = performance.now() - perfStart;
        // Warn if commit processing is slow (potential performance issue)
        if (totalTime > 100) {
            timings.total = totalTime;
            const timingStr = Object.entries(timings)
                .map(([key, val]) => `${key}=${val.toFixed(1)}ms`)
                .join(', ');
            console.warn(`⚠️ Slow commit ${index + 1}: ${timingStr}`);
        }
    });
    // Play/pause button
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (playPauseBtn) {
        playPauseBtn.onclick = () => {
            currentDeltaController?.togglePlay();
        };
    }
    currentDeltaController.on('playStateChanged', ({ isPlaying }) => {
        if (playPauseBtn) {
            playPauseBtn.textContent = isPlaying ? '⏸ Pause' : '▶ Play';
        }
    });
    // Step buttons
    const stepBackBtn = document.getElementById('step-back-btn');
    const stepForwardBtn = document.getElementById('step-forward-btn');
    if (stepBackBtn) {
        stepBackBtn.onclick = () => currentDeltaController?.stepBackward();
    }
    if (stepForwardBtn) {
        stepForwardBtn.onclick = () => currentDeltaController?.stepForward();
    }
    // Go to start/end
    const goToStartBtn = document.getElementById('go-to-start-btn');
    if (goToStartBtn) {
        goToStartBtn.onclick = () => currentDeltaController?.goToStart();
    }
    // Speed control
    const speedSelect = document.getElementById('speed-selector');
    if (speedSelect) {
        speedSelect.onchange = () => {
            const speed = parseInt(speedSelect.value);
            currentDeltaController?.setSpeed(speed);
        };
    }
    // Slider control - seek when dragged
    const sliderEl = document.getElementById('commit-slider');
    if (sliderEl) {
        sliderEl.oninput = () => {
            const index = parseInt(sliderEl.value);
            currentDeltaController?.seekToCommit(index);
        };
    }
    // Timeline scrubber - click and drag to seek
    const scrubber = document.getElementById('timeline-scrubber');
    if (scrubber) {
        let isDragging = false;
        const seekToPosition = (clientX) => {
            if (!currentDeltaController)
                return;
            const rect = scrubber.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = x / rect.width;
            const totalCommits = currentDeltaController.getTotalCommits();
            const targetIndex = Math.floor(percentage * (totalCommits - 1));
            currentDeltaController.seekToCommit(targetIndex);
        };
        scrubber.addEventListener('mousedown', (e) => {
            isDragging = true;
            seekToPosition(e.clientX);
        });
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                seekToPosition(e.clientX);
            }
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
    // Initialize UI
    updateTimelineV2UI(0);
}
/**
 * Update Timeline V2 UI elements
 */
function updateTimelineV2UI(index) {
    if (!currentDeltaController)
        return;
    const currentEl = document.getElementById('timeline-commit-index');
    const totalEl = document.getElementById('timeline-commit-total');
    const progressEl = document.getElementById('timeline-progress');
    if (currentEl) {
        currentEl.textContent = (index + 1).toString();
    }
    if (totalEl) {
        totalEl.textContent = currentDeltaController.getTotalCommits().toString();
    }
    // Update progress bar
    if (progressEl) {
        const total = currentDeltaController.getTotalCommits();
        const percentage = ((index + 1) / total) * 100;
        progressEl.style.width = `${percentage}%`;
    }
    // Update tag selector to match current position
    updateTagSelectorForCurrentCommit(index);
}
/**
 * Set up tag navigation (dropdown and markers)
 */
function setupTagNavigation() {
    if (!currentDeltaController)
        return;
    const metadata = currentDeltaController.getMetadata();
    const tags = metadata.tags;
    if (tags.length === 0) {
        console.log('No tags found in repository');
        return;
    }
    console.log(`Setting up tag navigation: ${tags.length} tags found`);
    // Populate tag dropdown
    const tagSelector = document.getElementById('tag-selector');
    if (tagSelector) {
        // Clear existing options (except the first "-- Select tag --")
        tagSelector.innerHTML = '<option value="">-- Select tag --</option>';
        // Add tags in reverse order (newest first, assuming tags are chronological)
        for (let i = tags.length - 1; i >= 0; i--) {
            const option = document.createElement('option');
            option.value = tags[i];
            option.textContent = tags[i];
            tagSelector.appendChild(option);
        }
        // Handle tag selection
        tagSelector.addEventListener('change', (e) => {
            const target = e.target;
            const selectedTag = target.value;
            if (selectedTag && currentDeltaController) {
                const success = currentDeltaController.seekToTag(selectedTag);
                if (!success) {
                    console.warn(`Tag not found: ${selectedTag}`);
                }
            }
        });
    }
    // Render tag markers on timeline scrubber
    renderTagMarkers();
}
/**
 * Render visual tag markers on the timeline scrubber
 */
function renderTagMarkers() {
    if (!currentDeltaController)
        return;
    const tagMarkersContainer = document.getElementById('tag-markers');
    if (!tagMarkersContainer)
        return;
    // Clear existing markers
    tagMarkersContainer.innerHTML = '';
    const totalCommits = currentDeltaController.getTotalCommits();
    const metadata = currentDeltaController.getMetadata();
    // Find all commits with tags
    const taggedCommits = [];
    for (let i = 0; i < totalCommits; i++) {
        const commit = currentDeltaController.getCommitAtIndex(i);
        if (commit && commit.tags.length > 0) {
            taggedCommits.push({ index: i, tags: commit.tags });
        }
    }
    console.log(`Rendering ${taggedCommits.length} tag markers`);
    // Render markers
    for (const tagged of taggedCommits) {
        const percentage = (tagged.index / (totalCommits - 1)) * 100;
        const marker = document.createElement('div');
        marker.className = 'tag-marker';
        marker.style.left = `${percentage}%`;
        marker.setAttribute('data-tag', tagged.tags.join(', '));
        // Make marker clickable to seek
        marker.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent scrubber click
            currentDeltaController?.seekToCommit(tagged.index);
        });
        tagMarkersContainer.appendChild(marker);
    }
}
/**
 * Update tag selector to reflect current commit's tags
 */
function updateTagSelectorForCurrentCommit(index) {
    if (!currentDeltaController)
        return;
    const commit = currentDeltaController.getCommitAtIndex(index);
    const tagSelector = document.getElementById('tag-selector');
    if (tagSelector && commit) {
        if (commit.tags.length > 0) {
            // Set selector to first tag at this commit
            tagSelector.value = commit.tags[0];
        }
        else {
            // Reset to placeholder if no tag at current commit
            tagSelector.value = '';
        }
    }
}
/**
 * Get currently selected mode from radio buttons
 */
function getSelectedMode() {
    const radio = document.querySelector('input[name="view-mode"]:checked');
    return radio?.value || 'head';
}
/**
 * Set mode radio button programmatically
 */
function setSelectedMode(mode) {
    const radio = document.querySelector(`input[name="view-mode"][value="${mode}"]`);
    if (radio) {
        radio.checked = true;
    }
}
/**
 * Show or hide mode switcher
 */
function updateModeSwitcherVisibility(show) {
    const modeSwitcher = document.getElementById('mode-switcher');
    if (modeSwitcher) {
        modeSwitcher.style.display = show ? 'flex' : 'none';
    }
}
/**
 * Load and display a repository
 */
async function loadRepository(repoName) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('hidden');
        loading.innerHTML = '<div class="spinner"></div><p>Loading visualization...</p>';
    }
    try {
        console.log(`Loading repository: ${repoName}`);
        // Store current base repository name
        currentRepoBaseName = repoName;
        // Check if timeline data exists
        timelineAvailable = await checkTimelineExists(repoName);
        console.log(`Timeline available for ${repoName}: ${timelineAvailable}`);
        // Show/hide mode switcher based on timeline availability
        updateModeSwitcherVisibility(timelineAvailable);
        // Get selected mode
        const mode = getSelectedMode();
        // Determine which file to load and load it
        let data;
        let fileToLoad = repoName;
        if (mode === 'timeline' && timelineAvailable) {
            // Try loading timeline files in order: -timeline-full, then -timeline
            let loaded = false;
            // Try -timeline-full first
            try {
                console.log(`Trying to load: ${repoName}-timeline-full.json`);
                const testData = await loadData(`${repoName}-timeline-full`);
                // If we got here without error, the file exists and is valid JSON
                data = testData;
                fileToLoad = `${repoName}-timeline-full`;
                loaded = true;
                console.log(`Successfully loaded: ${fileToLoad}.json`);
            }
            catch (e) {
                console.log(`Could not load -timeline-full: ${e}`);
            }
            // If -timeline-full failed, try -timeline
            if (!loaded) {
                try {
                    console.log(`Trying to load: ${repoName}-timeline.json`);
                    const testData = await loadData(`${repoName}-timeline`);
                    data = testData;
                    fileToLoad = `${repoName}-timeline`;
                    loaded = true;
                    console.log(`Successfully loaded: ${fileToLoad}.json`);
                }
                catch (e) {
                    console.log(`Could not load -timeline: ${e}`);
                }
            }
            // If neither timeline file worked, fall back to HEAD
            if (!loaded) {
                console.warn(`No timeline file could be loaded for ${repoName}, falling back to HEAD mode`);
                setSelectedMode('head');
                fileToLoad = repoName;
                data = await loadData(fileToLoad);
            }
        }
        else {
            console.log(`Loading HEAD mode: ${fileToLoad}`);
            // If user selected timeline but it's not available, switch back to HEAD
            if (mode === 'timeline') {
                setSelectedMode('head');
            }
            data = await loadData(fileToLoad);
        }
        // Detect format and extract snapshot
        let snapshot;
        if ('format' in data && data.format === 'timeline-v2') {
            // Timeline V2: Full delta format - need to handle specially
            console.log('🎬 Timeline V2 (Full Delta) format detected');
            await loadTimelineV2(data, fileToLoad);
            return; // Early return - V2 uses different loading path
        }
        else if ('format' in data && data.format === 'timeline-v1') {
            // Timeline V1: Sampled format
            console.log('Timeline V1 format detected');
            currentTimelineData = data;
            currentDeltaController = null;
            snapshot = data.headSnapshot;
            console.log(`Timeline data: ${data.timeline.totalCommits} total commits, ${data.timeline.baseSampling.actualCount} sampled`);
        }
        else {
            // Static snapshot format
            console.log('Static snapshot format detected');
            currentTimelineData = null;
            currentDeltaController = null;
            snapshot = data;
        }
        currentSnapshot = snapshot;
        console.log('Data loaded:', snapshot);
        // For static HEAD mode only: disable timeline mode UI
        if (!currentTimelineData && !currentDeltaController) {
            disableTimelineMode();
        }
        // Build commit hash index
        commitToFilesIndex = buildCommitIndex(snapshot.tree);
        console.log(`Built commit index: ${commitToFilesIndex.size} unique commits`);
        // Build path-to-file index for timeline highlighting
        pathToFileIndex = buildPathIndex(snapshot.tree);
        console.log(`Built path index: ${pathToFileIndex.size} files`);
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
                // Set up timeline controls (only once per load)
                setupTimelineControls();
                // Enable Timeline V1 mode UI (limit color options, hide incompatible features)
                enableTimelineMode();
            }
            else {
                timelineControls.style.display = 'none';
                // Re-enable filtering for HEAD view
                enableFiltering();
            }
        }
        // Initialize or reuse visualizer
        const canvas = document.getElementById('canvas');
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
            const savedMode = localStorage.getItem('labelMode');
            if (savedMode) {
                currentVisualizer.setLabelMode(savedMode);
            }
            // Load saved color mode
            const savedColorMode = localStorage.getItem('colorMode');
            if (savedColorMode) {
                currentVisualizer.setColorMode(savedColorMode);
            }
            // Load saved view mode
            const savedViewMode = localStorage.getItem('viewMode');
            if (savedViewMode) {
                currentVisualizer.setViewMode(savedViewMode);
            }
            // Start animation
            currentVisualizer.start();
        }
        // Enable timeline mode if loading timeline data (shows all files for highlighting)
        currentVisualizer.setTimelineMode(currentTimelineData !== null ? 'v1' : 'off');
        // Visualize the tree
        currentVisualizer.visualize(snapshot.tree);
        // Update legend based on current color mode
        const currentColorMode = localStorage.getItem('colorMode') || 'fileType';
        if (currentColorMode === 'fileType') {
            populateLegend(snapshot);
        }
        else {
            updateLegendForColorMode(currentColorMode);
        }
        hideLoading();
        console.log('Visualization ready!');
    }
    catch (error) {
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
    const selector = document.getElementById('repo-selector');
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
            const target = e.target;
            // Clear filters when switching repos (fresh start for new codebase)
            if (currentVisualizer) {
                currentVisualizer.clearFilter();
            }
            await loadRepository(target.value);
        });
    }
    // Set up mode switcher (HEAD vs Timeline)
    const modeRadios = document.querySelectorAll('input[name="view-mode"]');
    modeRadios.forEach(radio => {
        radio.addEventListener('change', async () => {
            // Reload current repository with new mode
            if (currentRepoBaseName) {
                await loadRepository(currentRepoBaseName);
            }
        });
    });
    // Set up color mode selector
    const colorModeSelector = document.getElementById('color-mode-selector');
    if (colorModeSelector) {
        // Load saved preference from localStorage
        const savedColorMode = localStorage.getItem('colorMode');
        if (savedColorMode) {
            colorModeSelector.value = savedColorMode;
        }
        // Handle color mode change
        colorModeSelector.addEventListener('change', (e) => {
            const target = e.target;
            const newMode = target.value;
            localStorage.setItem('colorMode', newMode);
            // Clear filters when switching color modes (categories are incompatible)
            if (currentVisualizer) {
                currentVisualizer.clearFilter();
                currentVisualizer.setColorMode(newMode);
            }
            // Update legend for new color mode (checkboxes will be all checked)
            if (newMode === 'fileType' && currentSnapshot) {
                populateLegend(currentSnapshot);
            }
            else {
                updateLegendForColorMode(newMode);
            }
            // Update stats panel to reflect cleared filters
            if (currentSnapshot) {
                updateStatsDisplay(currentSnapshot);
            }
        });
    }
    // Set up label toggle (after first repo loads so currentVisualizer exists)
    const labelToggle = document.getElementById('label-toggle');
    if (labelToggle) {
        // Load saved preference from localStorage, default to 'hover'
        const savedMode = localStorage.getItem('labelMode');
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
    // Set up view mode toggle (HEAD view only - navigate vs overview)
    const viewModeToggle = document.getElementById('view-mode-toggle');
    if (viewModeToggle) {
        // Load saved preference from localStorage, default to 'navigate'
        const savedViewMode = localStorage.getItem('viewMode');
        const initialViewMode = savedViewMode || 'navigate';
        // Set button text to match saved mode
        viewModeToggle.textContent = initialViewMode === 'navigate' ? 'Navigate' : 'Overview';
        // Handle toggle clicks
        viewModeToggle.addEventListener('click', () => {
            const currentMode = viewModeToggle.textContent === 'Navigate' ? 'navigate' : 'overview';
            const newMode = currentMode === 'navigate' ? 'overview' : 'navigate';
            viewModeToggle.textContent = newMode === 'navigate' ? 'Navigate' : 'Overview';
            localStorage.setItem('viewMode', newMode);
            if (currentVisualizer) {
                currentVisualizer.setViewMode(newMode);
            }
            console.log('View mode:', newMode);
        });
    }
    // Set up highlight commit toggle
    const highlightCommitToggle = document.getElementById('highlight-commit-toggle');
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
    // Set up info panel collapse
    const infoPanelHeader = document.querySelector('#info-panel h3');
    const infoPanel = document.getElementById('info-panel');
    if (infoPanelHeader && infoPanel) {
        infoPanelHeader.addEventListener('click', () => {
            infoPanel.classList.toggle('collapsed');
        });
    }
    // Set up filter control buttons
    const filterTopBtn = document.getElementById('filter-top-btn');
    const filterAllBtn = document.getElementById('filter-all-btn');
    const filterNoneBtn = document.getElementById('filter-none-btn');
    const filterInvertBtn = document.getElementById('filter-invert-btn');
    if (filterTopBtn) {
        filterTopBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.legend-checkbox');
            // Uncheck all
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            // Check only the first one (top category)
            if (checkboxes.length > 0) {
                checkboxes[0].checked = true;
            }
            applyLegendFilters(); // This will update button states
        });
    }
    if (filterAllBtn) {
        filterAllBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.legend-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            applyLegendFilters(); // This will update button states
        });
    }
    if (filterNoneBtn) {
        filterNoneBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.legend-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            applyLegendFilters(); // This will update button states
        });
    }
    if (filterInvertBtn) {
        filterInvertBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.legend-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = !checkbox.checked;
            });
            applyLegendFilters(); // This will update button states
        });
    }
}
/**
 * Show filter controls (for modes that support filtering)
 */
function showFilterControls() {
    const filterControls = document.getElementById('filter-controls');
    if (filterControls) {
        filterControls.style.display = 'flex';
    }
}
/**
 * Hide filter controls (for modes that don't support filtering or in timeline mode)
 */
function hideFilterControls() {
    const filterControls = document.getElementById('filter-controls');
    const filterStatus = document.getElementById('filter-status');
    if (filterControls) {
        filterControls.style.display = 'none';
    }
    if (filterStatus) {
        filterStatus.textContent = '';
    }
}
/**
 * Disable filtering (when entering timeline mode)
 * Disables checkboxes and shows explanatory message
 */
function disableFiltering() {
    const checkboxes = document.querySelectorAll('.legend-checkbox');
    const filterControls = document.getElementById('filter-controls');
    const filterStatus = document.getElementById('filter-status');
    // Hide all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.style.display = 'none';
        checkbox.checked = true; // Reset to all checked
    });
    // Hide filter controls
    if (filterControls) {
        filterControls.style.display = 'none';
    }
    // Clear status message
    if (filterStatus) {
        filterStatus.textContent = '';
    }
    // Clear any active filters
    if (currentVisualizer) {
        currentVisualizer.clearFilter();
    }
}
/**
 * Enable filtering (when returning to HEAD mode)
 * Re-enables checkboxes and filter controls
 */
function enableFiltering() {
    const checkboxes = document.querySelectorAll('.legend-checkbox');
    const filterControls = document.getElementById('filter-controls');
    // Show all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.style.display = '';
        checkbox.disabled = false;
    });
    // Show filter controls
    if (filterControls) {
        filterControls.style.display = '';
        const buttons = filterControls.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = false;
        });
    }
    // Update status message (will be updated by applyLegendFilters if needed)
    updateFilterStatus();
}
/**
 * Update filter status message
 */
function updateFilterStatus() {
    const filterStatus = document.getElementById('filter-status');
    if (!filterStatus || !currentVisualizer)
        return;
    // Get checkbox counts
    const checkboxes = document.querySelectorAll('.legend-checkbox');
    const totalCategories = checkboxes.length;
    const activeCategories = currentVisualizer.getActiveFilterCategories();
    const activeCount = activeCategories.length;
    // If no filters OR all categories selected, no effective filtering happening
    if (!currentVisualizer.hasActiveFilters() || activeCount === totalCategories) {
        filterStatus.textContent = '';
    }
    else {
        // Show selected/total for clarity
        const categoryWord = activeCount === 1 ? 'category' : 'categories';
        filterStatus.textContent = `Filtering: ${activeCount} / ${totalCategories} ${categoryWord}`;
    }
}
/**
 * Update filter control button states based on current selection
 */
function updateFilterControlStates() {
    const checkboxes = document.querySelectorAll('.legend-checkbox');
    const topBtn = document.getElementById('filter-top-btn');
    const allBtn = document.getElementById('filter-all-btn');
    const noneBtn = document.getElementById('filter-none-btn');
    const invertBtn = document.getElementById('filter-invert-btn');
    if (!checkboxes.length || !topBtn || !allBtn || !noneBtn || !invertBtn)
        return;
    // Count checked/unchecked
    let checkedCount = 0;
    let uncheckedCount = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCount++;
        }
        else {
            uncheckedCount++;
        }
    });
    const totalCount = checkboxes.length;
    // Check if only the first checkbox is checked
    const onlyFirstChecked = checkedCount === 1 && checkboxes.length > 0 && checkboxes[0].checked;
    // Hide "Top" when only the first checkbox is already checked
    if (onlyFirstChecked) {
        topBtn.style.display = 'none';
    }
    else {
        topBtn.style.display = '';
    }
    // Hide "All" when all are already checked
    if (checkedCount === totalCount) {
        allBtn.style.display = 'none';
    }
    else {
        allBtn.style.display = '';
    }
    // Hide "None" when none are checked
    if (checkedCount === 0) {
        noneBtn.style.display = 'none';
    }
    else {
        noneBtn.style.display = '';
    }
    // "Invert" is always visible (unless there are no checkboxes)
    if (totalCount === 0) {
        invertBtn.style.display = 'none';
    }
    else {
        invertBtn.style.display = '';
    }
}
/**
 * Apply current legend checkbox state to visualizer
 */
function applyLegendFilters() {
    if (!currentVisualizer || !currentSnapshot)
        return;
    // Get all checked checkboxes
    const checkboxes = document.querySelectorAll('.legend-checkbox');
    const checkedCategories = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const category = checkbox.dataset.category;
            if (category) {
                checkedCategories.push(category);
            }
        }
    });
    // Apply filter (empty array = show all)
    if (checkedCategories.length === 0) {
        currentVisualizer.clearFilter();
    }
    else {
        currentVisualizer.setFilter(checkedCategories);
    }
    // Update visual state
    checkboxes.forEach(checkbox => {
        const legendItem = checkbox.closest('.legend-item');
        if (legendItem) {
            if (checkbox.checked) {
                legendItem.classList.remove('unchecked');
            }
            else {
                legendItem.classList.add('unchecked');
            }
        }
    });
    updateFilterStatus();
    // Update stats panel to reflect filtered counts
    updateStatsDisplay(currentSnapshot);
    // Update button states
    updateFilterControlStates();
}
/**
 * Update legend based on color mode
 */
function updateLegendForColorMode(mode) {
    const legendContent = document.getElementById('legend-content');
    const legendTitle = document.getElementById('legend-title');
    if (!legendContent)
        return;
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
        const intervalCounts = new Map();
        const collectIntervalCounts = (node) => {
            if (node.type === 'file' && node.lastModified) {
                const colorInfo = getColorForFile(node, 'lastModified');
                intervalCounts.set(colorInfo.name, (intervalCounts.get(colorInfo.name) || 0) + 1);
            }
            else if (node.type === 'directory') {
                for (const child of node.children) {
                    collectIntervalCounts(child);
                }
            }
        };
        collectIntervalCounts(currentSnapshot.tree);
        const totalFiles = currentSnapshot.stats.totalFiles;
        // Show intervals with counts and percentages (with checkboxes)
        for (const item of items) {
            const count = intervalCounts.get(item.name) || 0;
            const percentage = ((count / totalFiles) * 100).toFixed(1);
            const fileLabel = count === 1 ? 'file' : 'files';
            const legendItem = document.createElement('label');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
        <input type="checkbox" class="legend-checkbox" data-category="${item.name}" checked>
        <div class="legend-color" style="background: ${item.hex};"></div>
        <span class="legend-label">${item.name} <span style="color: #888;">(${count} ${fileLabel}, ${percentage}%)</span></span>
      `;
            legendContent.appendChild(legendItem);
            // Add change event listener
            const checkbox = legendItem.querySelector('.legend-checkbox');
            if (checkbox) {
                checkbox.addEventListener('change', applyLegendFilters);
            }
        }
        showFilterControls();
        updateFilterControlStates();
    }
    else if (items.length > 0) {
        // Show color mode specific legend without counts (with checkboxes for supported modes)
        for (const item of items) {
            const legendItem = document.createElement('label');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
        <input type="checkbox" class="legend-checkbox" data-category="${item.name}" checked>
        <div class="legend-color" style="background: ${item.hex};"></div>
        <span class="legend-label">${item.name}</span>
      `;
            legendContent.appendChild(legendItem);
            // Add change event listener
            const checkbox = legendItem.querySelector('.legend-checkbox');
            if (checkbox) {
                checkbox.addEventListener('change', applyLegendFilters);
            }
        }
        showFilterControls();
        updateFilterControlStates();
    }
    else if (mode === 'author' && currentSnapshot) {
        // For author mode, collect authors with file counts
        const authorCounts = new Map();
        const collectAuthors = (node) => {
            if (node.type === 'file' && node.lastAuthor) {
                authorCounts.set(node.lastAuthor, (authorCounts.get(node.lastAuthor) || 0) + 1);
            }
            else if (node.type === 'directory') {
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
            const colorInfo = getColorForFile({ lastAuthor: author }, 'author');
            const legendItem = document.createElement('label');
            legendItem.className = 'legend-item';
            const fileLabel = count === 1 ? 'file' : 'files';
            legendItem.innerHTML = `
        <input type="checkbox" class="legend-checkbox" data-category="${author}" checked>
        <div class="legend-color" style="background: ${colorInfo.hex};"></div>
        <span class="legend-label">${author} <span style="color: #888;">(${count} ${fileLabel}, ${percentage}%)</span></span>
      `;
            legendContent.appendChild(legendItem);
            // Add change event listener
            const checkbox = legendItem.querySelector('.legend-checkbox');
            if (checkbox) {
                checkbox.addEventListener('change', applyLegendFilters);
            }
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
        showFilterControls();
        updateFilterControlStates();
    }
    // Note: For fileType mode, legend is populated by populateLegend() which shows actual files present
}
/**
 * Timeline playback functions
 */
function updateTimelineUI() {
    if (!currentTimelineData)
        return;
    const commits = currentTimelineData.timeline.baseSampling.commits;
    const commit = commits[timelineIndex];
    // Update progress bar
    const progress = ((timelineIndex + 1) / commits.length) * 100;
    const progressBar = document.getElementById('timeline-progress');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    // Update commit counter
    const commitIndexEl = document.getElementById('timeline-commit-index');
    const commitTotalEl = document.getElementById('timeline-commit-total');
    if (commitIndexEl)
        commitIndexEl.textContent = (timelineIndex + 1).toString();
    if (commitTotalEl)
        commitTotalEl.textContent = commits.length.toString();
    // Update commit info in timeline (below the scrubber)
    const commitInfo = document.getElementById('commit-info');
    if (commitInfo && currentSnapshot) {
        const date = new Date(commit.date).toLocaleDateString();
        commitInfo.textContent = `${commit.hash.substring(0, 7)} • ${date} • ${currentSnapshot.stats.totalFiles} files • ${currentSnapshot.stats.totalLoc.toLocaleString()} LOC`;
    }
    console.log(`Timeline: commit ${timelineIndex + 1}/${commits.length} - ${commit.hash.substring(0, 7)}`);
    // Highlight changed files in this commit
    highlightTimelineCommitFiles(commit);
}
function highlightTimelineCommitFiles(commit, commitIndex) {
    if (!currentVisualizer)
        return;
    // Timeline V2 (full delta) vs V1 (sampled) have different highlighting semantics
    const isTimelineV2 = currentDeltaController !== null;
    // Calculate changes
    const filesAdded = commit.changes.filesAdded.length;
    const filesModified = commit.changes.filesModified.length;
    const filesDeleted = commit.changes.filesDeleted?.length || 0;
    if (isTimelineV2) {
        // TIMELINE V2: Show historical tree, highlight additions/modifications/deletions
        // Note: Deletions are rendered as ghosts separately, not included in changedFiles count
        const nonGhostChanges = filesAdded + filesModified;
        const totalChanges = filesAdded + filesModified + filesDeleted;
        // Collect files to highlight separately by type (additions vs modifications vs deletions)
        const addedFiles = [];
        const modifiedFiles = [];
        for (const path of commit.changes.filesAdded) {
            const fileNode = pathToFileIndex.get(path);
            if (fileNode) {
                addedFiles.push(fileNode);
            }
        }
        for (const path of commit.changes.filesModified) {
            const fileNode = pathToFileIndex.get(path);
            if (fileNode) {
                modifiedFiles.push(fileNode);
            }
        }
        // For deleted files, they've been rendered as ghosts by renderDeletedFiles()
        // The ghost rendering adds them to fileObjects map with full metadata
        // So we just need to pass the paths for highlighting - the visualization will find them
        const changedFiles = [...addedFiles, ...modifiedFiles];
        const deletedPaths = commit.changes.filesDeleted || [];
        if (totalChanges === 0) {
            // No changes at all - empty commit
            currentVisualizer.clearHighlight();
            hideTimelineWarning();
        }
        else if (changedFiles.length === 0 && deletedPaths.length === 0) {
            // Should have found additions/modifications/deletions but didn't - unexpected!
            currentVisualizer.clearHighlight();
            showTimelineWarning(`⚠️ Cannot highlight ${totalChanges} change(s)`);
            console.warn(`Timeline V2: Failed to find ${totalChanges} file changes`);
        }
        else if (changedFiles.length < nonGhostChanges) {
            // Found some but not all additions/modifications - partial highlighting
            const addedPaths = addedFiles.map(f => f.path);
            const modifiedPaths = modifiedFiles.map(f => f.path);
            currentVisualizer.highlightFilesByType(addedPaths, modifiedPaths, deletedPaths, []);
            // Some additions/modifications are missing (actual problem)
            showTimelineWarning(`⚠️ Highlighting ${changedFiles.length + deletedPaths.length}/${totalChanges} changes`);
        }
        else {
            // Found all additions/modifications - success! (deletions are ghosts)
            const addedPaths = addedFiles.map(f => f.path);
            const modifiedPaths = modifiedFiles.map(f => f.path);
            currentVisualizer.highlightFilesByType(addedPaths, modifiedPaths, deletedPaths, []);
            hideTimelineWarning();
        }
    }
    else {
        // TIMELINE V1: Show HEAD tree, highlight historical files that exist in HEAD
        const totalChanges = filesAdded + filesModified;
        const changedFiles = [];
        for (const path of [...commit.changes.filesAdded, ...commit.changes.filesModified]) {
            const fileNode = pathToFileIndex.get(path);
            if (fileNode) {
                changedFiles.push(fileNode);
            }
        }
        // V1 warnings help user understand which historical files are missing from HEAD
        if (changedFiles.length === 0) {
            currentVisualizer.clearHighlight();
            showTimelineWarning(`⚠️ Cannot highlight changes - ${totalChanges} file${totalChanges !== 1 ? 's' : ''} not in current view`);
            console.log(`Timeline V1: 0 of ${totalChanges} files found in HEAD`);
        }
        else if (changedFiles.length < totalChanges) {
            const filePaths = changedFiles.map(f => f.path);
            currentVisualizer.highlightFiles(filePaths);
            const missing = totalChanges - changedFiles.length;
            showTimelineWarning(`⚠️ Highlighting ${changedFiles.length} of ${totalChanges} files (${missing} not in current view)`);
            console.log(`Timeline V1: Partial ${changedFiles.length}/${totalChanges} files in HEAD`);
        }
        else {
            const filePaths = changedFiles.map(f => f.path);
            currentVisualizer.highlightFiles(filePaths);
            hideTimelineWarning();
            console.log(`Timeline V1: Highlighted all ${changedFiles.length} files`);
        }
    }
}
function showTimelineWarning(message) {
    const warning = document.getElementById('timeline-warning');
    const text = document.getElementById('timeline-warning-text');
    if (warning && text) {
        text.textContent = message;
        warning.style.display = 'block';
    }
}
function hideTimelineWarning() {
    const warning = document.getElementById('timeline-warning');
    if (warning) {
        warning.style.display = 'none';
    }
}
function stepForward() {
    if (!currentTimelineData)
        return;
    const commits = currentTimelineData.timeline.baseSampling.commits;
    if (timelineIndex < commits.length - 1) {
        timelineIndex++;
        updateTimelineUI();
    }
}
function stepBackward() {
    if (!currentTimelineData)
        return;
    if (timelineIndex > 0) {
        timelineIndex--;
        updateTimelineUI();
    }
}
function goToStart() {
    if (!currentTimelineData)
        return;
    timelineIndex = 0;
    updateTimelineUI();
}
function togglePlayPause() {
    if (!currentTimelineData)
        return;
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (timelinePlaying) {
        // Pause
        timelinePlaying = false;
        if (timelineIntervalId !== null) {
            clearInterval(timelineIntervalId);
            timelineIntervalId = null;
        }
        if (playPauseBtn) {
            playPauseBtn.textContent = '▶ Play';
        }
    }
    else {
        // Play
        timelinePlaying = true;
        if (playPauseBtn) {
            playPauseBtn.textContent = '⏸ Pause';
        }
        const baseInterval = 2000; // 2 seconds per commit at 1x speed
        const interval = baseInterval / timelineSpeed;
        timelineIntervalId = window.setInterval(() => {
            const commits = currentTimelineData.timeline.baseSampling.commits;
            if (timelineIndex < commits.length - 1) {
                stepForward();
            }
            else {
                // Reached end, stop playing
                togglePlayPause();
            }
        }, interval);
    }
}
function seekTimeline(percentage) {
    if (!currentTimelineData)
        return;
    const commits = currentTimelineData.timeline.baseSampling.commits;
    const newIndex = Math.floor((percentage / 100) * commits.length);
    timelineIndex = Math.max(0, Math.min(newIndex, commits.length - 1));
    updateTimelineUI();
}
function setupTimelineControls() {
    if (!currentTimelineData)
        return;
    // Initialize UI
    const commitTotalEl = document.getElementById('timeline-commit-total');
    if (commitTotalEl) {
        commitTotalEl.textContent = currentTimelineData.timeline.baseSampling.commits.length.toString();
    }
    // Play/Pause button
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    // Step buttons
    const goToStartBtn = document.getElementById('go-to-start-btn');
    if (goToStartBtn) {
        goToStartBtn.addEventListener('click', goToStart);
    }
    const stepBackBtn = document.getElementById('step-back-btn');
    if (stepBackBtn) {
        stepBackBtn.addEventListener('click', stepBackward);
    }
    const stepForwardBtn = document.getElementById('step-forward-btn');
    if (stepForwardBtn) {
        stepForwardBtn.addEventListener('click', stepForward);
    }
    // Speed selector
    const speedSelector = document.getElementById('speed-selector');
    if (speedSelector) {
        speedSelector.addEventListener('change', (e) => {
            const target = e.target;
            timelineSpeed = parseFloat(target.value);
            // If currently playing, restart with new speed
            if (timelinePlaying) {
                togglePlayPause(); // Stop
                togglePlayPause(); // Start with new speed
            }
        });
    }
    // Timeline scrubber - click to seek (Timeline V1 only)
    const scrubber = document.getElementById('timeline-scrubber');
    if (scrubber) {
        scrubber.addEventListener('click', (e) => {
            const rect = scrubber.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            seekTimeline(percentage);
        });
    }
    // Set initial state
    timelineIndex = 0;
    updateTimelineUI();
}
// Start the application
main();
