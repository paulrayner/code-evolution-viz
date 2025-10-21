import { getColorForExtension } from './colorScheme';
/**
 * Palette of maximally distinct colors for author visualization
 * Ordered to maximize contrast between adjacent colors
 * Note: Starts with green to avoid red for primary author
 */
const AUTHOR_COLORS = [
    '#3cb44b', // Green (first to avoid red)
    '#4363d8', // Blue
    '#f58231', // Orange
    '#911eb4', // Purple
    '#42d4f4', // Cyan
    '#ffe119', // Yellow
    '#f032e6', // Magenta
    '#bfef45', // Lime
    '#469990', // Teal
    '#e6194B', // Red (moved down from first)
    '#aaffc3', // Mint
    '#000075', // Navy
    '#fabed4', // Pink
    '#9A6324', // Brown
    '#dcbeff', // Lavender
    '#808000', // Olive
    '#00ffff', // Aqua
    '#a9a9a9', // Gray
    '#800000', // Maroon
    '#ffd8b1', // Apricot
    '#e6beff', // Mauve
    '#aa6e28', // Tan
    '#fffac8', // Beige
    '#ffffff', // White
];
/**
 * Cache for author name to color index mapping
 * Used to ensure consistent colors across the application
 */
const authorColorCache = new Map();
let nextColorIndex = 0;
let lastModifiedIntervals = [];
/**
 * Reset the author color cache
 * Called when switching repositories
 */
export function resetAuthorColors() {
    authorColorCache.clear();
    nextColorIndex = 0;
}
/**
 * Calculate percentile-based intervals for last modified dates
 * This creates 7 buckets with finer granularity for newer files
 * Only uses percentile intervals for "stale" repos (no changes in last 90 days)
 */
export function calculateLastModifiedIntervals(dates) {
    if (dates.length === 0) {
        lastModifiedIntervals = [];
        return;
    }
    // Sort dates chronologically
    const sortedDates = dates
        .map(d => new Date(d))
        .sort((a, b) => a.getTime() - b.getTime());
    const count = sortedDates.length;
    // Check if repo is active by looking at the 80th percentile
    // If 80% of files have been modified in the last 90 days, consider it "active"
    const now = new Date();
    const p80Index = Math.floor(count * 0.8);
    const date80thPercentile = sortedDates[p80Index];
    const daysSince80thPercentile = (now.getTime() - date80thPercentile.getTime()) / (1000 * 60 * 60 * 24);
    // If 80% of files are newer than 90 days, use fixed intervals (active repo)
    // Otherwise use percentile intervals (stale repo)
    if (daysSince80thPercentile < 90) {
        lastModifiedIntervals = [];
        return;
    }
    // Calculate percentile indices (5%, 10%, 20%, 40%, 60%, 80%, 90%, 95%, 100%)
    const p20 = Math.floor(count * 0.2) - 1;
    const p40 = Math.floor(count * 0.4) - 1;
    const p60 = Math.floor(count * 0.6) - 1;
    const p80 = Math.floor(count * 0.8) - 1;
    const p90 = Math.floor(count * 0.9) - 1;
    const p95 = Math.floor(count * 0.95) - 1;
    const p100 = count - 1;
    // Get the dates at each percentile
    const oldestDate = sortedDates[0];
    const date20 = sortedDates[Math.max(0, p20)];
    const date40 = sortedDates[Math.max(0, p40)];
    const date60 = sortedDates[Math.max(0, p60)];
    const date80 = sortedDates[Math.max(0, p80)];
    const date90 = sortedDates[Math.max(0, p90)];
    const date95 = sortedDates[Math.max(0, p95)];
    const newestDate = sortedDates[count - 1];
    // Helper to format year range
    const formatYearRange = (start, end) => {
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();
        return startYear === endYear ? `${startYear}` : `${startYear}-${endYear}`;
    };
    // Create intervals (ordered from newest to oldest for display)
    lastModifiedIntervals = [
        {
            minDate: date95,
            maxDate: newestDate,
            label: `Newest 5%: ${formatYearRange(date95, newestDate)}`,
            hex: '#00ff88' // Bright green
        },
        {
            minDate: date90,
            maxDate: date95,
            label: `5-10%: ${formatYearRange(date90, date95)}`,
            hex: '#ccff00' // Yellow
        },
        {
            minDate: date80,
            maxDate: date90,
            label: `10-20%: ${formatYearRange(date80, date90)}`,
            hex: '#ffaa00' // Orange-yellow
        },
        {
            minDate: date60,
            maxDate: date80,
            label: `20-40%: ${formatYearRange(date60, date80)}`,
            hex: '#ff8800' // Orange
        },
        {
            minDate: date40,
            maxDate: date60,
            label: `40-60%: ${formatYearRange(date40, date60)}`,
            hex: '#ff5500' // Red-orange
        },
        {
            minDate: date20,
            maxDate: date40,
            label: `60-80%: ${formatYearRange(date20, date40)}`,
            hex: '#cc3333' // Red
        },
        {
            minDate: oldestDate,
            maxDate: date20,
            label: `Oldest 20%: ${formatYearRange(oldestDate, date20)}`,
            hex: '#666666' // Gray
        }
    ];
}
/**
 * Pre-assign colors to authors based on their rank (by file count)
 * This ensures top contributors get the most distinct colors
 */
