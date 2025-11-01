# CodeCohesion API - Implementation Plan

## Purpose

This is the implementation roadmap for the CodeCohesion API. Each milestone delivers standalone value and can be demoed independently. The plan follows a progressive enhancement approach: start simple, add features based on real usage patterns.

---

## Development Approach

**Incremental Delivery:**
- Each milestone produces a working, deployable API
- Early milestones prioritize core functionality over optimization
- Later milestones add advanced features and polish

**Testing Strategy:**
- **Unit tests:** Vitest for business logic (QueryService, DataLoader, etc.)
- **Integration tests:** Supertest for full HTTP request/response cycle
- **Test fixtures:** Anonymized e-commerce test data in `api/test/data/`:
  - `test-ecommerce-static.json` (84 KB) - Static snapshot format
  - `test-ecommerce-timeline-full.json` (572 KB) - Timeline V2 format
  - Based on real Gource repo, anonymized with realistic e-commerce domain
  - 120 files, 988 commits, 9 contributors, 2020-2025 date range
- **Test coverage:** Focus on fast, reliable tests - avoid slow, brittle E2E tests
- **Manual testing:** curl/Postman for exploratory testing during development
- **Staging validation:** Deploy to Railway staging before each milestone completion

**Documentation:**
- Update API docs after each milestone
- Maintain CHANGELOG.md with version history
- Provide migration guides for breaking changes (future)

---

## Milestone 0: Preparation

**Goal:** Set up directory structure and configuration files before implementing API code.

### Deliverables

#### 0.1: API Directory Structure
- [ ] Create `api/data/` directory for production JSON files
- [ ] Add `api/data/.gitkeep` to track empty directory
- [ ] Add `api/data/README.md` with instructions:
  - Explain this directory is for production analysis files
  - How to copy from processor: `cp processor/output/*.json api/data/`
  - Note that test fixtures live in `api/test/data/`

#### 0.2: Git Configuration
- [ ] Create `api/.gitignore`:
  - Ignore `node_modules/`, `dist/`, `.env`, `coverage/`, `*.log`
  - Ignore `data/*.json` (production files)
  - Keep test fixtures: `!data/test-*.json`

#### 0.3: Initial Test Data (Optional)
- [ ] Copy test fixtures to `api/data/` for development:
  - `cp api/test/data/test-ecommerce-static.json api/data/`
  - `cp api/test/data/test-ecommerce-timeline-full.json api/data/`

### Success Criteria
- ✅ `api/data/` directory exists and is tracked in git
- ✅ `.gitignore` prevents committing node_modules and build artifacts
- ✅ Test fixtures available in `api/data/` for immediate development

---

## Milestone 1: Core API Foundation

**Goal:** Build a working API that reads JSON files and exposes basic endpoints. Deploy to Railway.

### Deliverables

#### 1.1: Project Setup
- [ ] Create `api/` directory in codecohesion repo
- [ ] Initialize `package.json` with dependencies:
  - `express`
  - `cors`
  - `@types/express`
  - `@types/cors`
  - `@types/node`
  - `typescript`
  - `ts-node`
- [ ] Create `tsconfig.json` (copy from processor, adjust paths)
- [ ] Create `Procfile` for Railway deployment: `web: node dist/server.js`
- [ ] Add scripts to `package.json`:
  - `dev`: `ts-node src/server.ts`
  - `build`: `tsc`
  - `start`: `node dist/server.js`

#### 1.2: Core Components
- [ ] Implement `server.ts`:
  - Express app initialization
  - CORS configuration (allow GitHub Pages + localhost)
  - Error handlers (404, 500)
  - Root endpoint (`/`)
  - Health check endpoint (`/health`)
- [ ] Implement `data-loader.ts`:
  - Read JSON files from `./data/` directory (created in Milestone 0)
  - List available repositories
  - Load specific repository by ID
  - Parse both static and timeline formats
