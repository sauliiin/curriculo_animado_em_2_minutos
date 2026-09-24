import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { MotionService } from './motion.service';

export type Theme = 'standard' | 'cyberpunk';

export interface Point {
  x: number;
  y: number;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly motion = inject(MotionService);

  // Como no site original, sempre começa no "Standard"; a intro do hero vira para Cyberpunk.
  readonly theme = signal<Theme>('standard');
  /** A intro do hero (troca de foto + tema) roda só uma vez por visita. */
  heroIntroDone = false;

  toggle(origin?: Point): void {
    this.set(this.theme() === 'standard' ? 'cyberpunk' : 'standard', origin);
  }

  /** Troca o tema com uma revelação circular (View Transitions API) a partir de `origin`. */
  set(theme: Theme, origin?: Point): void {
    if (theme === this.theme()) return;

    const doc = this.doc;
    if (!('startViewTransition' in doc) || this.motion.reducedMotion()) {
      this.apply(theme);
      return;
    }

    const win = doc.defaultView!;
    const { x, y } = origin ?? { x: win.innerWidth / 2, y: win.innerHeight / 2 };
    const radius = Math.hypot(Math.max(x, win.innerWidth - x), Math.max(y, win.innerHeight - y));
    const root = doc.documentElement;

    root.classList.add('theme-transition');
    const transition = doc.startViewTransition(() => this.apply(theme));
    transition.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 900, easing: 'cubic-bezier(.76,0,.24,1)', pseudoElement: '::view-transition-new(root)' },
        ),
      )
      .catch(() => undefined);
    transition.finished.finally(() => root.classList.remove('theme-transition'));
  }

  private apply(theme: Theme): void {
    this.theme.set(theme);
    this.doc.body.classList.toggle('cyberpunk-theme', theme === 'cyberpunk');
  }
}
