import { IconName } from '../../shared/components/icon/icon.component';

export interface TimelineEntry {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: IconName;
  /** Side hint; for desktop alternating layout. */
  align?: 'left' | 'right';
}
