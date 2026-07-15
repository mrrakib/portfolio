import { Component, inject, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  template: `
    @if (visible()) {
      <button
        class="scroll-to-top"
        (click)="scrollToTop()"
        aria-label="Scroll to top"
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    }
  `,
  styles: [`
    .scroll-to-top {
      position: fixed;
      bottom: var(--space-8);
      right: var(--space-8);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      background: var(--color-accent);
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-lg);
      z-index: 50;
      transition: transform var(--transition-base), opacity var(--transition-base), background-color var(--transition-fast);
      animation: fadeInUp 0.3s ease-out;
    }

    .scroll-to-top:hover {
      background: var(--color-accent-hover);
      transform: translateY(-2px);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .scroll-to-top {
        bottom: var(--space-4);
        right: var(--space-4);
      }
    }
  `],
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly visible = signal(false);
  private scrollHandler?: () => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.scrollHandler = () => {
      this.visible.set(window.scrollY > 500);
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
