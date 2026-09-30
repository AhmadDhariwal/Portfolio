import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject
} from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { StatsBarComponent } from './components/stats-bar/stats-bar.component';
import { runPortfolioAnimations } from './shared/utils/animation.utils';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    StatsBarComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private cleanupAnimations?: () => void;

  ngAfterViewInit(): void {
    runPortfolioAnimations(this.host)
      .then((cleanup) => {
        this.cleanupAnimations = cleanup;
      })
      .catch(() => undefined);

    this.destroyRef.onDestroy(() => this.cleanupAnimations?.());
  }
}
