/**
 * Generate anonymized e-commerce test data from Gource repository analysis
 *
 * Transformations:
 * - Repository path: /Users/paul/Documents/Gource → /tmp/test-ecommerce
 * - File/folder paths: Gource-specific → E-commerce domain
 * - Contributors: Real names → Fake e-commerce team names
 * - Dates: Move all commits into last 5 years (2020-2025)
 * - Tags: gource-X.Y → v1.0.0, v1.1.0, etc.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_STATIC = '../../processor/output/gource.json';
const INPUT_TIMELINE = '../../processor/output/gource-timeline-full.json';
const OUTPUT_STATIC = './data/test-ecommerce-static.json';
const OUTPUT_TIMELINE = './data/test-ecommerce-timeline-full.json';

// Date transformation: Map old date range → 2020-2025
const OLD_START = new Date('2009-09-11T04:25:12.000Z');
const OLD_END = new Date('2025-08-13T01:56:09.000Z');
const NEW_START = new Date('2020-01-01T00:00:00.000Z');
const NEW_END = new Date('2025-10-31T00:00:00.000Z');

function transformDate(oldDate) {
  const old = new Date(oldDate);
  const oldRange = OLD_END - OLD_START;
  const newRange = NEW_END - NEW_START;
  const ratio = (old - OLD_START) / oldRange;
  const newTimestamp = NEW_START.getTime() + (ratio * newRange);
  return new Date(newTimestamp).toISOString();
}

// Contributor name mapping
const CONTRIBUTORS = {
  'Andrew Caudwell': 'sarah.johnson@acme-commerce.com',
  'Charles Hardin': 'mike.chen@acme-commerce.com',
  'Chris Forbes': 'alice.williams@acme-commerce.com',
  'Guido Günther': 'bob.martinez@acme-commerce.com',
  'Jakob Lorenz': 'carol.anderson@acme-commerce.com',
  'Jeff Pitman': 'david.lopez@acme-commerce.com',
  'Kaleb Luedtke': 'emma.taylor@acme-commerce.com',
  'Marcel Petrick': 'frank.white@acme-commerce.com',
  'Zhizhen He': 'grace.kim@acme-commerce.com',
  'unknown': 'system@acme-commerce.com'
};

function transformAuthor(author) {
  return CONTRIBUTORS[author] || 'contributor@acme-commerce.com';
}

// Path mapping: Gource file structure → E-commerce
const PATH_MAPPINGS = {
  // Build/config files
  'Makefile.am': 'Makefile',
  'Makefile.in': 'build/Makefile.in',
  'configure.ac': 'build/configure.ac',
  'autogen.sh': 'scripts/autogen.sh',
  'gource.pro': 'ecommerce.config.js',

  // Documentation
  'README': 'README.md',
  'INSTALL': 'docs/INSTALL.md',
  'ChangeLog': 'CHANGELOG.md',
  'THANKS': 'docs/CONTRIBUTORS.md',
  'COPYING': 'LICENSE',

  // Directories
  'src/': 'src/',
  'data/': 'public/assets/',
  'resources/': 'public/resources/',
  'm4/': 'build/m4/',
  'dev/': 'scripts/dev/',
  'contrib/': 'scripts/contrib/',
  'cmd/': 'cli/',
  'scripts/': 'scripts/',

  // Add e-commerce specific paths for src files
  'src/core': 'src/core',
  'src/bloom': 'src/cart',
  'src/camera': 'src/products',
  'src/dirnode': 'src/catalog',
  'src/file': 'src/orders',
  'src/formats': 'src/payment',
  'src/key': 'src/auth',
  'src/slider': 'src/checkout',
  'src/spline': 'src/shipping',
  'src/textbox': 'src/users',
  'src/ui': 'src/ui',
  'src/vbo': 'src/analytics'
};

function transformPath(oldPath) {
  // Try exact matches first
  for (const [old, newPath] of Object.entries(PATH_MAPPINGS)) {
    if (oldPath === old) return newPath;
    if (oldPath.startsWith(old)) {
      return oldPath.replace(old, newPath);
    }
  }

  // Default: keep path as-is (for generic files like .gitignore)
  return oldPath;
}

// Transform file extensions for e-commerce context
function transformExtension(oldPath, extension) {
  // Keep most extensions as-is
  if (['js', 'ts', 'json', 'md', 'css', 'html', 'yml', 'yaml'].includes(extension)) {
    return extension;
  }

  // C/C++ files → TypeScript
  if (['cpp', 'h', 'c'].includes(extension)) {
    return 'ts';
  }

  // Shell scripts
  if (['sh'].includes(extension)) {
    return 'sh';
  }

  return extension;
}

// Transform tags: gource-0.34 → v1.0.0
function transformTag(gourceTag) {
  const match = gourceTag.match(/gource-0\.(\d+)/);
  if (!match) return gourceTag;

  const minor = parseInt(match[1]);
  const major = Math.floor(minor / 10) + 1;
  const minorVer = minor % 10;
  return `v${major}.${minorVer}.0`;
}

// Transform a FileNode recursively
function transformFileNode(node) {
  const transformed = {
    path: transformPath(node.path),
    name: node.name,
    type: node.type
  };

  if (node.type === 'file') {
    transformed.loc = node.loc;
    transformed.extension = transformExtension(node.path, node.extension);
    transformed.lastModified = node.lastModified ? transformDate(node.lastModified) : null;
    transformed.lastAuthor = node.lastAuthor ? transformAuthor(node.lastAuthor) : null;
    transformed.lastCommitHash = node.lastCommitHash;
    transformed.commitCount = node.commitCount;
    transformed.contributorCount = node.contributorCount;
    transformed.firstCommitDate = node.firstCommitDate ? transformDate(node.firstCommitDate) : null;
    transformed.recentLinesChanged = node.recentLinesChanged;
    transformed.avgLinesPerCommit = node.avgLinesPerCommit;

    // Recalculate daysSinceLastModified based on new dates
    if (node.lastModified) {
      const now = new Date();
      const lastMod = new Date(transformed.lastModified);
      transformed.daysSinceLastModified = Math.floor((now - lastMod) / (1000 * 60 * 60 * 24));
    } else {
      transformed.daysSinceLastModified = node.daysSinceLastModified;
    }
  } else if (node.type === 'directory') {
    transformed.children = node.children.map(transformFileNode);
  }

  return transformed;
}

// Transform static snapshot
function transformStatic(data) {
  return {
    repositoryPath: '/tmp/test-ecommerce',
    commit: data.commit,
    timestamp: transformDate(data.timestamp),
    author: transformAuthor(data.author),
    message: 'Latest snapshot of test e-commerce application',
    tree: transformFileNode(data.tree),
    commitMessages: data.commitMessages || {},
    stats: {
      totalFiles: data.stats.totalFiles,
      totalLoc: data.stats.totalLoc,
      filesByExtension: data.stats.filesByExtension
    }
  };
}

// Transform timeline
function transformTimeline(data) {
  const transformed = {
    format: data.format,
    repositoryPath: '/tmp/test-ecommerce',
    metadata: {
      totalCommits: data.metadata.totalCommits,
      dateRange: {
        first: transformDate(data.metadata.dateRange.first),
        last: transformDate(data.metadata.dateRange.last)
      },
      tags: data.metadata.tags.map(transformTag)
    },
    commits: data.commits.map(commit => ({
      hash: commit.hash,
      date: transformDate(commit.date),
      author: transformAuthor(commit.author),
      message: commit.message.replace(/gource/gi, 'ecommerce').replace(/Gource/g, 'Acme Commerce'),
      tags: commit.tags.map(transformTag),
      isMergeCommit: commit.isMergeCommit,
      importanceScore: commit.importanceScore,
      changes: {
        filesAdded: commit.changes.filesAdded.map(transformPath),
        filesModified: commit.changes.filesModified.map(transformPath),
        filesDeleted: commit.changes.filesDeleted.map(transformPath),
        totalFilesChanged: commit.changes.totalFilesChanged,
        linesAdded: commit.changes.linesAdded,
        linesDeleted: commit.changes.linesDeleted
      },
      tree: commit.tree ? transformFileNode(commit.tree) : undefined
    }))
  };

  return transformed;
}

// Main execution
console.log('Generating anonymized e-commerce test data...\n');

// Transform static snapshot
console.log(`Reading ${INPUT_STATIC}...`);
const staticData = JSON.parse(fs.readFileSync(path.join(__dirname, INPUT_STATIC), 'utf8'));
console.log(`Transforming static snapshot...`);
const transformedStatic = transformStatic(staticData);
console.log(`Writing ${OUTPUT_STATIC}...`);
fs.writeFileSync(
  path.join(__dirname, OUTPUT_STATIC),
  JSON.stringify(transformedStatic, null, 2)
);
console.log(`✓ Generated ${OUTPUT_STATIC} (${fs.statSync(path.join(__dirname, OUTPUT_STATIC)).size} bytes)\n`);

// Transform timeline
console.log(`Reading ${INPUT_TIMELINE}...`);
const timelineData = JSON.parse(fs.readFileSync(path.join(__dirname, INPUT_TIMELINE), 'utf8'));
console.log(`Transforming timeline (${timelineData.commits.length} commits)...`);
const transformedTimeline = transformTimeline(timelineData);
console.log(`Writing ${OUTPUT_TIMELINE}...`);
fs.writeFileSync(
  path.join(__dirname, OUTPUT_TIMELINE),
  JSON.stringify(transformedTimeline, null, 2)
);
console.log(`✓ Generated ${OUTPUT_TIMELINE} (${fs.statSync(path.join(__dirname, OUTPUT_TIMELINE)).size} bytes)\n`);

console.log('Done! Test data ready for use in API tests.');
console.log('\nSummary:');
console.log(`- Repository: /tmp/test-ecommerce`);
console.log(`- Contributors: ${Object.keys(CONTRIBUTORS).length} anonymized`);
console.log(`- Date range: ${NEW_START.toISOString().split('T')[0]} to ${NEW_END.toISOString().split('T')[0]}`);
console.log(`- Tags: ${transformedTimeline.metadata.tags.length} (${transformedTimeline.metadata.tags.join(', ')})`);
