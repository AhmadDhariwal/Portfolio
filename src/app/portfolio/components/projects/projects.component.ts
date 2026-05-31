import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { projectFilters, projects } from '../../shared/data/portfolio.data';
import { Project, ProjectFilter } from '../../shared/models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private readonly destroyRef = inject(DestroyRef);
  private shuffleIntervalId?: number;

  readonly projectFilters = projectFilters;
  readonly projects = projects;
  selectedFilter: ProjectFilter = 'All';
  activeIndex = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.shuffleIntervalId = window.setInterval(() => this.shuffleProjects(), 6500);
      this.destroyRef.onDestroy(() => {
        if (this.shuffleIntervalId) {
          window.clearInterval(this.shuffleIntervalId);
        }
      });
    }
  }

  get filteredProjects(): Project[] {
    return this.selectedFilter === 'All'
      ? this.projects
      : this.projects.filter((project) => project.filters.includes(this.selectedFilter));
  }

  get activeProject(): Project {
    return this.filteredProjects[this.activeIndex] ?? this.filteredProjects[0] ?? this.projects[0];
  }

  get stagedProjects(): Project[] {
    return this.filteredProjects.slice(0, 5);
  }

  setFilter(filter: ProjectFilter): void {
    this.selectedFilter = filter;
    this.activeIndex = 0;
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

  shuffleProjects(): void {
    if (!this.filteredProjects.length) {
      return;
    }

    this.activeIndex = (this.activeIndex + 1) % this.filteredProjects.length;
  }

  previousProject(): void {
    if (!this.filteredProjects.length) {
      return;
    }

    this.activeIndex = (this.activeIndex - 1 + this.filteredProjects.length) % this.filteredProjects.length;
  }

  nextProject(): void {
    this.shuffleProjects();
  }

  getStageClass(index: number): string {
    const relativeIndex = index - this.activeIndex;

    if (relativeIndex === 0) {
      return 'stage-card active';
    }

    if (relativeIndex === -1 || relativeIndex === this.filteredProjects.length - 1) {
      return 'stage-card side left';
    }

    if (relativeIndex === 1 || relativeIndex === -(this.filteredProjects.length - 1)) {
      return 'stage-card side right';
    }

    return relativeIndex < 0 ? 'stage-card far left-far' : 'stage-card far right-far';
  }
}
