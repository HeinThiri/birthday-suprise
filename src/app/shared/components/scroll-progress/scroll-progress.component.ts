import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  template: `<div class="bar" [style.transform]="'scaleX(' + progress() + ')'"></div>`,
  styles: [`
    :host {
      position: fixed; top: 0; left: 0; right: 0;
      height: 3px;
      z-index: 700;
      pointer-events: none;
    }
    .bar {
      width: 100%; height: 100%;
      background: var(--gradient-aurora);
      transform-origin: left;
      transform: scaleX(0);
      transition: transform 0.1s linear;
      box-shadow: 0 0 12px rgba(255, 119, 198, 0.5);
    }
  `],
})
export class ScrollProgressComponent {
  progress = signal(0);

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? scrollTop / max : 0);
  }
}