- [ ] Implement `query-service.ts`:
  - Extract snapshot from timeline or static format
  - Traverse tree recursively (collect FileNode objects)
  - Calculate repository stats
- [ ] Implement `types.ts`:
  - API response types
  - Error response format

#### 1.3: Basic Endpoints
- [ ] `GET /api/repos` - List all repositories
- [ ] `GET /api/repos/:repoId/stats` - Get repository statistics
- [ ] `GET /api/repos/:repoId/files` - Get all files (no filtering yet)

#### 1.4: Testing
- [ ] Add `vitest` as dev dependency
- [ ] Create test fixtures: Use `api/test/data/test-ecommerce-*.json`
- [ ] Unit tests for `DataLoader`:
  - List repositories from directory
  - Load and parse static format
  - Load and parse timeline format
  - Handle missing files
- [ ] Unit tests for `QueryService`:
  - Extract snapshot from both formats
  - Traverse tree and collect files
  - Calculate stats correctly
- [ ] Integration tests for endpoints:
  - `GET /api/repos` returns JSON array
  - `GET /api/repos/:id/stats` returns correct structure
  - `GET /api/repos/:id/files` returns file list
  - Error responses (404, 500) have correct format

#### 1.5: Local Testing
- [ ] Test with existing processor output (react, gource)
- [ ] Verify JSON parsing for both formats
- [ ] Test CORS with local viewer
- [ ] Handle errors gracefully (missing files, parse errors)

#### 1.6: Deployment
- [ ] Deploy to Railway
- [ ] Verify public URL works
- [ ] Test CORS from GitHub Pages viewer
- [ ] Document deployment process in `api/README.md`

### Success Criteria
- ✅ API runs locally on port 3001
- ✅ API deployed to Railway with public URL
- ✅ Can list repositories via API
- ✅ Can fetch stats for React and Gource repos
- ✅ CORS allows viewer to call API
- ✅ Error responses follow consistent format

### Demo
```bash
# List repos
curl https://codecohesion-api.railway.app/api/repos

# Get React stats
curl https://codecohesion-api.railway.app/api/repos/react-timeline-full/stats

# Get all files (large response)
curl https://codecohesion-api.railway.app/api/repos/gource-data/files | jq '.total'
```

---

## Milestone 2: Query & Filter Features

**Goal:** Add contributor queries, date filtering, hotspot detection, and URL-based lookups.

### Deliverables

#### 2.1: Repository Lookup
- [ ] Implement `findRepoByUrl()` in DataLoader
  - Extract repo name from GitHub URL
  - Fuzzy match against available repos
  - Return repo ID or null
- [ ] Add endpoint: `GET /api/repos?url=<url>`
- [ ] Handle URL encoding/decoding

#### 2.2: Contributor Queries
- [ ] Implement `getContributors()` in QueryService
  - Traverse tree, collect `lastAuthor` from FileNode
  - Build Map<email, ContributorInfo>
  - Sort by `filesChanged` descending
- [ ] Add endpoint: `GET /api/repos/:repoId/contributors`
- [ ] Implement date filtering (`since`, `until` query params)
  - Parse ISO 8601 dates
  - Filter files by `lastModified`
  - Handle invalid date formats

#### 2.3: Convenience Endpoint
- [ ] Add endpoint: `GET /api/contributors?url=<url>&days=<n>`
- [ ] Calculate `since` date from `days` parameter
- [ ] Return response with both `url` and `days` fields

#### 2.4: File Filtering & Sorting
- [ ] Update `getFiles()` in QueryService
  - Add `path` prefix filter
  - Add `metric` sorting (churn, contributors, loc)
- [ ] Update endpoint: `GET /api/repos/:repoId/files?path=<prefix>&metric=<metric>`

#### 2.5: Hotspot Detection
- [ ] Implement `getHotspots()` in QueryService
  - Get top N files by `commitCount`
  - Get top N files by `contributorCount`
