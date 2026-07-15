import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { SocialLink } from '../../core/models';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer__inner container">
        <div class="footer__top">
          <div class="footer__brand">
            <span class="footer__logo">RI</span>
            <p class="footer__tagline">Senior Full-Stack Developer</p>
          </div>
          @if (socialLinks.length > 0) {
            <div class="footer__social">
              @for (link of socialLinks; track link.id) {
                <a
                  class="footer__social-link"
                  [href]="link.url"
                  [attr.aria-label]="link.platform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ link.platform }}
                </a>
              }
            </div>
          }
        </div>
        <div class="footer__bottom">
          <p class="footer__copyright">
            &copy; {{ currentYear }} Rakibul Islam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--surface-secondary);
      border-top: 1px solid var(--surface-border);
      padding-block: var(--space-12);
      transition: background-color var(--transition-theme), border-color var(--transition-theme);
    }

    .footer__inner {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
    }

    .footer__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--space-6);
    }

    .footer__brand {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .footer__logo {
      font-size: var(--text-xl);
      font-weight: 800;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, var(--color-accent), var(--color-royal));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .footer__tagline {
      font-size: var(--text-sm);
      color: var(--text-secondary);
    }

    .footer__social {
      display: flex;
      gap: var(--space-4);
      flex-wrap: wrap;
    }

    .footer__social-link {
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .footer__social-link:hover {
      color: var(--color-accent);
    }

    .footer__bottom {
      padding-top: var(--space-6);
      border-top: 1px solid var(--surface-border);
    }

    .footer__copyright {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      text-align: center;
    }

    @media (max-width: 768px) {
      .footer__top {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `],
})
export class FooterComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  socialLinks: SocialLink[] = [];
  currentYear = new Date().getFullYear();

  async ngOnInit(): Promise<void> {
    try {
      this.socialLinks = await this.apiService.get<SocialLink[]>(API_ENDPOINTS.SOCIAL_LINKS);
    } catch {
      this.socialLinks = [];
    }
  }
}
