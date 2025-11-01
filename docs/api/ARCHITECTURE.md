# CodeCohesion API - Architecture

## Overview

The CodeCohesion API is a lightweight TypeScript/Express server that reads analysis JSON files from the processor and exposes them via RESTful HTTP endpoints.

**Core Responsibilities:**
- Load and parse JSON files from `api/data/`
- Map repository URLs to internal file identifiers
- Filter and aggregate data based on query parameters
- Return JSON responses following REST conventions
- Handle errors gracefully with appropriate HTTP status codes

**Non-Responsibilities (Initially):**
- Running git analysis (processor does this)
- Storing data in a database (reads files directly)
- Authentication or rate limiting (trust-based initially)
- Modifying or writing analysis data (read-only API)

---

## Tech Stack Decisions

### Language: TypeScript
**Why:** Already used in processor and viewer. Strong typing prevents errors. Familiar to team.

**Alternatives Considered:**
- Python + FastAPI: Adds a new language to the project
- Go: Performant but introduces new tooling
- **Decision:** Stick with TypeScript for consistency

### Runtime: Node.js ≥18
**Why:** Already required for processor. Mature ecosystem. Works on Railway.

### Web Framework: Express
**Why:**
- Minimal and well-understood
- Battle-tested (used by millions)
- Simple routing and middleware system
- No magic, no heavy abstractions

**Alternatives Considered:**
- Fastify: Faster but more opinionated
- Koa: Modern but less ecosystem support
- NestJS: Heavy, over-engineered for this use case
- **Decision:** Express provides best balance of simplicity and functionality

### CORS Handling: `cors` package
**Why:** Need to allow viewer (GitHub Pages) and local dev servers to call API.

### Type Reuse: Import from processor
**Why:** Processor already defines `FileNode`, `RepositorySnapshot`, `TimelineData` types. Reuse them to maintain consistency.

### Build Tool: TypeScript Compiler
**Why:** Simple, no bundler needed for server-side code. Fast compilation.

### Process Manager (Production): None
**Why:** Railway/Heroku run `node dist/server.js` directly. No PM2 or Forever needed initially.

### Logging: Console (Initially)
**Why:** Railway captures stdout/stderr. No need for Winston or Bunyan yet.

**Future:** Add structured logging if debugging becomes difficult.

---

## Project Structure

```
codecohesion/
├── processor/              # Existing analyzer (unchanged)
│   ├── src/
│   │   ├── types.ts        # Shared types (FileNode, RepositorySnapshot, etc.)
│   │   └── analyze.ts
│   └── output/             # Generated JSON files (data source for API)
│
├── viewer/                 # Existing 3D visualizer (unchanged)
│
└── api/                    # NEW: REST API server
    ├── src/
    │   ├── server.ts           # Express app setup, CORS, error handling
    │   ├── routes.ts           # API endpoint definitions
    │   ├── data-loader.ts      # File system operations, JSON parsing
    │   ├── query-service.ts    # Business logic for queries
    │   └── types.ts            # API-specific types (responses, errors)
    │
    ├── dist/                   # Compiled JavaScript (git-ignored)
    │
    ├── package.json            # Dependencies: express, cors, typescript
    ├── tsconfig.json           # TypeScript config (reuse processor's)
    ├── Procfile                # Railway deployment: web: node dist/server.js
    └── README.md               # API-specific docs
```

---

## Data Flow

### Request Flow (Example: Get Contributors)

```
1. Client Request
   ↓
   GET /api/contributors?url=https://github.com/facebook/react&days=30

2. Express Routing (routes.ts)
   ↓
   Match route → Extract query params → Call QueryService

3. Query Service (query-service.ts)
   ↓
   - Find repo by URL → Get repo ID
   - Calculate date range (30 days ago)
   - Load JSON file via DataLoader

4. Data Loader (data-loader.ts)
   ↓
   - Read file from api/data/react-timeline-full.json
   - Parse JSON → Return RepositorySnapshot | TimelineData

5. Query Service (continued)
   ↓
   - Traverse tree, collect FileNode data
   - Filter by date range
   - Aggregate contributors (Map<email, filesChanged>)
   - Return structured response

6. Express Response
   ↓
   res.json({
     repository: { id: "react", url: "..." },
     period: { since: "2024-10-01", days: 30 },
     contributors: [...],
     total: 15
   })

7. Client Receives JSON
```

### File System Layout