- [ ] Add endpoint: `GET /api/repos/:repoId/hotspots?limit=<n>`
- [ ] Validate `limit` parameter (1-100)

#### 2.6: Error Handling
- [ ] Validate all query parameters
- [ ] Return 400 for invalid params
- [ ] Return 404 for missing repos
- [ ] Add detailed error messages

#### 2.7: Testing
- [ ] Unit tests for `QueryService.getContributors()`:
  - Extract contributors from tree
  - Filter by date range (since, until)
  - Sort by filesChanged descending
  - Handle files with null lastAuthor
- [ ] Unit tests for `QueryService.getHotspots()`:
  - Return top N by churn
  - Return top N by contributors
  - Handle limit parameter correctly
- [ ] Unit tests for `DataLoader.findRepoByUrl()`:
  - Match GitHub URLs correctly
  - Return null for non-existent repos
  - Handle URL variations (with/without .git)
- [ ] Integration tests for new endpoints:
  - `GET /api/contributors?url=...&days=30` works end-to-end
  - `GET /api/repos/:id/hotspots?limit=10` returns correct count
  - Date filtering works correctly
  - Invalid parameters return 400 with helpful messages

#### 2.8: API Documentation
- [ ] Create `api/README.md` with:
  - Quick start guide (install, run locally, deploy)
  - Example requests for each endpoint (curl commands)
  - Link to `docs/api/SPEC.md` for full API reference
  - CORS configuration notes
- [ ] (Optional) Export Postman/Bruno collection for manual testing

### Success Criteria
- ✅ Can find repo by GitHub URL
- ✅ Can query contributors with date filtering
- ✅ Can get hotspots (top churn/contributor files)
- ✅ Convenience endpoint works with `days` parameter
- ✅ File queries support path filtering and sorting
- ✅ All parameters validated with helpful errors
- ✅ API README documents all endpoints with examples

### Demo
```bash
# Find React by URL
curl 'https://codecohesion-api.railway.app/api/repos?url=https://github.com/facebook/react'

# Contributors in last 30 days (convenience endpoint)
curl 'https://codecohesion-api.railway.app/api/contributors?url=https://github.com/facebook/react&days=30'

# Top 10 high-churn files
curl 'https://codecohesion-api.railway.app/api/repos/react-timeline-full/hotspots?limit=10'

# Files in src/ sorted by contributors
curl 'https://codecohesion-api.railway.app/api/repos/react-timeline-full/files?path=src&metric=contributors'
```

---

## Milestone 3: Persistence & On-Demand Analysis

**Goal:** Add PostgreSQL storage and trigger processor for on-demand analysis.

### Deliverables

#### 3.1: Database Setup
- [ ] Add PostgreSQL to Railway project
- [ ] Create schema:
  - `repos` table (id, url, name, analyzed_at)
  - `files` table (repo_id, path, loc, churn, contributors, metadata JSON)
  - `contributors` table (repo_id, email, files_changed, last_modified)
  - `analysis_jobs` table (id, repo_url, status, created_at, completed_at)
- [ ] Add database migrations
- [ ] Add `pg` (PostgreSQL client) dependency

#### 3.2: Data Layer
- [ ] Implement `database.ts`:
  - Connection pooling
  - Query helpers
  - Transaction support
- [ ] Implement `repository.ts` (data access layer):
  - `saveAnalysis()` - Store parsed JSON in database
  - `getRepoByUrl()` - Query repos table
  - `getContributors()` - Query contributors table
  - `getFiles()` - Query files table
- [ ] Update QueryService to use database when available
- [ ] Maintain backward compatibility (still support JSON files)

#### 3.3: Analysis Job Queue
- [ ] Add `bull` (Redis-based queue) dependency
- [ ] Add Redis to Railway project
- [ ] Implement `job-queue.ts`:
  - `enqueueAnalysis(repoUrl)` - Add job to queue
  - `processAnalysis(job)` - Run processor, store results
  - Job status tracking (pending, running, completed, failed)
