import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

/** Page fade for router-outlet wrapper. */
export const routeFadeAnimation = trigger('routeFade', [
  transition('* <=> *', [
    query(':enter, :leave', [style({ position: 'absolute', inset: 0, width: '100%' })], {
      optional: true,
    }),
    query(':enter', [style({ opacity: 0, transform: 'translateY(16px) scale(0.99)' })], {
      optional: true,
    }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('400ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 0 }))],
        { optional: true },
      ),
      query(
        ':enter',
        [
          animate(
            '650ms cubic-bezier(0.16, 1, 0.3, 1)',
            style({ opacity: 1, transform: 'translateY(0) scale(1)' }),
          ),
        ],
        { optional: true },
      ),
    ]),
  ]),
]);

/** Reusable scroll-reveal trigger. */
export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(40px)' }),
    animate('800ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

/** Stagger children inside a list. */
export const staggerChildren = trigger('stagger', [
  transition(':enter', [
    query(
      '@fadeInUp',
      [style({ opacity: 0 }), animateChild()],
      { optional: true },
    ),
  ]),
]);
