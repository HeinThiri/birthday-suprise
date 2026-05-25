import { Component, HostListener, inject, signal } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';

import { ContentService } from '../../core/services/content.service';
import { Memory } from '../../core/models/memory.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, IconComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  private readonly contentService = inject(ContentService);
  readonly memories = this.contentService.memories;

  active = signal<Memory | null>(null);

  open(memory: Memory): void {
    this.active.set(memory);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.active.set(null);
    document.body.style.overflow = '';
  }

  next(): void {
    const current = this.active();
    if (!current) return;
    const idx = this.memories.findIndex((m) => m.id === current.id);
    this.active.set(this.memories[(idx + 1) % this.memories.length]);
  }

  prev(): void {
    const current = this.active();
    if (!current) return;
    const idx = this.memories.findIndex((m) => m.id === current.id);
    this.active.set(this.memories[(idx - 1 + this.memories.length) % this.memories.length]);
  }

  cardGradient(m: Memory): { [k: string]: string } {
    return {
      background: `linear-gradient(135deg, ${m.hue}33 0%, ${m.hue}11 60%, transparent 100%)`,
      'box-shadow': `0 30px 60px -20px ${m.hue}55`,
    };
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (!this.active()) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft')  this.prev();
  }
}
