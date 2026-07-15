import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { Profile } from '../../../../core/models/profile.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, AnimateOnScrollDirective],
  template: `
    <section id="about" class="about section" aria-label="About me">
      <div class="container">
        <app-section-header title="About Me" subtitle="Get to know me and what I do" />
        @if (profile()) {
          <div class="about__content" appAnimateOnScroll>
            <div class="about__bio">
              <p class="about__text">{{ profile()!.bio }}</p>
            </div>
            <div class="about__details">
              @if (profile()!.location) {
                <div class="about__detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{{ profile()!.location }}</span>
                </div>
              }
              @if (profile()!.email) {
                <div class="about__detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a [href]="'mailto:' + profile()!.email">{{ profile()!.email }}</a>
                </div>
              }
              @if (profile()!.phone) {
                <div class="about__detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <a [href]="'tel:' + profile()!.phone">{{ profile()!.phone }}</a>
                </div>
              }
              @if (profile()!.resume_url) {
                <a [href]="profile()!.resume_url" class="about__resume-btn" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Resume
                </a>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .about__content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--space-12);
      align-items: start;
    }

    .about__text {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      line-height: var(--leading-relaxed);
      white-space: pre-line;
    }

    .about__details {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: var(--space-6);
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
    }

    .about__detail-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-size: var(--text-sm);
      color: var(--text-secondary);
    }

    .about__detail-item svg {
      flex-shrink: 0;
      color: var(--color-accent);
    }

    .about__detail-item a {
      color: var(--text-secondary);
      text-decoration: none;
    }

    .about__detail-item a:hover {
      color: var(--color-accent);
    }

    .about__resume-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-4);
      padding: var(--space-3) var(--space-6);
      background: var(--color-accent);
      color: #fff;
      font-weight: 600;
      font-size: var(--text-sm);
      border-radius: var(--radius-full);
      text-decoration: none;
      transition: background-color var(--transition-fast), transform var(--transition-fast);
    }

    .about__resume-btn:hover {
      background: var(--color-accent-hover);
      transform: translateY(-1px);
      color: #fff;
    }

    @media (max-width: 768px) {
      .about__content {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
    }
  `],
})
export class AboutComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly profile = signal<Profile | null>(null);

  ngOnInit(): void {
    this.api.get<Profile>(API_ENDPOINTS.PROFILE).then((data) => {
      this.profile.set(data);
    });
  }
}
