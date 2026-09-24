import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import Lenis from 'lenis';
import { ScrollTrigger, gsap } from './gsap';

const NAV_OFFSET = -90;

@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly doc = inject(DOCUMENT);
  private readonly win = this.doc.defaultView!;
  private lenis?: Lenis;

  readonly reducedMotion = signal(this.win.matchMedia('(prefers-reduced-motion: reduce)').matches);
  /** Mouse/trackpad: habilita cursor customizado, tilt e efeito magnético. */
  readonly finePointer = this.win.matchMedia('(hover: hover) and (pointer: fine)').matches;

  constructor() {
    this.win
      .matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', (e) => this.reducedMotion.set(e.matches));
  }

  /** Rolagem suave (Lenis) sincronizada com o ticker do GSAP/ScrollTrigger. */
  initSmoothScroll(): void {
    if (this.lenis || this.reducedMotion()) return;
    this.lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, autoRaf: false });
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => this.lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  scrollTo(target: string | HTMLElement | number, immediate = false): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : NAV_OFFSET, duration: 1.6, immediate });
      return;
    }
    const behavior: ScrollBehavior = immediate || this.reducedMotion() ? 'auto' : 'smooth';
    if (typeof target === 'number') {
      this.win.scrollTo({ top: target, behavior });
      return;
    }
    const el = typeof target === 'string' ? this.doc.querySelector<HTMLElement>(target) : target;
    if (!el) return;
    const top = el.getBoundingClientRect().top + this.win.scrollY + NAV_OFFSET;
    this.win.scrollTo({ top, behavior });
  }

  /** Recalcula posições de gatilhos após mudanças de layout (troca de rota/idioma). */
  refresh(): void {
    this.lenis?.resize();
    ScrollTrigger.refresh();
  }
}
