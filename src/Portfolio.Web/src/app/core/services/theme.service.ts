import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { APP_CONSTANTS } from '../constants/app.constants';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const current = this.theme();
      if (this.isBrowser) {
        document.documentElement.setAttribute('data-theme', current);
        localStorage.setItem(APP_CONSTANTS.THEME_STORAGE_KEY, current);
      }
    });

    if (this.isBrowser) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const stored = localStorage.getItem(APP_CONSTANTS.THEME_STORAGE_KEY);
        if (!stored) {
          this.theme.set(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  toggle(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) return 'dark';

    const stored = localStorage.getItem(APP_CONSTANTS.THEME_STORAGE_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
