import {
  Component,
  HostBinding,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../../core/services/config.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, NgFor, RouterLink, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly configService = inject(ConfigService);
  readonly friendName = this.configService.config.friendName;

  scrolled = signal(false);
  open = signal(false);

  readonly navLinks = [
    { id: 'hero',        label: 'Home' },
    { id: 'surprise',    label: 'Surprise' },
    { id: 'gallery',     label: 'Memories' },
    { id: 'timeline',    label: 'Journey' },
    { id: 'message',     label: 'Letter' },
    { id: 'wishes',      label: 'Wishes' },
    { id: 'celebration', label: 'Celebrate' },
  ];

  @HostBinding('class.is-scrolled') get isScrolledHost() { return this.scrolled(); }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.open.set(false);
    }
  }

  toggleMenu(): void { this.open.update((v) => !v); }
}
