import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('toggles the mobile menu open and closed', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;

    expect(component.menuOpen).toBe(false);
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);
    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
  });

  it('closes the menu on Escape', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;

    component.menuOpen = true;
    component.onEscape();
    expect(component.menuOpen).toBe(false);
  });

  it('closes the menu and marks the active section on navigate', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;

    component.menuOpen = true;
    component.navigateTo('projects');
    expect(component.menuOpen).toBe(false);
    expect(component.activeSection).toBe('projects');
  });
});
