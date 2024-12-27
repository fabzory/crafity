import {
  animation,
  trigger,
  animateChild,
  group,
  transition,
  animate,
  style,
  query,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter', [style({ left: '-100%', position: 'relative' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [animate('400ms ease-out', style({ left: '100%', opacity: 0 }))],
        {
          optional: true,
        }
      ),
      query(':enter', [animate('600ms ease-out', style({ left: '0%' }))], {
        optional: true,
      }),
    ]),
  ]),
]);

export const routeAnimationsLeft = trigger('routeAnimationsLeft', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter', [style({ left: '100%', position: 'relative' })], {
      optional: true,
    }),
    query(
      ':leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [animate('400ms ease-out', style({ left: '-100%', opacity: 0 }))],
        {
          optional: true,
        }
      ),
      query(':enter', [animate('600ms ease-out', style({ left: '0%' }))], {
        optional: true,
      }),
    ]),
  ]),
]);
