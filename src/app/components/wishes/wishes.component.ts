import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { ContentService } from '../../core/services/content.service';
import { Wish } from '../../core/models/wish.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface Heart { id: number; left: number; top: number; }

@Component({
  selector: 'app-wishes',
  standalone: true,
  imports: [NgClass, NgFor, IconComponent],
  templateUrl: './wishes.component.html',
  styleUrl: './wishes.component.scss',
})
export class WishesComponent {
  @ViewChild('layer', { static: true }) layerRef!: ElementRef<HTMLDivElement>;

  private readonly contentService = inject(ContentService);
  readonly wishes = this.contentService.wishes;

  hearts = signal<Heart[]>([]);
  private heartId = 0;

  selected = signal<Wish | null>(null);

  selectWish(wish: Wish, event: MouseEvent): void {
    this.selected.set(wish);
    this.emitHearts(event);
  }

  emitHearts(event: MouseEvent): void {
    const rect = this.layerRef.nativeElement.getBoundingClientRect();
    const baseX = ((event.clientX - rect.left) / rect.width) * 100;
    const baseY = ((event.clientY - rect.top)  / rect.height) * 100;

    const burst: Heart[] = Array.from({ length: 6 }, () => ({
      id: ++this.heartId,
      left: baseX + (Math.random() * 20 - 10),
      top:  baseY + (Math.random() * 10 - 5),
    }));

    this.hearts.update((hs) => [...hs, ...burst]);

    setTimeout(() => {
      const ids = new Set(burst.map((b) => b.id));
      this.hearts.update((hs) => hs.filter((h) => !ids.has(h.id)));
    }, 1800);
  }
}
