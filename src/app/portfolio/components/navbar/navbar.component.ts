import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  NgZone,
  inject
} from '@angular/core';
import { navLinks, profile, socialLinks } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements AfterViewInit {
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly profile = profile;
  readonly navLinks = navLinks;
  readonly socialLinks = socialLinks.slice(0, 2);

  activeSection = 'home';
  menuOpen = false;
  scrolled = false;

  private ticking = false;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    // Scroll fires very frequently; handle it outside Angular and only run
    // change detection when the derived nav state actually changes.
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', this.onScroll);
    });
  }

  private readonly onScroll = (): void => {
    if (this.ticking) {
      return;
    }

    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      this.evaluateScrollState();
    });
  };

  private evaluateScrollState(): void {
    const scrolled = window.scrollY > 20;
    const activeSection = this.computeActiveSection();

    if (scrolled !== this.scrolled || activeSection !== this.activeSection) {
      this.scrolled = scrolled;
      this.activeSection = activeSection;
      this.ngZone.run(() => this.cdr.markForCheck());
    }
  }

  private computeActiveSection(): string {
    let current = this.activeSection;

    for (const link of this.navLinks) {
      const section = document.getElementById(link.id);
      if (section && section.offsetTop - 140 <= window.scrollY) {
        current = section.id;
      }
    }

    return current;
  }

  navigateTo(id: string): void {
    this.activeSection = id;
    this.menuOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
