/**
 * Pure HTML builder for file details panel
 * Extracted from main.ts showFileDetails function
 */

import { FileNode } from '../../types';
import { Cluster, CouplingEdge } from '../../coupling-types';

export interface FileDetailsData {
  file: FileNode;
  githubFileUrl: string | null;
  commitInfo: {
    commitHashStr: string; // Short hash (7 chars)
    message: string;
    siblings: FileNode[]; // Other files in same commit (excluding current file)
  } | null;
  clusterInfo: {
    cluster: Cluster;
    topEdges: CouplingEdge[]; // Already sorted and limited to top 5
  } | null;
}

/**
 * Build HTML for file details panel
 * Pure function - no side effects, no DOM access, no global state
 */
export function buildFileDetailsHTML(data: FileDetailsData): string {
  const { file, githubFileUrl, commitInfo, clusterInfo } = data;

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

        if (ageInYears >= 5) return `${Math.floor(ageInYears)} years (Legacy)`;
        if (ageInYears >= 3) return `${Math.floor(ageInYears)} years (Old)`;
        if (ageInYears >= 1) return `${Math.floor(ageInYears)} year${Math.floor(ageInYears) > 1 ? 's' : ''} (Mature)`;

        const ageInMonths = ageInDays / 30;
        if (ageInMonths >= 3) return `${Math.floor(ageInMonths)} months (Recent)`;
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
    ${githubFileUrl ? `<div class="info-row">
      <span class="label">View on GitHub</span>
      <span class="value"><a href="${githubFileUrl}" target="_blank" style="color: #4a9eff; text-decoration: none;">🔗 Open file</a></span>
    </div>` : ''}
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

  // Add commit info section if available
  if (commitInfo && (commitInfo.message || commitInfo.siblings.length > 0)) {
    detailsHtml += `
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        `;

    // Show commit info if message is available
    if (commitInfo.message) {
      detailsHtml += `
            <div style="margin-bottom: 12px;">
              <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
                Commit: <span style="color: #4a9eff; font-family: monospace;">${commitInfo.commitHashStr}</span>
              </div>
              <div style="font-size: 12px; color: #ddd; font-style: italic; line-height: 1.4;">
                "${commitInfo.message}"
              </div>
            </div>
          `;
    }

    // Show commit siblings if any
    if (commitInfo.siblings.length > 0) {
      detailsHtml += `
            <div style="font-size: 12px; font-weight: 600; color: #4a9eff; margin-bottom: 8px;">
              Commit Siblings (${commitInfo.siblings.length} file${commitInfo.siblings.length !== 1 ? 's' : ''})
            </div>
            <div style="font-size: 11px;">
          `;

      for (const sibling of commitInfo.siblings) {
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

  // Add coupling analysis section if available
  if (clusterInfo) {
    const { cluster, topEdges } = clusterInfo;

    detailsHtml += `
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <div style="font-size: 12px; font-weight: 600; color: #4a9eff; margin-bottom: 8px;">
                📊 Coupling Cluster
              </div>
              <div style="font-size: 11px; color: #ccc; margin-bottom: 12px; padding-left: 12px;">
                ${cluster.name} (${cluster.fileCount} files)
              </div>
          `;

    if (topEdges.length > 0) {
      detailsHtml += `
              <div style="font-size: 12px; font-weight: 600; color: #4a9eff; margin-bottom: 8px;">
                🔗 Most Frequently Changes With
              </div>
              <div style="font-size: 11px;">
            `;

      for (const edge of topEdges) {
        const otherFile = edge.fileA === file.path ? edge.fileB : edge.fileA;
        const fileName = otherFile.split('/').pop() || otherFile;
        const couplingPercent = Math.round(edge.coupling * 100);

        detailsHtml += `
                <div style="padding: 4px 0; color: #ccc; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #ddd;">${fileName}</span>
                    <span style="color: #888; font-size: 10px;">${edge.coChangeCount} co-changes</span>
                  </div>
                  <div style="font-size: 10px; color: #888; margin-top: 2px;">
                    ${couplingPercent}% coupling strength
                  </div>
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

  return detailsHtml;
}
