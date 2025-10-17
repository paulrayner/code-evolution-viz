import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DirectoryNode, FileNode, TreeNode } from './types';
import { getColorForExtension, DIRECTORY_COLOR } from './colorScheme';

interface LayoutNode {
  node: TreeNode;
  position: THREE.Vector3;
  mesh?: THREE.Mesh;
}

export class TreeVisualizer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private layoutNodes: LayoutNode[] = [];
  private fileObjects: Map<THREE.Object3D, FileNode> = new Map();
  private dirObjects: Map<THREE.Object3D, DirectoryNode> = new Map();
  private selectedObject: THREE.Object3D | null = null;
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
   * Layout tree nodes in 3D space
   * Uses a simple radial layout for directories and children
   */
  private layoutTree(node: DirectoryNode, position: THREE.Vector3, level: number, angleStart: number, angleEnd: number): LayoutNode[] {
    const nodes: LayoutNode[] = [];
    const radius = 10; // Distance from parent
    const verticalSpacing = 3;

    nodes.push({ node, position });

    if (node.children.length === 0) return nodes;

    const angleStep = (angleEnd - angleStart) / node.children.length;

    node.children.forEach((child, index) => {
      const angle = angleStart + angleStep * (index + 0.5);
      const childPosition = new THREE.Vector3(
        position.x + Math.cos(angle) * radius,
        position.y - verticalSpacing,
        position.z + Math.sin(angle) * radius
      );

      if (child.type === 'directory') {
        // Recursively layout subdirectories
        const childAngleStart = angle - angleStep / 2;
        const childAngleEnd = angle + angleStep / 2;
        const childNodes = this.layoutTree(child, childPosition, level + 1, childAngleStart, childAngleEnd);
        nodes.push(...childNodes);
      } else {
        // File node
        nodes.push({ node: child, position: childPosition });
      }
    });

    return nodes;
  }

  /**
   * Create visual representation of the tree
   */
  private createVisuals(layoutNodes: LayoutNode[], maxLoc: number) {
    // Clear existing objects
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
      if (layoutNode.node.type === 'directory') {
        const dirNode = layoutNode.node;
        for (const child of dirNode.children) {
          const childLayout = layoutNodes.find(ln => ln.node === child);
          if (childLayout) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              layoutNode.position,
              childLayout.position
            ]);
            const material = new THREE.LineBasicMaterial({
              color: 0x444444,
              transparent: true,
              opacity: 0.3
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
      if (layoutNode.node.type === 'file') {
        const fileNode = layoutNode.node;

        // Scale based on LOC (normalized)
        const normalizedSize = Math.max(0.3, (fileNode.loc / maxLoc) * 2);

        // Color based on extension
        const color = getColorForExtension(fileNode.extension).numeric;

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
        // Directory node - cube shape for distinction
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({
          color: DIRECTORY_COLOR.numeric,
          emissive: DIRECTORY_COLOR.numeric,
          emissiveIntensity: 0.2,
          transparent: true,
          opacity: 0.8
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(layoutNode.position);

        this.scene.add(mesh);
        this.dirObjects.set(mesh, layoutNode.node);
      }
    }

    // Add grid helper
    const gridHelper = new THREE.GridHelper(100, 20, 0x444444, 0x222222);
    gridHelper.position.y = -20;
    this.scene.add(gridHelper);
  }


  /**
   * Visualize repository tree
   */
  visualize(tree: DirectoryNode) {
    console.log('Visualizing tree...');

    // Calculate max LOC for normalization
    const maxLoc = this.findMaxLoc(tree);
    console.log(`Max LOC: ${maxLoc}`);

    // Layout the tree
    const rootPosition = new THREE.Vector3(0, 10, 0);
    this.layoutNodes = this.layoutTree(tree, rootPosition, 0, 0, Math.PI * 2);
    console.log(`Laid out ${this.layoutNodes.length} nodes`);

    // Create visuals
    this.createVisuals(this.layoutNodes, maxLoc);

    // Center camera on the tree
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  /**
   * Find maximum LOC in tree (for normalization)
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
   * Handle window resize
   */
  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * Handle mouse move for hover effects
   */
  private onMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Check both files and directories
    const allObjects = [...Array.from(this.fileObjects.keys()), ...Array.from(this.dirObjects.keys())];
    const intersects = this.raycaster.intersectObjects(allObjects);

    // Reset all materials
    for (const [mesh] of this.fileObjects) {
      if (mesh !== this.selectedObject) {
        (mesh as THREE.Mesh).material = (mesh as THREE.Mesh).material;
      }
    }
    for (const [mesh] of this.dirObjects) {
      if (mesh !== this.selectedObject) {
        (mesh as THREE.Mesh).material = (mesh as THREE.Mesh).material;
      }
    }

    // Highlight hovered and trigger callback
    if (intersects.length > 0) {
      const mesh = intersects[0].object as THREE.Mesh;
      if (mesh !== this.selectedObject) {
        (mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.5;
      }

      // Trigger hover callback with node info
      const fileNode = this.fileObjects.get(mesh);
      const dirNode = this.dirObjects.get(mesh);
      const node = fileNode || dirNode;

      if (node && this.onHover) {
        this.onHover(node, event);
      }
    } else if (this.onHover) {
      // No hover
      this.onHover(null);
    }
  }

  /**
   * Handle click for selection
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

      // Deselect previous
      if (this.selectedObject) {
        const mat = (this.selectedObject as THREE.Mesh).material as THREE.MeshPhongMaterial;
        mat.emissiveIntensity = 0.2;
      }

      // Select new
      this.selectedObject = mesh;
      const mat = (mesh as THREE.Mesh).material as THREE.MeshPhongMaterial;
      mat.emissiveIntensity = 0.8;

      if (file && this.onFileClick) {
        this.onFileClick(file);
      } else if (dir && this.onDirClick) {
        this.onDirClick(dir);
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
  }

  /**
   * Start animation
   */
  start() {
    this.animate();
  }
}
