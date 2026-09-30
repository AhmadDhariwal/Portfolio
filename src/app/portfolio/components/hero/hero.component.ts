import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { heroStack, profile, socialLinks } from '../../shared/data/portfolio.data';
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
  readonly profile = profile;
  readonly heroStack = heroStack;
  readonly socialLinks = socialLinks;

  /**
   * When the user prefers reduced motion we skip the autoplaying background
   * video entirely (poster image is shown instead) and avoid downloading it.
   */
  readonly reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  muteVideo(event: Event): void {
    const video = event.target as HTMLVideoElement;
    video.muted = true;
    video.volume = 0;
  }
}
