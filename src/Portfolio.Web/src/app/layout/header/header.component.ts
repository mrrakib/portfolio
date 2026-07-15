import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../core/services/scroll.service';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { NAV_SECTIONS } from '../../core/constants/app.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <nav class="header__nav container" aria-label="Main navigation">
        <a class="header__logo" href="#hero" (click)="onNavClick($event, 'hero')">
          <span class="header__logo-text">RI</span>
        </a>

        <ul class="header__links" [class.open]="mobileMenuOpen()">
          @for (section of navSections; track section.id) {
            <li>
              <a
                class="header__link"
                [class.active]="activeSection() === section.id"
                [href]="'#' + section.id"
                (click)="onNavClick($event, section.id)"
              >
                {{ section.label }}
              </a>
            </li>
          }
        </ul>

        <div class="header__actions">
          <app-theme-toggle />
          <button
            class="header__hamburger"
            [class.open]="mobileMenuOpen()"
            (click)="toggleMobileMenu($event)"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-label="Toggle navigation menu"
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div
        class="header__overlay"
        [class.open]="mobileMenuOpen()"
        (click)="closeMobileMenu()"
      ></div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      height: var(--header-height);
      background: transparent;
      transition: background-color var(--transition-slow), box-shadow var(--transition-slow);
    }

    .header.scrolled {
      background: var(--surface-bg);
      box-shadow: var(--shadow-sm);
      backdrop-filter: blur(10px);
    }

    [data-theme='dark'] .header.scrolled {
      background: rgba(13, 17, 23, 0.9);
    }

    [data-theme='light'] .header.scrolled {
      background: rgba(255, 255, 255, 0.9);
    }

    .header__nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .header__logo {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      text-decoration: none;
      color: var(--text-primary);
    }

    .header__logo-text {
      font-size: var(--text-xl);
      font-weight: 800;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, var(--color-accent), var(--color-royal));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header__links {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }

    .header__link {
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: var(--radius-md);
      transition: color var(--transition-fast), background-color var(--transition-fast);
    }

    .header__link:hover,
    .header__link.active {
      color: var(--text-primary);
      background: var(--surface-tertiary);
    }

    .header__link.active {
      color: var(--color-accent);
    }

    .header__actions {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .header__hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: var(--radius-md);
      background: transparent;
      cursor: pointer;
      gap: 5px;
      padding: 0;
    }

    .header__hamburger span {
      display: block;
      width: 20px;
      height: 2px;
      background: var(--text-primary);
      border-radius: 1px;
      transition: transform var(--transition-slow), opacity var(--transition-slow);
    }

    .header__hamburger.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .header__hamburger.open span:nth-child(2) {
      opacity: 0;
    }

    .header__hamburger.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    .header__overlay {
      display: none;
    }

    @media (max-width: 768px) {
      .header__hamburger {
        display: flex;
      }

      .header__links {
        position: fixed;
        top: var(--header-height);
        right: 0;
        bottom: 0;
        width: 280px;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
        padding: var(--space-4);
        background: var(--surface-bg);
        box-shadow: var(--shadow-xl);
        transform: translateX(100%);
        transition: transform var(--transition-slow);
        overflow-y: auto;
      }

      .header__links.open {
        transform: translateX(0);
      }

      .header__link {
        width: 100%;
        padding: var(--space-3) var(--space-4);
        font-size: var(--text-base);
      }

      .header__overlay {
        display: block;
        position: fixed;
        inset: 0;
        top: var(--header-height);
        background: rgba(0, 0, 0, 0.5);
        z-index: -1;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity var(--transition-slow), visibility var(--transition-slow);
      }

      .header__overlay.open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
    }
  `],
})
export class HeaderComponent {
  private readonly scrollService = inject(ScrollService);

  readonly navSections = NAV_SECTIONS;
  readonly mobileMenuOpen = signal(false);
  readonly activeSection = this.scrollService.activeSection;
  readonly isScrolled = computed(() => this.scrollService.scrollY() > 50);

  onNavClick(event: Event, sectionId: string): void {
    event.preventDefault();
    this.scrollService.scrollToSection(sectionId);
    this.closeMobileMenu();
  }

  toggleMobileMenu(event: Event): void {
    event.stopPropagation();
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
