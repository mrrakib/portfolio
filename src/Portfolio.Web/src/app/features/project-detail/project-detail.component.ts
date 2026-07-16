import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { ProjectDetail } from '../../core/models/project.model';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';
import { SeoService } from '../../core/services/seo.service';
import { AssetUrlPipe } from '../../shared/pipes/asset-url.pipe';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AssetUrlPipe],
  template: `
    @if (loading()) {
      <div class="project-detail section">
        <div class="container">
          <div class="project-detail__loading">Loading project...</div>
        </div>
      </div>
    } @else if (project()) {
      <article class="project-detail section">
        <div class="container">
          <a routerLink="/" fragment="projects" class="project-detail__back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Projects
          </a>

          @if (project()!.image_url) {
            <img [src]="project()!.image_url | assetUrl" [alt]="project()!.title" class="project-detail__image" (error)="$any($event.target).style.display='none'" />
          }

          <header class="project-detail__header">
            <h1 class="project-detail__title">{{ project()!.title }}</h1>
            @if (project()!.short_description) {
              <p class="project-detail__subtitle">{{ project()!.short_description }}</p>
            }
            <div class="project-detail__actions">
              @if (project()!.live_url) {
                <a [href]="project()!.live_url" target="_blank" rel="noopener noreferrer" class="project-detail__btn project-detail__btn--primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Live Demo
                </a>
              }
              @if (project()!.github_url) {
                <a [href]="project()!.github_url" target="_blank" rel="noopener noreferrer" class="project-detail__btn project-detail__btn--secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Source Code
                </a>
              }
            </div>
          </header>

          @if (project()!.technologies.length) {
            <div class="project-detail__tech">
              <h2 class="project-detail__tech-title">Technologies Used</h2>
              <div class="project-detail__tech-list">
                @for (tech of project()!.technologies; track tech) {
                  <span class="project-detail__tech-badge">{{ tech }}</span>
                }
              </div>
            </div>
          }

          @if (project()!.description) {
            <div class="project-detail__body">
              <p>{{ project()!.description }}</p>
            </div>
          }
        </div>
      </article>
    } @else {
      <div class="project-detail section">
        <div class="container">
          <div class="project-detail__not-found">
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist.</p>
            <a routerLink="/" class="project-detail__btn project-detail__btn--primary">Go Home</a>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .project-detail__loading,
    .project-detail__not-found {
      text-align: center;
      padding: var(--space-16) 0;
    }

    .project-detail__not-found h1 {
      font-size: var(--text-2xl);
      margin-bottom: var(--space-4);
    }

    .project-detail__not-found p {
      color: var(--text-secondary);
      margin-bottom: var(--space-8);
    }

    .project-detail__back {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      margin-bottom: var(--space-8);
      transition: color var(--transition-fast);
    }

    .project-detail__back:hover {
      color: var(--color-accent);
    }

    .project-detail__image {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      margin-bottom: var(--space-8);
    }

    .project-detail__header {
      margin-bottom: var(--space-8);
    }

    .project-detail__title {
      font-size: var(--text-3xl);
      font-weight: 800;
      margin-bottom: var(--space-2);
    }

    .project-detail__subtitle {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      margin-bottom: var(--space-6);
    }

    .project-detail__actions {
      display: flex;
      gap: var(--space-4);
    }

    .project-detail__btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3) var(--space-6);
      font-weight: 600;
      font-size: var(--text-sm);
      border-radius: var(--radius-full);
      text-decoration: none;
      transition: transform var(--transition-fast), background-color var(--transition-fast);
    }

    .project-detail__btn:hover {
      transform: translateY(-1px);
    }

    .project-detail__btn--primary {
      background: var(--color-accent);
      color: #fff;
    }

    .project-detail__btn--primary:hover {
      background: var(--color-accent-hover);
      color: #fff;
    }

    .project-detail__btn--secondary {
      background: var(--surface-secondary);
      color: var(--text-primary);
      border: 1px solid var(--surface-border);
    }

    .project-detail__btn--secondary:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .project-detail__tech {
      margin-bottom: var(--space-8);
      padding: var(--space-6);
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
    }

    .project-detail__tech-title {
      font-size: var(--text-base);
      font-weight: 700;
      margin-bottom: var(--space-4);
    }

    .project-detail__tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .project-detail__tech-badge {
      padding: var(--space-1) var(--space-3);
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-accent);
      background: rgba(233, 69, 96, 0.1);
      border-radius: var(--radius-full);
    }

    .project-detail__body {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      line-height: var(--leading-relaxed);
      white-space: pre-line;
    }
  `],
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiService);
  private readonly seo = inject(SeoService);

  readonly project = signal<ProjectDetail | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadProject(slug);
    } else {
      this.loading.set(false);
    }
  }

  private async loadProject(slug: string): Promise<void> {
    try {
      const project = await this.api.get<ProjectDetail>(API_ENDPOINTS.PROJECT_DETAIL(slug));
      this.project.set(project);
      this.seo.updateMeta({
        title: `${project.title} | Portfolio`,
        description: project.short_description || '',
      });
    } catch {
      this.project.set(null);
    } finally {
      this.loading.set(false);
    }
  }
}
