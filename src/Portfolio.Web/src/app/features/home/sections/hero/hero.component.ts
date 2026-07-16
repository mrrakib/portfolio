import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { ApiService } from '../../../../core/services/api.service';
import { Profile } from '../../../../core/models/profile.model';
import { SocialLink } from '../../../../core/models/social-link.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { AssetUrlPipe } from '../../../../shared/pipes/asset-url.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, AssetUrlPipe],
  animations: [
    trigger('heroEntrance', [
      transition(':enter', [
        query('.hero__animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(150, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
  template: `
    <section id="hero" class="hero section" aria-label="Introduction">
      <div class="container hero__container">
        @if (profile()) {
          <div class="hero__content" [@heroEntrance]>
            <p class="hero__greeting hero__animate-item">Hello, I'm</p>
            <h1 class="hero__name hero__animate-item">{{ profile()!.full_name }}</h1>
            <h2 class="hero__title hero__animate-item">{{ profile()!.title }}</h2>
            @if (profile()!.tagline) {
              <p class="hero__tagline hero__animate-item">{{ profile()!.tagline }}</p>
            }
            <div class="hero__actions hero__animate-item">
              <a href="#contact" class="hero__btn hero__btn--primary">Get In Touch</a>
              <a href="#projects" class="hero__btn hero__btn--secondary">View Projects</a>
            </div>
            @if (socialLinks().length) {
              <div class="hero__social hero__animate-item">
                @for (link of socialLinks(); track link.id) {
                  <a
                    [href]="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hero__social-link"
                    [attr.aria-label]="link.platform"
                  >
                    <img [src]="link.icon | assetUrl" [alt]="link.platform" width="20" height="20" (error)="$any($event.target).style.display='none'" />
                  </a>
                }
              </div>
            }
          </div>
          <div class="hero__visual">
            @if (profile()?.avatar_url) {
              <div class="hero__avatar-wrapper hero__animate-item">
                <img [src]="profile()!.avatar_url" [alt]="profile()!.full_name" class="hero__avatar" />
              </div>
            }
          </div>
        } @else {
          <div class="hero__content">
            <app-skeleton variant="line" width="120px" height="20px" />
            <app-skeleton variant="line" width="320px" height="48px" />
            <app-skeleton variant="line" width="260px" height="32px" />
            <app-skeleton variant="line" width="200px" height="20px" />
          </div>
          <div class="hero__visual">
            <app-skeleton variant="circle" width="300px" height="300px" />
          </div>
        }
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
      margin-bottom: var(--space-3);
    }

    .hero__name {
      font-size: var(--text-4xl);
      font-weight: 800;
      margin-bottom: var(--space-3);
      line-height: var(--leading-tight);
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
      margin-bottom: var(--space-8);
      max-width: 500px;
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
      font-size: var(--text-base);
      border-radius: var(--radius-md);
      transition: transform var(--transition-fast), background-color var(--transition-fast), box-shadow var(--transition-fast);
    }

    .hero__btn:active {
      transform: scale(0.96);
    }

    .hero__btn--primary {
      background: var(--color-accent);
      color: #fff;
    }

    .hero__btn--primary:hover {
      background: var(--color-accent-hover);
      color: #fff;
      box-shadow: 0 4px 14px rgba(233, 69, 96, 0.4);
    }

    .hero__btn--secondary {
      border: 2px solid var(--surface-border);
      color: var(--text-primary);
    }

    .hero__btn--secondary:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .hero__social {
      display: flex;
      gap: var(--space-4);
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
      transform: translateY(-3px);
    }

    .hero__social-link:hover img {
      filter: brightness(0) invert(1);
    }

    .hero__visual {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hero__avatar-wrapper {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid var(--surface-border);
      box-shadow: var(--shadow-xl);
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
      0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-8px);
      }
      60% {
        transform: translateX(-50%) translateY(-4px);
      }
    }

    @media (max-width: 768px) {
      .hero__container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: var(--space-8);
      }

      .hero__visual {
        order: -1;
      }

      .hero__actions {
        justify-content: center;
      }

      .hero__social {
        justify-content: center;
      }

      .hero__name {
        font-size: var(--text-3xl);
      }

      .hero__title {
        font-size: var(--text-xl);
      }

      .hero__tagline {
        margin-inline: auto;
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
