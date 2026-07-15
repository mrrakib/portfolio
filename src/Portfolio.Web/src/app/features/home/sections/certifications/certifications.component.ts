import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { Certification } from '../../../../core/models/certification.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, AnimateOnScrollDirective],
  template: `
    <section id="certifications" class="certifications section" aria-label="Certifications">
      <div class="container">
        <app-section-header title="Certifications" subtitle="Professional credentials and achievements" />
        @if (certifications().length) {
          <div class="certifications__grid" appAnimateOnScroll>
            @for (cert of certifications(); track cert.id) {
              <div class="certifications__card">
                @if (cert.logo_url) {
                  <img [src]="cert.logo_url" [alt]="cert.issuing_organization" class="certifications__logo" />
                }
                <div class="certifications__info">
                  <h3 class="certifications__name">{{ cert.name }}</h3>
                  <p class="certifications__org">{{ cert.issuing_organization }}</p>
                  <p class="certifications__date">
                    Issued {{ formatDate(cert.issue_date) }}
                    @if (cert.expiry_date) {
                      · Expires {{ formatDate(cert.expiry_date) }}
                    }
                  </p>
                  @if (cert.credential_id) {
                    <p class="certifications__credential">ID: {{ cert.credential_id }}</p>
                  }
                </div>
                @if (cert.credential_url) {
                  <a [href]="cert.credential_url" target="_blank" rel="noopener noreferrer" class="certifications__link">
                    Verify
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                }
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .certifications__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: var(--space-6);
    }

    .certifications__card {
      display: flex;
      gap: var(--space-4);
      padding: var(--space-6);
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
      position: relative;
    }

    .certifications__card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .certifications__logo {
      width: 48px;
      height: 48px;
      object-fit: contain;
      flex-shrink: 0;
      border-radius: var(--radius-md);
    }

    .certifications__info {
      flex: 1;
      min-width: 0;
    }

    .certifications__name {
      font-size: var(--text-base);
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--space-1);
    }

    .certifications__org {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      margin-bottom: var(--space-1);
    }

    .certifications__date {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    .certifications__credential {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      font-family: var(--font-mono);
      margin-top: var(--space-1);
    }

    .certifications__link {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-accent);
      text-decoration: none;
    }

    .certifications__link:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .certifications__grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class CertificationsComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly certifications = signal<Certification[]>([]);

  ngOnInit(): void {
    this.api.get<Certification[]>(API_ENDPOINTS.CERTIFICATIONS).then((data) => {
      this.certifications.set(data);
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}
