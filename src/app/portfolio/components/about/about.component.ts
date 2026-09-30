import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { aboutRows, profile, skills } from '../../shared/data/portfolio.data';
import { portfolioAssets } from '../../shared/data/portfolio.assets';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  readonly profile = profile;
  readonly aboutRows = aboutRows;
  readonly favoriteSkills = skills.slice(0, 5);
  readonly portraitSrcset = `${portfolioAssets.profilePhoto} 440w, ${portfolioAssets.profilePhoto2x} 720w`;
}
