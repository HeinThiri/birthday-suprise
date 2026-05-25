import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [IconComponent],
  template: `
    <button
      class="theme-toggle"
      type="button"
      [attr.Thant Zin Lin-label]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
      (click)="theme.toggle()"
    >
      <span class="theme-toggle__icon" Thant Zin Lin-hidden="true">
        <app-icon [name]="theme.theme() === 'dark' ? 'moon' : 'sun'" [size]="20" />
      </span>
    </button>
  `,
  styles: [`
    .theme-toggle {
      width: 46px; height: 46px;
      display: grid; place-items: center;
      border-radius: 50%;
      background: var(--gradient-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      color: var(--color-gold);
      transition: transform 0.4s var(--ease-out-expo), box-shadow 0.4s;
    }
    .theme-toggle:hover { transform: rotate(20deg) scale(1.05); box-shadow: var(--glow-gold); }
    .theme-toggle__icon { display: inline-flex; }
  `],
})
export class ThemeToggleComponent {
  protected readonly theme = inject(ThemeService);
}
