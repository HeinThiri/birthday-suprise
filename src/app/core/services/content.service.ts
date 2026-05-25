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
    { id: 1, title: 'First coffee',     caption: 'Our first coffee date — your laugh turned a small café into my favorite place.',        icon: 'coffee',   hue: '#ff77c6', size: 'wide', image: 'image-1.jpg' },
    { id: 2, title: 'Beach trip',       caption: 'Salt on our skin and your hand in mine as the sun dipped low.',                        icon: 'wave',     hue: '#a0c4ff', size: 'sm', image: 'image-2.jpg' },
    { id: 3, title: 'Concert night',    caption: 'We sang every lyric like it was our song, even when we forgot the words.',             icon: 'mic',      hue: '#9d4edd', size: 'tall', image: 'image-3.jpg' },
    { id: 4, title: 'Road trip',        caption: 'Maps, snacks, and the kind of playlist that made every mile feel like ours.',           icon: 'car',      hue: '#ffd166', size: 'sm', image: 'image-4.jpg' },
    { id: 5, title: 'Late-night talks', caption: 'Those nights when the world quieted down and you became the only story I wanted to hear.', icon: 'moon',     hue: '#ffa1a1', size: 'md', image: 'image-5.jpg' },
    { id: 6, title: 'Cake disaster',    caption: 'The cake may have failed, but your smile made that mess the best part of the day.',    icon: 'cake',     hue: '#ff77c6', size: 'sm', image: 'image-6.jpg' },
    { id: 7, title: 'Rainy day',        caption: 'Two umbrellas, one jacket, and the warmth of being together even when the sky was grey.', icon: 'umbrella', hue: '#a0c4ff', size: 'md', image: 'image-7.jpg' },
    { id: 8, title: 'Photo booth',      caption: 'Four silly frames, one perfect memory — and every one of them with you.',              icon: 'camera',   hue: '#9d4edd', size: 'sm', image: 'image-8.jpg' },
    { id: 9, title: 'Your spotlight',   caption: 'That night under the lights, watching you shine made everything feel a little more magical.', icon: 'heart',    hue: '#ff77c6', size: 'md', image: 'image-9.jpg' },
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
