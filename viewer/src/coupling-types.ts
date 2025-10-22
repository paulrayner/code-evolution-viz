/**
 * Types for temporal coupling analysis and bounded context detection
 * Mirrors processor/src/coupling-types.ts for frontend use
 */

/**
 * Represents a coupling relationship between two files
 */
export interface CouplingEdge {
  fileA: string;           // Path to first file
  fileB: string;           // Path to second file
  coChangeCount: number;   // Number of times files changed together
  coupling: number;        // Jaccard similarity coefficient (0-1)
}

/**
 * Represents a cluster of related files (potential bounded context)
 */
export interface Cluster {
  id: number;                  // Unique cluster identifier
  name: string;                // Display name (e.g., "Cluster 1" or custom)
  files: string[];             // List of file paths in this cluster
  fileCount: number;           // Number of files in cluster
  avgInternalCoupling: number; // Average coupling within cluster (0-1)
}

/**
 * Complete coupling analysis result
 */
export interface CouplingGraph {
  format: 'coupling-v1';       // Format identifier
  repositoryPath: string;      // Path to analyzed repository
  sourceTimeline: string;      // Which timeline file was analyzed

  analysis: {
    totalCommits: number;      // Number of commits analyzed
    filesAnalyzed: number;     // Number of unique files
    couplingEdges: number;     // Number of coupling relationships found
    generatedAt: string;       // ISO timestamp of analysis
  };

  edges: CouplingEdge[];       // All coupling relationships
  clusters: Cluster[];         // Detected bounded contexts
}
