import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div
      class="skeleton"
      [class.skeleton--line]="variant === 'line'"
      [class.skeleton--circle]="variant === 'circle'"
      [class.skeleton--card]="variant === 'card'"
      [class.skeleton--bar]="variant === 'bar'"
      [style.width]="width"
      [style.height]="height"
      aria-hidden="true"
    ></div>
  `,
  styles: [`
    .skeleton {
      background: var(--surface-tertiary);
      border-radius: var(--radius-md);
      position: relative;
      overflow: hidden;
    }

    .skeleton::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.08) 50%,
        transparent 100%
      );
      animation: shimmer 1.5s infinite;
    }

    [data-theme='light'] .skeleton::after {
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.6) 50%,
        transparent 100%
      );
    }

    .skeleton--line {
      height: 16px;
      width: 100%;
    }

    .skeleton--circle {
      border-radius: 50%;
    }

    .skeleton--card {
      height: 200px;
      width: 100%;
      border-radius: var(--radius-lg);
    }

    .skeleton--bar {
      height: 8px;
      width: 100%;
      border-radius: var(--radius-full);
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `],
})
export class SkeletonComponent {
  @Input() variant: 'line' | 'circle' | 'card' | 'bar' = 'line';
  @Input() width = '100%';
  @Input() height?: string;
}
