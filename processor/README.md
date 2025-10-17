# Code Evolution Processor

Analyzes Git repositories to extract structural and metric data for visualization.

## Installation

```bash
npm install
```

## Usage

Analyze a repository at HEAD:

```bash
npm run dev -- /path/to/repo [output-file.json]
```

Examples:

```bash
# Analyze current directory
npm run dev

# Analyze specific repo
npm run dev /Users/paul/Documents/Gource

# Specify output location
npm run dev /path/to/repo ./output/my-analysis.json
```

## Output Format

Generates JSON with:
- Repository metadata (commit, author, timestamp)
- Hierarchical tree structure of directories and files
- Lines of code per file
- Summary statistics

See `src/types.ts` for detailed type definitions.

## Building

```bash
npm run build
node dist/analyze.js /path/to/repo
```