- [ ] Implement worker process (separate from API server)

#### 3.4: Analysis Endpoints
- [ ] Add endpoint: `POST /api/analyze`
  - Body: `{ "url": "https://github.com/user/repo" }`
  - Enqueue analysis job
  - Return job ID
- [ ] Add endpoint: `GET /api/jobs/:jobId`
  - Return job status and progress
- [ ] Add endpoint: `GET /api/jobs`
  - List recent jobs (last 100)

#### 3.5: Processor Integration
- [ ] Refactor processor to export `analyze()` function
- [ ] Worker calls processor programmatically
- [ ] Stream output to job log
- [ ] Store results in database + JSON file
- [ ] Ensure processor outputs to `api/data/` directory:
  - Option A: Add `--output-dir` flag to processor, worker passes `api/data/`
  - Option B: Worker copies JSON from `processor/output/` to `api/data/` after completion
  - Log file operations for debugging

#### 3.6: Caching & Performance
- [ ] Add in-memory cache for frequently accessed repos
- [ ] Cache TTL: 5 minutes
- [ ] Add cache headers to responses (`Cache-Control`, `ETag`)

### Success Criteria
- ✅ Database schema created and migrated
- ✅ API can store and retrieve data from PostgreSQL
- ✅ POST /api/analyze triggers processor
- ✅ Job queue processes analysis asynchronously
- ✅ Results stored in both database and JSON files
- ✅ Backward compatible with file-based queries

### Demo
```bash
# Trigger analysis for new repo
curl -X POST https://codecohesion-api.railway.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com/vercel/next.js"}'

# Response:
# { "jobId": "abc123", "status": "pending" }

# Check job status
curl https://codecohesion-api.railway.app/api/jobs/abc123

# Response:
# { "jobId": "abc123", "status": "running", "progress": 42 }

# Query results after completion
curl 'https://codecohesion-api.railway.app/api/repos?url=https://github.com/vercel/next.js'
```

---

## Milestone 4: Advanced Queries & Search

**Goal:** Add search DSL, comparison endpoints, and aggregations.

### Deliverables

#### 4.1: Search DSL
- [ ] Implement query parser:
  - Syntax: `field.operator(value)`
  - Operators: `gt`, `lt`, `gte`, `lte`, `eq`, `ne`
  - Combine with `AND`, `OR`
  - Example: `commitCount.gt(50) AND contributorCount.gt(5)`
- [ ] Add endpoint: `GET /api/repos/:repoId/search?q=<query>`
- [ ] Support searching files, contributors

#### 4.2: Comparison Endpoints
- [ ] Implement `compareCommits()` in QueryService
  - Load two snapshots by commit hash
  - Calculate diff (files added, removed, modified)
  - Calculate metric changes (LOC delta, churn delta)
- [ ] Add endpoint: `GET /api/repos/:repoId/compare?from=<commit>&to=<commit>`
- [ ] Support tag names in addition to commit hashes

#### 4.3: Aggregations
- [ ] Implement `aggregate()` in QueryService
  - Group files by metric buckets (e.g., churn: 0-10, 10-50, 50+)
  - Calculate percentiles (p50, p75, p90, p95, p99)
  - Return histograms
- [ ] Add endpoint: `GET /api/repos/:repoId/aggregate?metric=<metric>&buckets=<n>`

#### 4.4: Timeline Navigation
- [ ] Add endpoint: `GET /api/repos/:repoId/timeline`
  - Return list of commits with metadata
  - Support filtering by date range
- [ ] Add endpoint: `GET /api/repos/:repoId/commits/:hash`
  - Return snapshot at specific commit
- [ ] Add endpoint: `GET /api/repos/:repoId/tags`
  - Return list of tags with commit hashes

