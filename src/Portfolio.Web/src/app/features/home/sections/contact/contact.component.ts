import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { ContactRequest } from '../../../../core/models/contact.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeaderComponent, AnimateOnScrollDirective],
  template: `
    <section id="contact" class="contact section" aria-label="Contact">
      <div class="container">
        <app-section-header title="Get In Touch" subtitle="Have a project in mind? Let's talk" />
        <div class="contact__content" appAnimateOnScroll>
          <form class="contact__form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
            <div class="contact__field">
              <label for="name" class="contact__label">Name *</label>
              <input
                id="name"
                type="text"
                class="contact__input"
                [(ngModel)]="form.name"
                name="name"
                required
                minlength="2"
                placeholder="Your full name"
                #nameField="ngModel"
              />
              @if (nameField.invalid && nameField.touched) {
                <span class="contact__error">Please enter your name</span>
              }
            </div>

            <div class="contact__field">
              <label for="email" class="contact__label">Email *</label>
              <input
                id="email"
                type="email"
                class="contact__input"
                [(ngModel)]="form.email"
                name="email"
                required
                email
                placeholder="your@email.com"
                #emailField="ngModel"
              />
              @if (emailField.invalid && emailField.touched) {
                <span class="contact__error">Please enter a valid email</span>
              }
            </div>

            <div class="contact__field">
              <label for="subject" class="contact__label">Subject</label>
              <input
                id="subject"
                type="text"
                class="contact__input"
                [(ngModel)]="form.subject"
                name="subject"
                placeholder="What's this about?"
              />
            </div>

            <div class="contact__field">
              <label for="message" class="contact__label">Message *</label>
              <textarea
                id="message"
                class="contact__input contact__textarea"
                [(ngModel)]="form.message"
                name="message"
                required
                minlength="10"
                placeholder="Your message..."
                rows="6"
                #messageField="ngModel"
              ></textarea>
              @if (messageField.invalid && messageField.touched) {
                <span class="contact__error">Please enter at least 10 characters</span>
              }
            </div>

            <!-- Honeypot -->
            <div class="contact__hp" aria-hidden="true">
              <input type="text" [(ngModel)]="form.honeypot" name="website" tabindex="-1" autocomplete="off" />
            </div>

            <button
              type="submit"
              class="contact__submit"
              [disabled]="contactForm.invalid || submitting()"
            >
              @if (submitting()) {
                Sending...
              } @else {
                Send Message
              }
            </button>

            @if (submitStatus() === 'success') {
              <p class="contact__success">Thank you! Your message has been sent successfully.</p>
            }
            @if (submitStatus() === 'error') {
              <p class="contact__error-msg">Something went wrong. Please try again later.</p>
            }
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact__content {
      max-width: 640px;
      margin-inline: auto;
    }

    .contact__form {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }

    .contact__field {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .contact__label {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text-primary);
    }

    .contact__input {
      width: 100%;
      padding: var(--space-3) var(--space-4);
      font-size: var(--text-base);
      color: var(--text-primary);
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-md);
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    }

    .contact__input:focus {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.1);
      outline: none;
    }

    .contact__textarea {
      resize: vertical;
      min-height: 150px;
    }

    .contact__hp {
      position: absolute;
      left: -9999px;
      opacity: 0;
      height: 0;
      overflow: hidden;
    }

    .contact__submit {
      align-self: flex-start;
      padding: var(--space-3) var(--space-8);
      background: var(--color-accent);
      color: #fff;
      font-weight: 600;
      font-size: var(--text-base);
      border: none;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: background-color var(--transition-fast), transform var(--transition-fast);
    }

    .contact__submit:hover:not(:disabled) {
      background: var(--color-accent-hover);
      transform: translateY(-1px);
    }

    .contact__submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .contact__error {
      font-size: var(--text-xs);
      color: var(--color-accent);
    }

    .contact__success {
      padding: var(--space-3) var(--space-4);
      background: rgba(46, 160, 67, 0.1);
      color: var(--color-success);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      font-weight: 500;
    }

    .contact__error-msg {
      padding: var(--space-3) var(--space-4);
      background: rgba(233, 69, 96, 0.1);
      color: var(--color-accent);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      font-weight: 500;
    }
  `],
})
export class ContactComponent {
  private readonly api = inject(ApiService);
  readonly submitting = signal(false);
  readonly submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  form: ContactRequest = {
    name: '',
    email: '',
    subject: null,
    message: '',
    honeypot: null,
  };

  async onSubmit(): Promise<void> {
    if (this.form.honeypot) return;

    this.submitting.set(true);
    this.submitStatus.set('idle');

    try {
      await this.api.post<void>(API_ENDPOINTS.CONTACT, this.form);
      this.submitStatus.set('success');
      this.form = { name: '', email: '', subject: null, message: '', honeypot: null };
    } catch {
      this.submitStatus.set('error');
    } finally {
      this.submitting.set(false);
    }
  }
}
