import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { DirectoryNode, FileNode, TreeNode } from './types';
import { getColorForExtension, DIRECTORY_COLOR } from './colorScheme';
import { ColorMode, getColorForFile } from './colorModeManager';

interface LayoutNode {
  node: TreeNode;
  position: THREE.Vector3;
  mesh?: THREE.Mesh;
  parent?: LayoutNode;
}

interface DirectoryStats {
  totalLoc: number;
  filesByExtension: Record<string, number>;
  dominantExtension: string;
  dominantColor: number;
}

export class TreeVisualizer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private labelRenderer: CSS2DRenderer;
  private controls: OrbitControls;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private layoutNodes: LayoutNode[] = [];
  private fileObjects: Map<THREE.Object3D, FileNode> = new Map();
  private dirObjects: Map<THREE.Object3D, DirectoryNode> = new Map();
  private dirStats: Map<DirectoryNode, DirectoryStats> = new Map();
  private selectedObject: THREE.Object3D | null = null;
  private hoveredObjects: Set<THREE.Object3D> = new Set();
  private collapsedDirs: Set<DirectoryNode> = new Set();
  private focusedDirectory: DirectoryNode | null = null;
  private labelMode: 'always' | 'hover' = 'hover';
  private colorMode: ColorMode = 'fileType';
  private highlightedFiles: Set<string> = new Set();
  private highlightedFileTypes: Map<string, 'added' | 'modified' | 'deleted'> = new Map(); // Track type of highlighted files
  private deletedFileNodes: Map<string, FileNode> = new Map(); // Store metadata for deleted files (ghost nodes)
  private timelineMode: 'off' | 'v1' | 'v2' = 'off'; // Timeline mode: v1=spotlight, v2=additive

  // Ghost rendering for Timeline V2 deletions (isolated for future replacement)
  private ghostMeshes: Set<THREE.Mesh> = new Set();
  private ghostEdges: Set<THREE.Line> = new Set();

  private edges: THREE.Line[] = [];
  private edgeNodeMap: Map<THREE.Line, { parent: TreeNode; child: TreeNode }> = new Map();
  private onFileClick?: (file: FileNode) => void;
  private onDirClick?: (dir: DirectoryNode) => void;
  private onHover?: (node: TreeNode | null, event?: MouseEvent) => void;

  constructor(canvas: HTMLCanvasElement) {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);
    this.scene.fog = new THREE.Fog(0x1a1a1a, 50, 200);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(30, 30, 30);
    this.camera.lookAt(0, 0, 0);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Label renderer for directory names
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    canvas.parentElement?.appendChild(this.labelRenderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 150;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    this.scene.add(directionalLight);

    // Raycaster for mouse interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    canvas.addEventListener('click', this.onClick.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  /**
   * Set callback for file clicks
   */
  setOnFileClick(callback: (file: FileNode) => void) {
    this.onFileClick = callback;
  }

  /**
   * Set callback for directory clicks
   */
  setOnDirClick(callback: (dir: DirectoryNode) => void) {
    this.onDirClick = callback;
  }

  /**
   * Set callback for hover events
   */
  setOnHover(callback: (node: TreeNode | null, event?: MouseEvent) => void) {
    this.onHover = callback;
  }

  /**
   * Set label display mode
   */
  setLabelMode(mode: 'always' | 'hover') {
    this.labelMode = mode;

    // Update all existing labels, respecting parent mesh visibility
    this.dirObjects.forEach((dirNode, mesh) => {
      const label = mesh.children.find(child => child instanceof CSS2DObject) as CSS2DObject | undefined;
      if (label && label.element instanceof HTMLDivElement) {
        if (mode === 'always') {
          // Only show label if parent mesh is visible
          if (mesh.visible) {
            label.element.style.visibility = 'visible';
            label.element.style.display = 'block';
          } else {
            label.element.style.visibility = 'hidden';
            label.element.style.display = 'none';
          }
        } else {
          // Hover mode: hide all labels initially
          label.element.style.visibility = 'hidden';
          label.element.style.display = 'none';
        }
      }
    });
  }

  /**
   * Set color mode and rebuild visualization
   */
  setColorMode(mode: ColorMode) {
    this.colorMode = mode;
    if (this.layoutNodes.length > 0) {
      this.rebuildVisualization();
    }
  }

  /**
   * Set timeline mode
   * @param mode - 'off' (static), 'v1' (spotlight highlighting), 'v2' (additive/Gource-style)
   */
  setTimelineMode(mode: 'off' | 'v1' | 'v2') {
    this.timelineMode = mode;
    if (this.layoutNodes.length > 0) {
      this.rebuildVisualization();
    }
  }

  /**
   * Highlight specific files by path
   */
  highlightFiles(filePaths: string[]) {
    this.highlightedFiles = new Set(filePaths);
    this.updateHighlighting();
  }

  /**
   * Highlight files with color-coding based on change type
   * @param addedFiles - Paths of newly added files (green connections)
   * @param modifiedFiles - Paths of modified files (orange connections)
   * @param deletedFiles - Paths of deleted files (red connections)
   * @param deletedFileNodes - Full FileNode metadata for deleted files (from previous keyframe)
   */
  highlightFilesByType(addedFiles: string[], modifiedFiles: string[], deletedFiles: string[] = [], deletedFileNodes: FileNode[] = []) {
    this.highlightedFiles = new Set([...addedFiles, ...modifiedFiles, ...deletedFiles]);
    this.highlightedFileTypes.clear();
    this.deletedFileNodes.clear();

    for (const path of addedFiles) {
      this.highlightedFileTypes.set(path, 'added');
    }
    for (const path of modifiedFiles) {
      this.highlightedFileTypes.set(path, 'modified');
    }
    for (const path of deletedFiles) {
      this.highlightedFileTypes.set(path, 'deleted');
    }

    // Store deleted file metadata for ghost rendering
    for (const fileNode of deletedFileNodes) {
      this.deletedFileNodes.set(fileNode.path, fileNode);
    }

    this.updateHighlighting();
  }

  /**
   * Clear all file highlighting
   */
  clearHighlight() {
    this.highlightedFiles.clear();
    this.highlightedFileTypes.clear();
    this.deletedFileNodes.clear();
    this.updateHighlighting();
  }

  /**
   * Update visual highlighting of files based on highlightedFiles set
   */
  private updateHighlighting() {
    // Iterate through all file meshes and update their appearance
    for (const [obj, fileNode] of this.fileObjects.entries()) {
      const mesh = obj as THREE.Mesh;
      if (!mesh.material || Array.isArray(mesh.material)) continue;
      const material = mesh.material as THREE.MeshPhongMaterial;

      if (this.highlightedFiles.size === 0) {
        // No highlighting active - restore normal appearance (may still be hidden)
        const layoutNode = this.layoutNodes.find(ln => ln.mesh === mesh);
        const isHidden = layoutNode ? this.isNodeHidden(layoutNode) : false;
        material.opacity = isHidden ? 0.0 : 1.0;
        material.transparent = isHidden;
        material.emissiveIntensity = 0.2;
        mesh.scale.set(1, 1, 1);
        mesh.visible = !isHidden;
      } else if (this.highlightedFiles.has(fileNode.path)) {
        // This file is highlighted - SUPER BRIGHT, scaled up, and FORCE VISIBLE
        material.opacity = 1.0;
        material.transparent = false;
        material.emissiveIntensity = 1.5; // Very bright glow

        // Check if this is a deleted file (should stay red)
        const fileType = this.highlightedFileTypes.get(fileNode.path);
        if (fileType === 'deleted') {
          // Keep red color for deletions
          material.emissive.setHex(0xe74c3c);
        } else {
          // Use current color mode to determine file color (not change type)
          const colorInfo = getColorForFile(fileNode, this.colorMode);
          material.emissive.setHex(parseInt(colorInfo.hex.replace('#', ''), 16));
        }

        mesh.scale.set(1.3, 1.3, 1.3); // Scale up 30%
        mesh.visible = true; // Force visible even if normally hidden
      } else {
        // This file is NOT highlighted
        if (this.timelineMode === 'v2') {
          // V2 (Gource-style): Keep normal appearance for non-highlighted files
          const layoutNode = this.layoutNodes.find(ln => ln.mesh === mesh);
          const isHidden = layoutNode ? this.isNodeHidden(layoutNode) : false;
          material.opacity = isHidden ? 0.0 : 1.0;
          material.transparent = isHidden;
          material.emissiveIntensity = 0.6; // Keep same brightness as initial render
          mesh.visible = !isHidden;
        } else {
          // V1 (or static with highlight commit on): Dim non-highlighted files (spotlight effect)
          material.opacity = 0.08;
          material.transparent = true;
          material.emissiveIntensity = 0.0;
          mesh.visible = true; // Keep visible but very dim
        }
        mesh.scale.set(1, 1, 1);
      }

      material.needsUpdate = true;
    }

    // Update edges to highlight connections to highlighted files
    for (const edge of this.edges) {
      const edgeInfo = this.edgeNodeMap.get(edge);
      if (!edgeInfo) continue;

      const material = edge.material as THREE.LineBasicMaterial;
      const childIsFile = edgeInfo.child.type === 'file';
      const childPath = childIsFile ? (edgeInfo.child as FileNode).path : '';

      // Find layout nodes to check if they're hidden
      const parentLayout = this.layoutNodes.find(ln => ln.node === edgeInfo.parent);
      const childLayout = this.layoutNodes.find(ln => ln.node === edgeInfo.child);
      const shouldBeHidden = !parentLayout || !childLayout ||
                            this.isNodeHidden(parentLayout) ||
                            this.isNodeHidden(childLayout);

      if (this.highlightedFiles.size === 0) {
        // No highlighting - make edges very dim to indicate no highlighting available
        // This prevents confusion in timeline mode when file lookup fails
        material.color.setHex(0xaaaaaa);
        material.opacity = shouldBeHidden ? 0.0 : 0.3;
        material.linewidth = 1;
        edge.visible = !shouldBeHidden;
      } else if (childIsFile && this.highlightedFiles.has(childPath)) {
        // Edge connects to highlighted file - make it BRIGHT, THICK, and VISIBLE
        // Color-code based on change type
        const fileType = this.highlightedFileTypes.get(childPath);
        if (fileType === 'added') {
          material.color.setHex(0x27ae60); // Green for additions (matches commit stats color)
        } else if (fileType === 'modified') {
          material.color.setHex(0xffff00); // Yellow for modifications
        } else if (fileType === 'deleted') {
          material.color.setHex(0xe74c3c); // Red for deletions
        } else {
          material.color.setHex(0xffff00); // Default to yellow (legacy support)
        }
        material.opacity = 1.0;
        material.linewidth = 3; // Note: linewidth may not work on all platforms
        edge.visible = true; // Force visible even if normally hidden
      } else if (this.deletedFileNodes.has(childPath)) {
        // SPECIAL CASE: Edge connects to a DELETED file (ghost node)
        // The file is not in the current tree, but we want to show its connection
        material.color.setHex(0xe74c3c); // Red for deletion
        material.opacity = 1.0;
        material.linewidth = 3;
        edge.visible = true; // Show the connection even though child is gone
      } else {
        // Edge doesn't connect to highlighted file
        if (this.timelineMode === 'v2') {
          // V2: Keep normal edge visibility (additive mode)
          material.color.setHex(0xaaaaaa);
          material.opacity = shouldBeHidden ? 0.0 : 0.3;
          material.linewidth = 1;
          edge.visible = !shouldBeHidden;
        } else {
          // V1: Make edge nearly invisible (spotlight mode)
          material.opacity = 0.05;
          edge.visible = true; // Keep visible but very dim
        }
      }

      material.needsUpdate = true;
    }
  }

  /**
   * Calculate statistics for a directory (total LOC, dominant file type)
   */
  private calculateDirectoryStats(dir: DirectoryNode): DirectoryStats {
    const stats: DirectoryStats = {
      totalLoc: 0,
      filesByExtension: {},
      dominantExtension: 'no-extension',
      dominantColor: DIRECTORY_COLOR.numeric
    };

    const processNode = (node: TreeNode) => {
      if (node.type === 'file') {
        stats.totalLoc += node.loc;
        const ext = node.extension;
        stats.filesByExtension[ext] = (stats.filesByExtension[ext] || 0) + node.loc;
      } else {
        // Recursively process subdirectories
        for (const child of node.children) {
          processNode(child);
        }
      }
    };

    // Process all children
    for (const child of dir.children) {
      processNode(child);
    }

    // Find dominant extension by LOC
    let maxLoc = 0;
    for (const [ext, loc] of Object.entries(stats.filesByExtension)) {
      if (loc > maxLoc) {
        maxLoc = loc;
        stats.dominantExtension = ext;
        stats.dominantColor = getColorForExtension(ext).numeric;
      }
    }

    return stats;
  }

  /**
   * Find the most recently modified file in a directory tree
   */
  private findMostRecentFile(dir: DirectoryNode): FileNode | null {
    let mostRecent: FileNode | null = null;
    let mostRecentDate: Date | null = null;

    const processNode = (node: TreeNode) => {
      if (node.type === 'file') {
        if (node.lastModified) {
          const date = new Date(node.lastModified);
          if (!mostRecentDate || date > mostRecentDate) {
            mostRecentDate = date;
            mostRecent = node;
          }
        }
      } else {
        for (const child of node.children) {
          processNode(child);
        }
      }
    };

    for (const child of dir.children) {
      processNode(child);
    }

    return mostRecent;
  }

  /**
   * Calculate adaptive radius based on number of children
   * Keep orbits tight - files need to stay close to parent for visual grouping
   */
  private calculateRadius(childCount: number): number {
    const baseRadius = 6;

    // Use sqrt scaling to keep files close even for dense directories
    // 35 files: 6 + sqrt(35) * 2.5 = ~20.8 radius
    return baseRadius + Math.sqrt(childCount) * 2.5;
  }

  /**
   * Calculate adaptive vertical spacing based on tree depth
   * Moderate spacing to keep parent-child relationship clear
   */
  private calculateVerticalSpacing(level: number): number {
    // Moderate vertical spacing - close enough to see relationship
    const baseSpacing = 12;
    const depthFactor = Math.max(0.7, 1 - level * 0.1);
    return baseSpacing * depthFactor;
  }


  /**
   * Layout tree nodes in 3D space
   * Solar system metaphor: directories are planets, files orbit in rings around them
   * Each directory uses full 360° circle for its children (no angular subdivision)
   */
  private layoutTree(node: DirectoryNode, position: THREE.Vector3, level: number, angleStart: number, angleEnd: number, parentLayout?: LayoutNode): LayoutNode[] {
    const nodes: LayoutNode[] = [];

    const currentLayout: LayoutNode = { node, position, parent: parentLayout };
    nodes.push(currentLayout);

    if (node.children.length === 0) return nodes;

    // Single ring layout: full 360° circle for all children
    const radius = this.calculateRadius(node.children.length);
    const verticalSpacing = this.calculateVerticalSpacing(level);
    const angleStep = (Math.PI * 2) / node.children.length; // Full circle

    node.children.forEach((child, index) => {
      const angle = angleStep * index;
      const childPosition = new THREE.Vector3(
        position.x + Math.cos(angle) * radius,
        position.y - verticalSpacing,
        position.z + Math.sin(angle) * radius
      );

      if (child.type === 'directory') {
        // Subdirectory gets its own full circle for its children
        const childNodes = this.layoutTree(child, childPosition, level + 1, 0, Math.PI * 2, currentLayout);
        nodes.push(...childNodes);
      } else {
        // File node
        nodes.push({ node: child, position: childPosition, parent: currentLayout });
      }
    });

    return nodes;
  }

  /**
   * Check if a layout node should be hidden
   * Hidden if: ancestor is collapsed OR outside focus scope
   */
  private isNodeHidden(layoutNode: LayoutNode): boolean {
    // Check collapsed ancestors
    let current = layoutNode.parent;
    while (current) {
      if (current.node.type === 'directory' && this.collapsedDirs.has(current.node)) {
        return true;
      }
      current = current.parent;
    }

    // Check focus scope
    if (this.focusedDirectory === null) {
      // In timeline mode, disable depth-based hiding so all files can be highlighted
      if (this.timelineMode === 'off') {
        // No focus: show root + level 1 only
        const depth = this.getNodeDepth(layoutNode);
        return depth > 1;
      }
      // Timeline mode (v1 or v2): no depth-based hiding
      return false;
    } else {
      // Focused: show only focused directory + its direct children
      return !this.isInFocusScope(layoutNode);
    }
  }

  /**
   * Get depth of a layout node in the tree
   */
  private getNodeDepth(layoutNode: LayoutNode): number {
    let depth = 0;
    let current = layoutNode.parent;
    while (current) {
      depth++;
      current = current.parent;
    }
    return depth;
  }

  /**
   * Check if node is within focus scope
   */
  private isInFocusScope(layoutNode: LayoutNode): boolean {
    const node = layoutNode.node;

    // The focused directory itself
    if (node === this.focusedDirectory) {
      return true;
    }

    // All ancestors of focused directory (for context/navigation)
    if (this.isAncestorOfFocused(layoutNode)) {
      return true;
    }

    // Siblings of focused directory (at same level, not cluttering)
    if (this.isSiblingOfFocused(layoutNode)) {
      return true;
    }

    // All siblings of all ancestors (show all nodes at ancestor levels)
    if (this.isSiblingOfAncestor(layoutNode)) {
      return true;
    }

    // Direct children of focused directory
    if (layoutNode.parent && layoutNode.parent.node === this.focusedDirectory) {
      return true;
    }

    return false;
  }

  /**
   * Check if node is an ancestor of the focused directory
   */
  private isAncestorOfFocused(layoutNode: LayoutNode): boolean {
    if (!this.focusedDirectory) return false;

    // Find the focused layout node
    const focusedLayout = this.layoutNodes.find(ln => ln.node === this.focusedDirectory);
    if (!focusedLayout) return false;

    // Walk up from focused to see if we hit this node
    let current = focusedLayout.parent;
    while (current) {
      if (current.node === layoutNode.node) {
        return true;
      }
      current = current.parent;
    }

    return false;
  }

  /**
   * Check if node is a sibling of the focused directory (shares same parent)
   */
  private isSiblingOfFocused(layoutNode: LayoutNode): boolean {
    if (!this.focusedDirectory) return false;

    // Find the focused layout node
    const focusedLayout = this.layoutNodes.find(ln => ln.node === this.focusedDirectory);
    if (!focusedLayout) return false;

    // Same parent = siblings
    return layoutNode.parent === focusedLayout.parent && layoutNode.node !== this.focusedDirectory;
  }

  /**
   * Check if node is a sibling of any ancestor of the focused directory
   * This ensures all nodes at ancestor levels remain visible
   */
  private isSiblingOfAncestor(layoutNode: LayoutNode): boolean {
    if (!this.focusedDirectory) return false;

    // Find the focused layout node
    const focusedLayout = this.layoutNodes.find(ln => ln.node === this.focusedDirectory);
    if (!focusedLayout) return false;

    // Walk up ancestors and check if layoutNode is a sibling of any
    let current = focusedLayout.parent;
    while (current) {
      // Check if layoutNode shares the same parent as this ancestor
      if (layoutNode.parent === current.parent && layoutNode.node !== current.node) {
        return true;
      }
      current = current.parent;
    }

    return false;
  }

  /**
   * Create visual representation of the tree
   */
  private createVisuals(layoutNodes: LayoutNode[], maxFileLoc: number, maxDirLoc: number) {
    // Clear existing objects and CSS2D labels
    // CSS2DRenderer maintains DOM elements that need explicit cleanup
    while (this.labelRenderer.domElement.firstChild) {
      this.labelRenderer.domElement.removeChild(this.labelRenderer.domElement.firstChild);
    }
    this.scene.clear();
    this.fileObjects.clear();
    this.dirObjects.clear();

    // Re-add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    this.scene.add(directionalLight);

    // Create edges first (so they render behind nodes)
    const edgeGroup = new THREE.Group();
    this.edges = [];
    this.edgeNodeMap.clear();

    for (const layoutNode of layoutNodes) {
      if (layoutNode.node.type === 'directory') {
        const dirNode = layoutNode.node;
        for (const child of dirNode.children) {
          const childLayout = layoutNodes.find(ln => ln.node === child);
          if (childLayout) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              layoutNode.position,
              childLayout.position
            ]);

            // Start edges as hidden/dim if nodes are hidden
            const isHidden = this.isNodeHidden(layoutNode) || this.isNodeHidden(childLayout);
            const material = new THREE.LineBasicMaterial({
              color: 0xaaaaaa,
              transparent: true,
              opacity: isHidden ? 0.0 : 0.8,
              linewidth: 3 // Thicker connection lines
            });
            const line = new THREE.Line(geometry, material);
            line.visible = !isHidden;
            edgeGroup.add(line);

            // Store edge and its nodes for later highlighting
            this.edges.push(line);
            this.edgeNodeMap.set(line, { parent: dirNode, child });
          }
        }
      }
    }
    this.scene.add(edgeGroup);

    // Create nodes
    for (const layoutNode of layoutNodes) {
      const isHidden = this.isNodeHidden(layoutNode);

      if (layoutNode.node.type === 'file') {
        const fileNode = layoutNode.node;

        // Scale based on LOC (normalized)
        // Use smaller base size for timeline mode where all LOC values are placeholders
        const sizeMultiplier = this.timelineMode !== 'off' ? 0.3 : 2;
        const minSize = this.timelineMode !== 'off' ? 0.3 : 0.3;
        const normalizedSize = Math.max(minSize, (fileNode.loc / maxFileLoc) * sizeMultiplier);

        // Color based on current mode
        const colorInfo = getColorForFile(fileNode, this.colorMode);
        const color = parseInt(colorInfo.hex.replace('#', ''), 16);

        // Use higher emissive intensity in timeline mode for better visibility
        const emissiveIntensity = this.timelineMode !== 'off' ? 0.6 : 0.2;

        const geometry = new THREE.SphereGeometry(normalizedSize, 16, 16);
        const material = new THREE.MeshPhongMaterial({
          color,
          emissive: color,
          emissiveIntensity,
          transparent: isHidden,
          opacity: isHidden ? 0.0 : 1.0
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(layoutNode.position);
        mesh.visible = !isHidden;

        this.scene.add(mesh);
        this.fileObjects.set(mesh, fileNode);
        layoutNode.mesh = mesh;
      } else {
        // Directory node - cube shape with aggregation coloring
        const dirNode = layoutNode.node;

        // Get or calculate directory stats
        let stats = this.dirStats.get(dirNode);
        if (!stats) {
          stats = this.calculateDirectoryStats(dirNode);
          this.dirStats.set(dirNode, stats);
        }

        // Size based on total LOC (sqrt scaling for better visual differentiation)
        // Using sqrt to give small directories more visible size while keeping large ones manageable
        const ratio = Math.sqrt(stats.totalLoc / maxDirLoc);
        const normalizedSize = 0.5 + (ratio * 2.5); // Range: 0.5 to 3.0

        // Color based on current mode
        let color: number;
        if (this.colorMode === 'lastModified') {
          // Find most recently modified file in directory
          const mostRecentFile = this.findMostRecentFile(dirNode);
          if (mostRecentFile && mostRecentFile.lastModified) {
            const colorInfo = getColorForFile(mostRecentFile, this.colorMode);
            color = parseInt(colorInfo.hex.replace('#', ''), 16);
          } else {
            color = 0x666666; // Gray for unknown
          }
        } else {
          // File type mode - use dominant file type color
          color = stats.dominantColor;
        }

        const geometry = new THREE.BoxGeometry(normalizedSize, normalizedSize, normalizedSize);
        const material = new THREE.MeshPhongMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: isHidden ? 0.0 : 0.85
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(layoutNode.position);
        mesh.visible = !isHidden;

        this.scene.add(mesh);
        this.dirObjects.set(mesh, dirNode);
        layoutNode.mesh = mesh;

        // Add text label above directory with collapse indicator
        const isCollapsed = this.collapsedDirs.has(dirNode);
        const indicator = isCollapsed ? '+ ' : '− ';

        const labelDiv = document.createElement('div');
        labelDiv.className = 'dir-label';
        labelDiv.textContent = indicator + dirNode.name;
        labelDiv.style.color = '#ffffff';
        labelDiv.style.fontSize = '12px';
        labelDiv.style.fontFamily = 'monospace';
        labelDiv.style.padding = '2px 6px';
        labelDiv.style.background = 'rgba(0, 0, 0, 0.6)';
        labelDiv.style.borderRadius = '3px';
        labelDiv.style.whiteSpace = 'nowrap';

        // Set initial visibility based on label mode AND node visibility
        if (this.labelMode === 'hover' || isHidden) {
          labelDiv.style.visibility = 'hidden';
          labelDiv.style.display = 'none';
        }

        const label = new CSS2DObject(labelDiv);
        label.position.set(0, normalizedSize / 2 + 0.8, 0);
        mesh.add(label);
      }
    }

    // Add grid helper
    const gridHelper = new THREE.GridHelper(100, 20, 0x444444, 0x222222);
    gridHelper.position.y = -20;
    this.scene.add(gridHelper);
  }


  /**
   * Calculate bounding box of all nodes
   */
  private calculateBoundingBox(nodes: LayoutNode[]): THREE.Box3 {
    const box = new THREE.Box3();
    for (const node of nodes) {
      box.expandByPoint(node.position);
    }
    return box;
  }

  /**
   * Auto-frame camera to fit entire tree
   */
  private autoFrameCamera(boundingBox: THREE.Box3) {
    // Get box center and size
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);

    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    // Calculate distance needed to fit everything in view
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = this.camera.fov * (Math.PI / 180);
    let cameraDistance = Math.abs(maxDim / Math.sin(fov / 2));

    // Add some padding (20%)
    cameraDistance *= 1.2;

    // Position camera at an angle for good perspective
    const angle = Math.PI / 4; // 45 degrees
    this.camera.position.set(
      center.x + cameraDistance * Math.cos(angle),
      center.y + cameraDistance * 0.5,
      center.z + cameraDistance * Math.sin(angle)
    );

    // Look at center
    this.camera.lookAt(center);
    this.controls.target.copy(center);
    this.controls.update();
  }

  /**
   * Visualize repository tree
   * @param resetCamera - Whether to auto-frame the camera (default: true)
   */
  visualize(tree: DirectoryNode, resetCamera: boolean = true) {
    // Clear any ghost files from previous commit (Timeline V2 deletions)
    this.clearGhosts();

    // Reset state when loading new repository
    this.focusedDirectory = null;
    this.collapsedDirs.clear();
    this.selectedObject = null;
    this.hoveredObjects.clear();

    // Calculate max LOC for normalization
    const maxFileLoc = this.findMaxLoc(tree);
    const maxDirLoc = this.findMaxDirectoryLoc(tree);

    // Layout the tree
    const rootPosition = new THREE.Vector3(0, 10, 0);
    this.layoutNodes = this.layoutTree(tree, rootPosition, 0, 0, Math.PI * 2);

    // Create visuals
    this.createVisuals(this.layoutNodes, maxFileLoc, maxDirLoc);

    // Auto-frame camera to show entire tree (only visible nodes)
    if (resetCamera) {
      const visibleNodes = this.layoutNodes.filter(ln => !this.isNodeHidden(ln));
      const boundingBox = this.calculateBoundingBox(visibleNodes);
      this.autoFrameCamera(boundingBox);
    }

    // Set controls target to root position (center of rotation)
    // Only reset target on initial load to preserve user's pan during timeline playback
    if (resetCamera) {
      this.controls.target.copy(rootPosition);
    }
    this.controls.update();
  }

  /**
   * Find maximum file LOC in tree (for file normalization)
   */
  private findMaxLoc(node: TreeNode): number {
    if (node.type === 'file') {
      return node.loc;
    }

    let max = 0;
    for (const child of node.children) {
      max = Math.max(max, this.findMaxLoc(child));
    }
    return max;
  }

  /**
   * Find maximum directory LOC in tree (for directory normalization)
   */
  private findMaxDirectoryLoc(node: TreeNode): number {
    if (node.type === 'file') {
      return 0;
    }

    // Get stats for this directory
    let stats = this.dirStats.get(node);
    if (!stats) {
      stats = this.calculateDirectoryStats(node);
      this.dirStats.set(node, stats);
    }

    let max = stats.totalLoc;

    // Check all child directories
    for (const child of node.children) {
      if (child.type === 'directory') {
        max = Math.max(max, this.findMaxDirectoryLoc(child));
      }
    }

    return max;
  }

  /**
   * Handle window resize
   */
  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * Handle mouse move for hover effects
   * Files: highlight file + all ancestors
   * Directories: highlight directory + all ancestors + all descendants
   */
  private onMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Check both files and directories
    const allObjects = [...Array.from(this.fileObjects.keys()), ...Array.from(this.dirObjects.keys())];
    const intersects = this.raycaster.intersectObjects(allObjects);

    // Reset previously hovered objects
    for (const mesh of this.hoveredObjects) {
      if (mesh !== this.selectedObject) {
        const mat = (mesh as THREE.Mesh).material as THREE.MeshPhongMaterial;
        const fileNode = this.fileObjects.get(mesh);
        const dirNode = this.dirObjects.get(mesh);

        // Reset to default emissive intensity
        if (fileNode) {
          mat.emissiveIntensity = 0.2;
        } else if (dirNode) {
          mat.emissiveIntensity = 0.3;
        }

        // Hide label if in hover mode
        if (this.labelMode === 'hover' && dirNode) {
          const label = mesh.children.find(child => child instanceof CSS2DObject) as CSS2DObject | undefined;
          if (label && label.element instanceof HTMLDivElement) {
            label.element.style.visibility = 'hidden';
            label.element.style.display = 'none';
          }
        }
      }
    }
    this.hoveredObjects.clear();

    // Highlight hovered and trigger callback
    if (intersects.length > 0) {
      const mesh = intersects[0].object as THREE.Mesh;
      const fileNode = this.fileObjects.get(mesh);
      const dirNode = this.dirObjects.get(mesh);
      const node = fileNode || dirNode;

      if (node) {
        // Find the layout node for this mesh
        const layoutNode = this.layoutNodes.find(ln => ln.mesh === mesh);

        if (layoutNode) {
          // Highlight ancestors (for both files and directories)
          let current: LayoutNode | undefined = layoutNode;
          while (current) {
            if (current.mesh && current.mesh !== this.selectedObject) {
              const mat = (current.mesh.material as THREE.MeshPhongMaterial);
              mat.emissiveIntensity = 0.6;
              this.hoveredObjects.add(current.mesh);

              // Show label if in hover mode
              if (this.labelMode === 'hover') {
                const label = current.mesh.children.find(child => child instanceof CSS2DObject) as CSS2DObject | undefined;
                if (label && label.element instanceof HTMLDivElement) {
                  label.element.style.visibility = 'visible';
                  label.element.style.display = 'block';
                }
              }
            }
            current = current.parent;
          }

          // If hovering a directory, also highlight all descendants
          if (dirNode) {
            this.highlightDescendants(layoutNode);
          }
        }

        // Trigger hover callback
        if (this.onHover) {
          this.onHover(node, event);
        }
      }
    } else if (this.onHover) {
      // No hover
      this.onHover(null);
    }
  }

  /**
   * Recursively highlight all descendants of a directory
   */
  private highlightDescendants(layoutNode: LayoutNode) {
    if (layoutNode.node.type === 'directory') {
      const dirNode = layoutNode.node;

      // Find all child layout nodes
      for (const child of dirNode.children) {
        const childLayout = this.layoutNodes.find(ln => ln.node === child);
        if (childLayout && childLayout.mesh && childLayout.mesh !== this.selectedObject) {
          const mat = (childLayout.mesh.material as THREE.MeshPhongMaterial);
          mat.emissiveIntensity = 0.6;
          this.hoveredObjects.add(childLayout.mesh);

          // Recursively highlight descendants
          if (child.type === 'directory') {
            this.highlightDescendants(childLayout);
          }
        }
      }
    }
  }

  /**
   * Handle click for selection
   * Directories: toggle focus (drill down/up)
   * Files: show details
   */
  private onClick(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Check both files and directories
    const allObjects = [...Array.from(this.fileObjects.keys()), ...Array.from(this.dirObjects.keys())];
    const intersects = this.raycaster.intersectObjects(allObjects);

    if (intersects.length > 0) {
      const mesh = intersects[0].object;
      const file = this.fileObjects.get(mesh);
      const dir = this.dirObjects.get(mesh);

      if (dir) {
        // Toggle focus: drill down into directory or back up to parent
        if (this.focusedDirectory === dir) {
          // Already focused - go back to parent or root view
          const layoutNode = this.layoutNodes.find(ln => ln.node === dir);
          if (layoutNode && layoutNode.parent && layoutNode.parent.node.type === 'directory') {
            this.focusedDirectory = layoutNode.parent.node;
          } else {
            // No parent directory, go to overview
            this.focusedDirectory = null;
          }
        } else {
          // Focus on this directory
          this.focusedDirectory = dir;
        }

        // Rebuild visualization with new focus
        this.rebuildVisualization();

        // Still call the callback
        if (this.onDirClick) {
          this.onDirClick(dir);
        }
      } else if (file) {
        // Deselect previous
        if (this.selectedObject) {
          const mat = (this.selectedObject as THREE.Mesh).material as THREE.MeshPhongMaterial;
          const prevFile = this.fileObjects.get(this.selectedObject);
          mat.emissiveIntensity = prevFile ? 0.2 : 0.3;
        }

        // Select new
        this.selectedObject = mesh;
        const mat = (mesh as THREE.Mesh).material as THREE.MeshPhongMaterial;
        mat.emissiveIntensity = 0.8;

        if (this.onFileClick) {
          this.onFileClick(file);
        }
      }
    }
  }

  /**
   * Rebuild visualization (used after collapse/expand or focus change)
   */
  private rebuildVisualization() {
    const maxFileLoc = this.findMaxLoc(this.layoutNodes[0].node);
    const maxDirLoc = this.findMaxDirectoryLoc(this.layoutNodes[0].node);
    this.createVisuals(this.layoutNodes, maxFileLoc, maxDirLoc);
  }

  /**
   * Move camera to focus on current view
   */
  private focusCamera() {
    if (this.focusedDirectory === null) {
      // Overview: show full tree
      const boundingBox = this.calculateBoundingBox(this.layoutNodes.filter(ln => !this.isNodeHidden(ln)));
      this.autoFrameCamera(boundingBox);
    } else {
      // Focused: zoom to focused directory
      const focusedLayout = this.layoutNodes.find(ln => ln.node === this.focusedDirectory);
      if (focusedLayout) {
        // Get visible children
        const visibleNodes = this.layoutNodes.filter(ln => !this.isNodeHidden(ln));
        const boundingBox = this.calculateBoundingBox(visibleNodes);
        this.autoFrameCamera(boundingBox);
      }
    }
  }

  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  /**
   * Start animation
   */
  start() {
    this.animate();
  }

  // ============================================================================
  // GHOST RENDERING FOR TIMELINE V2 DELETIONS
  // Isolated module for showing deleted files with red connections
  // TODO: Replace with proper incremental scene updates in future
  // ============================================================================

  /**
   * Find mesh by file/directory path
   * @param path - File or directory path to find
   * @returns Mesh if found, null otherwise
   */
  private findMeshByPath(path: string): THREE.Mesh | null {
    // Search in file objects
    for (const [mesh, fileNode] of this.fileObjects.entries()) {
      if (fileNode.path === path) {
        return mesh as THREE.Mesh;
      }
    }

    // Search in directory objects
    for (const [mesh, dirNode] of this.dirObjects.entries()) {
      if (dirNode.path === path) {
        return mesh as THREE.Mesh;
      }
    }

    return null;
  }

  /**
   * Clear all ghost meshes and edges from scene
   */
  private clearGhosts() {
    // Remove ghost meshes from scene and fileObjects map
    for (const mesh of this.ghostMeshes) {
      this.scene.remove(mesh);
      this.fileObjects.delete(mesh);
    }

    // Remove ghost edges from scene and edges array
    for (const edge of this.ghostEdges) {
      this.scene.remove(edge);
      const index = this.edges.indexOf(edge);
      if (index !== -1) {
        this.edges.splice(index, 1);
      }
      this.edgeNodeMap.delete(edge);
    }

    // Clear tracking sets
    this.ghostMeshes.clear();
    this.ghostEdges.clear();
  }

  /**
   * Calculate position for ghost file among siblings in radial layout
   * Places ghost at midpoint between two sibling files
   */
  private calculateGhostPosition(parentMesh: THREE.Mesh, parentDirNode: DirectoryNode): THREE.Vector3 {
    const parentPos = parentMesh.position;

    // Find first two sibling file meshes
    const siblingMeshes: THREE.Mesh[] = [];
    for (const child of parentDirNode.children) {
      if (child.type === 'file') {
        for (const [mesh, fileNode] of this.fileObjects.entries()) {
          if (fileNode.path === child.path) {
            siblingMeshes.push(mesh as THREE.Mesh);
            if (siblingMeshes.length === 2) break;
          }
        }
        if (siblingMeshes.length === 2) break;
      }
    }

    // No siblings: place at default position
    if (siblingMeshes.length === 0) {
      const defaultRadius = 10;
      const randomAngle = Math.random() * Math.PI * 2;
      return new THREE.Vector3(
        parentPos.x + defaultRadius * Math.cos(randomAngle),
        parentPos.y,
        parentPos.z + defaultRadius * Math.sin(randomAngle)
      );
    }

    // One sibling: place opposite side with same Y position
    if (siblingMeshes.length === 1) {
      const dx = siblingMeshes[0].position.x - parentPos.x;
      const dz = siblingMeshes[0].position.z - parentPos.z;
      const radius = Math.sqrt(dx * dx + dz * dz);
      const angle = Math.atan2(dz, dx);
      const oppositeAngle = angle + Math.PI;
      return new THREE.Vector3(
        parentPos.x + radius * Math.cos(oppositeAngle),
        siblingMeshes[0].position.y,  // Use same Y as sibling
        parentPos.z + radius * Math.sin(oppositeAngle)
      );
    }

    // Two+ siblings: place at midpoint angle with average Y position
    const dx1 = siblingMeshes[0].position.x - parentPos.x;
    const dz1 = siblingMeshes[0].position.z - parentPos.z;
    const angle1 = Math.atan2(dz1, dx1);
    const radius1 = Math.sqrt(dx1 * dx1 + dz1 * dz1);

    const dx2 = siblingMeshes[1].position.x - parentPos.x;
    const dz2 = siblingMeshes[1].position.z - parentPos.z;
    const angle2 = Math.atan2(dz2, dx2);
    const radius2 = Math.sqrt(dx2 * dx2 + dz2 * dz2);

    // Midpoint angle, average radius, and average Y position
    const midAngle = (angle1 + angle2) / 2;
    const avgRadius = (radius1 + radius2) / 2;
    const avgY = (siblingMeshes[0].position.y + siblingMeshes[1].position.y) / 2;

    return new THREE.Vector3(
      parentPos.x + avgRadius * Math.cos(midAngle),
      avgY,  // Use average Y of siblings
      parentPos.z + avgRadius * Math.sin(midAngle)
    );
  }

  /**
   * Render ghost files for deletions (Timeline V2 only)
   * @param deletedPaths - Paths of files being deleted
   * @param prevTree - Previous tree state (where files still exist)
   */
  private renderDeletionGhosts(deletedPaths: string[], prevTree: DirectoryNode) {
    for (const filePath of deletedPaths) {
      // Find the file in the previous tree to get metadata
      const fileNode = this.findFileInPrevTree(prevTree, filePath);
      if (!fileNode) {
        console.warn(`Ghost rendering: Could not find deleted file in prev tree: ${filePath}`);
        continue;
      }

      // Find parent directory mesh in CURRENT tree
      // If parent directory was also deleted, skip rendering ghost for this file
      const parentPath = filePath.substring(0, filePath.lastIndexOf('/'));
      let parentMesh: THREE.Mesh | null = null;

      if (parentPath) {
        // File in subdirectory - find parent by path in current tree
        parentMesh = this.findMeshByPath(parentPath);
        if (!parentMesh) {
          // Parent directory doesn't exist in current tree (was also deleted)
          // Skip ghost rendering - no place to attach it
          continue;
        }
      } else {
        // File at root level - find root directory mesh
        // Root directory is always the first directory in dirObjects with empty/root path
        for (const [mesh, dirNode] of this.dirObjects.entries()) {
          if (dirNode.path === '' || dirNode.name === 'root') {
            parentMesh = mesh as THREE.Mesh;
            break;
          }
        }
        if (!parentMesh) {
          // Should never happen - root always exists
          continue;
        }
      }

      // Position ghost naturally among sibling files using midpoint angle
      const parentDirNode = this.dirObjects.get(parentMesh) || prevTree;
      const ghostPosition = this.calculateGhostPosition(parentMesh, parentDirNode);

      // Create sphere with same size as regular files for visual consistency
      // Match the size calculation used in createVisuals() for regular files
      const sizeMultiplier = this.timelineMode !== 'off' ? 0.3 : 2;
      const minSize = this.timelineMode !== 'off' ? 0.3 : 0.3;
      const normalizedSize = Math.max(minSize, (fileNode.loc / 100) * sizeMultiplier);
      const geometry = new THREE.SphereGeometry(normalizedSize, 16, 16);

      // Use red color for deleted files (makes deletions visually obvious)
      const redColor = 0xe74c3c; // Matches red connection line color

      const material = new THREE.MeshPhongMaterial({
        color: redColor,
        emissive: redColor,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 1.0
      });

      const ghostMesh = new THREE.Mesh(geometry, material);
      ghostMesh.position.copy(ghostPosition);

      // Add to scene and tracking
      this.scene.add(ghostMesh);
      this.fileObjects.set(ghostMesh, fileNode);
      this.ghostMeshes.add(ghostMesh);

      // Create edge from parent to ghost (will be colored red by highlighting)
      const edgeGeometry = new THREE.BufferGeometry().setFromPoints([
        parentMesh.position,
        ghostPosition
      ]);
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: 0xaaaaaa,
        opacity: 0.15,
        transparent: true
      });
      const edge = new THREE.Line(edgeGeometry, edgeMaterial);

      this.scene.add(edge);
      this.edges.push(edge);
      this.edgeNodeMap.set(edge, {
        parent: this.dirObjects.get(parentMesh) || prevTree,
        child: fileNode
      });
      this.ghostEdges.add(edge);
    }
  }

  /**
   * Find file node in previous tree by path
   */
  private findFileInPrevTree(tree: DirectoryNode, targetPath: string): FileNode | null {
    const traverse = (node: TreeNode): FileNode | null => {
      if (node.type === 'file') {
        if (node.path === targetPath) {
          return node;
        }
        return null;
      } else if (node.type === 'directory' && node.children) {
        for (const child of node.children) {
          const result = traverse(child);
          if (result) return result;
        }
      }
      return null;
    };

    return traverse(tree);
  }

  /**
   * Public API: Render deleted files as ghosts (Timeline V2 only)
   * @param deletedPaths - Paths of files being deleted
   * @param prevTree - Previous tree state (where files still exist)
   */
  renderDeletedFiles(deletedPaths: string[], prevTree: DirectoryNode | null) {
    // Only render ghosts in Timeline V2 mode
    if (this.timelineMode !== 'v2') {
      return;
    }

    if (!prevTree || deletedPaths.length === 0) {
      return;
    }

    this.renderDeletionGhosts(deletedPaths, prevTree);
  }
}