#### 4.5: Field Selection
- [ ] Add `fields` query parameter
  - Example: `?fields=path,loc,commitCount`
  - Return only specified fields (reduce payload size)
- [ ] Implement field projection in database queries

#### 4.6: Pagination
- [ ] Add `limit` and `offset` query parameters
- [ ] Add pagination metadata to responses:
  - `total` - Total number of results
  - `limit` - Results per page
  - `offset` - Starting position
  - `hasMore` - Boolean indicating more results
- [ ] Add `Link` headers for next/prev pages

#### 4.7: Interactive API Documentation
- [ ] Add OpenAPI 3.1 specification:
  - Install `swagger-ui-express` as dependency
  - Create `openapi.json` (or generate from TypeScript types)
  - Document all endpoints with request/response schemas
  - Include example requests and responses
- [ ] Serve Swagger UI at `GET /api/docs`
- [ ] Add "Try it out" functionality for interactive testing
- [ ] Update `api/README.md` to link to live docs URL

### Success Criteria
- ✅ Search DSL works for complex queries
- ✅ Can compare two commits or tags
- ✅ Aggregations return histograms and percentiles
- ✅ Timeline navigation works for V2 format
- ✅ Field selection reduces response size
- ✅ Pagination works for large result sets
- ✅ Swagger UI available at /api/docs
- ✅ OpenAPI spec validates and documents all endpoints

### Demo
```bash
# Search for high-risk files
curl 'https://codecohesion-api.railway.app/api/repos/react/search?q=commitCount.gt(100) AND contributorCount.gt(10)'

# Compare two releases
curl 'https://codecohesion-api.railway.app/api/repos/react/compare?from=v18.0.0&to=v18.2.0'

# Get churn histogram
curl 'https://codecohesion-api.railway.app/api/repos/react/aggregate?metric=churn&buckets=10'

# List timeline commits
curl 'https://codecohesion-api.railway.app/api/repos/react/timeline?since=2024-01-01'

# Get files with field selection
curl 'https://codecohesion-api.railway.app/api/repos/react/files?fields=path,loc,commitCount&limit=50&offset=100'
```

---

## Milestone 5: Notifications & Automation

**Goal:** Add webhooks, scheduled analysis, and alerts.

### Deliverables

#### 5.1: Webhook System
- [ ] Create `webhooks` table in database
- [ ] Add endpoint: `POST /api/webhooks`
  - Body: `{ "url": "https://...", "events": ["analysis.complete"], "filters": {...} }`
  - Return webhook ID
- [ ] Add endpoint: `GET /api/webhooks`
  - List user's webhooks
- [ ] Add endpoint: `DELETE /api/webhooks/:id`
- [ ] Implement webhook delivery:
  - POST to webhook URL with event payload
  - Retry on failure (exponential backoff)
  - Log delivery attempts

#### 5.2: Event System
- [ ] Implement event emitter in API
- [ ] Define event types:
  - `analysis.started`
  - `analysis.complete`
  - `analysis.failed`
  - `threshold.exceeded` (e.g., churn > 100)
- [ ] Trigger webhooks on events

#### 5.3: Threshold Alerts
- [ ] Implement alert rules:
  - Example: "Notify when any file exceeds 100 commits"
  - Example: "Notify when total contributor count drops below 5"
- [ ] Add endpoint: `POST /api/alerts`
  - Body: `{ "condition": "...", "webhook": "..." }`
- [ ] Evaluate alerts after each analysis
- [ ] Send notifications via webhooks

#### 5.4: Scheduled Analysis
- [ ] Add `schedule` field to analysis jobs
  - Cron syntax: `0 0 * * *` (daily at midnight)
- [ ] Implement scheduler (using `node-cron`)
- [ ] Add endpoint: `POST /api/schedules`
  - Body: `{ "repoUrl": "...", "cron": "0 0 * * *" }`
- [ ] Add endpoint: `GET /api/schedules`
- [ ] Add endpoint: `DELETE /api/schedules/:id`

