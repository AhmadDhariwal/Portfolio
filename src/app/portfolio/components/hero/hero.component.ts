import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { heroStack, profile, socialLinks } from '../../shared/data/portfolio.data';
import { ThreeSceneComponent } from '../three-scene/three-scene.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ThreeSceneComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  readonly profile = profile;
  readonly heroStack = heroStack;
  readonly socialLinks = socialLinks;

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  muteVideo(event: Event): void {
    const video = event.target as HTMLVideoElement;
    video.muted = true;
    video.volume = 0;
  }
}
