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
import { ContactService } from '../../../core/contact.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GITHUB_URL, LINKEDIN_URL } from '../../../core/links';
import { MotionService } from '../../../core/motion.service';
import { ThemeService } from '../../../core/theme.service';
import { gsap } from '../../../core/gsap';
import { BrandIcon } from '../../../shared/components/brand-icon';
import { MagneticDirective } from '../../../shared/directives/magnetic.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';
import { SplitTextDirective } from '../../../shared/directives/split-text.directive';
import { TiltDirective } from '../../../shared/directives/tilt.directive';

/** Tempo da "pegadinha" da foto antes de revelar a foto real (igual ao site original). */
const INTRO_DELAY_MS = 4000;

@Component({
  selector: 'app-hero',
  imports: [BrandIcon, MagneticDirective, RevealDirective, ScrambleDirective, SplitTextDirective, TiltDirective],
  template: `
    <section id="hero" class="section hero">
      <p class="badge" appReveal="blur"><span class="dot" aria-hidden="true"></span>{{ t().badge }}</p>

      <h1 class="hero-title glitch" [appSplitText]="t().title" [splitDelay]="0.15"></h1>

      <h2 class="hero-subtitle" [class.is-highlighted]="revealed()" [appScramble]="subtitle()"></h2>

      <div class="ctas" appReveal="up" [revealDelay]="0.9" revealStagger=":scope > *">
        <button type="button" class="btn btn-primary" appMagnetic (click)="openContact($event)">
          💬 {{ t().ctaContact }}
        </button>
        <a class="btn btn-ghost" appMagnetic [href]="contact().cvHref" download>⬇ {{ t().ctaCv }}</a>
        <a class="icon-btn" appMagnetic [href]="linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <app-brand-icon name="linkedin" />
        </a>
        <a class="icon-btn" appMagnetic [href]="github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <app-brand-icon name="github" />
        </a>
      </div>

      <div class="hero-photos neon-frame" #photos appTilt [tiltMax]="8" [class.is-glitching]="glitching()">
        <img
          class="photo photo-fun"
          src="assets/foto1.png"
          [alt]="t().photoFunAlt"
          [class.is-hidden]="revealed()"
          fetchpriority="high"
        />
        <img class="photo photo-real" src="assets/foto2.png" [alt]="t().photoRealAlt" [class.is-visible]="revealed()" />
        <span class="scan" aria-hidden="true"></span>
        <p class="photo-caption" [class.is-visible]="revealed()">{{ t().caption }}</p>
      </div>

      <button type="button" class="scroll-hint" (click)="scrollNext()">
        <span class="mouse" aria-hidden="true"><span class="wheel"></span></span>
        <span>{{ t().scrollHint }}</span>
      </button>
    </section>
  `,
  styles: `
    .hero {
      min-height: 100svh;
      justify-content: center;
      padding-top: clamp(6rem, 14vh, 9rem);
    }
    .hero-title {
      font-size: clamp(2.3rem, 6.5vw, 4.4rem);
      font-weight: 800;
      line-height: 1.08;
      max-width: 960px;
      letter-spacing: -0.02em;
      text-shadow:
        0 0 18px color-mix(in srgb, var(--primary) 55%, transparent),
        0 0 42px color-mix(in srgb, var(--accent) 35%, transparent);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      max-width: none;
      margin-bottom: 1.4rem;
      padding: 0.4rem 1rem;
      font-size: 0.88rem;
      font-weight: 700;
      line-height: 1.4;
      color: var(--text);
      background: color-mix(in srgb, #22e07a 10%, transparent);
      border: 1px solid color-mix(in srgb, #22e07a 55%, transparent);
      border-radius: 999px;
      backdrop-filter: blur(10px);
    }
    .dot {
      flex: none;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #22e07a;
      box-shadow: 0 0 0 0 rgba(34, 224, 122, 0.7);
      animation: available 1.8s ease-out infinite;
    }
    @keyframes available {
      to {
        box-shadow: 0 0 0 10px rgba(34, 224, 122, 0);
      }
    }
    :host-context(body.cyberpunk-theme) .badge {
      border-radius: 0;
    }
    .ctas {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;
      margin-top: 1.6rem;
    }
    .hero-subtitle {
      max-width: 720px;
      min-height: 3.6em;
      margin-top: 1.4rem;
      font-family: var(--font-body);
      font-size: clamp(1rem, 2.4vw, 1.25rem);
      font-weight: 400;
      text-transform: none !important;
      text-shadow: none !important;
      color: var(--muted) !important;
      transition: color 0.6s ease;
    }
    .hero-subtitle.is-highlighted {
      color: var(--highlight) !important;
      text-shadow: 0 0 10px color-mix(in srgb, var(--highlight) 70%, transparent) !important;
      font-weight: 700;
    }
    .hero-photos {
      position: relative;
      width: min(550px, 90vw);
      aspect-ratio: 11 / 8;
      margin-top: 2.6rem;
      border-radius: var(--radius);
    }
    .photo {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
      transition:
        opacity 0.8s ease,
        transform 1.2s var(--ease-out),
        filter 0.8s ease;
    }
    .photo-fun.is-hidden {
      opacity: 0;
      transform: scale(1.12) rotate(-2deg);
      filter: blur(12px) hue-rotate(90deg);
    }
    .photo-real {
      opacity: 0;
      transform: scale(0.92);
      filter: saturate(2) blur(6px);
    }
    .photo-real.is-visible {
      opacity: 1;
      transform: none;
      filter: none;
    }
    .scan {
      position: absolute;
      inset: 0;
      z-index: 3;
      border-radius: inherit;
      overflow: hidden;
      pointer-events: none;
      opacity: 0;
      background: linear-gradient(
        180deg,
        transparent 0%,
        color-mix(in srgb, var(--primary) 70%, transparent) 50%,
        transparent 52%
      );
      background-size: 100% 220%;
    }
    .is-glitching .scan {
      opacity: 1;
      animation: scan 0.9s linear;
    }
    .is-glitching .photo {
      animation: photo-glitch 0.9s steps(2) both;
    }
    @keyframes scan {
      from {
        background-position: 0 -100%;
      }
      to {
        background-position: 0 200%;
      }
    }
    @keyframes photo-glitch {
      0% {
        clip-path: inset(0 0 0 0);
      }
      20% {
        clip-path: inset(12% 0 58% 0);
        transform: translate(-10px, 0);
      }
      40% {
        clip-path: inset(62% 0 8% 0);
        transform: translate(10px, 0);
      }
      60% {
        clip-path: inset(30% 0 35% 0);
        transform: translate(-6px, 0);
      }
      80% {
        clip-path: inset(0 0 0 0);
        transform: translate(4px, 0);
      }
      100% {
        clip-path: inset(0 0 0 0);
      }
    }
    .photo-caption {
      position: absolute;
      top: 25%;
      left: 73%;
      z-index: 6;
      max-width: 230px;
      padding: 0.55rem 1rem;
      font-size: 0.95rem;
      font-weight: 700;
      line-height: 1.4;
      color: #fff;
      background: rgba(0, 0, 0, 0.82);
      border: 1px solid var(--primary);
      border-radius: 18px;
      box-shadow: 0 0 20px color-mix(in srgb, var(--primary) 55%, transparent);
      opacity: 0;
      transform: translate(-50%, -20%) scale(0.4) rotate(-8deg);
      transition:
        opacity 0.4s ease 0.4s,
        transform 0.9s var(--ease-spring) 0.4s;
    }
    .photo-caption.is-visible {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) rotate(0);
    }
    .scroll-hint {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      margin-top: 2.6rem;
      font-size: 0.8rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--muted);
      background: none;
      border: 0;
      cursor: pointer;
    }
    .mouse {
      width: 24px;
      height: 38px;
      border: 2px solid var(--primary);
      border-radius: 14px;
      box-shadow: 0 0 10px color-mix(in srgb, var(--primary) 60%, transparent);
    }
    .wheel {
      display: block;
      width: 4px;
      height: 8px;
      margin: 6px auto 0;
      border-radius: 2px;
      background: var(--primary);
      animation: wheel 1.6s ease-in-out infinite;
    }
    @keyframes wheel {
      0% {
        opacity: 0;
        transform: translateY(-2px);
      }
      40% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateY(12px);
      }
    }
    @media (max-width: 600px) {
      .photo-caption {
        left: 60%;
        font-size: 0.8rem;
        max-width: 170px;
      }
    }
  `,
})
export class Hero {
  private readonly i18n = inject(I18nService);
  private readonly themeService = inject(ThemeService);
  private readonly motion = inject(MotionService);
  private readonly photos = viewChild.required<ElementRef<HTMLElement>>('photos');

