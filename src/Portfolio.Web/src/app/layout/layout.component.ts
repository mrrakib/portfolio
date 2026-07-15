import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <app-header />
    <main id="main-content" class="main">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    .main {
      min-height: 100vh;
      padding-top: var(--header-height);
    }
  `],
})
export class LayoutComponent {}
