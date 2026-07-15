import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <div class="section-header">
      <h2 class="section-header__title">{{ title }}</h2>
      @if (subtitle) {
        <p class="section-header__subtitle">{{ subtitle }}</p>
      }
    </div>
  `,
  styles: [`
    .section-header {
      text-align: center;
      margin-bottom: var(--space-12);
    }

    .section-header__title {
      font-size: var(--text-3xl);
      font-weight: 800;
      color: var(--text-primary);
      position: relative;
      display: inline-block;
    }

    .section-header__title::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: var(--color-accent);
      border-radius: var(--radius-full);
      margin: var(--space-3) auto 0;
    }

    .section-header__subtitle {
      margin-top: var(--space-4);
      font-size: var(--text-lg);
      color: var(--text-secondary);
      max-width: 600px;
      margin-inline: auto;
    }

    @media (max-width: 768px) {
      .section-header__title {
        font-size: var(--text-2xl);
      }

      .section-header__subtitle {
        font-size: var(--text-base);
      }
    }
  `],
})
export class SectionHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
}