  private readonly contactService = inject(ContactService);

  protected readonly t = computed(() => this.i18n.t().home.hero);
  protected readonly contact = computed(() => this.i18n.t().home.contact);
  protected readonly linkedin = LINKEDIN_URL;
  protected readonly github = GITHUB_URL;
  protected readonly revealed = signal(this.themeService.heroIntroDone);
  protected readonly glitching = signal(false);
  protected readonly subtitle = computed(() => (this.revealed() ? this.t().subtitleAfter : this.t().subtitle));

  constructor() {
    const destroyRef = inject(DestroyRef);
    const timers: ReturnType<typeof setTimeout>[] = [];

    afterNextRender(() => {
      if (!this.motion.reducedMotion()) {
        gsap.from(this.photos().nativeElement, {
          y: 80,
          rotationX: 25,
          autoAlpha: 0,
          transformPerspective: 900,
          duration: 1.4,
          delay: 0.6,
          ease: 'power4.out',
          clearProps: 'transform,opacity,visibility',
        });
      }
      if (this.themeService.heroIntroDone) return;

      timers.push(
        setTimeout(() => {
          this.themeService.heroIntroDone = true;
          this.glitching.set(true);
          this.revealed.set(true);
          const rect = this.photos().nativeElement.getBoundingClientRect();
          this.themeService.set('cyberpunk', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          timers.push(setTimeout(() => this.glitching.set(false), 950));
        }, INTRO_DELAY_MS),
      );
    });

    destroyRef.onDestroy(() => timers.forEach(clearTimeout));
  }

  protected scrollNext(): void {
    this.motion.scrollTo('#resumo');
  }

  protected openContact(event: MouseEvent): void {
    this.contactService.open(ContactService.originOf(event));
  }
}
