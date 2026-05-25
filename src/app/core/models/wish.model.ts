import { IconName } from '../../shared/components/icon/icon.component';

export interface Wish {
  id: number;
  title: string;
  body: string;
  author: string;
  icon: IconName;
  /** UI tint applied to the card border / glow. */
  accent: 'pink' | 'purple' | 'gold' | 'blue' | 'rose';
}
