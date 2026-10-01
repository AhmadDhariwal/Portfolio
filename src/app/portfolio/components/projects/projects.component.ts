import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  computed,
  inject,
  signal
} from '@angular/core';
import { projectFilters, projects } from '../../shared/data/portfolio.data';
import { Project, ProjectFilter } from '../../shared/models/portfolio.models';
import { ThemeService } from '../../shared/services/theme.service';

const ROTATE_INTERVAL_MS = 6500;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly host = inject(ElementRef<HTMLElement>);
  readonly themeService = inject(ThemeService);

  private rotateTimerId?: number;
  private isVisible = false;
  private isInteracting = false;
  private readonly reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  readonly projectFilters = projectFilters;
  readonly projects = projects;

  private readonly selectedFilterSignal = signal<ProjectFilter>('All');
  private readonly activeIndexSignal = signal<number>(0);

  readonly filteredProjectsSignal = computed<Project[]>(() => {
    const filter = this.selectedFilterSignal();
    return filter === 'All'
      ? this.projects
      : this.projects.filter((project) => project.filters.includes(filter));
  });

  get selectedFilter(): ProjectFilter {
    return this.selectedFilterSignal();
  }

  get activeIndex(): number {
    return this.activeIndexSignal();
  }

  get filteredProjects(): Project[] {
    return this.filteredProjectsSignal();
  }

  get activeProject(): Project {
    const list = this.filteredProjectsSignal();
    return list[this.activeIndexSignal()] ?? list[0] ?? this.projects[0];
  }

  get stagedProjects(): Project[] {
    return this.filteredProjectsSignal().slice(0, 5);
  }

  getProjectImage(src: string): string {
    if (!src.endsWith('.svg')) {
      return src;
    }
    const isDark = this.themeService.isDark();
    const themeSuffix = isDark ? '-dark.svg' : '-light.svg';
    return src.replace(/(-dark|-light)?\.svg$/, themeSuffix);
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || this.reduceMotion) {
      return;
    }

    // Only auto-rotate while the carousel is on screen and the tab is visible,
    // and drive the timer outside Angular so idle ticks don't run change detection.
    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              this.isVisible = entries.some((entry) => entry.isIntersecting);
              this.syncTimer();
            },
            { threshold: 0.2 }
          )
        : undefined;

    observer?.observe(this.host.nativeElement);
    if (!observer) {
      this.isVisible = true;
      this.syncTimer();
    }

    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.destroyRef.onDestroy(() => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
      this.stopTimer();
    });
  }

  private readonly onVisibilityChange = (): void => this.syncTimer();

  private syncTimer(): void {
    const shouldRun =
      this.isVisible && !this.isInteracting && !document.hidden && !this.reduceMotion;

    if (shouldRun) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  private startTimer(): void {
    if (this.rotateTimerId !== undefined) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.rotateTimerId = window.setInterval(() => {
        this.ngZone.run(() => this.shuffleProjects());
      }, ROTATE_INTERVAL_MS);
    });
  }

  private stopTimer(): void {
    if (this.rotateTimerId !== undefined) {
      window.clearInterval(this.rotateTimerId);
      this.rotateTimerId = undefined;
    }
  }

  /** Pause auto-rotation while the user is hovering/focusing the carousel. */
  pauseRotation(): void {
    this.isInteracting = true;
    this.syncTimer();
  }

  resumeRotation(): void {
    this.isInteracting = false;
    this.syncTimer();
  }

  setFilter(filter: ProjectFilter): void {
    this.selectedFilterSignal.set(filter);
    this.activeIndexSignal.set(0);
    this.cdr.markForCheck();
  }

  setActive(index: number): void {
    this.activeIndexSignal.set(index);
    this.cdr.markForCheck();
  }

  shuffleProjects(): void {
    const total = this.filteredProjectsSignal().length;
    if (!total) {
      return;
    }

    this.activeIndexSignal.update((idx) => (idx + 1) % total);
    this.cdr.markForCheck();
  }

  previousProject(): void {
    const total = this.filteredProjectsSignal().length;
    if (!total) {
      return;
    }

    this.activeIndexSignal.update((idx) => (idx - 1 + total) % total);
    this.cdr.markForCheck();
  }

  nextProject(): void {
    this.shuffleProjects();
  }

  getStageClass(index: number): string {
    const active = this.activeIndexSignal();
    const total = this.filteredProjectsSignal().length;
    const relativeIndex = index - active;

    if (relativeIndex === 0) {
      return 'stage-card active';
    }

    if (relativeIndex === -1 || relativeIndex === total - 1) {
      return 'stage-card side left';
    }

    if (relativeIndex === 1 || relativeIndex === -(total - 1)) {
      return 'stage-card side right';
    }

    return relativeIndex < 0 ? 'stage-card far left-far' : 'stage-card far right-far';
  }
}
