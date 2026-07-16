import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
    @if (loadingService.isLoading()) {
      <div class="progress-bar" aria-hidden="true">
        <div class="progress-bar__fill"></div>
      </div>
    }
  `,
  styles: [`
    .progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      z-index: 9999;
      overflow: hidden;
    }

    .progress-bar__fill {
      height: 100%;
      background: linear-gradient(90deg, var(--color-accent), var(--color-royal));
      animation: progress 1.5s ease-in-out infinite;
    }

    @keyframes progress {
      0% {
        width: 0%;
        margin-left: 0%;
      }
      50% {
        width: 70%;
        margin-left: 15%;
      }
      100% {
        width: 0%;
        margin-left: 100%;
      }
    }
  `],
})
export class ProgressBarComponent {
  readonly loadingService = inject(LoadingService);
}
