import { Component } from '@angular/core';

import { HeroComponent } from '../../components/hero/hero.component';
import { SurpriseComponent } from '../../components/surprise/surprise.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { MessageComponent } from '../../components/message/message.component';
import { WishesComponent } from '../../components/wishes/wishes.component';
import { CountdownComponent } from '../../components/countdown/countdown.component';
import { FunComponent } from '../../components/fun/fun.component';
import { CelebrationComponent } from '../../components/celebration/celebration.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    SurpriseComponent,
    GalleryComponent,
    TimelineComponent,
    MessageComponent,
    WishesComponent,
    CountdownComponent,
    FunComponent,
    CelebrationComponent,
  ],
  template: `
    <app-hero />
    <app-surprise />
    <app-gallery />
    <app-timeline />
    <app-message />
    <app-wishes />
    <app-countdown />
    <app-fun />
    <app-celebration />
  `,
  styles: [`:host { display: block; }`],
})
export class HomeComponent {}