```
api/data/
├── react-timeline-full.json          # Timeline V2 format
├── gource-data.json                  # Static snapshot
└── cbioportal-timeline-full.json    # Timeline V2 format

API reads these files directly (no database initially)
```

---

## Core Components

### 1. server.ts - Express Application

**Responsibilities:**
- Initialize Express app
- Configure CORS (allow GitHub Pages, localhost)
- Mount routes at `/api`
- Handle 404 and 500 errors
- Start HTTP server on `PORT` (default 3001, Railway sets dynamically)

**Implementation:**

```typescript
import express from 'express';
import cors from 'cors';
import { createRoutes } from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS - allow viewer and local dev
app.use(cors({
  origin: [
    'https://thepaulrayner.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002'
  ]
}));

app.use(express.json());

// API routes
app.use('/api', createRoutes());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'CodeCohesion API',
    version: '1.0.0',
    docs: 'https://github.com/paulrayner/codecohesion/tree/main/docs/api'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// 500 handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`CodeCohesion API running on port ${PORT}`);
});
```

---

### 2. routes.ts - Endpoint Definitions

**Responsibilities:**
- Define URL patterns and HTTP methods
- Extract request parameters (path params, query strings)
- Call QueryService for business logic
- Return JSON responses or errors
- Handle validation errors (missing params, invalid dates)

**Implementation Pattern:**

```typescript
import { Router } from 'express';
import { DataLoader } from './data-loader';
import { QueryService } from './query-service';

export function createRoutes(): Router {
  const router = Router();
  const dataLoader = new DataLoader();
  const queryService = new QueryService(dataLoader);

  // List repos or find by URL
  router.get('/repos', async (req, res) => {
    try {
      const { url } = req.query;
      if (url) {
        const repo = await queryService.findRepoByUrl(url as string);
        if (!repo) {
          return res.status(404).json({ error: 'Repository not found' });
        }
        return res.json(repo);
      }
      const repos = await dataLoader.listRepos();
      res.json({ repos });
    } catch (error) {
      res.status(500).json({ error: 'Failed to list repositories' });
    }
  });

  // Get repository stats
  router.get('/repos/:repoId/stats', async (req, res) => {
    try {
      const { repoId } = req.params;
      const stats = await queryService.getStats(repoId);
      res.json(stats);
    } catch (error) {
      res.status(404).json({ error: 'Repository not found' });
    }
  });

  // Get contributors (with date filtering)
  router.get('/repos/:repoId/contributors', async (req, res) => {
    try {
      const { repoId } = req.params;
      const { since, until } = req.query;
      const contributors = await queryService.getContributors(
        repoId,
        since as string,
        until as string
      );
      res.json(contributors);
    } catch (error) {
      res.status(404).json({ error: 'Repository not found' });
    }
  });

  // Convenience endpoint: query by URL directly
  router.get('/contributors', async (req, res) => {
    try {
      const { url, days, since, until } = req.query;

      if (!url) {
        return res.status(400).json({ error: 'url parameter required' });
      }

      const repo = await queryService.findRepoByUrl(url as string);
      if (!repo) {
        return res.status(404).json({ error: 'Repository not found' });
      }

      // Calculate date range from 'days' parameter
      let sinceDate = since as string;
      if (days) {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));
        sinceDate = daysAgo.toISOString().split('T')[0];
      }

      const contributors = await queryService.getContributors(
        repo.id,
        sinceDate,
        until as string
      );

      res.json({
        ...contributors,
        repository: { ...contributors.repository, url },
        period: { ...contributors.period, days: days ? parseInt(days as string) : undefined }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch contributors' });
    }
  });

  // Additional endpoints: files, hotspots, etc.
  // ...

  return router;
}
```

---

### 3. data-loader.ts - File Operations

**Responsibilities:**
- List JSON files in `api/data/`
- Read and parse JSON files
- Map repository IDs to file names
- Handle file not found errors
- Cache file contents (future optimization)

**Implementation:**

