import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { ContentService } from '../../core/services/content.service';
import { ConfettiService } from '../../core/services/confetti.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface Heart { id: number; left: number; top: number; size: number; }

@Component({
  selector: 'app-fun',
  standalone: true,
  imports: [NgFor, NgIf, IconComponent],
  templateUrl: './fun.component.html',
  styleUrl: './fun.component.scss',
})
export class FunComponent {
  @ViewChild('heartLayer', { static: true }) heartLayer!: ElementRef<HTMLDivElement>;

  private readonly contentService = inject(ContentService);
  private readonly confettiService = inject(ConfettiService);

  secretRevealed = signal(false);
  currentCompliment = signal<string>("Tap the button — I'll tell you something true.");
  hearts = signal<Heart[]>([]);
  private heartId = 0;

  reveal(): void {
    if (this.secretRevealed()) return;
    this.secretRevealed.set(true);
    this.confettiService.sparkle(0.5, 0.6);
  }

  nextCompliment(): void {
    this.currentCompliment.set(this.contentService.randomCompliment());
  }

  onPlayground(event: MouseEvent): void {
    const rect = this.heartLayer.nativeElement.getBoundingClientRect();
    const left = ((event.clientX - rect.left) / rect.width) * 100;
    const top  = ((event.clientY - rect.top)  / rect.height) * 100;
    const heart: Heart = {
      id: ++this.heartId,
      left,
      top,
      size: Math.random() * 0.6 + 0.8,
    };
    this.hearts.update((hs) => [...hs, heart]);
    setTimeout(() => {
      this.hearts.update((hs) => hs.filter((h) => h.id !== heart.id));
    }, 1800);
  }
}
