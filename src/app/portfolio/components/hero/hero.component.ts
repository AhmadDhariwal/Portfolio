import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { heroStack, profile, socialLinks } from '../../shared/data/portfolio.data';
import { ThemeService } from '../../shared/services/theme.service';
import { ThreeSceneComponent } from '../three-scene/three-scene.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ThreeSceneComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  private readonly themeService = inject(ThemeService);

  readonly profile = profile;
  readonly heroStack = heroStack;
  readonly socialLinks = socialLinks;

  readonly posterSrc = computed(() =>
    this.themeService.isDark()
      ? './images/hero/space-mountains-dark.svg'
      : './images/hero/space-mountains-light.svg'
  );

  /**
   * When the user prefers reduced motion we skip the autoplaying background
   * video entirely (poster image is shown instead) and avoid downloading it.
   */
  readonly reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Skip the 938 KB background video (show the poster instead) when it is least
   * worth its cost: reduced-motion, Data Saver, or a narrow/mobile viewport.
   * Uses capability checks rather than assuming "mobile = slow".
   */
  readonly skipHeroVideo = this.reduceMotion || this.isConstrainedConnection();

  private isConstrainedConnection(): boolean {
    if (typeof window === 'undefined') {
      return true;
    }

    const connection = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    if (connection?.saveData) {
      return true;
    }

    if (connection?.effectiveType && /2g/.test(connection.effectiveType)) {
      return true;
    }

    return window.innerWidth < 768;
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  muteVideo(event: Event): void {
    const video = event.target as HTMLVideoElement;
    video.muted = true;
    video.volume = 0;
  }
}