```typescript
import fs from 'fs/promises';
import path from 'path';
import { RepositorySnapshot, TimelineData } from '../../processor/src/types';

export class DataLoader {
  private dataDir: string;

  constructor() {
    // In production on Railway, use relative path from dist/
    // In development, use relative path from src/
    this.dataDir = path.join(__dirname, '../data');
  }

  async listRepos(): Promise<Array<{id: string, name: string, format?: string}>> {
    const files = await fs.readdir(this.dataDir);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const repos = await Promise.all(
      jsonFiles.map(async (file) => {
        const data = await this.loadRepoFile(file);
        return {
          id: this.fileToRepoId(file),
          name: file.replace('.json', ''),
          format: 'format' in data ? data.format : 'static'
        };
      })
    );

    return repos;
  }

  async loadRepo(repoId: string): Promise<RepositorySnapshot | TimelineData> {
    const file = await this.findFileByRepoId(repoId);
    if (!file) {
      throw new Error(`Repository not found: ${repoId}`);
    }
    return this.loadRepoFile(file);
  }

  private async loadRepoFile(filename: string): Promise<RepositorySnapshot | TimelineData> {
    const content = await fs.readFile(
      path.join(this.dataDir, filename),
      'utf-8'
    );
    return JSON.parse(content);
  }

  private fileToRepoId(filename: string): string {
    // Simple normalization: lowercase, remove .json
    // Example: "react-timeline-full.json" → "react-timeline-full"
    return filename.replace('.json', '').toLowerCase();
  }

  private async findFileByRepoId(repoId: string): Promise<string | null> {
    const files = await fs.readdir(this.dataDir);
    return files.find(f => this.fileToRepoId(f) === repoId) || null;
  }

  async findRepoByUrl(url: string): Promise<{id: string, name: string} | null> {
    // Extract repo name from URL
    // "https://github.com/facebook/react" → "react"
    const match = url.match(/\/([^\/]+?)(?:\.git)?$/);
    if (!match) return null;

    const repoName = match[1].toLowerCase();
    const repos = await this.listRepos();

    // Find repo whose ID contains the repo name
    return repos.find(r => r.id.includes(repoName)) || null;
  }
}
```

---

### 4. query-service.ts - Business Logic

**Responsibilities:**
- Implement query logic (contributors, files, hotspots)
- Traverse tree structures (directories → files)
- Filter by date ranges, paths, metrics
- Aggregate data (contributor maps, top N files)
- Format responses for API consumers

**Implementation:**

```typescript
import { DataLoader } from './data-loader';
import { FileNode, TreeNode, RepositorySnapshot, TimelineData } from '../../processor/src/types';

interface ContributorInfo {
  email: string;
  filesChanged: number;
  lastModified: string;
}

export class QueryService {
  constructor(private dataLoader: DataLoader) {}

  async findRepoByUrl(url: string) {
    return this.dataLoader.findRepoByUrl(url);
  }

  async getStats(repoId: string) {
    const data = await this.dataLoader.loadRepo(repoId);
    const snapshot = this.extractSnapshot(data);

    return {
      repository: { id: repoId, path: snapshot.repositoryPath },
      analyzedAt: snapshot.timestamp,
      commit: snapshot.commit,
      stats: snapshot.stats
    };
  }

  async getContributors(repoId: string, since?: string, until?: string) {
    const data = await this.dataLoader.loadRepo(repoId);
    const snapshot = this.extractSnapshot(data);

    const contributorMap = new Map<string, ContributorInfo>();

    this.traverseTree(snapshot.tree, (node) => {
      if (node.type === 'file' && node.lastAuthor) {
        // Filter by date range
        if (this.isWithinDateRange(node.lastModified, since, until)) {
          const existing = contributorMap.get(node.lastAuthor) || {
            email: node.lastAuthor,
            filesChanged: 0,
            lastModified: node.lastModified || ''
          };

          existing.filesChanged++;
          if (node.lastModified && node.lastModified > existing.lastModified) {
            existing.lastModified = node.lastModified;
          }

          contributorMap.set(node.lastAuthor, existing);
        }
      }
    });

    return {
      repository: { id: repoId },
      period: { since, until },
      contributors: Array.from(contributorMap.values())
        .sort((a, b) => b.filesChanged - a.filesChanged),
      total: contributorMap.size
    };
  }

  async getFiles(repoId: string, pathFilter?: string, metric?: string) {
    const data = await this.dataLoader.loadRepo(repoId);
    const snapshot = this.extractSnapshot(data);

    const files: FileNode[] = [];
    this.traverseTree(snapshot.tree, (node) => {
      if (node.type === 'file') {
        if (pathFilter && !node.path.startsWith(pathFilter)) return;
        files.push(node);
      }
    });

    // Sort by metric if provided
    if (metric === 'churn') {
      files.sort((a, b) => (b.commitCount || 0) - (a.commitCount || 0));
    } else if (metric === 'contributors') {
      files.sort((a, b) => (b.contributorCount || 0) - (a.contributorCount || 0));
    } else if (metric === 'loc') {
      files.sort((a, b) => b.loc - a.loc);
    }

    return { files, total: files.length };
  }

  async getHotspots(repoId: string, limit: number = 20) {
    const files = await this.getFiles(repoId);

    const topChurn = files.files
      .filter(f => f.commitCount)
      .sort((a, b) => (b.commitCount || 0) - (a.commitCount || 0))
      .slice(0, limit);

    const topContributors = files.files
      .filter(f => f.contributorCount)
      .sort((a, b) => (b.contributorCount || 0) - (a.contributorCount || 0))
      .slice(0, limit);

    return {
      topChurn,
      topContributors
    };
  }

  // Helper: Extract snapshot from Timeline or static format
  private extractSnapshot(data: RepositorySnapshot | TimelineData): RepositorySnapshot {
    return 'headSnapshot' in data ? data.headSnapshot : data;
  }

  // Helper: Traverse tree recursively
  private traverseTree(node: TreeNode, callback: (node: TreeNode) => void) {
    callback(node);
    if (node.type === 'directory') {
      node.children.forEach(child => this.traverseTree(child, callback));
    }
  }

  // Helper: Check if date is within range
  private isWithinDateRange(dateStr: string | null, since?: string, until?: string): boolean {
    if (!dateStr) return false;
    const date = new Date(dateStr);

    if (since && date < new Date(since)) return false;
    if (until && date > new Date(until)) return false;

    return true;
  }
}
```

