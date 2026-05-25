import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageComponent } from '../../components/message/message.component';

/**
 * A standalone /letter route for sharing just the letter
 * — useful for sending a direct link to the friend.
 */
@Component({
  selector: 'app-letter-page',
  standalone: true,
  imports: [RouterLink, MessageComponent],
  template: `
    <div class="letter-page">
      <app-message />
      <div class="letter-page__cta">
        <a routerLink="/" class="btn btn-primary">
          See the full surprise →
        </a>
      </div>
    </div>
  `,
  styles: [`
    .letter-page { padding-top: 6rem; }
    .letter-page__cta { text-align: center; padding: 0 1rem 6rem; }
  `],
})
export class LetterComponent {}
