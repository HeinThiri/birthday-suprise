import { Injectable } from '@angular/core';
import { Memory } from '../models/memory.model';
import { TimelineEntry } from '../models/timeline.model';
import { Wish } from '../models/wish.model';

/**
 * Static, easily editable content for the birthday site.
 * Replace these entries with your own memories, dates, and wishes.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly memories: Memory[] = [
    { id: 1, title: 'First coffee',     caption: 'Where it all began — and the latte art was awful.',         icon: 'coffee',   hue: '#ff77c6', size: 'wide' },
    { id: 2, title: 'Beach trip',       caption: 'Salt in our hair, sunset on the horizon.',                  icon: 'wave',     hue: '#a0c4ff', size: 'sm' },
    { id: 3, title: 'Concert night',    caption: 'We sang every lyric, even the ones we didn’t know.',        icon: 'mic',      hue: '#9d4edd', size: 'tall' },
    { id: 4, title: 'Road trip',        caption: 'Three states, one playlist, zero regrets.',                 icon: 'car',      hue: '#ffd166', size: 'sm' },
    { id: 5, title: 'Late-night talks', caption: 'Solving the universe over instant noodles.',                icon: 'moon',     hue: '#ffa1a1', size: 'md' },
    { id: 6, title: 'Cake disaster',    caption: 'It collapsed. We laughed. We ordered pizza instead.',       icon: 'cake',     hue: '#ff77c6', size: 'sm' },
    { id: 7, title: 'That one rainy day', caption: 'Two umbrellas, one shoulder, infinite warmth.',           icon: 'umbrella', hue: '#a0c4ff', size: 'md' },
    { id: 8, title: 'Photo booth',      caption: 'Four frames of pure, unfiltered chaos.',                    icon: 'camera',   hue: '#9d4edd', size: 'sm' },
  ];

  readonly timeline: TimelineEntry[] = [
    { id: 1, date: 'The day we met',  title: 'A chance hello',
      description: 'You walked in like you’d known the place forever, and somehow, so did I once you smiled.',
      icon: 'sparkle', align: 'left' },
    { id: 2, date: 'Spring of friendship', title: 'Our first inside joke',
      description: 'Born from a typo, raised by repetition. It still makes us laugh harder than it should.',
      icon: 'smile', align: 'right' },
    { id: 3, date: 'The hard week',     title: 'You showed up',
      description: 'I never asked, but you knew. Some friendships don’t need words to be heard.',
      icon: 'handshake', align: 'left' },
    { id: 4, date: 'Adventure season',  title: 'Trip of a lifetime',
      description: 'New cities, old playlists, and memories I’ll keep for as long as I have them.',
      icon: 'map', align: 'right' },
    { id: 5, date: 'Late nights',       title: 'Movie marathons & 3 a.m. talks',
      description: 'Half the world asleep, the other half us — talking about everything and nothing.',
      icon: 'film', align: 'left' },
    { id: 6, date: 'Today',             title: 'Your birthday',
      description: 'Another year of you. Another year that made all of mine better. Here’s to many more.',
      icon: 'confetti', align: 'right' },
  ];

  readonly wishes: Wish[] = [
    { id: 1, title: 'May your year be soft', body: 'Soft mornings, kind people, and the kind of joy that sneaks up on you.', author: 'A wish', icon: 'flower',    accent: 'pink' },
    { id: 2, title: 'Brave & curious',      body: 'Keep asking questions the world doesn’t expect, and chasing answers it can’t predict.', author: 'A wish', icon: 'telescope', accent: 'purple' },
    { id: 3, title: 'Golden hours',         body: 'May every photo find you in good light — inside and out.', author: 'A wish', icon: 'sunrise',   accent: 'gold' },
    { id: 4, title: 'Quiet wins',           body: 'A year of small victories. The kind only you and I will know to celebrate.', author: 'A wish', icon: 'medal',     accent: 'blue' },
    { id: 5, title: 'Loud laughter',        body: 'May you keep that laugh of yours, the one that fills rooms and quiets storms.', author: 'A wish', icon: 'smile',     accent: 'rose' },
    { id: 6, title: 'New skies',            body: 'New cities, new friends, new chapters — and old ones to come home to.', author: 'A wish', icon: 'plane',     accent: 'purple' },
  ];

  readonly compliments: string[] = [
    'You have the kind of warmth that makes ordinary days feel like home.',
    'Your laughter could probably end small wars.',
    'You notice the things people forget to mention, and remember the things people hoped you would.',
    'You make being yourself look easier than it actually is.',
    'Even your bad days have good lighting — that’s a vibe.',
    'You are someone’s favorite memory. Probably mine.',
    'The world is more interesting because you’re paying attention to it.',
    'You’re the human equivalent of fairy lights — soft, warm, and impossibly nice to be near.',
    'Your kindness shows up in small details no one asked you to notice.',
    'You make ordinary playlists feel like soundtracks.',
  ];

  randomCompliment(seed?: number): string {
    const idx = seed != null
      ? Math.abs(seed) % this.compliments.length
      : Math.floor(Math.random() * this.compliments.length);
    return this.compliments[idx];
  }
}
