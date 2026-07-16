import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';

export const routeFadeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({ position: 'absolute', width: '100%' }),
    ], { optional: true }),
    group([
      query(':leave', [
        animate('200ms ease', style({ opacity: 0 })),
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0 }),
        animate('200ms 200ms ease', style({ opacity: 1 })),
      ], { optional: true }),
    ]),
  ]),
]);
