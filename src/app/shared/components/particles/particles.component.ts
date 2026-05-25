import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
  alpha: number;
}

/**
 * Soft floating particle field rendered to a fixed full-viewport canvas.
 * Renders behind everything else and respects prefers-reduced-motion.
 */
@Component({
  selector: 'app-particles',
  standalone: true,
  template: `<canvas #canvas class="particles"></canvas>`,
  styles: [`
    :host { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
    .particles { display: block; width: 100%; height: 100%; }
    @media (prefers-reduced-motion: reduce) { :host { display: none; } }
  `],
})
export class ParticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private rafId = 0;
  private dpr = 1;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.resize();
    this.seed();
    this.loop();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }

  @HostListener('window:resize')
  onResize(): void { this.resize(); this.seed(); }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = window.innerWidth * this.dpr;
    canvas.height = window.innerHeight * this.dpr;
    canvas.style.width  = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    this.ctx?.scale(this.dpr, this.dpr);
  }

  private seed(): void {
    const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    this.particles = Array.from({ length: count }, () => this.makeParticle());
  }

  private makeParticle(): Particle {
    const hues = [320, 280, 45, 220, 330];
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.05,
      hue: hues[Math.floor(Math.random() * hues.length)],
      alpha: Math.random() * 0.6 + 0.2,
    };
  }

  private loop = (): void => {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10)               p.y = window.innerHeight + 10;
      if (p.x < -10)               p.x = window.innerWidth  + 10;
      if (p.x > window.innerWidth + 10)  p.x = -10;

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      gradient.addColorStop(0, `hsla(${p.hue}, 90%, 75%, ${p.alpha})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 90%, 75%, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }

    this.rafId = requestAnimationFrame(this.loop);
  };
}