---

## Deployment Architecture

### Development Environment

```
Developer Machine:
├── processor/output/           # Analysis files generated here
├── api/
│   ├── data/                   # Copy JSON files here manually
│   └── npm run dev             # ts-node src/server.ts (port 3001)
└── viewer/
    └── npm run dev             # Vite dev server (port 3000)

Workflow:
1. Analyze repo: cd processor && npm run dev -- /path/to/repo
2. Copy JSON: cp processor/output/repo.json api/data/
3. Start API: cd api && npm run dev
4. Test: curl http://localhost:3001/api/repos
```

### Production Environment (Railway)

```
Railway Deployment:
├── Git Push → Railway Webhook
├── Railway builds: npm run build (TypeScript → JavaScript)
├── Railway runs: node dist/server.js (Procfile)
├── Environment variables: PORT (set by Railway)
├── Data files: api/data/ (committed to git or Railway volume)
└── Public URL: https://codecohesion-api.railway.app
```

**Procfile:**
```
web: node dist/server.js
```

**package.json scripts:**
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "ts-node src/server.ts"
  }
}
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Repository Identification Strategy

### Challenge
Users know GitHub URLs (`https://github.com/facebook/react`), but files are named arbitrarily (`react-timeline-full.json`).

### Solution: Fuzzy Matching

```typescript
// URL → Repo Name
"https://github.com/facebook/react" → "react"

// Find file containing "react"
Files: ["react-timeline-full.json", "gource-data.json"]
Match: "react-timeline-full.json" (contains "react")

// Return repo ID
id: "react-timeline-full"
```

### Future: Metadata File

Create `processor/output/repos.json`:

```json
{
  "repos": [
    {
      "id": "react-timeline-full",
      "url": "https://github.com/facebook/react",
      "file": "react-timeline-full.json",
      "analyzedAt": "2024-10-31T12:00:00Z"
    }
  ]
}
```

Processor updates this file on each analysis run. API reads it for URL lookups.

---

## Error Handling

### HTTP Status Codes

- **200 OK** - Successful request
- **400 Bad Request** - Missing or invalid parameters
- **404 Not Found** - Repository or resource not found
- **500 Internal Server Error** - Unexpected error (file read failure, JSON parse error)

### Error Response Format

```json
{
  "error": "Repository not found",
  "details": "No repository matches URL: https://github.com/foo/bar"
}
```

### Logging Strategy

**Development:** Log everything to console

**Production:**
- Log errors with timestamps
- Log slow queries (>1s)
- Future: Structured logging (JSON) for Railway log aggregation

---

## Performance Considerations

### Current Approach (Phase 1)
- Read JSON files on every request
- No caching
- Single-threaded Node.js

**Expected Performance:**
- File reads: 10-50ms for typical files (1-10 MB)
- JSON parsing: 20-100ms
- Query processing: 5-20ms
- **Total:** 50-200ms per request

**Sufficient for:**
- Dashboards (refresh every 30s)
- CI/CD (once per build)
- Manual queries (human response time)

