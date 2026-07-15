import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() animationClass = 'animate-visible';
  @Input() animationDelay = '0ms';
  @Input() animationThreshold = 0.2;

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.renderer.addClass(this.el.nativeElement, 'animate-hidden');

    if (this.animationDelay !== '0ms') {
      this.renderer.setStyle(this.el.nativeElement, 'transitionDelay', this.animationDelay);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.removeClass(this.el.nativeElement, 'animate-hidden');
            this.renderer.addClass(this.el.nativeElement, this.animationClass);
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: this.animationThreshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
