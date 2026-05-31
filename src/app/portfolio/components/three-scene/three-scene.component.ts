import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  NgZone,
  ViewChild,
  inject
} from '@angular/core';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  templateUrl: './three-scene.component.html',
  styleUrl: './three-scene.component.scss'
})
export class ThreeSceneComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) private readonly canvasRef?: ElementRef<HTMLCanvasElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);
  private renderer?: import('three').WebGLRenderer;
  private sceneObjects?: {
    scene: import('three').Scene;
    camera: import('three').PerspectiveCamera;
    crystal: import('three').Mesh;
    ringOne: import('three').Mesh;
    ringTwo: import('three').Mesh;
    particles: import('three').Points;
  };
  private animationFrameId = 0;
  private pointer = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };

  async ngAfterViewInit(): Promise<void> {
    const THREE = await import('three');
    this.createScene(THREE);
    this.animate();
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    this.target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.7;
    this.target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.5;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize();
  }

  private createScene(THREE: typeof import('three')): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.35, 8.2);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);

    const crystalGeometry = new THREE.IcosahedronGeometry(1.58, 1);
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd8c7a3,
      metalness: 0.18,
      roughness: 0.1,
      transmission: 0.84,
      thickness: 1.7,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.86
    });
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.rotation.set(0.55, 0.35, 0.18);

    const edgeGeometry = new THREE.EdgesGeometry(crystalGeometry);
    const edges = new THREE.LineSegments(
      edgeGeometry,
      new THREE.LineBasicMaterial({ color: 0x83d7ff, transparent: true, opacity: 0.8 })
    );
    crystal.add(edges);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x86a7b6, transparent: true, opacity: 0.72 });
    const ringOne = new THREE.Mesh(new THREE.TorusGeometry(2.42, 0.023, 16, 160), ringMaterial);
    const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(2.08, 0.017, 16, 160), ringMaterial.clone());
    ringOne.rotation.set(1.08, 0.34, 0.18);
    ringTwo.rotation.set(1.34, -0.42, 0.52);

    const particleCount = 70;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 9;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xc4b5fd, size: 0.065, transparent: true, opacity: 0.72 })
    );

    scene.add(
      new THREE.AmbientLight(0xb7c6ff, 1.4),
      new THREE.PointLight(0x7dd3fc, 13, 20),
      new THREE.PointLight(0xa855f7, 16, 20),
      crystal,
      ringOne,
      ringTwo,
      particles
    );
    scene.children[1].position.set(4, 4, 4);
    scene.children[2].position.set(-4, -2, 3);

    this.renderer = renderer;
    this.sceneObjects = { scene, camera, crystal, ringOne, ringTwo, particles };
    this.resize();

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.animationFrameId);
      renderer.dispose();
      crystalGeometry.dispose();
      crystalMaterial.dispose();
      edgeGeometry.dispose();
      ringOne.geometry.dispose();
      ringTwo.geometry.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
    });
  }

  private resize(): void {
    const canvas = this.canvasRef?.nativeElement;
    const parent = canvas?.parentElement;
    if (!canvas || !parent || !this.renderer || !this.sceneObjects) {
      return;
    }

    const width = parent.clientWidth;
    const height = parent.clientHeight;
    this.sceneObjects.camera.aspect = width / height;
    this.sceneObjects.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const frame = () => {
        if (!this.renderer || !this.sceneObjects) {
          return;
        }

        this.pointer.x += (this.target.x - this.pointer.x) * 0.045;
        this.pointer.y += (this.target.y - this.pointer.y) * 0.045;

        const { scene, camera, crystal, ringOne, ringTwo, particles } = this.sceneObjects;
        crystal.rotation.y += 0.006 + this.pointer.x * 0.01;
        crystal.rotation.x += 0.002 - this.pointer.y * 0.008;
        ringOne.rotation.z += 0.003;
        ringTwo.rotation.z -= 0.002;
        particles.rotation.y += 0.0008;

        camera.position.x = this.pointer.x * 1.2;
        camera.position.y = 0.35 - this.pointer.y;
        camera.lookAt(0, 0, 0);
        this.renderer.render(scene, camera);
        this.animationFrameId = requestAnimationFrame(frame);
      };

      frame();
    });
  }
}