#### 5.5: Export Formats
- [ ] Add `format` query parameter to endpoints
  - `json` (default)
  - `csv`
  - `jsonl` (JSON Lines)
  - `prometheus` (metrics format)
- [ ] Implement format converters
- [ ] Set appropriate `Content-Type` headers

#### 5.6: Email Notifications (Optional)
- [ ] Add email sending capability (SendGrid, Mailgun)
- [ ] Send digest emails (weekly summary)
- [ ] Send alert emails for threshold violations

### Success Criteria
- ✅ Webhooks deliver events reliably
- ✅ Alerts trigger on threshold violations
- ✅ Scheduled analysis runs automatically
- ✅ Export formats work (CSV, Prometheus)
- ✅ Email notifications sent (if implemented)

### Demo
```bash
# Register webhook
curl -X POST https://codecohesion-api.railway.app/api/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://myapp.com/webhook",
    "events": ["analysis.complete"]
  }'

# Create alert rule
curl -X POST https://codecohesion-api.railway.app/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "repoId": "react",
    "condition": "commitCount.gt(100)",
    "webhook": "https://slack.com/webhook/..."
  }'

# Schedule daily analysis
curl -X POST https://codecohesion-api.railway.app/api/schedules \
  -H "Content-Type: application/json" \
  -d '{
    "repoUrl": "https://github.com/facebook/react",
    "cron": "0 0 * * *"
  }'

# Export to CSV
curl 'https://codecohesion-api.railway.app/api/repos/react/files?format=csv' > files.csv

# Export to Prometheus
curl 'https://codecohesion-api.railway.app/api/repos/react/stats?format=prometheus'
```

---

## Milestone 6: Integrations & Intelligence

**Goal:** Add GitHub App, Slack bot, and intelligent insights.

### Deliverables

#### 6.1: GitHub App Integration
- [ ] Create GitHub App
- [ ] Implement OAuth flow
- [ ] Add webhook handler for GitHub events:
  - `push` - Trigger analysis on new commits
  - `pull_request` - Analyze PR for hotspot changes
- [ ] Add PR comment bot:
  - Post comment with churn/coupling analysis
  - Warn if PR touches high-risk files
- [ ] Add check run:
  - Pass/fail based on thresholds
  - Link to full report

#### 6.2: Slack/Discord Bot
- [ ] Implement Slack bot commands:
  - `/codecohesion-stats <repo>` - Show repo stats
  - `/codecohesion-hotspots <repo>` - Show top hotspots
  - `/codecohesion-contributors <repo> <days>` - Show recent contributors
- [ ] Implement Discord bot (similar commands)
- [ ] Add interactive buttons (e.g., "Show More")

#### 6.3: VS Code Extension Data Provider
- [ ] Create minimal API client library (TypeScript)
- [ ] Document how VS Code extension can consume API
- [ ] Example: Show file coupling in sidebar
- [ ] Example: Show churn heatmap in file tree

#### 6.4: Grafana/Datadog Connectors
- [ ] Implement Prometheus metrics endpoint:
  - `codecohesion_total_files`
  - `codecohesion_total_loc`
  - `codecohesion_max_churn`
  - `codecohesion_contributor_count`
- [ ] Add Grafana dashboard template
- [ ] Add Datadog integration guide

#### 6.5: Repository Health Score
- [ ] Implement health score algorithm:
  - Factor 1: Churn distribution (prefer low/moderate)
  - Factor 2: Contributor diversity (prefer multiple contributors)
  - Factor 3: Coupling (prefer low coupling)
  - Factor 4: Code stability (prefer stable files)
  - Score: 0-100
- [ ] Add endpoint: `GET /api/repos/:repoId/health`
- [ ] Return score + breakdown + recommendations

#### 6.6: Bounded Context Recommendations
- [ ] Implement clustering algorithm:
  - Use coupling data to group files
  - Suggest candidate bounded contexts
  - Show cluster coherence metrics
