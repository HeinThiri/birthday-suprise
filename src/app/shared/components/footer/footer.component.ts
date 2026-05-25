import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ConfigService } from '../../../core/services/config.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly configService = inject(ConfigService);
  readonly config = this.configService.config;
  readonly currentYear = new Date().getFullYear();
}
