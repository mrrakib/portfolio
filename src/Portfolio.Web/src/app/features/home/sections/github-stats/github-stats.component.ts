import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { GithubStats } from '../../../../core/models/github-stats.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-github-stats',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, AnimateOnScrollDirective, SkeletonComponent],
  template: `
    <section class="github section" aria-label="GitHub Activity">
      <div class="container">
        <app-section-header title="GitHub" subtitle="My open source contributions" />
        @if (stats()) {
          <div class="github__content" appAnimateOnScroll>
            <div class="github__overview">
              <div class="github__stat">
                <span class="github__stat-value">{{ stats()!.public_repos }}</span>
                <span class="github__stat-label">Repositories</span>
              </div>
              <div class="github__stat">
                <span class="github__stat-value">{{ stats()!.total_stars }}</span>
                <span class="github__stat-label">Stars Earned</span>
              </div>
              <div class="github__stat">
                <span class="github__stat-value">{{ stats()!.followers }}</span>
                <span class="github__stat-label">Followers</span>
              </div>
              <div class="github__stat">
                <span class="github__stat-value">{{ stats()!.following }}</span>
                <span class="github__stat-label">Following</span>
              </div>
            </div>
            @if (stats()!.top_repositories.length) {
              <div class="github__repos">
                <h3 class="github__repos-title">Top Repositories</h3>
                <div class="github__repos-grid">
                  @for (repo of stats()!.top_repositories; track repo.name) {
                    <a [href]="repo.url" target="_blank" rel="noopener noreferrer" class="github__repo-card" appAnimateOnScroll [animationDelay]="($index * 100) + 'ms'">
                      <h4 class="github__repo-name">{{ repo.name }}</h4>
                      @if (repo.description) {
                        <p class="github__repo-desc">{{ repo.description }}</p>
                      }
                      <div class="github__repo-meta">
                        @if (repo.language) {
                          <span class="github__repo-lang">
                            <span class="github__repo-lang-dot" [style.background]="getLanguageColor(repo.language)"></span>
                            {{ repo.language }}
                          </span>
                        }
                        @if (repo.stars) {
                          <span class="github__repo-stars">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            {{ repo.stars }}
                          </span>
                        }
                        @if (repo.forks) {
                          <span class="github__repo-forks">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <line x1="6" y1="3" x2="6" y2="15"/>
                              <circle cx="18" cy="6" r="3"/>
                              <circle cx="6" cy="18" r="3"/>
                              <path d="M18 9a9 9 0 0 1-9 9"/>
                            </svg>
                            {{ repo.forks }}
                          </span>
                        }
                      </div>
                    </a>
                  }
                </div>
              </div>
            }
            @if (stats()!.profile_url) {
              <div class="github__profile-link">
                <a [href]="stats()!.profile_url" target="_blank" rel="noopener noreferrer" class="github__view-profile">
                  View GitHub Profile
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
            }
          </div>
        } @else if (loading()) {
          <div class="github__content">
            <div class="github__overview">
              @for (i of [1, 2, 3, 4]; track i) {
                <app-skeleton variant="card" height="80px" />
              }
            </div>
            <div class="github__repos-grid">
              @for (i of [1, 2, 3, 4]; track i) {
                <app-skeleton variant="card" height="140px" />
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .github__overview {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);
      margin-bottom: var(--space-12);
    }

    .github__stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-6);
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
    }

    .github__stat-value {
      font-size: var(--text-2xl);
      font-weight: 800;
      color: var(--color-accent);
    }

    .github__stat-label {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      margin-top: var(--space-1);
    }

    .github__repos-title {
      font-size: var(--text-lg);
      font-weight: 700;
      margin-bottom: var(--space-6);
    }

    .github__repos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-4);
    }

    .github__repo-card {
      display: flex;
      flex-direction: column;
      padding: var(--space-6);
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
      text-decoration: none;
      transition: border-color var(--transition-fast), transform var(--transition-fast);
    }

    .github__repo-card:hover {
      border-color: var(--color-accent);
      transform: translateY(-2px);
    }

    .github__repo-name {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--color-accent);
      margin-bottom: var(--space-2);
    }

    .github__repo-desc {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: var(--leading-normal);
      margin-bottom: var(--space-4);
      flex: 1;
    }

    .github__repo-meta {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .github__repo-lang {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }

    .github__repo-lang-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .github__repo-stars,
    .github__repo-forks {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .github__profile-link {
      text-align: center;
      margin-top: var(--space-8);
    }

    .github__view-profile {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-3) var(--space-6);
      font-weight: 600;
      font-size: var(--text-sm);
      color: var(--text-primary);
      border: 2px solid var(--surface-border);
      border-radius: var(--radius-full);
      text-decoration: none;
      transition: border-color var(--transition-fast), color var(--transition-fast);
    }

    .github__view-profile:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    @media (max-width: 768px) {
      .github__overview {
        grid-template-columns: repeat(2, 1fr);
      }

      .github__repos-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class GithubStatsComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly stats = signal<GithubStats | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.api.get<GithubStats>(API_ENDPOINTS.GITHUB_STATS).then((data) => {
      this.stats.set(data);
    }).finally(() => this.loading.set(false));
  }

  getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'C#': '#178600',
      'Python': '#3572A5',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Java': '#b07219',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'PHP': '#4F5D95',
    };
    return colors[language] || '#8b949e';
  }
}
