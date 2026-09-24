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
import { readThemeColor, rgba } from './canvas-colors';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコサシスセソ';
const FONT_SIZE = 16;
const FRAME_MS = 33;

/** Chuva estilo Matrix da página de projetos (verde no tema padrão, cor do tema no Cyberpunk). */
@Component({
  selector: 'app-matrix-rain',
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: -1;
      background: #000;
      pointer-events: none;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class MatrixRain {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly motion = inject(MotionService);
  private readonly theme = inject(ThemeService);
  private color = '#00ff66';

  constructor() {
    effect(() => {
      const cyber = this.theme.theme() === 'cyberpunk';
      this.color = cyber ? rgba(readThemeColor('--primary', '#fcee0a'), 1) : '#00ff66';
    });

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => destroyRef.onDestroy(this.start()));
  }

  private start(): () => void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d')!;
    let drops: number[] = [];
    let frame = 0;
    let last = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array.from({ length: Math.ceil(canvas.width / FONT_SIZE) }, () =>
        Math.floor((Math.random() * canvas.height) / FONT_SIZE),
      );
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;
      ctx.font = `${FONT_SIZE}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      ctx.shadowBlur = 0;
    };

    const loop = (time: number) => {
      if (time - last >= FRAME_MS) {
        last = time;
        draw();
      }
      frame = requestAnimationFrame(loop);
    };

    const play = () => {
      cancelAnimationFrame(frame);
      if (!this.motion.reducedMotion() && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const onResize = () => resize();

    resize();
    play();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', play);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', play);
    };
  }
}
