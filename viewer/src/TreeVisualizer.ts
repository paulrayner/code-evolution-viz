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
  private labelMode: 'always' | 'hover' = 'always';
  private colorMode: ColorMode = 'fileType';
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
    console.log(`Setting label mode to: ${mode}`);
    this.labelMode = mode;

    // Update all existing labels
    const allLabels = this.labelRenderer.domElement.querySelectorAll('.dir-label');
    console.log(`Found ${allLabels.length} labels to update`);

    allLabels.forEach(labelDiv => {
      if (labelDiv instanceof HTMLDivElement) {
        if (mode === 'always') {
          labelDiv.style.visibility = 'visible';
          labelDiv.style.display = 'block';
        } else {
          labelDiv.style.visibility = 'hidden';
          labelDiv.style.display = 'none';
        }
      }
    });
  }

  /**
   * Set color mode and rebuild visualization
   */
  setColorMode(mode: ColorMode) {
    console.log(`Setting color mode to: ${mode}`);
    this.colorMode = mode;
    if (this.layoutNodes.length > 0) {
      this.rebuildVisualization();
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
      // No focus: show root + level 1 only
      const depth = this.getNodeDepth(layoutNode);
      return depth > 1;
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
    for (const layoutNode of layoutNodes) {
      // Skip edges if node or child is hidden
      if (this.isNodeHidden(layoutNode)) continue;

      if (layoutNode.node.type === 'directory') {
        const dirNode = layoutNode.node;
        for (const child of dirNode.children) {
          const childLayout = layoutNodes.find(ln => ln.node === child);
          if (childLayout && !this.isNodeHidden(childLayout)) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              layoutNode.position,
              childLayout.position
            ]);
            const material = new THREE.LineBasicMaterial({
              color: 0xaaaaaa,
              transparent: true,
              opacity: 0.6
            });
            const line = new THREE.Line(geometry, material);
            edgeGroup.add(line);
          }
        }
      }
    }
    this.scene.add(edgeGroup);

    // Create nodes
    for (const layoutNode of layoutNodes) {
      // Skip hidden nodes
      if (this.isNodeHidden(layoutNode)) continue;
      if (layoutNode.node.type === 'file') {
        const fileNode = layoutNode.node;

        // Scale based on LOC (normalized)
        const normalizedSize = Math.max(0.3, (fileNode.loc / maxFileLoc) * 2);

        // Color based on current mode
        const colorInfo = getColorForFile(fileNode, this.colorMode);
        const color = parseInt(colorInfo.hex.replace('#', ''), 16);

        const geometry = new THREE.SphereGeometry(normalizedSize, 16, 16);
        const material = new THREE.MeshPhongMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.2
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(layoutNode.position);

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
          opacity: 0.85
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(layoutNode.position);

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

        // Set initial visibility based on label mode
        if (this.labelMode === 'hover') {
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
   */
  visualize(tree: DirectoryNode) {
    console.log('Visualizing tree...');

    // Reset state when loading new repository
    this.focusedDirectory = null;
    this.collapsedDirs.clear();
    this.selectedObject = null;
    this.hoveredObjects.clear();

    // Calculate max LOC for normalization
    const maxFileLoc = this.findMaxLoc(tree);
    const maxDirLoc = this.findMaxDirectoryLoc(tree);
    console.log(`Max file LOC: ${maxFileLoc}, Max directory LOC: ${maxDirLoc}`);

    // Layout the tree
    const rootPosition = new THREE.Vector3(0, 10, 0);
    this.layoutNodes = this.layoutTree(tree, rootPosition, 0, 0, Math.PI * 2);
    console.log(`Laid out ${this.layoutNodes.length} nodes`);

    // Create visuals
    this.createVisuals(this.layoutNodes, maxFileLoc, maxDirLoc);

    // Auto-frame camera to show entire tree (only visible nodes)
    const visibleNodes = this.layoutNodes.filter(ln => !this.isNodeHidden(ln));
    const boundingBox = this.calculateBoundingBox(visibleNodes);
    this.autoFrameCamera(boundingBox);

    // Set controls target to root position (center of rotation)
    this.controls.target.copy(rootPosition);
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
}
