import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'birthday-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<ThemeMode>('dark');

  init(): void {
    if (typeof window === 'undefined') return;
    let stored: ThemeMode | null = null;
    try { stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null; } catch {}
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial: ThemeMode = stored ?? (prefersLight ? 'light' : 'dark');
    this.applyTheme(initial);
  }

  toggle(): void {
    this.applyTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${mode}`);
      try { localStorage.setItem(STORAGE_KEY, mode); } catch {}
    }
  }
}
