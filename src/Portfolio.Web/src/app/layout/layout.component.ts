import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProgressBarComponent } from '../shared/components/progress-bar/progress-bar.component';
import { routeFadeAnimation } from '../core/animations/route.animation';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ProgressBarComponent],
  animations: [routeFadeAnimation],
  template: `
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <app-progress-bar />
    <app-header />
    <main id="main-content" class="main" [@routeAnimation]="getRouteAnimationData()">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    .main {
      min-height: 100vh;
      padding-top: var(--header-height);
      position: relative;
    }
  `],
})
export class LayoutComponent {
  private readonly contexts = inject(ChildrenOutletContexts);

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
