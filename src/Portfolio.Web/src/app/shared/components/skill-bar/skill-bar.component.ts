import { Component, Input } from '@angular/core';
import { AssetUrlPipe } from '../../pipes/asset-url.pipe';

@Component({
  selector: 'app-skill-bar',
  standalone: true,
  imports: [AssetUrlPipe],
  template: `
    <div class="skill-bar">
      <div class="skill-bar__header">
        <span class="skill-bar__name">
          @if (icon) {
            <img [src]="icon | assetUrl" [alt]="name" class="skill-bar__icon" (error)="icon = undefined" />
          }
          {{ name }}
        </span>
        <span class="skill-bar__level">{{ level }}%</span>
      </div>
      <div class="skill-bar__track" role="progressbar" [attr.aria-valuenow]="level" aria-valuemin="0" aria-valuemax="100" [attr.aria-label]="name + ' proficiency'">
        <div class="skill-bar__fill" [style.width.%]="visible ? level : 0"></div>
      </div>
    </div>
  `,
  styles: [`
    .skill-bar {
      margin-bottom: var(--space-4);
    }

    .skill-bar__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-2);
    }

    .skill-bar__name {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--text-primary);
    }

    .skill-bar__icon {
      width: 18px;
      height: 18px;
      object-fit: contain;
    }

    .skill-bar__level {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--text-tertiary);
    }

    .skill-bar__track {
      height: 8px;
      background: var(--surface-tertiary);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .skill-bar__fill {
      height: 100%;
      background: linear-gradient(90deg, var(--color-accent), var(--color-royal));
      border-radius: var(--radius-full);
      transition: width 0.8s ease-in-out;
    }
  `],
})
export class SkillBarComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) level!: number;
  @Input() icon?: string;
  @Input() visible = false;
}
