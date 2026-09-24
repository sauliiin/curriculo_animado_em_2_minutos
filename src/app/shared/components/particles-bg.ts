import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { MotionService } from '../../core/motion.service';
import { ThemeService } from '../../core/theme.service';
import { Rgb, readThemeColor, rgba } from './canvas-colors';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  r: number;
  depth: number;
}

const LINK_DISTANCE = 125;
const MOUSE_RADIUS = 170;

/**
 * Constelação de partículas interativa: as partículas se conectam entre si,
 * fogem do cursor, têm parallax com a rolagem e mudam de cor com o tema.
 */
@Component({
  selector: 'app-particles-bg',
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class ParticlesBg {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly motion = inject(MotionService);
  private readonly theme = inject(ThemeService);

  private primary: Rgb = { r: 0, g: 224, b: 255 };
  private accent: Rgb = { r: 177, g: 76, b: 255 };

  constructor() {
    effect(() => {
      this.theme.theme();
      this.primary = readThemeColor('--primary', '#00e0ff');
      this.accent = readThemeColor('--accent', '#b14cff');
    });

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => destroyRef.onDestroy(this.start()));
  }

  private start(): () => void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d')!;
    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.floor((width * height) / 12000));
      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.15 + Math.random() * 0.35;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          r: 0.8 + Math.random() * 1.8,
          depth: 0.3 + Math.random() * 0.7,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const scroll = window.scrollY;
      const points: { x: number; y: number; p: Particle }[] = [];

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - (mouse.y + scroll * 0.2 * p.depth);
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.6;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx = p.vx * 0.96 + p.baseVx * 0.04;
        p.vy = p.vy * 0.96 + p.baseVy * 0.04;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Parallax: partículas "próximas" (depth alto) se movem mais com a rolagem.
        const y = (((p.y - scroll * 0.2 * p.depth) % (height + 40)) + height + 40) % (height + 40) - 20;
        points.push({ x: p.x, y, p });
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = rgba(this.primary, (1 - d / LINK_DISTANCE) * 0.28);
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE_RADIUS * 1.3) {
          ctx.strokeStyle = rgba(this.accent, (1 - md / (MOUSE_RADIUS * 1.3)) * 0.55);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = rgba(this.primary, 0.35 + a.p.depth * 0.55);
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.p.r * a.p.depth + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      cancelAnimationFrame(frame);
      if (this.motion.reducedMotion() || document.hidden) draw();
      else loop();
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onResize = () => {
      resize();
      play();
    };

    resize();
    play();
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', play);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', play);
    };
  }
}
