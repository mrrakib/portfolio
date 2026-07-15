import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { SkillCategory } from '../../../../core/models/skill.model';
import { API_ENDPOINTS } from '../../../../core/constants/api-endpoints';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { SkillBarComponent } from '../../../../shared/components/skill-bar/skill-bar.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionHeaderComponent, SkillBarComponent, AnimateOnScrollDirective],
  template: `
    <section id="skills" class="skills section" aria-label="Skills">
      <div class="container">
        <app-section-header title="Skills" subtitle="Technologies and tools I work with" />
        @if (categories().length) {
          <div class="skills__grid" appAnimateOnScroll>
            @for (category of categories(); track category.id) {
              <div class="skills__category" [style.transition-delay]="($index * 100) + 'ms'">
                <h3 class="skills__category-title">
                  @if (category.icon) {
                    <img [src]="category.icon" [alt]="category.name" class="skills__category-icon" />
                  }
                  {{ category.name }}
                </h3>
                <div class="skills__list">
                  @for (skill of category.skills; track skill.id) {
                    <app-skill-bar
                      [name]="skill.name"
                      [level]="skill.proficiency_level"
                      [icon]="skill.icon ?? undefined"
                      [visible]="visible()"
                    />
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .skills__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: var(--space-8);
    }

    .skills__category {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
    }

    .skills__category-title {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--space-6);
      padding-bottom: var(--space-3);
      border-bottom: 2px solid var(--surface-border);
    }

    .skills__category-icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    @media (max-width: 480px) {
      .skills__grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class SkillsComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly categories = signal<SkillCategory[]>([]);
  readonly visible = signal(false);

  ngOnInit(): void {
    this.api.get<SkillCategory[]>(API_ENDPOINTS.SKILLS).then((data) => {
      this.categories.set(data);
      setTimeout(() => this.visible.set(true), 100);
    });
  }
}