export function assignAuthorColors(authorsByRank) {
    resetAuthorColors();
    for (const author of authorsByRank) {
        if (!authorColorCache.has(author)) {
            authorColorCache.set(author, nextColorIndex % AUTHOR_COLORS.length);
            nextColorIndex++;
        }
    }
}
/**
 * Generate a consistent color for an author name using a distinct color palette
 * Colors are assigned based on first-seen order (typically by contributor rank)
 */
function getColorForAuthor(author) {
    if (!author) {
        return { hex: '#666666', name: 'Unknown' };
    }
    // Get or assign color index
    let index = authorColorCache.get(author);
    if (index === undefined) {
        index = nextColorIndex % AUTHOR_COLORS.length;
        authorColorCache.set(author, index);
        nextColorIndex++;
    }
    const hex = AUTHOR_COLORS[index];
    return { hex, name: author };
}
/**
 * Get color for a file based on commit count (churn heatmap)
 * Uses quantile-based buckets for good distribution
 */
function getColorByChurn(commitCount) {
    if (commitCount === null || commitCount === 0) {
        return { hex: '#666666', name: 'No commits' };
    }
    // Cool to hot gradient: blue → yellow → orange → red
    if (commitCount <= 2) {
        return { hex: '#3498db', name: 'Low churn (1-2 commits)' };
    }
    else if (commitCount <= 5) {
        return { hex: '#2ecc71', name: 'Low-medium (3-5 commits)' };
    }
    else if (commitCount <= 10) {
        return { hex: '#f1c40f', name: 'Medium (6-10 commits)' };
    }
    else if (commitCount <= 20) {
        return { hex: '#e67e22', name: 'High (11-20 commits)' };
    }
    else if (commitCount <= 50) {
        return { hex: '#e74c3c', name: 'Very high (21-50 commits)' };
    }
    else {
        return { hex: '#c0392b', name: 'Extremely high (50+ commits)' };
    }
}
/**
 * Get color for a file based on number of unique contributors
 */
function getColorByContributors(contributorCount) {
    if (contributorCount === null || contributorCount === 0) {
        return { hex: '#666666', name: 'No contributors' };
    }
    if (contributorCount === 1) {
        return { hex: '#3498db', name: 'Solo (1 contributor)' };
    }
    else if (contributorCount === 2) {
        return { hex: '#2ecc71', name: 'Pair (2 contributors)' };
    }
    else if (contributorCount <= 4) {
        return { hex: '#f1c40f', name: 'Team (3-4 contributors)' };
    }
    else if (contributorCount <= 9) {
        return { hex: '#e67e22', name: 'Squad (5-9 contributors)' };
    }
    else {
        return { hex: '#e74c3c', name: 'Many (10+ contributors)' };
    }
}
/**
 * Get color for a file based on its age (first commit date)
 */
function getColorByFileAge(firstCommitDate) {
    if (!firstCommitDate) {
        return { hex: '#666666', name: 'Unknown age' };
    }
    const now = Date.now();
    const fileDate = new Date(firstCommitDate).getTime();
    const ageInDays = (now - fileDate) / (1000 * 60 * 60 * 24);
    const ageInMonths = ageInDays / 30;
    const ageInYears = ageInDays / 365;
    // New → legacy gradient: cyan → blue → purple → brown → gray
    if (ageInMonths < 3) {
        return { hex: '#00d9ff', name: 'New (<3 months)' };
    }
    else if (ageInYears < 1) {
        return { hex: '#3498db', name: 'Recent (3-12 months)' };
    }
    else if (ageInYears < 3) {
        return { hex: '#9b59b6', name: 'Mature (1-3 years)' };
    }
    else if (ageInYears < 5) {
        return { hex: '#795548', name: 'Old (3-5 years)' };
    }
    else {
        return { hex: '#34495e', name: 'Legacy (5+ years)' };
    }
}
/**
 * Get color for a file based on recent activity (lines changed in last 90 days)
 */
