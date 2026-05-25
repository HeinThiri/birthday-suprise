import { IconName } from '../../shared/components/icon/icon.component';

export interface BirthdayConfig {
  /** The friend's display name — used throughout the site. */
  friendName: string;
  /** Your name, the gift giver — shown in the letter signature. */
  fromName: string;
  /** ISO date string of their next birthday, used for countdown. */
  birthdayISO: string;
  /** Optional path to a background music file under /assets/music. */
  musicSrc?: string;
  /** Social links for the footer. */
  socials: { label: string; href: string; icon: IconName }[];
}
