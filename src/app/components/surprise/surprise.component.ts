import {
  Component,
  inject,
  signal,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { ConfettiService } from '../../core/services/confetti.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-surprise',
  standalone: true,
  imports: [NgFor, NgIf, IconComponent],
  templateUrl: './surprise.component.html',
  styleUrl: './surprise.component.scss',
})
export class SurpriseComponent {
  private readonly confettiService = inject(ConfettiService);

  candlesOut = signal(false);
  giftOpened = signal(false);

  readonly balloons = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    color: ['#ff77c6', '#9d4edd', '#ffd166', '#a0c4ff', '#ffa1a1'][i % 5],
    left:  (i / 9) * 100 + (Math.random() * 6 - 3),
    delay: Math.random() * 4,
    duration: Math.random() * 6 + 10,
    size: Math.random() * 0.5 + 1,
  }));

  readonly sparkles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    top:  Math.random() * 90 + 5,
    left: Math.random() * 90 + 5,
    delay: Math.random() * 4,
    size: Math.random() * 0.8 + 0.6,
  }));

  blowCandles(): void {
    if (this.candlesOut()) return;
    this.candlesOut.set(true);
    this.confettiService.burst();
  }

  openGift(event: MouseEvent): void {
    this.giftOpened.set(true);
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    this.confettiService.sparkle(x, y);
    setTimeout(() => this.confettiService.burst(), 250);
  }

  reset(): void {
    this.candlesOut.set(false);
    this.giftOpened.set(false);
  }
}
