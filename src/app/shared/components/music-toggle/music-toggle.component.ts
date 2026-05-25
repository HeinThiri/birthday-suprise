import { Component, OnInit, inject } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { MusicService } from '../../../core/services/music.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-music-toggle',
  standalone: true,
  imports: [IconComponent],
  template: `
    <button
      class="music"
      type="button"
      [class.is-playing]="music.isPlaying()"
      [attr.aria-pressed]="music.isPlaying()"
      [attr.aria-label]="music.isPlaying() ? 'Pause background music' : 'Play background music'"
      (click)="music.toggle()"
    >
      <span class="music__icon" aria-hidden="true">
        <app-icon [name]="music.isPlaying() ? 'music' : 'music-off'" [size]="18" />
      </span>
      <span class="music__bars" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </span>
    </button>
  `,
  styles: [`
    .music {
      display: inline-flex; align-items: center; gap: 0.6rem;
      padding: 0.55rem 1rem 0.55rem 0.85rem;
      border-radius: 999px;
      background: var(--gradient-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      color: var(--text-primary);
      transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s;
    }
    .music:hover { transform: translateY(-2px); box-shadow: var(--glow-pink); }

    .music__icon { display: inline-flex; color: var(--color-pink); }

    .music__bars {
      display: inline-flex; align-items: flex-end; gap: 2px; height: 14px;
    }
    .music__bars span {
      width: 3px; background: var(--gradient-aurora);
      border-radius: 2px;
      height: 30%;
      transition: height 0.3s ease;
    }
    .music.is-playing .music__bars span {
      animation: equalize 1s ease-in-out infinite;
    }
    .music.is-playing .music__bars span:nth-child(1) { animation-delay: 0.0s; }
    .music.is-playing .music__bars span:nth-child(2) { animation-delay: 0.15s; }
    .music.is-playing .music__bars span:nth-child(3) { animation-delay: 0.3s; }
    .music.is-playing .music__bars span:nth-child(4) { animation-delay: 0.45s; }

    @keyframes equalize {
      0%, 100% { height: 30%; }
      50% { height: 100%; }
    }
  `],
})
export class MusicToggleComponent implements OnInit {
  protected readonly music = inject(MusicService);
  private readonly configService = inject(ConfigService);

  ngOnInit(): void {
    const src = this.configService.config.musicSrc;
    if (src) this.music.load(src);
  }
}