### Future Optimizations (Phase 2+)

**1. In-Memory Cache**
```typescript
const cache = new Map<string, { data: any, loadedAt: number }>();
const TTL = 60_000; // 1 minute

async loadRepo(repoId: string) {
  const cached = cache.get(repoId);
  if (cached && Date.now() - cached.loadedAt < TTL) {
    return cached.data;
  }

  const data = await readFile(...);
  cache.set(repoId, { data, loadedAt: Date.now() });
  return data;
}
```

**2. Database Storage (PostgreSQL)**
- Store parsed data in normalized tables
- Fast indexed queries (contributors, files)
- No JSON parsing overhead

**3. Pre-Computed Aggregations**
- Store contributor counts at analysis time
- Pre-calculate hotspots
- Serve queries in <10ms

**4. Streaming Responses**
- Stream large file lists instead of buffering entire response
- Use JSON Lines format for datasets

---

## Security Considerations

### Phase 1 (MVP)
- **No authentication** - Public read-only API
- **No rate limiting** - Trust-based usage
- **CORS whitelist** - Only allow specific origins

**Risk:** API abuse (DDoS, scraping)
**Mitigation:** Monitor Railway metrics, add rate limiting if needed

### Phase 2+
- **API Keys** - Per-user or per-app tokens
- **Rate Limiting** - 100 requests/minute per IP
- **Request Signing** - HMAC signatures for trusted clients
- **HTTPS Only** - Railway provides this by default

---

## Testing Strategy

### Unit Tests (Vitest)
- QueryService logic (date filtering, aggregation)
- DataLoader file operations (mocked file system)
- URL parsing and repo ID matching

### Integration Tests
- Full request/response cycle
- Error handling (404, 500)
- CORS headers

### Manual Testing
- Deploy to Railway staging environment
- Test with curl and Postman
- Verify viewer can call API endpoints

---

## Monitoring & Operations

### Health Check Endpoint

```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
```

### Metrics to Track (Railway Dashboard)
- Request count
- Response times (p50, p95, p99)
- Error rate (5xx responses)
- Memory usage
- File system reads

### Alerting (Future)
- Alert if error rate > 5%
- Alert if p95 latency > 1s
- Alert if memory usage > 500 MB

---

## Future Architecture Enhancements

### Phase 2: Database Layer

```
┌──────────────┐
│ Express API  │
└──────┬───────┘
       │
       ├─────▶ PostgreSQL (for fast queries)
       │       ├─ repos table
       │       ├─ files table
       │       ├─ contributors table
       │       └─ metrics table (time-series)
       │
       └─────▶ File System (for full snapshots)
               └─ processor/output/*.json
```

### Phase 3: Background Job Queue

```
┌────────────┐       ┌──────────┐       ┌────────────┐
│ POST       │──────▶│ Bull MQ  │──────▶│ Worker     │
│ /api/      │       │ (Redis)  │       │ (Processor)│
│ analyze    │       └──────────┘       └────────────┘
└────────────┘              │                   │
                            │                   ▼
                            │          Analyze Git Repo
                            │                   │
                            └───────────────────┘
                                   Store Results
```

### Phase 4: Microservices (If Needed)

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│ Query API   │     │ Analysis    │     │ Notification │
│ (Express)   │     │ Service     │     │ Service      │
└─────────────┘     └─────────────┘     └──────────────┘
       │                   │                     │
       └───────────────────┴─────────────────────┘
                           │
                   Shared PostgreSQL
```

**Decision:** Start monolithic (single Express app). Only split if necessary (performance, team scaling).

---

## Summary

**Architecture Principles:**
- **Simplicity First** - Express + TypeScript, no unnecessary abstractions
- **Reuse Existing** - Import processor types, read existing JSON files
- **Progressive Enhancement** - Start simple, add database/caching later
- **Deployment Simplicity** - Railway one-click deploy, no complex infrastructure

**Key Components:**
- `server.ts` - Express app, CORS, error handling
- `routes.ts` - Endpoint definitions, parameter extraction
- `data-loader.ts` - File operations, JSON parsing
- `query-service.ts` - Business logic, filtering, aggregation

**Deployment:**
- Railway platform (same as YouTube summarizer)
- Procfile-based deployment
- Environment variables for configuration
- Persistent volume for JSON files

The architecture balances **immediate functionality** with **future extensibility**, allowing the API to evolve from file-based queries to a full-featured service without requiring a complete rewrite.