function getColorByRecentActivity(recentLinesChanged) {
    if (recentLinesChanged === null || recentLinesChanged === 0) {
        return { hex: '#666666', name: 'No recent activity' };
    }
    // Blue (low activity) → Red (high activity)
    if (recentLinesChanged <= 50) {
        return { hex: '#3498db', name: 'Low (1-50 lines)' };
    }
    else if (recentLinesChanged <= 200) {
        return { hex: '#2ecc71', name: 'Moderate (51-200 lines)' };
    }
    else if (recentLinesChanged <= 500) {
        return { hex: '#f1c40f', name: 'High (201-500 lines)' };
    }
    else if (recentLinesChanged <= 1000) {
        return { hex: '#e67e22', name: 'Very high (501-1000 lines)' };
    }
    else {
        return { hex: '#e74c3c', name: 'Extremely high (1000+ lines)' };
    }
}
/**
 * Get color for a file based on code stability (avg lines changed per commit)
 */
function getColorByStability(avgLinesPerCommit) {
    if (avgLinesPerCommit === null) {
        return { hex: '#666666', name: 'Unknown' };
    }
    // Blue (stable, small changes) → Red (volatile, large changes)
    if (avgLinesPerCommit < 10) {
        return { hex: '#3498db', name: 'Very stable (<10 lines/commit)' };
    }
    else if (avgLinesPerCommit < 25) {
        return { hex: '#2ecc71', name: 'Stable (10-24 lines/commit)' };
    }
    else if (avgLinesPerCommit < 50) {
        return { hex: '#f1c40f', name: 'Moderate (25-49 lines/commit)' };
    }
    else if (avgLinesPerCommit < 100) {
        return { hex: '#e67e22', name: 'Volatile (50-99 lines/commit)' };
    }
    else {
        return { hex: '#e74c3c', name: 'Very volatile (100+ lines/commit)' };
    }
}
/**
 * Get color for a file based on recency (days since last modified)
 */
function getColorByRecency(daysSinceLastModified) {
    if (daysSinceLastModified === null) {
        return { hex: '#666666', name: 'Unknown' };
    }
    // Red (hot, recent) → Gray (cold, stale)
    if (daysSinceLastModified < 7) {
        return { hex: '#e74c3c', name: 'Hot (<7 days)' };
    }
    else if (daysSinceLastModified < 30) {
        return { hex: '#e67e22', name: 'Warm (1-4 weeks)' };
    }
    else if (daysSinceLastModified < 90) {
        return { hex: '#f1c40f', name: 'Recent (1-3 months)' };
    }
    else if (daysSinceLastModified < 180) {
        return { hex: '#3498db', name: 'Cool (3-6 months)' };
    }
    else {
        return { hex: '#95a5a6', name: 'Cold (6+ months)' };
    }
}
/**
 * Get color for a file based on the selected color mode
 */
export function getColorForFile(file, mode) {
    switch (mode) {
        case 'fileType':
            return getColorForExtension(file.extension);
        case 'lastModified':
            return getColorByLastModified(file.lastModified);
        case 'author':
            return getColorForAuthor(file.lastAuthor);
        case 'churn':
            return getColorByChurn(file.commitCount);
        case 'contributors':
            return getColorByContributors(file.contributorCount);
        case 'fileAge':
            return getColorByFileAge(file.firstCommitDate);
        case 'recentActivity':
            return getColorByRecentActivity(file.recentLinesChanged);
        case 'stability':
            return getColorByStability(file.avgLinesPerCommit);
        case 'recency':
            return getColorByRecency(file.daysSinceLastModified);
        default:
            return getColorForExtension(file.extension);
    }
}
/**
 * Color files based on when they were last modified
 * Uses percentile-based intervals if calculated, otherwise falls back to fixed intervals
 */
function getColorByLastModified(lastModified) {
    if (!lastModified) {
        return { hex: '#666666', name: 'Unknown' };
    }
    const modifiedDate = new Date(lastModified);
    // Use percentile intervals if available
    if (lastModifiedIntervals.length > 0) {
        for (const interval of lastModifiedIntervals) {
            if (modifiedDate >= interval.minDate && modifiedDate <= interval.maxDate) {
                return { hex: interval.hex, name: interval.label };
            }
        }
        // Fallback to oldest interval if date is older than all intervals
        const oldestInterval = lastModifiedIntervals[lastModifiedIntervals.length - 1];
        return { hex: oldestInterval.hex, name: oldestInterval.label };
    }
    // Fallback to extended fixed time intervals if percentiles not calculated
    const now = new Date();
    const daysSince = (now.getTime() - modifiedDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince < 7) {
        return { hex: '#00ff88', name: 'Last week' };
    }
    else if (daysSince < 30) {
        return { hex: '#ccff00', name: '1 week - 1 month' };
    }
    else if (daysSince < 90) {
        return { hex: '#ffaa00', name: '1-3 months' };
    }
    else if (daysSince < 180) {
        return { hex: '#ff8800', name: '3-6 months' };
    }
    else if (daysSince < 365) {
        return { hex: '#ff5500', name: '6 months - 1 year' };
    }
    else if (daysSince < 730) {
        return { hex: '#cc3333', name: '1-2 years' };
    }
    else {
        return { hex: '#666666', name: 'Older than 2 years' };
    }
}
/**
 * Check if percentile-based intervals are active
 */
