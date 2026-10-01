import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  NgZone,
  ViewChild,
  effect,
  inject
} from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  templateUrl: './three-scene.component.html',
  styleUrl: './three-scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreeSceneComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) private readonly canvasRef?: ElementRef<HTMLCanvasElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);
  private readonly themeService = inject(ThemeService);
  private renderer?: import('three').WebGLRenderer;
  private sceneObjects?: {
    scene: import('three').Scene;
    camera: import('three').PerspectiveCamera;
    crystal: import('three').Mesh;
    crystalMaterial: import('three').MeshPhysicalMaterial;
    edges: import('three').LineSegments;
    ringOne: import('three').Mesh;
    ringTwo: import('three').Mesh;
    particles: import('three').Points;
    ambientLight: import('three').AmbientLight;
    pointLightA: import('three').PointLight;
    pointLightB: import('three').PointLight;
  };
  private animationFrameId = 0;
  private running = false;
  private isVisible = true;
  private reduceMotion = false;
  private intersectionObserver?: IntersectionObserver;
  private pointer = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };

  constructor() {
    effect(() => {
      const isDark = this.themeService.isDark();
      this.updateThemeVisuals(isDark);
      if (!this.running) {
        this.renderFrame();
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    this.reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!this.isWebglAvailable()) {
      // Leave the CSS glow (.scene::before) as a lightweight visual fallback.
      this.canvasRef?.nativeElement.classList.add('scene-fallback');
      return;
    }

    try {
      const THREE = await import('three');
      this.createScene(THREE);
    } catch {
      this.canvasRef?.nativeElement.classList.add('scene-fallback');
      return;
    }

    this.observeVisibility();

    if (this.reduceMotion) {
      // Render a single static frame instead of an ongoing animation loop.
      this.renderFrame();
    } else {
      this.startLoop();
    }
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (this.reduceMotion) {
      return;
    }

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
    if (!this.running) {
      // Keep the static/paused frame correct after a resize.
      this.renderFrame();
    }
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    this.updateRunState();
  }

  private isWebglAvailable(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  }

  private observeVisibility(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.isVisible = entries.some((entry) => entry.isIntersecting);
        this.updateRunState();
      },
      { threshold: 0.01 }
    );
    this.intersectionObserver.observe(canvas);
  }

  /** Runs only when the scene is on-screen, the tab is visible, and motion is allowed. */
  private updateRunState(): void {
    if (this.reduceMotion) {
      return;
    }

    const shouldRun =
      this.isVisible && (typeof document === 'undefined' || !document.hidden);

    if (shouldRun && !this.running) {
      this.startLoop();
    } else if (!shouldRun && this.running) {
      this.stopLoop();
    }
  }

  private createScene(THREE: typeof import('three')): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.35, 8.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    });
    renderer.setPixelRatio(this.getPixelRatio());
    renderer.setClearColor(0xf4f1ea, 0);

    const crystalGeometry = new THREE.IcosahedronGeometry(1.58, 1);
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc4af83,
      metalness: 0.28,
      roughness: 0.12,
      transmission: 0.65,
      thickness: 1.8,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.94
    });
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.rotation.set(0.55, 0.35, 0.18);

    const edgeGeometry = new THREE.EdgesGeometry(crystalGeometry);
    const edges = new THREE.LineSegments(
      edgeGeometry,
      new THREE.LineBasicMaterial({ color: 0x5f7f8d, transparent: true, opacity: 0.55 })
    );
    crystal.add(edges);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x86a7b6, transparent: true, opacity: 0.85 });
    const ringOne = new THREE.Mesh(new THREE.TorusGeometry(2.42, 0.023, 16, 160), ringMaterial);
    const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(2.08, 0.017, 16, 160), ringMaterial.clone());
    ringOne.rotation.set(1.08, 0.34, 0.18);
    ringTwo.rotation.set(1.34, -0.42, 0.52);

    // Reduce particle count on low-power / small-viewport devices.
    const particleCount = this.getParticleCount();
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
      new THREE.PointsMaterial({ color: 0xa9895d, size: 0.065, transparent: true, opacity: 0.75 })
    );

    const ambientLight = new THREE.AmbientLight(0xfffbf2, 2.2);
    const pointLightA = new THREE.PointLight(0xd8c7a3, 14, 20);
    const pointLightB = new THREE.PointLight(0x86a7b6, 12, 20);
    pointLightA.position.set(4, 4, 4);
    pointLightB.position.set(-4, -2, 3);

    scene.add(ambientLight, pointLightA, pointLightB, crystal, ringOne, ringTwo, particles);

    this.renderer = renderer;
    this.sceneObjects = {
      scene,
      camera,
      crystal,
      crystalMaterial,
      edges,
      ringOne,
      ringTwo,
      particles,
      ambientLight,
      pointLightA,
      pointLightB
    };
    this.updateThemeVisuals(this.themeService.isDark());
    this.resize();

    this.destroyRef.onDestroy(() => {
      this.stopLoop();
      this.intersectionObserver?.disconnect();
      renderer.dispose();
      crystalGeometry.dispose();
      crystalMaterial.dispose();
      edgeGeometry.dispose();
      (edges.material as import('three').Material).dispose();
      ringOne.geometry.dispose();
      ringTwo.geometry.dispose();
      ringMaterial.dispose();
      (ringTwo.material as import('three').Material).dispose();
      particleGeometry.dispose();
      (particles.material as import('three').Material).dispose();
    });
  }

  private updateThemeVisuals(isDark: boolean): void {
    if (!this.sceneObjects) {
      return;
    }

    const { ambientLight, pointLightA, pointLightB, crystalMaterial, edges, particles } =
      this.sceneObjects;

    if (isDark) {
      ambientLight.color.setHex(0xb7c6ff);
      ambientLight.intensity = 1.4;
      pointLightA.color.setHex(0x7dd3fc);
      pointLightA.intensity = 13;
      pointLightB.color.setHex(0xa855f7);
      pointLightB.intensity = 16;
      crystalMaterial.color.setHex(0xd8c7a3);
      crystalMaterial.metalness = 0.18;
      crystalMaterial.roughness = 0.1;
      crystalMaterial.transmission = 0;
      crystalMaterial.opacity = 0.86;
      (edges.material as import('three').LineBasicMaterial).color.setHex(0x7dd3fc);
      (particles.material as import('three').PointsMaterial).color.setHex(0xc4b5fd);
      (particles.material as import('three').PointsMaterial).opacity = 0.72;
    } else {
      ambientLight.color.setHex(0xfffbf2);
      ambientLight.intensity = 2.2;
      pointLightA.color.setHex(0xd8c7a3);
      pointLightA.intensity = 14;
      pointLightB.color.setHex(0x86a7b6);
      pointLightB.intensity = 12;
      crystalMaterial.color.setHex(0xc4af83);
      crystalMaterial.metalness = 0.28;
      crystalMaterial.roughness = 0.12;
      crystalMaterial.transmission = 0.65;
      crystalMaterial.thickness = 1.8;
      crystalMaterial.opacity = 0.94;
      (edges.material as import('three').LineBasicMaterial).color.setHex(0x5f7f8d);
      (particles.material as import('three').PointsMaterial).color.setHex(0xa9895d);
      (particles.material as import('three').PointsMaterial).opacity = 0.75;
    }
  }

  private getPixelRatio(): number {
    // Cap DPR aggressively; the crystal reads fine at 1.5 and saves GPU fill.
    return Math.min(window.devicePixelRatio || 1, 1.5);
  }

  private getParticleCount(): number {
    const smallViewport = window.innerWidth < 720;
    const lowConcurrency =
      typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4;
    return smallViewport || lowConcurrency ? 36 : 70;
  }

  private resize(): void {
    const canvas = this.canvasRef?.nativeElement;
    const parent = canvas?.parentElement;
    if (!canvas || !parent || !this.renderer || !this.sceneObjects) {
      return;
    }

    const width = parent.clientWidth;
    const height = parent.clientHeight;
    if (width === 0 || height === 0) {
      return;
    }

    this.sceneObjects.camera.aspect = width / height;
    this.sceneObjects.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private startLoop(): void {
    if (this.running || !this.renderer || !this.sceneObjects) {
      return;
    }

    this.running = true;
    this.ngZone.runOutsideAngular(() => {
      const frame = () => {
        if (!this.running || !this.renderer || !this.sceneObjects) {
          return;
        }

        this.pointer.x += (this.target.x - this.pointer.x) * 0.045;
        this.pointer.y += (this.target.y - this.pointer.y) * 0.045;

        const { crystal, ringOne, ringTwo, particles, camera } = this.sceneObjects;
        crystal.rotation.y += 0.006 + this.pointer.x * 0.01;
        crystal.rotation.x += 0.002 - this.pointer.y * 0.008;
        ringOne.rotation.z += 0.003;
        ringTwo.rotation.z -= 0.002;
        particles.rotation.y += 0.0008;

        camera.position.x = this.pointer.x * 1.2;
        camera.position.y = 0.35 - this.pointer.y;

        this.renderFrame();
        this.animationFrameId = requestAnimationFrame(frame);
      };

      this.animationFrameId = requestAnimationFrame(frame);
    });
  }

  private stopLoop(): void {
    this.running = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  private renderFrame(): void {
    if (!this.renderer || !this.sceneObjects) {
      return;
    }

    const { scene, camera } = this.sceneObjects;
    camera.lookAt(0, 0, 0);
    this.renderer.render(scene, camera);
  }
}
