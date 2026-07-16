import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { Experience } from '../../../../core/models/experience.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { TimelineItemComponent } from '../../../../shared/components/timeline-item/timeline-item.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, TimelineItemComponent, AnimateOnScrollDirective, SkeletonComponent],
  template: `
    <section id="experience" class="experience section" aria-label="Work Experience">
      <div class="container">
        <app-section-header title="Experience" subtitle="My professional journey" />
        @if (experiences().length) {
          <div class="experience__timeline">
            @for (exp of experiences(); track exp.id) {
              <div appAnimateOnScroll [animationDelay]="($index * 150) + 'ms'">
                <app-timeline-item
                  [title]="exp.position"
                  [organization]="exp.company_name"
                  [startDate]="formatDate(exp.start_date)"
                  [endDate]="exp.end_date ? formatDate(exp.end_date) : undefined"
                  [isCurrent]="exp.is_current"
                  [description]="exp.description ?? undefined"
                  [logoUrl]="exp.company_logo_url ?? undefined"
                  [orgUrl]="exp.company_url ?? undefined"
                  [location]="exp.location ?? undefined"
                />
              </div>
            }
          </div>
        } @else if (loading()) {
          <div class="experience__timeline">
            @for (i of [1, 2, 3]; track i) {
              <div class="experience__skeleton-item">
                <app-skeleton variant="circle" width="48px" height="48px" />
                <div class="experience__skeleton-content">
                  <app-skeleton variant="line" width="200px" height="20px" />
                  <app-skeleton variant="line" width="150px" height="16px" />
                  <app-skeleton variant="line" width="100%" height="14px" />
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .experience__timeline {
      max-width: 800px;
      margin-inline: auto;
    }

    .experience__skeleton-item {
      display: flex;
      gap: var(--space-4);
      padding: var(--space-6) 0;
      border-bottom: 1px solid var(--surface-border);
    }

    .experience__skeleton-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
  `],
})
export class ExperienceComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly experiences = signal<Experience[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.api.get<Experience[]>(API_ENDPOINTS.EXPERIENCE).then((data) => {
      this.experiences.set(data);
    }).finally(() => this.loading.set(false));
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}
