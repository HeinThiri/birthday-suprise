import { Injectable } from '@angular/core';
import { BirthdayConfig } from '../models/config.model';

/**
 * Central, edit-me configuration. Change values here to personalize the
 * site for your friend without touching any component code.
 */
@Injectable({ providedIn: 'root' })
export class ConfigService {
  readonly config: BirthdayConfig = {
    friendName: 'Aria',
    fromName: 'Your Best Friend',
    // Update to your friend's next birthday — the countdown auto-rolls forward.
    birthdayISO: this.nextBirthday('--06-12'),
    musicSrc: 'assets/music/birthday.mp3',
    socials: [
      { label: 'Instagram', href: '#', icon: 'camera' },
      { label: 'Twitter',   href: '#', icon: 'feather' },
      { label: 'Email',     href: 'mailto:hello@example.com', icon: 'mail' },
    ],
  };

  /**
   * Given a `--MM-DD` pattern, returns the next ISO datetime
   * for that month/day, rolling to next year if needed.
   */
  private nextBirthday(pattern: string): string {
    // Pattern starts with `--` so split yields ['', '', 'MM', 'DD'].
    const parts = pattern.split('-').filter(Boolean);
    const mm = parts[0] ?? '01';
    const dd = parts[1] ?? '01';
    const now = new Date();
    const year = now.getFullYear();
    const candidate = new Date(`${year}-${mm}-${dd}T00:00:00`);
    if (Number.isNaN(candidate.getTime())) {
      // Fallback: one year from today.
      const fallback = new Date(now);
      fallback.setFullYear(year + 1);
      return fallback.toISOString();
    }
    if (candidate.getTime() < now.getTime()) {
      candidate.setFullYear(year + 1);
    }
    return candidate.toISOString();
  }
}
