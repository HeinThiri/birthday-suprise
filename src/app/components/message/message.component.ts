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
    `Happy Birthday, my love ❤️`,
    `Meeting you was the sweetest thing that ever happened to me.
You make my life softer, happier, and full of love in ways I never expected.`,
    `I love the way you care for me, the way you make me laugh, and the way you stay beside me even on difficult days.
With you, even simple moments feel special.`,
    `You are not just my boyfriend.
You are my comfort, my peace, and my favorite person.`,
    `Sometimes I look at you and quietly thank life for bringing you to me.
Because loving you feels like home.`,
    `I hope this year gives you everything your heart wishes for.
And no matter what happens, I hope you always know this:`,
    `You are deeply loved. By me. Always.`,
    `Happy Birthday, ko ko.
I love you more than words can explain. ❤️`,
  ];
}
