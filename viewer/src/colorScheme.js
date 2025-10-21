/**
 * Color scheme for file type visualization
 *
 * Single source of truth for all file extension colors.
 * See docs/color-scheme.md for design rationale.
 */
/**
 * Complete color map for all file extensions
 */
export const FILE_COLORS = {
    // Source code - distinct bright colors
    'cpp': { hex: '#f34b7d', numeric: 0xf34b7d, name: 'C++' },
    'h': { hex: '#b07219', numeric: 0xb07219, name: 'C/C++ Header' },
    'c': { hex: '#ff6b6b', numeric: 0xff6b6b, name: 'C' },
    'py': { hex: '#3776ab', numeric: 0x3776ab, name: 'Python' },
    'js': { hex: '#f7df1e', numeric: 0xf7df1e, name: 'JavaScript' },
    'ts': { hex: '#3178c6', numeric: 0x3178c6, name: 'TypeScript' },
    'jsx': { hex: '#61dafb', numeric: 0x61dafb, name: 'React JSX' },
    'tsx': { hex: '#61dafb', numeric: 0x61dafb, name: 'React TSX' },
    'java': { hex: '#f89820', numeric: 0xf89820, name: 'Java' },
    'go': { hex: '#00add8', numeric: 0x00add8, name: 'Go' },
    'rs': { hex: '#dea584', numeric: 0xdea584, name: 'Rust' },
    'rb': { hex: '#cc342d', numeric: 0xcc342d, name: 'Ruby' },
    'php': { hex: '#777bb4', numeric: 0x777bb4, name: 'PHP' },
    'pl': { hex: '#0298c3', numeric: 0x0298c3, name: 'Perl' },
    // Markup & styling
    'html': { hex: '#e34c26', numeric: 0xe34c26, name: 'HTML' },
    'css': { hex: '#264de4', numeric: 0x264de4, name: 'CSS' },
    'md': { hex: '#083fa1', numeric: 0x083fa1, name: 'Markdown' },
    // Shaders & graphics
    'frag': { hex: '#5686a5', numeric: 0x5686a5, name: 'GLSL Shader (frag)' },
    'vert': { hex: '#5686a5', numeric: 0x5686a5, name: 'GLSL Shader (vert)' },
    'style': { hex: '#9b59b6', numeric: 0x9b59b6, name: 'Style File' },
    // Build system & config (warm colors)
    'am': { hex: '#e67e22', numeric: 0xe67e22, name: 'Automake' },
    'ac': { hex: '#e67e22', numeric: 0xe67e22, name: 'Autoconf' },
    'm4': { hex: '#e67e22', numeric: 0xe67e22, name: 'M4 Macro' },
    'pro': { hex: '#41cd52', numeric: 0x41cd52, name: 'Qt Project' },
    'sh': { hex: '#89e051', numeric: 0x89e051, name: 'Shell Script' },
    'cmd': { hex: '#89e051', numeric: 0x89e051, name: 'Batch Script' },
    'yml': { hex: '#cb171e', numeric: 0xcb171e, name: 'YAML' },
    'yaml': { hex: '#cb171e', numeric: 0xcb171e, name: 'YAML' },
    'no-extension': { hex: '#f39c12', numeric: 0xf39c12, name: 'Config (no ext)' },
    'conf': { hex: '#f39c12', numeric: 0xf39c12, name: 'Config' },
    '1': { hex: '#e67e22', numeric: 0xe67e22, name: 'Man Page' },
    // Data & documentation
    'json': { hex: '#292929', numeric: 0x292929, name: 'JSON' },
    'txt': { hex: '#95a5a6', numeric: 0x95a5a6, name: 'Text' },
    'log': { hex: '#95a5a6', numeric: 0x95a5a6, name: 'Log File' },
    // Assets
    'png': { hex: '#ff00ff', numeric: 0xff00ff, name: 'Image (PNG)' },
    'jpg': { hex: '#ff00ff', numeric: 0xff00ff, name: 'Image (JPG)' },
    'jpeg': { hex: '#ff00ff', numeric: 0xff00ff, name: 'Image (JPEG)' },
    'gif': { hex: '#ff00ff', numeric: 0xff00ff, name: 'Image (GIF)' },
    'bmp': { hex: '#ff00ff', numeric: 0xff00ff, name: 'Image (BMP)' },
    'tga': { hex: '#ff00ff', numeric: 0xff00ff, name: 'Image (TGA)' },
    'xcf': { hex: '#ff00ff', numeric: 0xff00ff, name: 'GIMP Image' },
    'ttf': { hex: '#34495e', numeric: 0x34495e, name: 'Font (TTF)' },
    'otf': { hex: '#34495e', numeric: 0x34495e, name: 'Font (OTF)' },
    'woff': { hex: '#34495e', numeric: 0x34495e, name: 'Font (WOFF)' },
};
/**
 * Default color for unknown file types
 */
export const DEFAULT_COLOR = {
    hex: '#aaaaaa',
    numeric: 0xaaaaaa,
    name: 'Unknown'
};
/**
 * Directory color (special case, not a file extension)
 */
export const DIRECTORY_COLOR = {
    hex: '#7f8c8d',
    numeric: 0x7f8c8d,
    name: 'Directory'
};
/**
 * Get color info for a file extension
 */
export function getColorForExtension(ext) {
    return FILE_COLORS[ext] || DEFAULT_COLOR;
}
