import { Component, inject } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

import { ContentService } from '../../core/services/content.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgClass, NgFor, IconComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  private readonly contentService = inject(ContentService);
  readonly entries = this.contentService.timeline;
}
