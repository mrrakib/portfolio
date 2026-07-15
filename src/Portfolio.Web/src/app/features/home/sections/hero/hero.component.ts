import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { Profile } from '../../../../core/models/profile.model';
import { SocialLink } from '../../../../core/models/social-link.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section id="hero" class="hero section" aria-label="Introduction">
      <div class="container hero__container">
        <div class="hero__content" appAnimateOnScroll>
          @if (profile()) {
            <p class="hero__greeting">Hello, I'm</p>
            <h1 class="hero__name">{{ profile()!.full_name }}</h1>
            <h2 class="hero__title">{{ profile()!.title }}</h2>
            @if (profile()!.tagline) {
              <p class="hero__tagline">{{ profile()!.tagline }}</p>
            }
            <div class="hero__actions">
              <a href="#contact" class="hero__btn hero__btn--primary">Get In Touch</a>
              <a href="#projects" class="hero__btn hero__btn--secondary">View Projects</a>
            </div>
            @if (socialLinks().length) {
              <div class="hero__social">
                @for (link of socialLinks(); track link.id) {
                  <a
                    [href]="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hero__social-link"
                    [attr.aria-label]="link.platform"
                  >
                    <img [src]="link.icon" [alt]="link.platform" width="20" height="20" />
                  </a>
                }
              </div>
            }
          }
        </div>
        <div class="hero__visual" appAnimateOnScroll animationDelay="200ms">
          @if (profile()?.avatar_url) {
            <div class="hero__avatar-wrapper">
              <img [src]="profile()!.avatar_url" [alt]="profile()!.full_name" class="hero__avatar" />
            </div>
          }
        </div>
      </div>
      <div class="hero__scroll-indicator" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      padding-top: 0;
    }

    .hero__container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: var(--space-16);
    }

    .hero__greeting {
      font-size: var(--text-lg);
      color: var(--color-accent);
      font-weight: 600;
      margin-bottom: var(--space-2);
    }

    .hero__name {
      font-size: var(--text-4xl);
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: var(--space-2);
      letter-spacing: -0.02em;
    }

    .hero__title {
      font-size: var(--text-2xl);
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: var(--space-4);
    }

    .hero__tagline {
      font-size: var(--text-lg);
      color: var(--text-tertiary);
      line-height: var(--leading-relaxed);
      max-width: 500px;
      margin-bottom: var(--space-8);
    }

    .hero__actions {
      display: flex;
      gap: var(--space-4);
      margin-bottom: var(--space-8);
    }

    .hero__btn {
      display: inline-flex;
      align-items: center;
      padding: var(--space-3) var(--space-6);
      font-weight: 600;
      font-size: var(--text-sm);
      border-radius: var(--radius-full);
      text-decoration: none;
      transition: transform var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
    }

    .hero__btn:hover {
      transform: translateY(-2px);
    }

    .hero__btn--primary {
      background: var(--color-accent);
      color: #fff;
      box-shadow: 0 4px 14px rgba(233, 69, 96, 0.4);
    }

    .hero__btn--primary:hover {
      background: var(--color-accent-hover);
      box-shadow: 0 6px 20px rgba(233, 69, 96, 0.5);
      color: #fff;
    }

    .hero__btn--secondary {
      background: transparent;
      color: var(--text-primary);
      border: 2px solid var(--surface-border);
    }

    .hero__btn--secondary:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .hero__social {
      display: flex;
      gap: var(--space-3);
    }

    .hero__social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--surface-secondary);
      transition: background-color var(--transition-fast), transform var(--transition-fast);
    }

    .hero__social-link:hover {
      background: var(--color-accent);
      transform: translateY(-2px);
    }

    .hero__social-link:hover img {
      filter: brightness(0) invert(1);
    }

    .hero__visual {
      display: flex;
      justify-content: center;
    }

    .hero__avatar-wrapper {
      width: 350px;
      height: 350px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid var(--color-accent);
      box-shadow: 0 0 0 8px rgba(233, 69, 96, 0.1), var(--shadow-xl);
    }

    .hero__avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero__scroll-indicator {
      position: absolute;
      bottom: var(--space-8);
      left: 50%;
      transform: translateX(-50%);
      color: var(--text-tertiary);
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
      40% { transform: translateX(-50%) translateY(-8px); }
      60% { transform: translateX(-50%) translateY(-4px); }
    }

    @media (max-width: 1024px) {
      .hero__container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: var(--space-8);
      }

      .hero__visual {
        order: -1;
      }

      .hero__tagline {
        margin-inline: auto;
      }

      .hero__actions {
        justify-content: center;
      }

      .hero__social {
        justify-content: center;
      }

      .hero__avatar-wrapper {
        width: 250px;
        height: 250px;
      }
    }

    @media (max-width: 480px) {
      .hero__name {
        font-size: var(--text-3xl);
      }

      .hero__title {
        font-size: var(--text-xl);
      }

      .hero__actions {
        flex-direction: column;
        align-items: center;
      }

      .hero__avatar-wrapper {
        width: 200px;
        height: 200px;
      }
    }
  `],
})
export class HeroComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly profile = signal<Profile | null>(null);
  readonly socialLinks = signal<SocialLink[]>([]);

  ngOnInit(): void {
    this.api.get<Profile>(API_ENDPOINTS.PROFILE).then((data) => {
      this.profile.set(data);
    });
    this.api.get<SocialLink[]>(API_ENDPOINTS.SOCIAL_LINKS).then((data) => {
      this.socialLinks.set(data);
    });
  }
}
