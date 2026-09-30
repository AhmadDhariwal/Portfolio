import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { stats } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-bar.component.html',
  styleUrl: './stats-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsBarComponent {
  readonly stats = stats;
}
