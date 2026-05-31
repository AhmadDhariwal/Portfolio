import { Component } from '@angular/core';
import { PortfolioComponent } from './portfolio/portfolio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PortfolioComponent],
  template: '<app-portfolio></app-portfolio>'
})
export class AppComponent {}
