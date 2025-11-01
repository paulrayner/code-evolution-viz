# CodeCohesion API - Specification

## Goal

Define the behavioral contract for the CodeCohesion API. This document specifies what the API must do, the exact endpoints, request/response formats, and constraints.

---

## API Base URL

**Development:** `http://localhost:3001`
**Production:** `https://codecohesion-api.railway.app` (or custom domain)

All endpoints are prefixed with `/api`.

---

## Core Endpoints

### 1. Root Endpoint

**Purpose:** API health check and metadata.

```
GET /
```

**Response:**
```json
{
  "service": "CodeCohesion API",
  "version": "1.0.0",
  "docs": "https://github.com/paulrayner/codecohesion/tree/main/docs/api"
}
```

**Status Codes:**
- `200 OK` - Always

---

### 2. List Repositories

**Purpose:** Get all analyzed repositories available via the API.

```
GET /api/repos
```

**Query Parameters:** None

**Response:**
```json
{
  "repos": [
    {
      "id": "react-timeline-full",
      "name": "react-timeline-full",
      "format": "timeline-v2"
    },
    {
      "id": "gource-data",
      "name": "gource-data",
      "format": "static"
    }
  ]
}
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - File system read failure

**Notes:**
- Returns all JSON files in `api/data/`
- `id` is used in subsequent API calls
- `format` indicates data type: `"static"` or `"timeline-v1"` or `"timeline-v2"`

---

### 3. Find Repository by URL

**Purpose:** Look up repository ID using GitHub URL.

```
GET /api/repos?url=<repository-url>
```

**Query Parameters:**
- `url` (required) - Full GitHub URL (e.g., `https://github.com/facebook/react`)

**Response (Success):**
```json
{
  "id": "react-timeline-full",
  "name": "react-timeline-full",
  "url": "https://github.com/facebook/react",
  "format": "timeline-v2"
}
```

**Response (Not Found):**
```json
{
  "error": "Repository not found"
}
```

**Status Codes:**
- `200 OK` - Repository found
- `404 Not Found` - No matching repository
- `500 Internal Server Error` - File system error

**Examples:**
```bash
# Find React repository
curl 'http://localhost:3001/api/repos?url=https://github.com/facebook/react'

# Find Gource repository
curl 'http://localhost:3001/api/repos?url=https://github.com/acaudwell/Gource'
```

**Notes:**
- Performs fuzzy matching on repository name extracted from URL
- Case-insensitive
- Matches partial names (e.g., "react" matches "react-timeline-full")

---

### 4. Get Repository Stats

**Purpose:** Get aggregate statistics for a repository.

```
GET /api/repos/:repoId/stats
```

**Path Parameters:**
- `repoId` (required) - Repository ID from list/find endpoint

