/**
 * Pure function to determine if fog should be enabled based on layout mode
 *
 * Fog provides depth cues in 3D perspective views by fading distant objects.
 * In 2D overhead views, fog is unnecessary and causes unwanted color dimming
 * when zooming out (camera distance increases but depth perception not needed).
 *
 * @param is2DLayout - True if using 2D Force-Directed layout (overhead view)
 * @returns True if fog should be enabled, false otherwise
 */
export function shouldShowFog(is2DLayout: boolean): boolean {
  // Hide fog in 2D overhead view (no depth/perspective)
  // Show fog in 3D view (provides depth cues)
  return !is2DLayout;
}
