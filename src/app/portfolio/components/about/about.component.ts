import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { aboutRows, profile, skills } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  readonly profile = profile;
  readonly aboutRows = aboutRows;
  readonly favoriteSkills = skills.slice(0, 5);
}
