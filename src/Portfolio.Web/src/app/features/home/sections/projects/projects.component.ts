import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { Project } from '../../../../core/models/project.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ProjectCardComponent } from '../../../../shared/components/project-card/project-card.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, ProjectCardComponent, AnimateOnScrollDirective],
  template: `
    <section id="projects" class="projects section" aria-label="Projects">
      <div class="container">
        <app-section-header title="Projects" subtitle="Some of the things I've built" />
        @if (projects().length) {
          <div class="projects__grid" appAnimateOnScroll>
            @for (project of projects(); track project.id) {
              <app-project-card [project]="project" />
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .projects__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: var(--space-8);
    }

    @media (max-width: 480px) {
      .projects__grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class ProjectsComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly projects = signal<Project[]>([]);

  ngOnInit(): void {
    this.api.get<Project[]>(API_ENDPOINTS.PROJECTS).then((data) => {
      this.projects.set(data);
    });
  }
}
