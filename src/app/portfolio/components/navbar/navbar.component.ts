import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { navLinks, profile, socialLinks } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly profile = profile;
  readonly navLinks = navLinks;
  readonly socialLinks = socialLinks.slice(0, 2);

  activeSection = 'home';
  menuOpen = false;
  scrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
    this.updateActiveSection();
  }

  navigateTo(id: string): void {
    this.activeSection = id;
    this.menuOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  private updateActiveSection(): void {
    const sections = this.navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));
    let current: HTMLElement | undefined;

    for (const section of sections) {
      if (section.offsetTop - 140 <= window.scrollY) {
        current = section;
      }
    }

    if (current) {
      this.activeSection = current.id;
    }
  }
}
