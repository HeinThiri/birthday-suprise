import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

export type IconName =
  | 'gift'
  | 'cake'
  | 'sparkle'
  | 'heart'
  | 'heart-filled'
  | 'envelope-heart'
  | 'sun'
  | 'moon'
  | 'music'
  | 'music-off'
  | 'lock'
  | 'wand'
  | 'fireworks'
  | 'balloon'
  | 'star'
  | 'plane'
  | 'map'
  | 'film'
  | 'handshake'
  | 'smile'
  | 'camera'
  | 'mail'
  | 'feather'
  | 'coffee'
  | 'wave'
  | 'mic'
  | 'car'
  | 'umbrella'
  | 'flower'
  | 'telescope'
  | 'sunrise'
  | 'medal'
  | 'ribbon'
  | 'confetti'
  | 'arrow-down'
  | 'arrow-up'
  | 'play'
  | 'pause'
  | 'rocket';

/**
 * Inline SVG icon set. Uses currentColor so it inherits the surrounding
 * text color. Sized via the `size` input (default 24).
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.component.html',
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }
    svg {
      width: var(--icon-size, 1em);
      height: var(--icon-size, 1em);
      stroke-width: 1.6;
    }
    .icon--filled { fill: currentColor; }
  `],
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 24;
  @Input() strokeWidth = 1.6;
}
