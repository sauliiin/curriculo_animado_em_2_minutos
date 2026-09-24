import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { MotionService } from '../../../core/motion.service';
import { gsap } from '../../../core/gsap';
import { watchInView } from '../../../shared/in-view';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';
import { TiltDirective } from '../../../shared/directives/tilt.directive';

/** Tempo de cada slide (igual ao site original). */
const SLIDE_SECONDS = 6.3;

@Component({
  selector: 'app-hobbies',
  imports: [RevealDirective, ScrambleDirective, TiltDirective],
  template: `
    <section id="hobbies" class="section">
      <h2 class="section-title" [appScramble]="t().title"></h2>

      <div
        class="carousel"
        #carousel
        appReveal="zoom"
        role="region"
        aria-roledescription="carousel"
        [attr.aria-label]="t().title"
        (pointerenter)="setHovering(true)"
        (pointerleave)="setHovering(false)"
        (keydown.arrowLeft)="go(-1)"
        (keydown.arrowRight)="go(1)"
      >
        <div class="stage">
          @for (slide of t().slides; track slide.img; let i = $index) {
            <figure
              class="slide"
              [class.is-active]="i === index()"
              [class.is-before]="i < index()"
              [attr.aria-hidden]="i !== index()"
            >
              <div class="frame" appTilt [tiltMax]="6">
                <img [src]="slide.img" [alt]="slide.alt" loading="lazy" decoding="async" />
              </div>
              <figcaption class="caption">{{ slide.caption }}</figcaption>
            </figure>
          }
        </div>

        <div class="controls">
          <button type="button" class="arrow" [attr.aria-label]="t().prev" (click)="go(-1)">‹</button>
          <div class="dots">
            @for (slide of t().slides; track slide.img; let i = $index) {
              <button
                type="button"
                class="dot"
                [class.is-active]="i === index()"
                [attr.aria-label]="t().goTo + ' ' + (i + 1)"
                [attr.aria-current]="i === index()"
                (click)="goTo(i)"
              >
                <span class="fill" [style.transform]="i === index() ? 'scaleX(' + progress() + ')' : null"></span>
              </button>
            }
          </div>
          <button type="button" class="arrow" [attr.aria-label]="t().next" (click)="go(1)">›</button>
        </div>
      </div>
    </section>
  `,
  styles: `
    .carousel {
      width: min(780px, 100%);
    }
    .stage {
      position: relative;
      height: clamp(300px, 52vw, 480px);
      perspective: 1400px;
    }
    .slide {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0;
      pointer-events: none;
      transform: translateX(14%) rotateY(-28deg) scale(0.86);
      filter: blur(10px);
      transition:
        opacity 0.8s ease,
        transform 1s var(--ease-out),
        filter 0.8s ease;
    }
    .slide.is-before {
      transform: translateX(-14%) rotateY(28deg) scale(0.86);
    }
    .slide.is-active {
      opacity: 1;
      pointer-events: auto;
      transform: none;
      filter: none;
    }
    .frame {
      position: relative;
      width: 100%;
      height: calc(100% - 5rem);
      border-radius: var(--radius);
    }
    .frame img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: inherit;
      filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.5));
      transition: transform 0.5s var(--ease-out);
    }
    .frame:hover img {
      transform: scale(1.3);
    }
    .caption {
      max-width: 640px;
      margin-top: 1rem;
      font-size: 1.05rem;
      font-weight: 700;
      line-height: 1.5;
      color: var(--highlight);
      text-shadow: 0 0 8px color-mix(in srgb, var(--highlight) 70%, transparent);
      opacity: 0;
      transform: translateY(16px);
      transition:
        opacity 0.6s ease 0.25s,
        transform 0.8s var(--ease-out) 0.25s;
    }
    .is-active .caption {
      opacity: 1;
      transform: none;
    }
    :host-context(body.cyberpunk-theme) .caption {
      color: var(--primary);
      text-shadow:
        0 0 10px var(--primary),
        0 0 30px var(--accent);
    }
    .controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.2rem;
    }
    .arrow {
      width: 42px;
      height: 42px;
      font-size: 1.6rem;
      line-height: 1;
      color: var(--primary);
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 50%;
      cursor: pointer;
      transition:
        transform 0.3s var(--ease-spring),
        background 0.3s ease,
        color 0.3s ease;
    }
    .arrow:hover {
      transform: scale(1.15);
      background: var(--primary);
      color: var(--bg-1);
    }
    .dots {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.45rem;
    }
    .dot {
      position: relative;
      width: 12px;
      height: 6px;
      overflow: hidden;
      border: 0;
      border-radius: 6px;
      background: color-mix(in srgb, var(--text) 25%, transparent);
      cursor: pointer;
      transition: width 0.4s var(--ease-out);
    }
    .dot.is-active {
      width: 42px;
    }
    .fill {
      position: absolute;
      inset: 0;
      transform: scaleX(0);
      transform-origin: 0 50%;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      box-shadow: 0 0 8px var(--primary);
    }
    :host-context(body.cyberpunk-theme) :is(.arrow, .dot) {
      border-radius: 0;
    }
  `,
})
export class Hobbies {
  private readonly i18n = inject(I18nService);
  private readonly motion = inject(MotionService);
  private readonly carousel = viewChild.required<ElementRef<HTMLElement>>('carousel');

  protected readonly t = computed(() => this.i18n.t().home.hobbies);
  protected readonly index = signal(0);
  protected readonly progress = signal(0);

  private readonly timer = { progress: 0 };
  private tween?: gsap.core.Tween;
  private visible = false;
  private hovering = false;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = watchInView(this.carousel().nativeElement, (visible) => {
        this.visible = visible;
        this.syncPlayback();
      });
      destroyRef.onDestroy(() => {
        stop();
        this.tween?.kill();
      });
    });
  }

  /** Pausa o autoplay enquanto o mouse está sobre o carrossel. */
  protected setHovering(value: boolean): void {
    this.hovering = value;
    this.syncPlayback();
  }

  protected go(step: number): void {
    const count = this.t().slides.length;
    this.goTo((this.index() + step + count) % count);
  }

  protected goTo(i: number): void {
    this.index.set(i);
    this.restartTimer();
  }

  /** Um tween do GSAP funciona como relógio pausável do autoplay. */
  private restartTimer(): void {
    this.tween?.kill();
    this.timer.progress = 0;
    this.progress.set(0);
    this.tween = gsap.to(this.timer, {
      progress: 1,
      duration: SLIDE_SECONDS,
      ease: 'none',
      paused: true,
      onUpdate: () => this.progress.set(this.timer.progress),
      onComplete: () => this.go(1),
    });
    this.syncPlayback();
  }

  private syncPlayback(): void {
    if (!this.tween) {
      this.restartTimer();
      return;
    }
    const shouldPlay = this.visible && !this.hovering && !this.motion.reducedMotion();
    if (shouldPlay) this.tween.play();
    else this.tween.pause();
  }
}
