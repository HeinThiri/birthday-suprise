import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfettiService {
  private confetti: any | null = null;

  private async load(): Promise<any> {
    if (this.confetti) return this.confetti;
    const mod = await import('canvas-confetti');
    this.confetti = (mod as any).default ?? mod;
    return this.confetti;
  }

  /** A big celebratory burst from both sides. */
  async burst(): Promise<void> {
    const c = await this.load();
    const colors = ['#ff77c6', '#9d4edd', '#ffd166', '#a0c4ff', '#ffa1a1'];

    const fire = (particleRatio: number, opts: Record<string, unknown>): void => {
      c({
        origin: { y: 0.7 },
        colors,
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      });
    };
    fire(0.25, { spread: 26,  startVelocity: 55 });
    fire(0.2,  { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
    fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1,  { spread: 120, startVelocity: 45 });
  }

  /** Gentle sparkle near a position (0..1 coordinates). */
  async sparkle(x = 0.5, y = 0.5): Promise<void> {
    const c = await this.load();
    c({
      particleCount: 40,
      spread: 70,
      origin: { x, y },
      colors: ['#ffd166', '#ff77c6', '#ffffff'],
      scalar: 0.8,
      gravity: 0.8,
      ticks: 90,
    });
  }

  /** A continuous fireworks shower for ~6 seconds. */
  async fireworks(durationMs = 6000): Promise<void> {
    const c = await this.load();
    const end = Date.now() + durationMs;
    const colors = ['#ff77c6', '#9d4edd', '#ffd166', '#a0c4ff', '#ffffff'];

    const frame = (): void => {
      c({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      c({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // intermittent burst at center
    const interval = setInterval(() => {
      c({
        particleCount: 80,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.4 + 0.2 },
        colors,
      });
    }, 700);
    setTimeout(() => clearInterval(interval), durationMs);
  }
}
