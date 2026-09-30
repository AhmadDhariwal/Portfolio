import { TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('filters projects by category and resets the active index', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    const c = fixture.componentInstance;

    c.setActive(2);
    c.setFilter('AI/ML');
    expect(c.activeIndex).toBe(0);
    expect(c.filteredProjects.every((p) => p.filters.includes('AI/ML'))).toBe(true);
  });

  it('wraps the active index forward and backward', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    const c = fixture.componentInstance;
    const total = c.filteredProjects.length;

    c.setActive(total - 1);
    c.nextProject();
    expect(c.activeIndex).toBe(0);

    c.previousProject();
    expect(c.activeIndex).toBe(total - 1);
  });

  it('marks the active card with the active stage class', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    const c = fixture.componentInstance;

    c.setActive(0);
    expect(c.getStageClass(0)).toContain('active');
  });

  it('pause/resume interaction toggles the interacting flag without error', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    const c = fixture.componentInstance;

    expect(() => {
      c.pauseRotation();
      c.resumeRotation();
    }).not.toThrow();
  });
});
