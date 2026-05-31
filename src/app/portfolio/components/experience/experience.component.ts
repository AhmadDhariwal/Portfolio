import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { profile, timeline } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  readonly timeline = timeline;
  readonly profile = profile;
}
