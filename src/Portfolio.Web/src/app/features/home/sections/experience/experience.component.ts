import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { Experience } from '../../../../core/models/experience.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { TimelineItemComponent } from '../../../../shared/components/timeline-item/timeline-item.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, TimelineItemComponent, AnimateOnScrollDirective],
  template: `
    <section id="experience" class="experience section" aria-label="Work Experience">
      <div class="container">
        <app-section-header title="Experience" subtitle="My professional journey" />
        @if (experiences().length) {
          <div class="experience__timeline" appAnimateOnScroll>
            @for (exp of experiences(); track exp.id) {
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
  `],
})
export class ExperienceComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly experiences = signal<Experience[]>([]);

  ngOnInit(): void {
    this.api.get<Experience[]>(API_ENDPOINTS.EXPERIENCE).then((data) => {
      this.experiences.set(data);
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}