- [ ] Add endpoint: `GET /api/repos/:repoId/contexts/suggest`
- [ ] Return suggested contexts with file lists

### Success Criteria
- ✅ GitHub App posts PR comments with analysis
- ✅ Slack/Discord bots respond to commands
- ✅ VS Code extension can query API
- ✅ Grafana/Datadog can scrape metrics
- ✅ Health score calculated and actionable
- ✅ Bounded context suggestions generated

### Demo
```bash
# Get health score
curl https://codecohesion-api.railway.app/api/repos/react/health

# Response:
# {
#   "score": 72,
#   "breakdown": {
#     "churn": 65,
#     "contributors": 85,
#     "coupling": 70,
#     "stability": 68
#   },
#   "recommendations": [
#     "Consider refactoring files with >100 commits",
#     "Improve test coverage for high-coupling clusters"
#   ]
# }

# Get bounded context suggestions
curl https://codecohesion-api.railway.app/api/repos/react/contexts/suggest

# Slack bot demo
# In Slack: /codecohesion-hotspots react
# Bot responds with top 5 hotspots
```

---

## Testing Strategy

### Unit Tests (Vitest)
**Scope:** Business logic in isolation

**Coverage:**
- QueryService methods (contributors, files, hotspots)
- DataLoader file operations (mocked file system)
- URL parsing and repo ID matching
- Date range calculations
- Validation functions

**Run:** `npm test`

### Integration Tests (Vitest + Supertest)
**Scope:** Full HTTP request/response cycle

**Coverage:**
- All endpoints with valid inputs
- Error responses (404, 400, 500)
- CORS headers
- Query parameter parsing
- JSON response format

**Run:** `npm run test:integration`

### End-to-End Tests (Manual + Automated)
**Scope:** Real deployment on Railway

**Coverage:**
- Deploy to staging environment
- Test with curl and Postman
- Verify viewer can call API
- Load test with `wrk` or `ab`
- Monitor Railway metrics

**Run:** Manual after each milestone

---

## Deployment Strategy

### Environments

**Local Development:**
- Run API: `cd api && npm run dev`
- Run processor: `cd processor && npm run dev -- /path/to/repo`
- Test with curl: `curl http://localhost:3001/api/repos`

**Staging (Railway):**
- Branch: `staging`
- Auto-deploy on push
- Use test data (small repos)
- Public URL for testing

**Production (Railway):**
- Branch: `main`
- Manual deploy trigger
- Use real analysis data
- Custom domain: `api.codecohesion.com` (future)

### Deployment Checklist

Before each milestone deploy:
- [ ] All tests passing locally
- [ ] No TypeScript errors
- [ ] CHANGELOG.md updated
- [ ] API docs updated
- [ ] Tested on staging
- [ ] Railway environment variables set
- [ ] Database migrations run (if applicable)
- [ ] Monitoring alerts configured

---

## Monitoring & Observability

### Metrics to Track

**Request Metrics:**
- Total requests per minute
- Response times (p50, p95, p99)
- Error rate (4xx, 5xx)
- Requests by endpoint

**System Metrics:**
- CPU usage
- Memory usage
- File system reads
- Database query time (Phase 3+)

**Business Metrics:**
- Number of repositories analyzed
- Analysis job success rate
- Webhook delivery success rate
- Active API consumers

### Alerting Rules

- Alert if error rate > 5% for 5 minutes
- Alert if p95 latency > 2s for 5 minutes
- Alert if memory usage > 80%
- Alert if disk space < 1 GB

### Logging

**Development:** Console logs with timestamps

**Production:**
- Structured JSON logging
- Log levels: DEBUG, INFO, WARN, ERROR
- Log aggregation via Railway dashboard
- Future: Send to LogDNA, Papertrail, or Datadog

---

## Documentation Plan

### API Documentation

