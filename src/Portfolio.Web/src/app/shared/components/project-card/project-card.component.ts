import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="project-card" [class.featured]="project.is_featured">
      <div class="project-card__image">
        @if (project.image_url) {
          <img [src]="project.image_url" [alt]="project.title" loading="lazy" />
        } @else {
          <div class="project-card__placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        }
        <div class="project-card__overlay">
          <a [routerLink]="['/projects', project.slug]" class="project-card__view-btn" aria-label="View project details">
            View Details
          </a>
        </div>
      </div>

      <div class="project-card__content">
        <h3 class="project-card__title">
          <a [routerLink]="['/projects', project.slug]">{{ project.title }}</a>
        </h3>
        @if (project.short_description) {
          <p class="project-card__desc">{{ project.short_description }}</p>
        }
        <div class="project-card__tech">
          @for (tech of project.technologies; track tech) {
            <span class="project-card__tag">{{ tech }}</span>
          }
        </div>
        <div class="project-card__links">
          @if (project.live_url) {
            <a [href]="project.live_url" target="_blank" rel="noopener noreferrer" class="project-card__link" aria-label="Live demo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live
            </a>
          }
          @if (project.github_url) {
            <a [href]="project.github_url" target="_blank" rel="noopener noreferrer" class="project-card__link" aria-label="Source code">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              Code
            </a>
          }
        </div>
      </div>
    </article>
  `,
  styles: [`
    .project-card {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: transform var(--transition-base), box-shadow var(--transition-base);
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .project-card.featured {
      border-color: var(--color-accent);
    }

    .project-card__image {
      position: relative;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      background: var(--surface-tertiary);
    }

    .project-card__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-slow);
    }

    .project-card:hover .project-card__image img {
      transform: scale(1.05);
    }

    .project-card__placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-tertiary);
    }

    .project-card__overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity var(--transition-base);
    }

    .project-card:hover .project-card__overlay {
      opacity: 1;
    }

    .project-card__view-btn {
      padding: var(--space-2) var(--space-6);
      background: var(--color-accent);
      color: #fff;
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: var(--text-sm);
      text-decoration: none;
      transition: background-color var(--transition-fast);
    }

    .project-card__view-btn:hover {
      background: var(--color-accent-hover);
      color: #fff;
    }

    .project-card__content {
      padding: var(--space-6);
    }

    .project-card__title {
      font-size: var(--text-lg);
      font-weight: 700;
      margin-bottom: var(--space-2);
    }

    .project-card__title a {
      color: var(--text-primary);
      text-decoration: none;
    }

    .project-card__title a:hover {
      color: var(--color-accent);
    }

    .project-card__desc {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: var(--leading-relaxed);
      margin-bottom: var(--space-4);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .project-card__tech {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
    }

    .project-card__tag {
      padding: var(--space-1) var(--space-2);
      font-size: var(--text-xs);
      font-weight: 500;
      color: var(--color-accent);
      background: rgba(233, 69, 96, 0.1);
      border-radius: var(--radius-sm);
    }

    .project-card__links {
      display: flex;
      gap: var(--space-4);
    }

    .project-card__link {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .project-card__link:hover {
      color: var(--color-accent);
    }
  `],
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
