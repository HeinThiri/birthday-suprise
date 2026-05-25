import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ConfigService } from '../../core/services/config.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgFor, IconComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  private readonly configService = inject(ConfigService);
  readonly config = this.configService.config;

  /**
   * Each paragraph is revealed independently on scroll.
   * Edit these to make the letter truly yours.
   */
  readonly paragraphs: string[] = [
    `It's a strange and wonderful thing — writing a letter to someone who already knows me so well. So forgive me if this reads less like a card and more like a quiet conversation we'd have on a long walk.`,
    `Some friendships move loudly. Ours moves like a song you don't realize is your favorite until it ends — only ours never ends. It just gets new verses.`,
    `Thank you for being the person I can text in lowercase, the person who laughs at my worst jokes, and the person who somehow makes ordinary Tuesdays feel like a small holiday.`,
    `If I could wrap up everything I admire about you and put it in a box with a bow, I'd need a much bigger box. You are brave in quiet ways. Kind in the kind of way that lasts. Funny in the way that doesn't try.`,
    `So here's to you — to the year ahead, the dreams already taking shape, and to the version of you that hasn't even arrived yet. They're going to be magnificent. (You already are.)`,
    `Happy birthday. I'm so glad I get to know you.`,
  ];
}