**Live Docs:**
- Interactive API explorer (Swagger/OpenAPI) - Milestone 4
- Example requests/responses
- Error code reference
- Rate limiting info

**README.md:**
- Quick start guide
- Deployment instructions
- Environment variables
- Common use cases

**Guides:**
- CI/CD integration guide
- Slack bot setup guide
- VS Code extension integration guide
- Webhook configuration guide

### Code Documentation

**TSDoc Comments:**
- All public functions documented
- Parameter descriptions
- Return value descriptions
- Example usage

**Architecture Decision Records (ADRs):**
- Why Express over Fastify?
- Why PostgreSQL over MongoDB?
- Why Bull over AWS SQS?
- Document trade-offs and rationale

---

## Success Metrics

### Phase 1 (Milestones 1-2)
- ✅ 5+ distinct use cases built on API
- ✅ API response time < 200ms (p95)
- ✅ 99.9% uptime on Railway
- ✅ Zero security incidents
- ✅ API docs linked from README

### Phase 2 (Milestones 3-4)
- ✅ 50+ repositories analyzed on-demand
- ✅ Database queries < 50ms (p95)
- ✅ Search DSL used in 20% of queries
- ✅ Comparison endpoint used for releases

### Phase 3 (Milestones 5-6)
- ✅ 10+ webhook integrations active
- ✅ GitHub App installed on 5+ repos
- ✅ Slack bot used weekly
- ✅ Health scores guide refactoring decisions

---

## Risk Mitigation

### Risk 1: Large Repository Performance
**Risk:** API is slow for repos with 10K+ files

**Mitigation:**
- Phase 1: Acceptable (200-500ms)
- Phase 2: Add database indexing
- Phase 3: Add caching layer
- Phase 4: Pre-compute aggregations

### Risk 2: Railway Cost Overrun
**Risk:** Railway free tier exceeded

**Mitigation:**
- Monitor Railway usage dashboard
- Set up billing alerts
- Optimize database queries
- Add rate limiting early

### Risk 3: Processor Integration Complexity
**Risk:** Running processor in worker is hard

**Mitigation:**
- Phase 1-2: Skip on-demand analysis
- Phase 3: Start with simple shell exec
- Phase 4: Refactor processor as library

### Risk 4: Breaking Changes in Processor Format
**Risk:** Processor updates break API

**Mitigation:**
- Version processor output format
- API supports multiple format versions
- Add format migration logic
- Document format changes

---

## Next Steps

**To Start Milestone 1:**

1. Create `api/` directory
2. Initialize npm project: `npm init -y`
3. Install dependencies: `npm install express cors && npm install -D typescript @types/express @types/cors @types/node ts-node`
4. Copy `tsconfig.json` from processor
5. Create `src/server.ts` with basic Express app
6. Test locally: `npm run dev`
7. Create Railway project
8. Add `Procfile`
9. Deploy and verify

**First PR:**
- Title: "feat: add CodeCohesion API foundation (Milestone 1)"
- Files: `api/src/`, `api/package.json`, `api/Procfile`, `docs/api/`
- Description: "Core API with basic endpoints, deployed to Railway"

---

## Summary

The CodeCohesion API implementation plan follows a **progressive enhancement** approach:

**Phase 1 (Milestones 1-2):** Core functionality - read JSON files, expose basic endpoints, deploy to Railway

**Phase 2 (Milestones 3-4):** Persistence and advanced queries - add PostgreSQL, trigger on-demand analysis, search DSL

**Phase 3 (Milestones 5-6):** Automation and integrations - webhooks, alerts, GitHub App, Slack bot, intelligent insights

Each milestone delivers **standalone value** and can be demoed independently. Early milestones prioritize **simplicity** and **deployment** over optimization. Later milestones add **advanced features** based on real usage patterns.

The plan balances **immediate utility** with **future extensibility**, allowing the API to grow from a simple file-reading service to a full-featured analysis platform.