export function isUsingPercentileIntervals() {
    return lastModifiedIntervals.length > 0;
}
/**
 * Get legend items for the current color mode
 */
export function getLegendItems(mode) {
    switch (mode) {
        case 'lastModified':
            // Use percentile intervals if calculated
            if (lastModifiedIntervals.length > 0) {
                return lastModifiedIntervals.map(interval => ({
                    hex: interval.hex,
                    name: interval.label
                }));
            }
            // Fallback to extended fixed intervals
            return [
                { hex: '#00ff88', name: 'Last week' },
                { hex: '#ccff00', name: '1 week - 1 month' },
                { hex: '#ffaa00', name: '1-3 months' },
                { hex: '#ff8800', name: '3-6 months' },
                { hex: '#ff5500', name: '6 months - 1 year' },
                { hex: '#cc3333', name: '1-2 years' },
                { hex: '#666666', name: 'Older than 2 years' }
            ];
        case 'author':
            // For author mode, legend is populated dynamically based on authors present
            return [];
        case 'churn':
            return [
                { hex: '#c0392b', name: 'Extremely high (50+ commits)' },
                { hex: '#e74c3c', name: 'Very high (21-50 commits)' },
                { hex: '#e67e22', name: 'High (11-20 commits)' },
                { hex: '#f1c40f', name: 'Medium (6-10 commits)' },
                { hex: '#2ecc71', name: 'Low-medium (3-5 commits)' },
                { hex: '#3498db', name: 'Low churn (1-2 commits)' }
            ];
        case 'contributors':
            return [
                { hex: '#e74c3c', name: 'Many (10+ contributors)' },
                { hex: '#e67e22', name: 'Squad (5-9 contributors)' },
                { hex: '#f1c40f', name: 'Team (3-4 contributors)' },
                { hex: '#2ecc71', name: 'Pair (2 contributors)' },
                { hex: '#3498db', name: 'Solo (1 contributor)' }
            ];
        case 'fileAge':
            return [
                { hex: '#00d9ff', name: 'New (<3 months)' },
                { hex: '#3498db', name: 'Recent (3-12 months)' },
                { hex: '#9b59b6', name: 'Mature (1-3 years)' },
                { hex: '#795548', name: 'Old (3-5 years)' },
                { hex: '#34495e', name: 'Legacy (5+ years)' }
            ];
        case 'recentActivity':
            return [
                { hex: '#e74c3c', name: 'Extremely high (1000+ lines)' },
                { hex: '#e67e22', name: 'Very high (501-1000 lines)' },
                { hex: '#f1c40f', name: 'High (201-500 lines)' },
                { hex: '#2ecc71', name: 'Moderate (51-200 lines)' },
                { hex: '#3498db', name: 'Low (1-50 lines)' }
            ];
        case 'stability':
            return [
                { hex: '#e74c3c', name: 'Very volatile (100+ lines/commit)' },
                { hex: '#e67e22', name: 'Volatile (50-99 lines/commit)' },
                { hex: '#f1c40f', name: 'Moderate (25-49 lines/commit)' },
                { hex: '#2ecc71', name: 'Stable (10-24 lines/commit)' },
                { hex: '#3498db', name: 'Very stable (<10 lines/commit)' }
            ];
        case 'recency':
            return [
                { hex: '#e74c3c', name: 'Hot (<7 days)' },
                { hex: '#e67e22', name: 'Warm (1-4 weeks)' },
                { hex: '#f1c40f', name: 'Recent (1-3 months)' },
                { hex: '#3498db', name: 'Cool (3-6 months)' },
                { hex: '#95a5a6', name: 'Cold (6+ months)' }
            ];
        case 'fileType':
            // For file type mode, legend is populated dynamically based on files present
            return [];
        default:
            return [];
    }
}
/**
 * Get display name for color mode
 */
export function getColorModeName(mode) {
    switch (mode) {
        case 'fileType':
            return 'File Type';
        case 'lastModified':
            return 'Last Modified';
        case 'author':
            return 'Author';
        case 'churn':
            return 'Churn (Lifetime Commits)';
        case 'contributors':
            return 'Contributors (Lifetime)';
        case 'fileAge':
            return 'File Age';
        case 'recentActivity':
            return 'Recent Activity (90 days)';
        case 'stability':
            return 'Code Stability';
        case 'recency':
            return 'Recency';
        default:
            return 'Unknown';
    }
}
