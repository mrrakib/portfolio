import { Injectable, signal, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);

  readonly scrollY = signal(0);
  readonly activeSection = signal('hero');

  constructor() {
    if (this.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        window.addEventListener('scroll', () => {
          this.scrollY.set(window.scrollY);
        }, { passive: true });
      });
    }
  }

  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;

    const element = this.document.getElementById(sectionId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - APP_CONSTANTS.SCROLL_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
