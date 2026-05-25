import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { ConfettiService } from '../../core/services/confetti.service';
import { ConfigService } from '../../core/services/config.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [NgFor, IconComponent],
  templateUrl: './celebration.component.html',
  styleUrl: './celebration.component.scss',
})
export class CelebrationComponent implements AfterViewInit {
  private readonly confettiService = inject(ConfettiService);
  private readonly configService = inject(ConfigService);
  readonly friendName = this.configService.config.friendName;

  isCelebrating = signal(false);

  readonly fireworks = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: 10 + i * 15 + (Math.random() * 10 - 5),
    delay: i * 0.4,
    hue: [320, 280, 45, 220, 0, 200][i % 6],
  }));

  ngAfterViewInit(): void {
    // Trigger fireworks when section is at least 40% visible.
    const section = document.getElementById('celebration');
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.isCelebrating()) {
            this.startCelebration();
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(section);
  }

  startCelebration(): void {
    this.isCelebrating.set(true);
    this.confettiService.fireworks(7000);
  }

  manualCelebrate(): void {
    this.confettiService.fireworks(5000);
  }
}
