/**
 * Generate anonymized e-commerce test data from Gource repository analysis (V2)
 *
 * This version properly transforms ALL file/folder names to e-commerce domain
 * No Gource-specific references should remain
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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
  return CONTRIBUTORS[author] || CONTRIBUTORS['unknown'];
}

// E-commerce domain vocabulary for file/directory names
const ECOMMERCE_NAMES = {
  // Core modules
  modules: ['cart', 'checkout', 'products', 'catalog', 'orders', 'payment', 'auth', 'shipping', 'users', 'analytics', 'inventory', 'search', 'reviews', 'recommendations'],
  // File types (without extensions)
  files: ['index', 'router', 'controller', 'service', 'model', 'types', 'utils', 'config', 'middleware', 'validator', 'mapper', 'repository', 'handler', 'client', 'adapter'],
  // Subdirectories
  subdirs: ['components', 'hooks', 'utils', 'types', 'api', 'lib', 'models', 'services', 'middleware', 'routes']
};

// Create deterministic mapping cache
const pathMappingCache = new Map();

function generateEcommercePath(originalPath) {
  // Check cache first
  if (pathMappingCache.has(originalPath)) {
    return pathMappingCache.get(originalPath);
  }

  // Handle special root files
  const rootFileMap = {
    '.gitignore': '.gitignore',
    '.gitattributes': '.gitattributes',
    '.gitmodules': '.gitmodules',
    'README': 'README.md',
    'README.md': 'README.md',
    'LICENSE': 'LICENSE',
    'COPYING': 'LICENSE',
    'INSTALL': 'docs/INSTALL.md',
    'ChangeLog': 'CHANGELOG.md',
    'CHANGELOG': 'CHANGELOG.md',
    'THANKS': 'docs/CONTRIBUTORS.md',
    'Makefile': 'Makefile',
    'Makefile.am': 'Makefile',
    'Makefile.in': 'build/Makefile.in',
    'package.json': 'package.json',
    'tsconfig.json': 'tsconfig.json',
    'vite.config.ts': 'vite.config.ts',
    'configure.ac': 'build/configure.ac',
    'autogen.sh': 'scripts/build.sh'
  };

  const basename = path.basename(originalPath);
  if (rootFileMap[basename] && !originalPath.includes('/')) {
    pathMappingCache.set(originalPath, rootFileMap[basename]);
    return rootFileMap[basename];
  }

  // Parse the path
  const parts = originalPath.split('/');
  const transformedParts = [];

  // Use hash-based deterministic selection
  function selectDeterministic(array, seed) {
    const hash = crypto.createHash('md5').update(seed).digest('hex');
    const index = parseInt(hash.substring(0, 8), 16) % array.length;
    return array[index];
  }

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const isLastPart = i === parts.length - 1;

    // Skip empty parts
    if (!part) {
      continue;
    }

    // Determine if this is a file (has extension) or directory
    const hasExtension = part.includes('.') && !part.startsWith('.');
    const isFile = hasExtension || isLastPart;

    if (!isFile) {
      // Transform directory names
      if (part === 'src') {
        transformedParts.push('src');
      } else if (part === 'data' || part === 'resources') {
        transformedParts.push('public');
        transformedParts.push('assets');
      } else if (part === 'm4' || part === 'build') {
        transformedParts.push('build');
      } else if (part === 'scripts' || part === 'dev' || part === 'contrib') {
        transformedParts.push('scripts');
      } else if (part === 'docs' || part === 'doc') {
        transformedParts.push('docs');
      } else if (part === 'tests' || part === 'test') {
        transformedParts.push('tests');
      } else if (part === 'cmd' || part === 'cli') {
        transformedParts.push('cli');
      } else {
        // Use e-commerce module/subdir name
        const seed = originalPath + part;
        const moduleOrSubdir = i === 1 ?
          selectDeterministic(ECOMMERCE_NAMES.modules, seed) :
          selectDeterministic(ECOMMERCE_NAMES.subdirs, seed);
        transformedParts.push(moduleOrSubdir);
      }
    } else {
      // Transform file names
      const [name, ...extParts] = part.split('.');
      const origExt = extParts.join('.');

      // Determine new extension
      let newExt = origExt;
      if (['cpp', 'cc', 'c', 'cxx'].includes(origExt)) {
        newExt = 'ts';
      } else if (origExt === 'h' || origExt === 'hpp') {
        newExt = 'ts'; // Header files become TypeScript definition files
      } else if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tga', 'xcf'].includes(origExt)) {
        newExt = 'png'; // Normalize all images to PNG
      } else if (['frag', 'vert'].includes(origExt)) {
        newExt = 'css'; // Shader files → CSS
      } else if (origExt === 'pro') {
        newExt = 'json'; // Qt project file → config JSON
      } else if (origExt === 'ttf') {
        newExt = 'ttf'; // Keep fonts
      } else if (origExt === 'style') {
        newExt = 'css';
      } else if (['sh', 'pl', 'py', 'cmd'].includes(origExt)) {
        newExt = 'sh'; // Normalize all scripts to shell
      } else if (['txt', 'log', 'conf'].includes(origExt)) {
        newExt = origExt; // Keep as-is
      } else if (['yml', 'yaml', 'json', 'md'].includes(origExt)) {
        newExt = origExt; // Keep common formats
      } else if (origExt === '1') {
        newExt = 'md'; // Man pages → markdown
      } else if (!origExt) {
        newExt = ''; // No extension files (COPYING, LICENSE, etc.)
      }

      // Transform file base name
      let newName = name;
      if (name.length > 1) {
        // Use e-commerce file name
        const seed = originalPath + name;
        newName = selectDeterministic(ECOMMERCE_NAMES.files, seed);
      }

      // Build final file name
      const finalName = newExt ? `${newName}.${newExt}` : newName;
      transformedParts.push(finalName);
    }
  }

  const result = transformedParts.join('/');
  pathMappingCache.set(originalPath, result);
  return result;
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
  const newPath = generateEcommercePath(node.path);
  const newName = path.basename(newPath);

  const transformed = {
    path: newPath,
    name: newName,
    type: node.type
  };

  if (node.type === 'file') {
    // Determine extension from new path
    const extMatch = newPath.match(/\.([^.]+)$/);
    const newExt = extMatch ? extMatch[1] : 'no-extension';

    transformed.loc = node.loc;
    transformed.extension = newExt;
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
      message: commit.message
        .replace(/gource/gi, 'ecommerce')
        .replace(/Gource/g, 'Acme Commerce'),
      tags: commit.tags.map(transformTag),
      isMergeCommit: commit.isMergeCommit,
      importanceScore: commit.importanceScore,
      changes: {
        filesAdded: commit.changes.filesAdded.map(generateEcommercePath),
        filesModified: commit.changes.filesModified.map(generateEcommercePath),
        filesDeleted: commit.changes.filesDeleted.map(generateEcommercePath),
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
console.log('Generating anonymized e-commerce test data (V2)...\n');

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
console.log(`- Path mappings: ${pathMappingCache.size} unique paths transformed`);

// Verify no Gource references remain
const staticStr = JSON.stringify(transformedStatic);
const timelineStr = JSON.stringify(transformedTimeline);
const gourceCount = (staticStr.match(/gource/gi) || []).length + (timelineStr.match(/gource/gi) || []).length;
console.log(`\nVerification: ${gourceCount === 0 ? '✓' : '✗'} No Gource references found (${gourceCount})`);