**Response:**
```json
{
  "repository": {
    "id": "react-timeline-full",
    "path": "/Users/paul/Documents/react"
  },
  "analyzedAt": "2024-10-31T12:34:56Z",
  "commit": "a1b2c3d4e5f6",
  "stats": {
    "totalFiles": 6784,
    "totalLoc": 918234,
    "filesByExtension": {
      "js": 3421,
      "ts": 2156,
      "json": 842,
      "md": 234,
      "css": 131
    }
  }
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Repository not found
- `500 Internal Server Error` - Parse error or file read failure

**Examples:**
```bash
curl http://localhost:3001/api/repos/react-timeline-full/stats
```

**Notes:**
- Returns HEAD snapshot stats for timeline formats
- `filesByExtension` is a count of files per extension
- `totalLoc` is sum of all file LOC

---

### 5. Get Contributors

**Purpose:** Get list of contributors with optional date filtering.

```
GET /api/repos/:repoId/contributors
```

**Path Parameters:**
- `repoId` (required) - Repository ID

**Query Parameters:**
- `since` (optional) - ISO date string (e.g., `2024-08-01`). Include only contributors who modified files after this date.
- `until` (optional) - ISO date string. Include only contributors who modified files before this date.

**Response:**
```json
{
  "repository": {
    "id": "react-timeline-full"
  },
  "period": {
    "since": "2024-08-01",
    "until": null
  },
  "contributors": [
    {
      "email": "developer@fb.com",
      "filesChanged": 47,
      "lastModified": "2024-10-28T15:42:00Z"
    },
    {
      "email": "contributor@external.com",
      "filesChanged": 12,
      "lastModified": "2024-10-15T09:23:00Z"
    }
  ],
  "total": 28
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Repository not found
- `400 Bad Request` - Invalid date format
- `500 Internal Server Error` - Parse error

**Examples:**
```bash
# All contributors
curl http://localhost:3001/api/repos/react-timeline-full/contributors

# Contributors in last 90 days
curl 'http://localhost:3001/api/repos/react-timeline-full/contributors?since=2024-08-01'

# Contributors in specific date range
curl 'http://localhost:3001/api/repos/react-timeline-full/contributors?since=2024-08-01&until=2024-10-01'
```

**Notes:**
- Contributors sorted by `filesChanged` (descending)
- `filesChanged` counts files where this contributor was `lastAuthor`
- Date filtering uses `lastModified` field from FileNode
- Empty array if no contributors match filter

---

### 6. Get Contributors (Convenience Endpoint)

**Purpose:** Query contributors by URL directly, without looking up repo ID first.

```
GET /api/contributors
```

**Query Parameters:**
- `url` (required) - GitHub repository URL
- `days` (optional) - Number of days to look back (e.g., `30`, `90`)
- `since` (optional) - ISO date string (alternative to `days`)
- `until` (optional) - ISO date string

**Response:**
```json
{
  "repository": {
    "id": "react-timeline-full",
    "url": "https://github.com/facebook/react"
  },
  "period": {
    "since": "2024-10-01",
    "until": null,
    "days": 30
  },
  "contributors": [
    {
      "email": "developer@fb.com",
      "filesChanged": 47,
      "lastModified": "2024-10-28T15:42:00Z"
    }
  ],
  "total": 15
}
```

**Status Codes:**
- `200 OK` - Success
- `400 Bad Request` - Missing `url` parameter or invalid `days` value
- `404 Not Found` - Repository not found
- `500 Internal Server Error` - Parse error

**Examples:**
```bash
# Last 30 days (simplest form)
curl 'http://localhost:3001/api/contributors?url=https://github.com/facebook/react&days=30'

# Last 90 days
curl 'http://localhost:3001/api/contributors?url=https://github.com/facebook/react&days=90'

# Specific date range
curl 'http://localhost:3001/api/contributors?url=https://github.com/facebook/react&since=2024-08-01&until=2024-10-01'
```

**Notes:**
- **Recommended for one-off queries** - No need to lookup repo ID first
- `days` parameter automatically calculates `since` date
- If both `days` and `since` are provided, `since` takes precedence
- Response includes both `url` and calculated `days` for clarity

---

### 7. Get Files

**Purpose:** Get list of files with optional filtering and sorting.

```
GET /api/repos/:repoId/files
```

**Path Parameters:**
- `repoId` (required) - Repository ID

**Query Parameters:**
- `path` (optional) - Path prefix filter (e.g., `src/components`)
- `metric` (optional) - Sort by metric: `churn`, `contributors`, `loc`, `age`

**Response:**
```json
{
  "files": [
    {
      "path": "src/React.js",
      "name": "React.js",
      "type": "file",
      "loc": 542,
      "extension": "js",
      "lastModified": "2024-10-15T14:23:00Z",
      "lastAuthor": "developer@fb.com",
      "lastCommitHash": "a1b2c3d",
      "commitCount": 87,
      "contributorCount": 12,
      "firstCommitDate": "2013-05-24T16:15:11Z",
      "recentLinesChanged": 234,
      "avgLinesPerCommit": 15.3,
      "daysSinceLastModified": 16
    }
  ],
  "total": 1234
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Repository not found
- `500 Internal Server Error` - Parse error

**Examples:**
```bash
# All files
curl http://localhost:3001/api/repos/react-timeline-full/files

# Files in src/ directory
curl 'http://localhost:3001/api/repos/react-timeline-full/files?path=src'

# Files sorted by churn (highest first)
curl 'http://localhost:3001/api/repos/react-timeline-full/files?metric=churn'

# Files in src/ sorted by contributors
curl 'http://localhost:3001/api/repos/react-timeline-full/files?path=src&metric=contributors'
```

**Notes:**
- Returns all FileNode objects from tree traversal
- `path` filter uses prefix matching (not regex)
- `metric` sorting:
  - `churn` - Sort by `commitCount` (descending)
  - `contributors` - Sort by `contributorCount` (descending)
  - `loc` - Sort by `loc` (descending)
  - `age` - Sort by `firstCommitDate` (ascending)
- Large repositories may return thousands of files (future: add pagination)

---

### 8. Get Hotspots

**Purpose:** Get top N files by churn and contributor count (refactoring candidates).

```
GET /api/repos/:repoId/hotspots
```

**Path Parameters:**
- `repoId` (required) - Repository ID

**Query Parameters:**
- `limit` (optional) - Number of files to return (default: `20`, max: `100`)

**Response:**
```json
{
  "topChurn": [
    {
      "path": "src/React.js",
      "name": "React.js",
      "type": "file",
      "loc": 542,
      "commitCount": 87,
      "contributorCount": 12,
      "lastModified": "2024-10-15T14:23:00Z"
    }
  ],
  "topContributors": [
    {
      "path": "src/index.js",
      "name": "index.js",
      "type": "file",
      "loc": 234,
      "commitCount": 45,
      "contributorCount": 23,
      "lastModified": "2024-10-20T11:15:00Z"
    }
  ]
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Repository not found
- `400 Bad Request` - Invalid `limit` parameter
- `500 Internal Server Error` - Parse error

**Examples:**
```bash
# Top 20 hotspots (default)
curl http://localhost:3001/api/repos/react-timeline-full/hotspots

# Top 10 hotspots
curl 'http://localhost:3001/api/repos/react-timeline-full/hotspots?limit=10'

# Top 50 hotspots
curl 'http://localhost:3001/api/repos/react-timeline-full/hotspots?limit=50'
```

**Notes:**
- `topChurn` - Files with highest `commitCount` (frequently modified)
- `topContributors` - Files with highest `contributorCount` (many people touch)
- Useful for identifying refactoring candidates and technical debt
- Files appear in both lists if they qualify

---

## Error Response Format

All error responses follow this structure:

```json
{
  "error": "Human-readable error message",
  "details": "Optional additional context"
}
```

**Examples:**

```json
// 404 Not Found
{
  "error": "Repository not found"
}

// 400 Bad Request
{
  "error": "url parameter required"
}

// 400 Bad Request (Invalid Date)
{
  "error": "Invalid date format",
  "details": "Expected ISO 8601 format: YYYY-MM-DD"
}

// 500 Internal Server Error
{
  "error": "Failed to parse repository data",
  "details": "Unexpected token < in JSON at position 0"
}
```

---

## HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| `200` | OK | Successful request |
| `400` | Bad Request | Missing required parameter, invalid parameter format |
| `404` | Not Found | Repository or resource not found |
| `500` | Internal Server Error | File read failure, JSON parse error, unexpected exception |

**Future:**
- `429 Too Many Requests` - Rate limiting (Phase 2)
- `401 Unauthorized` - API key required (Phase 3)
- `403 Forbidden` - API key invalid or expired (Phase 3)

---

## CORS Configuration

**Allowed Origins:**
- `https://thepaulrayner.com` (Production viewer)
- `http://localhost:3000` (Local viewer)
- `http://localhost:3001` (Local viewer alternate)
- `http://localhost:3002` (Local viewer alternate)

**Allowed Methods:** `GET`, `POST`, `OPTIONS`

**Allowed Headers:** `Content-Type`, `Authorization`

**Credentials:** `true`

---

## Query Parameter Conventions

### Date Formats
All dates use **ISO 8601** format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ`

**Examples:**
- `2024-10-31`
- `2024-10-31T12:34:56Z`

**Invalid:**
- `10/31/2024` (American format)
- `31-10-2024` (European format)
- `October 31, 2024` (Natural language)

### Relative Time
Use `days` parameter for relative queries:

```bash
# Last 7 days
?days=7

# Last 30 days
?days=30

# Last 90 days
?days=90
```

API calculates `since` date internally:
```typescript
const daysAgo = new Date();
daysAgo.setDate(daysAgo.getDate() - parseInt(days));
sinceDate = daysAgo.toISOString().split('T')[0]; // "2024-10-01"
```

### Pagination (Future)
**Not implemented in Phase 1**, but reserved parameters:

```bash
?limit=50      # Number of results per page
?offset=100    # Skip first N results
?page=3        # Page number (alternative to offset)
```

### Sorting (Future)
**Not implemented in Phase 1**, but reserved parameters:

```bash
?sort=churn          # Sort by field
?order=desc          # Sort order (asc/desc)
```

---

## Response Headers

All responses include:

```
Content-Type: application/json
Access-Control-Allow-Origin: <origin>
Access-Control-Allow-Credentials: true
```

**Future headers:**
- `X-RateLimit-Limit: 100` - Requests allowed per window
- `X-RateLimit-Remaining: 87` - Requests remaining
- `X-RateLimit-Reset: 1698766800` - Unix timestamp of reset
- `X-Response-Time: 142ms` - Server processing time

---

## Data Type Mappings

### Repository Snapshot vs Timeline Format

The API handles both formats transparently:

**Static Snapshot:**
```json
{
  "repositoryPath": "...",
  "commit": "...",
  "tree": { ... },
  "stats": { ... }
}
```

**Timeline V2:**
```json
{
  "format": "timeline-v2",
  "headSnapshot": {
    "repositoryPath": "...",
    "commit": "...",
    "tree": { ... },
    "stats": { ... }
  },
  "timeline": { ... }
}
```

**API Behavior:**
- If `format` field exists, extract `headSnapshot`
- Otherwise, treat entire object as snapshot
- All endpoints work identically for both formats

### FileNode Fields

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `path` | `string` | No | Full path from repo root |
| `name` | `string` | No | File name only |
| `type` | `"file"` | No | Always "file" (directories excluded from file queries) |
| `loc` | `number` | No | Lines of code |
| `extension` | `string` | No | File extension (e.g., "js", "ts", "md") |
| `lastModified` | `string` | Yes | ISO 8601 timestamp or null |
| `lastAuthor` | `string` | Yes | Email address or null |
| `lastCommitHash` | `string` | Yes | Git commit hash or null |
| `commitCount` | `number` | Yes | Total commits touching this file (churn) |
| `contributorCount` | `number` | Yes | Unique contributors |
| `firstCommitDate` | `string` | Yes | ISO 8601 timestamp of file creation |
| `recentLinesChanged` | `number` | Yes | Lines changed in last 90 days |
| `avgLinesPerCommit` | `number` | Yes | Average lines per commit (volatility) |
| `daysSinceLastModified` | `number` | Yes | Days since last modification |
| `isGenerated` | `boolean` | Yes | True if auto-generated/minified |

**Nullable Fields:**
All git metadata fields are nullable because:
- Files might not have git history (new repos, incomplete analysis)
- Some metrics are optional (e.g., `recentLinesChanged` requires timeline data)

**Handling Nulls:**
Consumers should check for null before using:

```typescript
if (file.commitCount !== null && file.commitCount > 50) {
  console.log('High churn file:', file.path);
}
```

---

## Example Workflows

### Workflow 1: Generate Weekly Team Report

```bash
#!/bin/bash
# Get contributors for last 7 days
curl -s 'http://localhost:3001/api/contributors?url=https://github.com/myorg/myapp&days=7' \
  | jq '.contributors[] | "\(.email): \(.filesChanged) files"'

# Output:
# alice@myorg.com: 23 files
# bob@myorg.com: 15 files
# carol@myorg.com: 8 files
```

### Workflow 2: Check Churn Threshold in CI/CD

```bash
#!/bin/bash
# GitHub Actions workflow

HOTSPOTS=$(curl -s 'http://codecohesion-api.railway.app/api/repos/myapp/hotspots?limit=5')
MAX_CHURN=$(echo "$HOTSPOTS" | jq '.topChurn[0].commitCount')

if [ "$MAX_CHURN" -gt 100 ]; then
  echo "❌ FAIL: Highest churn file has $MAX_CHURN commits (threshold: 100)"
  exit 1
else
  echo "✅ PASS: Max churn is $MAX_CHURN"
fi
```

### Workflow 3: Build Team Dashboard

```javascript
// React component
async function fetchRepoStats(url) {
  const response = await fetch(
    `https://codecohesion-api.railway.app/api/repos?url=${encodeURIComponent(url)}`
  );
  const repo = await response.json();

  const statsResponse = await fetch(
    `https://codecohesion-api.railway.app/api/repos/${repo.id}/stats`
  );
  const stats = await statsResponse.json();

  return {
    totalFiles: stats.stats.totalFiles,
    totalLoc: stats.stats.totalLoc,
    languages: Object.keys(stats.stats.filesByExtension).slice(0, 5)
  };
}
```

### Workflow 4: Slack Bot Integration

```javascript
// Slack bot command: /codecohesion-hotspots myapp
app.command('/codecohesion-hotspots', async ({ command, ack, say }) => {
  await ack();

  const repo = command.text; // "myapp"
  const response = await fetch(
    `https://codecohesion-api.railway.app/api/repos/${repo}/hotspots?limit=5`
  );
  const data = await response.json();

  const message = data.topChurn
    .map((f, i) => `${i + 1}. \`${f.path}\` - ${f.commitCount} commits`)
    .join('\n');

  await say(`🔥 Top 5 High-Churn Files:\n${message}`);
});
```

---

## Validation Rules

### Repository ID
- **Format:** Alphanumeric, hyphens, underscores only
- **Examples:** `react-timeline-full`, `my_app_v2`
- **Invalid:** `../../etc/passwd`, `<script>`, `repo name with spaces`

### URL Parameter
- **Format:** Valid HTTP/HTTPS URL
- **Examples:** `https://github.com/facebook/react`, `https://gitlab.com/myorg/myapp`
- **Invalid:** `github.com/facebook/react` (missing protocol), `not a url`

### Days Parameter
- **Format:** Positive integer
- **Range:** 1-365
- **Examples:** `7`, `30`, `90`
- **Invalid:** `0`, `-10`, `1000`, `abc`

### Limit Parameter
- **Format:** Positive integer
- **Range:** 1-100
- **Examples:** `10`, `20`, `50`
- **Invalid:** `0`, `-5`, `500`, `all`

### Date Parameters (since, until)
- **Format:** ISO 8601 (`YYYY-MM-DD`)
- **Validation:** Must be valid calendar date
- **Examples:** `2024-10-31`, `2023-01-15`
- **Invalid:** `2024-13-01` (month 13), `2024-02-30` (Feb 30), `10/31/2024`

---

## Future Enhancements (Not in Phase 1)

### Additional Endpoints

**Timeline Navigation:**
```
GET /api/repos/:repoId/timeline
GET /api/repos/:repoId/commits/:hash
GET /api/repos/:repoId/tags
```

**Coupling Analysis:**
```
GET /api/repos/:repoId/coupling?file=<path>
GET /api/repos/:repoId/clusters
```

**Comparison:**
```
GET /api/repos/:repoId/compare?from=<commit>&to=<commit>
```

**Search:**
```
GET /api/repos/:repoId/search?q=<query>
# Example: q=commitCount>50 AND contributorCount>5
```

**Webhooks:**
```
POST /api/webhooks
DELETE /api/webhooks/:id
```

**Analysis Trigger:**
```
POST /api/analyze
GET /api/jobs/:jobId
```

### Query Enhancements

**Aggregations:**
```
GET /api/repos/:repoId/files/aggregate?metric=churn&buckets=10
# Returns histogram of churn distribution
```

**Filtering:**
```
GET /api/repos/:repoId/files?commitCount.gt=50&contributorCount.gt=5
# SQL-like operators: gt, lt, gte, lte, eq, ne
```

**Field Selection:**
```
GET /api/repos/:repoId/files?fields=path,loc,commitCount
# Return only specified fields (reduce payload size)
```

**Pagination:**
```
GET /api/repos/:repoId/files?limit=50&offset=100
# Or: ?limit=50&page=3
```

---

## Summary

The CodeCohesion API provides:

**8 Core Endpoints:**
1. Root (`/`)
2. List repos (`/api/repos`)
3. Find by URL (`/api/repos?url=...`)
4. Get stats (`/api/repos/:id/stats`)
5. Get contributors by ID (`/api/repos/:id/contributors`)
6. Get contributors by URL (`/api/contributors?url=...&days=...`)
7. Get files (`/api/repos/:id/files`)
8. Get hotspots (`/api/repos/:id/hotspots`)

**Key Features:**
- URL-based repository lookup (no ID memorization)
- Date range filtering (last N days or specific dates)
- Metric-based sorting (churn, contributors, LOC)
- Consistent JSON responses
- Standard HTTP status codes
- CORS support for browser-based clients

**Design Principles:**
- Simple, predictable endpoints
- Flexible querying without complexity
- Graceful error handling
- Support for both static and timeline formats
- No breaking changes between phases

This specification provides the foundation for building integrations, dashboards, and automation tools on top of CodeCohesion analysis data.
