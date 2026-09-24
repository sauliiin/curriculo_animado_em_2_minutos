import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { gsap } from '../../core/gsap';

const INTERACTIVE = 'a, button, [role="button"], .tilt, input, video';

/**
 * Cursor com anel que segue o mouse com atraso e cresce sobre elementos interativos.
 * Também publica --mx/--my no <html> para o "holofote" do fundo (ver styles.css).
 * Só é renderizado com mouse e sem prefers-reduced-motion (ver App).
 */
@Component({
  selector: 'app-cursor-glow',
  template: `
    <div class="ring" #ring [class.is-hover]="hover()" [class.is-down]="down()" [class.is-hidden]="hidden()"></div>
    <div class="dot" #dot [class.is-hidden]="hidden()"></div>
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 3000;
    }
    .ring,
    .dot {
      position: fixed;
      top: 0;
      left: 0;
      border-radius: 50%;
      pointer-events: none;
      transition:
        width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        margin 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 0.3s ease,
        background-color 0.3s ease,
        border-color 0.3s ease;
    }
    .ring {
      width: 38px;
      height: 38px;
      margin: -19px 0 0 -19px;
      border: 1.5px solid var(--primary);
      box-shadow:
        0 0 12px var(--primary),
        inset 0 0 12px color-mix(in srgb, var(--primary) 40%, transparent);
      mix-blend-mode: screen;
    }
    .ring.is-hover {
      width: 70px;
      height: 70px;
      margin: -35px 0 0 -35px;
      background-color: color-mix(in srgb, var(--primary) 12%, transparent);
      border-color: var(--accent);
    }
    .ring.is-down {
      width: 26px;
      height: 26px;
      margin: -13px 0 0 -13px;
    }
    .dot {
      width: 6px;
      height: 6px;
      margin: -3px 0 0 -3px;
      background: var(--primary);
      box-shadow: 0 0 10px var(--primary);
    }
    .is-hidden {
      opacity: 0;
    }
  `,
})
export class CursorGlow {
  private readonly ring = viewChild.required<ElementRef<HTMLElement>>('ring');
  private readonly dot = viewChild.required<ElementRef<HTMLElement>>('dot');

  protected readonly hover = signal(false);
  protected readonly down = signal(false);
  protected readonly hidden = signal(true);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const root = document.documentElement;
      const ringX = gsap.quickTo(this.ring().nativeElement, 'x', { duration: 0.45, ease: 'power3.out' });
      const ringY = gsap.quickTo(this.ring().nativeElement, 'y', { duration: 0.45, ease: 'power3.out' });
      const dotX = gsap.quickTo(this.dot().nativeElement, 'x', { duration: 0.08 });
      const dotY = gsap.quickTo(this.dot().nativeElement, 'y', { duration: 0.08 });

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        this.hidden.set(false);
        ringX(e.clientX);
        ringY(e.clientY);
        dotX(e.clientX);
        dotY(e.clientY);
        root.style.setProperty('--mx', `${e.clientX}px`);
        root.style.setProperty('--my', `${e.clientY}px`);
      };
      const onOver = (e: PointerEvent) => {
        this.hover.set(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
      };
      const onDown = () => this.down.set(true);
      const onUp = () => this.down.set(false);
      const onLeave = () => this.hidden.set(true);

      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerover', onOver);
      window.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      document.documentElement.addEventListener('pointerleave', onLeave);

      destroyRef.onDestroy(() => {
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerover', onOver);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        document.documentElement.removeEventListener('pointerleave', onLeave);
      });
    });
  }
}
