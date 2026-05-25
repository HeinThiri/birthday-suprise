import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { NgFor } from '@angular/common';

import { ConfigService } from '../../core/services/config.service';
import { ConfettiService } from '../../core/services/confetti.service';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';

/**
 * Cinematic hero: animated background, typing-effect tagline,
 * parallax orbs, CTA that triggers the surprise.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgFor, IconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('parallax', { static: true }) parallaxRef!: ElementRef<HTMLElement>;
  @Output() openSurprise = new EventEmitter<void>();

  private readonly configService = inject(ConfigService);
  private readonly confettiService = inject(ConfettiService);

  readonly friendName = this.configService.config.friendName;

  private readonly phrases = [
    'A moment crafted just for you.',
    'Because the world is better with you in it.',
    'Today, we celebrate everything you are.',
    'Press play on a year that loves you back.',
  ];
  private phraseIdx = 0;
  private charIdx = 0;
  private deleting = false;
  private typingTimer?: number;

  typed = signal('');

  readonly floats: { id: number; icon: IconName; left: number; delay: number; duration: number; size: number }[] =
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      icon: (['balloon', 'confetti', 'sparkle', 'ribbon', 'star', 'heart-filled'] as IconName[])[i % 6],
      left:     Math.random() * 90 + 5,
      delay:    Math.random() * 8,
      duration: Math.random() * 10 + 12,
      size:     Math.random() * 12 + 22,
    }));

  ngAfterViewInit(): void {
    this.tick();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) clearTimeout(this.typingTimer);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const el = this.parallaxRef.nativeElement;
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
  }

  onCta(): void {
    this.confettiService.burst();
    this.openSurprise.emit();
    const el = document.getElementById('surprise');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private tick = (): void => {
    const phrase = this.phrases[this.phraseIdx];
    if (this.deleting) {
      this.charIdx -= 1;
      this.typed.set(phrase.substring(0, this.charIdx));
      if (this.charIdx <= 0) {
        this.deleting = false;
        this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
      }
    } else {
      this.charIdx += 1;
      this.typed.set(phrase.substring(0, this.charIdx));
      if (this.charIdx >= phrase.length) {
        this.deleting = true;
        this.typingTimer = window.setTimeout(this.tick, 2200);
        return;
      }
    }
    const next = this.deleting ? 35 : 70;
    this.typingTimer = window.setTimeout(this.tick, next);
  };
}
