import { IconName } from '../../shared/components/icon/icon.component';

export interface Memory {
  id: number;
  title: string;
  caption: string;
  /** Icon shown when no real image is provided. */
  icon: IconName;
  /** Optional image path under src/assets/images. */
  image?: string;
  /** Hex hint used for the placeholder gradient + glow. */
  hue: string;
  /** Spans for the masonry layout. */
  size: 'sm' | 'md' | 'lg' | 'wide' | 'tall';
}
