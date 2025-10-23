/**
 * Get the base repository name by stripping timeline suffixes
 * @param repoName - The repository name (possibly with -timeline or -timeline-full suffix)
 * @returns The base repository name without timeline suffixes
 */
export function getBaseRepoName(repoName: string): string {
  return repoName.replace(/-timeline(-full)?$/, '');
}
