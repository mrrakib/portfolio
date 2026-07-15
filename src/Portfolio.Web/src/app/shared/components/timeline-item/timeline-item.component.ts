import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="timeline-item">
      <div class="timeline-item__marker"></div>
      <div class="timeline-item__content">
        <div class="timeline-item__header">
          <div class="timeline-item__info">
            @if (logoUrl) {
              <img [src]="logoUrl" [alt]="organization" class="timeline-item__logo" loading="lazy" />
            }
            <div>
              <h3 class="timeline-item__title">{{ title }}</h3>
              <p class="timeline-item__org">
                @if (orgUrl) {
                  <a [href]="orgUrl" target="_blank" rel="noopener noreferrer">{{ organization }}</a>
                } @else {
                  {{ organization }}
                }
                @if (location) {
                  <span class="timeline-item__location">· {{ location }}</span>
                }
              </p>
            </div>
          </div>
          <span class="timeline-item__date">
            {{ startDate }}{{ endDate ? ' — ' + endDate : isCurrent ? ' — Present' : '' }}
          </span>
        </div>
        @if (description) {
          <p class="timeline-item__desc">{{ description }}</p>
        }
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .timeline-item {
      position: relative;
      padding-left: var(--space-8);
      padding-bottom: var(--space-8);
    }

    .timeline-item::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 20px;
      bottom: 0;
      width: 2px;
      background: var(--surface-border);
    }

    .timeline-item:last-child::before {
      display: none;
    }

    .timeline-item:last-child {
      padding-bottom: 0;
    }

    .timeline-item__marker {
      position: absolute;
      left: 0;
      top: 6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 3px solid var(--color-accent);
      background: var(--surface-bg);
    }

    .timeline-item__content {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      transition: box-shadow var(--transition-base);
    }

    .timeline-item__content:hover {
      box-shadow: var(--shadow-md);
    }

    .timeline-item__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--space-4);
      margin-bottom: var(--space-3);
    }

    .timeline-item__info {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .timeline-item__logo {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      object-fit: contain;
      background: var(--surface-secondary);
      padding: var(--space-1);
    }

    .timeline-item__title {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--text-primary);
    }

    .timeline-item__org {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      margin-top: var(--space-1);
    }

    .timeline-item__org a {
      color: var(--color-accent);
      text-decoration: none;
    }

    .timeline-item__org a:hover {
      text-decoration: underline;
    }

    .timeline-item__location {
      color: var(--text-tertiary);
    }

    .timeline-item__date {
      font-size: var(--text-xs);
      font-weight: 500;
      color: var(--text-tertiary);
      white-space: nowrap;
      padding: var(--space-1) var(--space-2);
      background: var(--surface-secondary);
      border-radius: var(--radius-sm);
    }

    .timeline-item__desc {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: var(--leading-relaxed);
      white-space: pre-line;
    }

    @media (max-width: 768px) {
      .timeline-item__header {
        flex-direction: column;
        gap: var(--space-2);
      }

      .timeline-item__date {
        align-self: flex-start;
      }
    }
  `],
})
export class TimelineItemComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) organization!: string;
  @Input({ required: true }) startDate!: string;
  @Input() endDate?: string;
  @Input() isCurrent = false;
  @Input() description?: string;
  @Input() logoUrl?: string;
  @Input() orgUrl?: string;
  @Input() location?: string;
}
