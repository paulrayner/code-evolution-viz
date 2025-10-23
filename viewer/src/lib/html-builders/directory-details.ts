/**
 * Pure HTML builder for directory details panel
 * Extracted from main.ts showDirectoryDetails function
 */

import { DirectoryNode } from '../../types';

export interface DirectoryDetailsData {
  dir: DirectoryNode;
  stats: {
    totalLoc: number;
    fileCount: number;
    dirCount: number;
    dominantExt: string;
    dominantName: string;
  };
  lastModified: {
    date: string; // Formatted date string
    author: string;
  };
  githubDirUrl: string | null;
}

/**
 * Build HTML for directory details panel
 * Pure function - no side effects, no DOM access, no global state
 */
export function buildDirectoryDetailsHTML(data: DirectoryDetailsData): string {
  const { dir, stats, lastModified, githubDirUrl } = data;

  return `
    <div class="info-row">
      <span class="label">Type</span>
      <span class="value">Directory</span>
    </div>
    <div class="info-row">
      <span class="label">Path</span>
      <span class="value">${dir.path || '(root)'}</span>
    </div>
    ${githubDirUrl ? `<div class="info-row">
      <span class="label">View on GitHub</span>
      <span class="value"><a href="${githubDirUrl}" target="_blank" style="color: #4a9eff; text-decoration: none;">🔗 Open folder</a></span>
    </div>` : ''}
    <div class="info-row">
      <span class="label">Total LOC</span>
      <span class="value">${stats.totalLoc.toLocaleString()}</span>
    </div>
    <div class="info-row">
      <span class="label">Files</span>
      <span class="value">${stats.fileCount}</span>
    </div>
    <div class="info-row">
      <span class="label">Subdirectories</span>
      <span class="value">${stats.dirCount}</span>
    </div>
    <div class="info-row">
      <span class="label">Dominant Type</span>
      <span class="value">${stats.dominantName}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Modified</span>
      <span class="value">${lastModified.date}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Author</span>
      <span class="value">${lastModified.author}</span>
    </div>
  `;
}
