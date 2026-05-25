import {
  AfterViewInit,
  Component,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { ConfigService } from '../../core/services/config.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface CountdownUnit {
  label: string;
  value: number;
}

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [NgFor, NgIf, IconComponent],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements AfterViewInit, OnDestroy {
  private readonly configService = inject(ConfigService);

  private targetDate = new Date(this.configService.config.birthdayISO);
  private intervalId: number | undefined;

  units = signal<CountdownUnit[]>([
    { label: 'days',    value: 0 },
    { label: 'hours',   value: 0 },
    { label: 'minutes', value: 0 },
    { label: 'seconds', value: 0 },
  ]);

  liveTime = signal('');
  isToday = signal(false);

  ngAfterViewInit(): void {
    this.update();
    this.intervalId = window.setInterval(() => this.update(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId != null) clearInterval(this.intervalId);
  }

  private update(): void {
    const now = new Date();
    let diff = this.targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      this.isToday.set(true);
      diff = 0;
    } else {
      this.isToday.set(false);
    }

    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff / 3_600_000) % 24);
    const minutes = Math.floor((diff / 60_000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.units.set([
      { label: 'days',    value: days },
      { label: 'hours',   value: hours },
      { label: 'minutes', value: minutes },
      { label: 'seconds', value: seconds },
    ]);

    this.liveTime.set(
      now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    );
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
