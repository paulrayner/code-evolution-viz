/**
 * Coupling Data Loader
 *
 * Loads temporal coupling analysis data (optional)
 * Provides graceful degradation if coupling data is unavailable
 */

import { CouplingGraph, Cluster, CouplingEdge } from './coupling-types';

export class CouplingLoader {
  private couplingData: CouplingGraph | null = null;
  private fileToCluster: Map<string, number> = new Map();
  private loaded: boolean = false;

  /**
   * Attempt to load coupling data for a repository
   * Returns true if successful, false if file doesn't exist
   * Never throws errors - graceful degradation
   */
  async tryLoad(repoName: string): Promise<boolean> {
    try {
      // Try to fetch coupling data
      const response = await fetch(`/codecohesion/data/${repoName}-coupling.json`);

      if (!response.ok) {
        console.log(`No coupling data for ${repoName} (optional feature)`);
        this.reset();
        return false;
      }

      this.couplingData = await response.json();

      // Validate format
      if (this.couplingData?.format !== 'coupling-v1') {
        console.warn('Invalid coupling data format, ignoring');
        this.reset();
        return false;
      }

      // Build file → cluster index for fast lookup
      this.buildIndex();
      this.loaded = true;

      console.log(`✓ Loaded coupling data: ${this.couplingData.clusters.length} clusters, ${this.couplingData.edges.length} edges`);
      return true;

    } catch (err) {
      // Expected when coupling file doesn't exist - not an error
      console.log('Coupling data not available (optional feature)');
      this.reset();
      return false;
    }
  }

  /**
   * Check if coupling data is currently loaded
   */
  isLoaded(): boolean {
    return this.loaded;
  }

  /**
   * Get the cluster ID for a given file path
   * Returns null if file is not in any cluster or if coupling data not loaded
   */
  getClusterForFile(filePath: string): number | null {
    if (!this.loaded) return null;
    return this.fileToCluster.get(filePath) ?? null;
  }

  /**
   * Get all clusters
   * Returns empty array if coupling data not loaded
   */
  getClusters(): Cluster[] {
    if (!this.loaded) return [];
    return this.couplingData?.clusters ?? [];
  }

  /**
   * Get coupling edges above a minimum threshold
   * Returns empty array if coupling data not loaded
   */
  getEdges(minCoupling: number = 0.3): CouplingEdge[] {
    if (!this.loaded) return [];
    return this.couplingData?.edges.filter(e => e.coupling >= minCoupling) ?? [];
  }

  /**
   * Get coupling analysis metadata
   */
  getAnalysisInfo(): { totalCommits: number; filesAnalyzed: number; couplingEdges: number } | null {
    if (!this.loaded) return null;
    return this.couplingData?.analysis ?? null;
  }

  /**
   * Reset loader state
   */
  private reset(): void {
    this.couplingData = null;
    this.fileToCluster.clear();
    this.loaded = false;
  }

  /**
   * Build index for fast file → cluster lookup
   */
  private buildIndex(): void {
    if (!this.couplingData) return;

    this.fileToCluster.clear();

    for (const cluster of this.couplingData.clusters) {
      for (const file of cluster.files) {
        this.fileToCluster.set(file, cluster.id);
      }
    }
  }
}

// Global singleton instance
// Lazy loaded per repository
export const couplingLoader = new CouplingLoader();
