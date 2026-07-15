import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found section">
      <div class="container not-found__content">
        <h1 class="not-found__code">404</h1>
        <p class="not-found__message">Page not found</p>
        <a routerLink="/" class="not-found__link">Back to Home</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      gap: var(--space-4);
    }

    .not-found__code {
      font-size: 8rem;
      font-weight: 800;
      line-height: 1;
      background: linear-gradient(135deg, var(--color-accent), var(--color-royal));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .not-found__message {
      font-size: var(--text-xl);
      color: var(--text-secondary);
    }

    .not-found__link {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3) var(--space-6);
      background: var(--color-accent);
      color: #ffffff;
      font-weight: 600;
      border-radius: var(--radius-md);
      transition: background-color var(--transition-fast);
    }

    .not-found__link:hover {
      background: var(--color-accent-hover);
      color: #ffffff;
    }
  `],
})
export class NotFoundComponent {}
