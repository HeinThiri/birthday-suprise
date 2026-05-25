import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';

import { FooterComponent } from './shared/components/footer/footer.component';
import { ParticlesComponent } from './shared/components/particles/particles.component';
import { MusicToggleComponent } from './shared/components/music-toggle/music-toggle.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { ScrollProgressComponent } from './shared/components/scroll-progress/scroll-progress.component';
import { ThemeService } from './core/services/theme.service';
import { routeFadeAnimation } from './animations/fade.animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    FooterComponent,
    ParticlesComponent,
    MusicToggleComponent,
    ThemeToggleComponent,
    ScrollProgressComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeFadeAnimation],
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly outletCtx = inject(ChildrenOutletContexts);
  readonly themeService = inject(ThemeService);

  isBrowser = false;

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.themeService.init();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Remove the initial loader once Angular has hydrated
    const loader = document.querySelector('.initial-loader');
    if (loader) {
      loader.classList.add('initial-loader--out');
      setTimeout(() => loader.remove(), 600);
    }

    // Lazy-init AOS
    import('aos').then((mod) => {
      const AOS = (mod as any).default ?? mod;
      AOS.init({
        duration: 900,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: 'phone',
      });
    });
  }

  prepareRoute(): string {
    const ctx = this.outletCtx.getContext('primary');
    return ctx?.route?.snapshot?.url?.join('/') ?? '';
  }
}
