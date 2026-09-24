import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import Panzoom, { PanzoomObject } from '@panzoom/panzoom';
import { I18nService } from '../../../core/i18n/i18n.service';
import { CountUpDirective } from '../../../shared/directives/count-up.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';
import { TiltDirective } from '../../../shared/directives/tilt.directive';

@Component({
  selector: 'app-fluxao',
  imports: [CountUpDirective, RevealDirective, ScrambleDirective, TiltDirective],
  template: `
    <section id="fluxao" class="section">
      <h2 class="section-title" [appScramble]="t().title"></h2>

      <div appReveal="up" revealStagger="p">
        @for (paragraph of t().paragraphs; track $index) {
          <p [innerHTML]="paragraph"></p>
        }
      </div>

      <div class="stats" appReveal="up" revealStagger=".stat">
        @for (stat of t().stats; track $index) {
          <div class="stat glass-card" appTilt>
            <span
              class="value"
              [appCountUp]="stat.value"
              [countFrom]="stat.from ?? 0"
              [countPrefix]="stat.prefix ?? ''"
              [countSuffix]="stat.suffix ?? ''"
            ></span>
            <span class="label">{{ stat.label }}</span>
          </div>
        }
      </div>

      <div class="zoom-card neon-frame" appReveal="zoom">
        <div class="toolbar">
          <button type="button" [attr.aria-label]="t().zoomOut" (click)="panzoom?.zoomOut()">−</button>
          <button type="button" [attr.aria-label]="t().reset" (click)="panzoom?.reset()">⟲</button>
          <button type="button" [attr.aria-label]="t().zoomIn" (click)="panzoom?.zoomIn()">+</button>
        </div>
        <!-- data-lenis-prevent: a roda do mouse aqui dá zoom em vez de rolar a página -->
        <div class="viewport" #viewport data-lenis-prevent>
          <img #image src="assets/fluxao.png" [alt]="t().alt" draggable="false" />
        </div>
      </div>
      <p class="instruction" [innerHTML]="t().instruction"></p>
    </section>
  `,
  styles: `
    p {
      margin-bottom: 1rem;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.2rem;
      width: min(820px, 100%);
      margin: 1.8rem 0 2.6rem;
    }
    .stat {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      padding: 1.5rem 1rem;
    }
    .value {
      font-family: var(--font-display);
      font-size: clamp(2rem, 5vw, 2.8rem);
      font-weight: 800;
      font-variant-numeric: tabular-nums;
      background: linear-gradient(120deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      filter: drop-shadow(0 0 12px color-mix(in srgb, var(--primary) 45%, transparent));
    }
    .label {
      font-size: 0.9rem;
      color: var(--muted);
    }
    .zoom-card {
      position: relative;
      width: min(650px, 100%);
      background: rgba(0, 0, 0, 0.25);
    }
    .toolbar {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 5;
      display: flex;
      gap: 0.35rem;
    }
    .toolbar button {
      width: 34px;
      height: 34px;
      font-size: 1.1rem;
      color: var(--primary);
      background: color-mix(in srgb, var(--bg-1) 80%, transparent);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      cursor: pointer;
      transition:
        transform 0.25s var(--ease-spring),
        background 0.25s ease,
        color 0.25s ease;
    }
    .toolbar button:hover {
      transform: scale(1.12);
      background: var(--primary);
      color: var(--bg-1);
    }
    .viewport {
      overflow: hidden;
      border-radius: var(--radius);
      touch-action: none;
      cursor: grab;
    }
    .viewport:active {
      cursor: grabbing;
    }
    .viewport img {
      display: block;
      width: 100%;
    }
    .instruction {
      margin-top: 1rem;
      font-size: 0.9rem;
      opacity: 0.75;
    }
  `,
})
export class Fluxao {
  private readonly i18n = inject(I18nService);
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly image = viewChild.required<ElementRef<HTMLImageElement>>('image');

  protected readonly t = computed(() => this.i18n.t().home.fluxao);
  protected panzoom?: PanzoomObject;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const viewport = this.viewport().nativeElement;
      const panzoom = Panzoom(this.image().nativeElement, { maxScale: 5, minScale: 0.5 });
      viewport.addEventListener('wheel', panzoom.zoomWithWheel);
      this.panzoom = panzoom;

      destroyRef.onDestroy(() => {
        viewport.removeEventListener('wheel', panzoom.zoomWithWheel);
        panzoom.destroy();
      });
    });
  }
}
