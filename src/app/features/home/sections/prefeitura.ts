import { Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { MotionService } from '../../../core/motion.service';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';
import { TypewriterDirective } from '../../../shared/directives/typewriter.directive';

@Component({
  selector: 'app-prefeitura',
  imports: [RevealDirective, ScrambleDirective, TypewriterDirective],
  template: `
    <section id="prefeitura" class="section">
      <h2 class="section-title neon-text" [appScramble]="t().title"></h2>

      <div class="timeline-text" appReveal="blur" revealStagger="p">
        <p>{{ t().intro }}</p>
        <p>
          {{ t().realizedBefore }}<img class="inline-dots" src="assets/dots.gif" alt="" />🤔💡<strong
            [appTypewriter]="t().realizedTyped"
          ></strong
          >{{ t().realizedAfter }}
        </p>
        <p [innerHTML]="t().flowIntro"></p>
      </div>

      <div
        class="fluxo neon-frame"
        appReveal="flip"
        [class.is-touch]="touch"
        [class.show-detail]="showDetail()"
        [class.show-popover]="hovering()"
        (pointerenter)="onEnter()"
        (pointerleave)="onLeave()"
        (click)="onTap()"
      >
        <img class="fluxo-img" src="assets/fluxo.png" [alt]="t().fluxoAlt" tabindex="0" />
        <img class="processo-img" src="assets/processo.png" [alt]="t().processoAlt" />

        <div class="popover glass-card" role="tooltip">
          @for (line of t().popover; track $index) {
            <p [style.--i]="$index">{{ line }}</p>
          }
        </div>
      </div>
      @if (touch && !tapped()) {
        <p class="hint">{{ t().mobileHint }}</p>
      }
    </section>
  `,
  styles: `
    .timeline-text p {
      margin-bottom: 1rem;
    }
    .inline-dots {
      display: inline-block;
      height: 1em;
      width: auto;
      margin: 0 0.15rem 0 0.35rem;
      vertical-align: -0.35em;
      transform: scale(3.5);
    }
    .fluxo {
      display: grid;
      width: min(650px, 100%);
      margin-top: 3rem;
      cursor: default;
    }
    .fluxo img {
      grid-area: 1 / 1;
      width: 100%;
      height: auto;
      background: #fff;
      border-radius: var(--radius);
      transition:
        opacity 0.45s ease,
        transform 0.6s var(--ease-out),
        filter 0.45s ease;
    }
    .processo-img {
      opacity: 0;
      transform: scale(0.96);
      filter: blur(6px);
      pointer-events: none;
    }
    .show-detail .fluxo-img {
      opacity: 0;
      transform: scale(1.04);
      filter: blur(6px);
    }
    .show-detail .processo-img {
      opacity: 1;
      transform: none;
      filter: none;
    }
    .popover {
      position: absolute;
      bottom: 98%;
      left: 75%;
      z-index: 10;
      width: 65%;
      margin-bottom: -7%;
      padding: 0.9rem;
      text-align: left;
      color: #fff;
      text-shadow:
        0 0 4px rgba(0, 0, 0, 0.8),
        0 2px 6px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(40px);
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, 16px) scale(0.95);
      transition:
        opacity 0.35s ease,
        transform 0.5s var(--ease-spring);
    }
    .popover p {
      margin: 0 0 0.45rem;
      font-size: 0.9rem;
      line-height: 1.5;
      opacity: 0;
      transform: translateX(-12px);
      transition:
        opacity 0.4s ease,
        transform 0.4s var(--ease-out);
      transition-delay: calc(var(--i) * 70ms);
    }
    .show-popover .popover {
      opacity: 1;
      transform: translate(-50%, 0) scale(1);
    }
    .show-popover .popover p,
    .is-touch .popover p {
      opacity: 1;
      transform: none;
    }
    /* Touch: o texto fica abaixo da imagem e o toque alterna as imagens. */
    .is-touch {
      cursor: pointer;
    }
    .is-touch .popover {
      grid-area: 2 / 1;
      position: static;
      width: 100%;
      margin: 1rem 0 0;
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }
    .hint {
      margin-top: 1rem;
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--primary);
      animation: bounce 1.4s var(--ease-spring) infinite;
    }
    @keyframes bounce {
      50% {
        transform: translateY(-6px);
      }
    }
  `,
})
export class Prefeitura {
  private readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.t().home.prefeitura);

  /** Sem mouse: toque alterna fluxo/processo (comportamento mobile do site original). */
  protected readonly touch = !inject(MotionService).finePointer;
  protected readonly showDetail = signal(false);
  protected readonly hovering = signal(false);
  protected readonly tapped = signal(false);

  protected onEnter(): void {
    if (this.touch) return;
    this.hovering.set(true);
    this.showDetail.set(false);
  }

  protected onLeave(): void {
    if (this.touch) return;
    this.hovering.set(false);
    this.showDetail.set(true);
  }

  protected onTap(): void {
    if (!this.touch) return;
    this.tapped.set(true);
    this.showDetail.update((v) => !v);
  }
}
