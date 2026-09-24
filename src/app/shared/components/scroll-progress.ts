import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';

/** Barra de progresso de leitura no topo da página. */
@Component({
  selector: 'app-scroll-progress',
  template: `<div class="bar" [style.transform]="'scaleX(' + progress() + ')'"></div>`,
  styles: `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      z-index: 1000;
      pointer-events: none;
    }
    .bar {
      height: 100%;
      transform-origin: 0 50%;
      background: linear-gradient(90deg, var(--primary), var(--accent), var(--highlight));
      box-shadow:
        0 0 10px var(--primary),
        0 0 22px var(--accent);
    }
  `,
})
export class ScrollProgress {
  protected readonly progress = signal(0);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let ticking = false;
      const update = () => {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        this.progress.set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      };
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });
    });
  }
}
