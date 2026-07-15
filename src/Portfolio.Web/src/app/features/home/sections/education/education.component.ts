import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { Education } from '../../../../core/models/education.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { TimelineItemComponent } from '../../../../shared/components/timeline-item/timeline-item.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, TimelineItemComponent, AnimateOnScrollDirective],
  template: `
    <section id="education" class="education section" aria-label="Education">
      <div class="container">
        <app-section-header title="Education" subtitle="My academic background" />
        @if (educations().length) {
          <div class="education__timeline" appAnimateOnScroll>
            @for (edu of educations(); track edu.id) {
              <app-timeline-item
                [title]="edu.degree + (edu.field_of_study ? ' in ' + edu.field_of_study : '')"
                [organization]="edu.institution"
                [startDate]="formatDate(edu.start_date)"
                [endDate]="edu.end_date ? formatDate(edu.end_date) : undefined"
                [description]="edu.description ?? undefined"
                [logoUrl]="edu.logo_url ?? undefined"
              />
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .education__timeline {
      max-width: 800px;
      margin-inline: auto;
    }
  `],
})
export class EducationComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly educations = signal<Education[]>([]);

  ngOnInit(): void {
    this.api.get<Education[]>(API_ENDPOINTS.EDUCATION).then((data) => {
      this.educations.set(data);
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}
