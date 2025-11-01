# Test Data for CodeCohesion API

This directory contains anonymized test fixtures based on real repository analysis data.

## Files

### test-ecommerce-static.json (84 KB)
Static snapshot format - single point-in-time analysis of repository at HEAD.

**Characteristics:**
- **Repository:** `/tmp/test-ecommerce` (fictional e-commerce application)
- **Files:** 120 files
- **Structure:** E-commerce domain (cart, checkout, products, orders, payment, etc.)
- **Contributors:** 9 anonymized developers + 1 system account
- **Date range:** 2020-2025 (realistic recent activity)

### test-ecommerce-timeline-full.json (572 KB)
Timeline V2 format - full commit history with delta compression.

**Characteristics:**
- **Format:** `timeline-v2`
- **Commits:** 988 commits over 5 years
- **Tags:** 22 version tags (v4.4.0 through v6.5.0)
- **Date range:** 2020-01-01 to 2025-10-31
- **Contributors:** Same as static (consistent across commits)

## Data Transformations

These test files were generated from real Gource repository analysis with the following anonymizations:

### Repository Details
- **Original:** Gource visualization tool
- **Transformed:** Test E-commerce application
- **Path:** `/tmp/test-ecommerce`

### Contributors
All real names replaced with fictional e-commerce team:
- `sarah.johnson@acme-commerce.com`
- `mike.chen@acme-commerce.com`
- `alice.williams@acme-commerce.com`
- `bob.martinez@acme-commerce.com`
- `carol.anderson@acme-commerce.com`
- `david.lopez@acme-commerce.com`
- `emma.taylor@acme-commerce.com`
- `frank.white@acme-commerce.com`
- `grace.kim@acme-commerce.com`
- `system@acme-commerce.com`

### File Paths
Gource-specific paths mapped to e-commerce domain:

| Original | Transformed |
|----------|-------------|
| `src/bloom` | `src/cart` (shopping cart) |
| `src/camera` | `src/products` (product catalog) |
| `src/dirnode` | `src/catalog` (catalog management) |
| `src/file` | `src/orders` (order processing) |
| `src/formats` | `src/payment` (payment integration) |
| `src/key` | `src/auth` (authentication) |
| `src/slider` | `src/checkout` (checkout flow) |
| `src/spline` | `src/shipping` (shipping calculations) |
| `src/textbox` | `src/users` (user management) |
| `src/vbo` | `src/analytics` (analytics tracking) |

### Dates
All commit dates moved into 2020-2025 range to appear realistic and recent:
- **Original range:** 2009-2025 (16 years)
- **New range:** 2020-2025 (5 years)
- **Relative timing preserved:** Gaps between commits maintained proportionally

### Tags
Version tags transformed from Gource format to semantic versioning:
- `gource-0.34` → `v4.4.0`
- `gource-0.55` → `v6.5.0`
- etc.

## Usage in Tests

### Unit Tests
```typescript
import staticData from './data/test-ecommerce-static.json';

describe('QueryService', () => {
  it('should extract contributors from static snapshot', () => {
    const contributors = queryService.getContributors(staticData);
    expect(contributors).toHaveLength(9); // Excluding system account
  });
});
```

### Integration Tests
```typescript
import timelineData from './data/test-ecommerce-timeline-full.json';

describe('GET /api/repos/test-ecommerce/stats', () => {
  beforeAll(async () => {
    // Load test data into API
    await loadTestRepo('test-ecommerce', timelineData);
  });

  it('should return repository stats', async () => {
    const response = await request(app).get('/api/repos/test-ecommerce/stats');
    expect(response.body.stats.totalFiles).toBe(120);
    expect(response.body.stats.totalLoc).toBeGreaterThan(0);
  });
});
```

## Regenerating Test Data

If the processor output format changes or you want to use different source data:

```bash
cd api/test
node generate-test-data.js
```

**Prerequisites:**
- Gource analysis files must exist in `processor/output/`:
  - `gource.json` (static format)
  - `gource-timeline-full.json` (timeline format)

**Customization:**
Edit `generate-test-data.js` to modify:
- Contributor names
- File path mappings
- Date ranges
- Repository name

## Why These Test Files?

**Small enough:**
- Fast to load in tests (<1s)
- Can commit to git without bloating repo

**Real enough:**
- Actual git history patterns
- Realistic file counts, churn, contributor distribution
- Includes edge cases (old files, high churn, multiple contributors)

**Stable:**
- Based on Gource repo (mature, rarely changes)
- Dates moved to 2020-2025 to avoid "stale data" issues
- Anonymized so no concerns about real people/companies

**Complete:**
- Both static and timeline formats
- Covers all FileNode metadata fields
- Includes tags for version testing

## Test Data Characteristics

### File Distribution
- **Config files:** ~10 files (package.json, tsconfig.json, etc.)
- **Documentation:** ~5 files (README.md, docs/*)
- **Source code:** ~80 files (src/*)
- **Assets:** ~15 files (public/assets/*)
- **Build/scripts:** ~10 files (scripts/*, build/*)

### Contributor Activity
- **Primary contributors:** 2-3 developers (50%+ of commits)
- **Secondary contributors:** 3-4 developers (30% of commits)
- **Occasional contributors:** 2-3 developers (20% of commits)
- **Commit distribution:** Realistic (not uniform)

### Churn Patterns
- **High churn files:** 3-5 files with 50+ commits
- **Medium churn:** 15-20 files with 10-50 commits
- **Low churn:** 95+ files with 1-9 commits
- **Untouched files:** Some files with single commit (initial add)

### Timeline Features
- **Tags:** 22 version tags spread across 5 years
- **Merge commits:** Included (realistic branching patterns)
- **File operations:** Adds, modifications, deletes all present
- **Importance scores:** Varied (some commits more significant)

## Limitations

**Not included:**
- Coupling data (separate analysis file in processor)
- Real production secrets (all anonymized)
- Large binary files (only text files)

**Differences from real repos:**
- Smaller scale (120 files vs thousands in real apps)
- Fewer contributors (9 vs hundreds in open source)
- Compressed timeline (5 years vs 10+ in mature projects)

These are acceptable trade-offs for fast, reliable test data.
