import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MusicService {
  private audio: HTMLAudioElement | null = null;
  readonly isPlaying = signal(false);
  readonly isReady = signal(false);

  load(src: string): void {
    if (typeof window === 'undefined') return;
    if (this.audio) {
      this.audio.src = src;
      return;
    }
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.volume = 0.45;
    this.audio.preload = 'metadata';

    this.audio.addEventListener('canplaythrough', () => this.isReady.set(true), { once: true });
    this.audio.addEventListener('play',  () => this.isPlaying.set(true));
    this.audio.addEventListener('pause', () => this.isPlaying.set(false));
    this.audio.addEventListener('error', () => this.isReady.set(false));
  }

  toggle(): void {
    if (!this.audio) return;
    if (this.audio.paused) {
      // Browsers require user-gesture; `.play()` returns a promise we swallow.
      this.audio.play().catch(() => this.isPlaying.set(false));
    } else {
      this.audio.pause();
    }
  }

  setVolume(value: number): void {
    if (this.audio) this.audio.volume = Math.min(Math.max(value, 0), 1);
  }
}
