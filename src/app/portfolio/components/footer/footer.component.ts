import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { navLinks, profile, socialLinks } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly profile = profile;
  readonly navLinks = navLinks;
  readonly socialLinks = socialLinks;

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
