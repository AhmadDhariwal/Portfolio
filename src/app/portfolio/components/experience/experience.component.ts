import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { profile, timeline } from '../../shared/data/portfolio.data';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  private readonly themeService = inject(ThemeService);
  readonly timeline = timeline;
  readonly profile = profile;

  readonly educationVisualSrc = computed(() => {
    const isDark = this.themeService.isDark();
    const base = this.profile.educationVisual.src;
    return isDark
      ? base.replace(/(-dark|-light)?\.svg$/, '-dark.svg')
      : base.replace(/(-dark|-light)?\.svg$/, '-light.svg');
  });
}
