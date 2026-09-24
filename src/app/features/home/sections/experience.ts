import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { MotionService } from '../../../core/motion.service';
import { gsap } from '../../../core/gsap';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';
import { TiltDirective } from '../../../shared/directives/tilt.directive';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective, ScrambleDirective, TiltDirective],
  template: `
    <section id="experiences" class="section">
      <h2 class="section-title" [appScramble]="t().title"></h2>

      <div class="timeline" #timeline>
        <div class="line" aria-hidden="true"><div class="fill" #fill></div></div>
        <ol>
          @for (item of t().items; track $index; let odd = $odd) {
            <li class="item" [appReveal]="odd ? 'right' : 'left'">
              <span class="node" aria-hidden="true"></span>
              <div class="card glass-card" appTilt [tiltMax]="6">
                <span class="period">{{ item.period }}</span>
                <h3>{{ item.role }}</h3>
                <p class="company">{{ item.company }}</p>
                <ul class="highlights">
                  @for (highlight of item.highlights; track $index) {
                    <li>{{ highlight }}</li>
                  }
                </ul>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .timeline {
      position: relative;
      width: min(860px, 100%);
    }
    ol {
      list-style: none;
    }
    .line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10px;
      width: 3px;
      background: color-mix(in srgb, var(--text) 12%, transparent);
      border-radius: 3px;
    }
    .fill {
      height: 100%;
      transform-origin: 50% 0;
      background: linear-gradient(var(--primary), var(--accent));
      box-shadow: 0 0 14px var(--primary);
    }
    .item {
      position: relative;
      padding: 0 0 2rem 3rem;
      text-align: left;
    }
    .node {
      position: absolute;
      top: 1.4rem;
      left: 2px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--bg-1);
      border: 3px solid var(--primary);
      box-shadow: 0 0 14px var(--primary);
      animation: pulse 2.2s ease-in-out infinite;
    }
    @keyframes pulse {
      50% {
        box-shadow:
          0 0 0 8px color-mix(in srgb, var(--primary) 18%, transparent),
          0 0 22px var(--primary);
      }
    }
    .card {
      position: relative;
      padding: 1.2rem 1.4rem;
    }
    .period {
      display: inline-block;
      margin-bottom: 0.4rem;
      padding: 0.15rem 0.6rem;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--bg-1);
      background: var(--primary);
      border-radius: 999px;
    }
    h3 {
      font-size: 1.15rem;
      color: var(--primary);
    }
    .company {
      margin: 0.2rem 0 0;
      max-width: none;
      font-size: 0.98rem;
      font-weight: 700;
    }
    .highlights {
      display: grid;
      gap: 0.45rem;
      margin-top: 0.8rem;
      list-style: none;
    }
    .highlights li {
      position: relative;
      padding-left: 1.1rem;
      font-size: 0.9rem;
      line-height: 1.55;
      color: var(--muted);
    }
    .highlights li::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--primary);
    }
    @media (max-width: 700px) {
      .item {
        padding-left: 2.4rem;
      }
    }
  `,
})
export class ExperienceSection {
  private readonly i18n = inject(I18nService);
  private readonly motion = inject(MotionService);
  private readonly timeline = viewChild.required<ElementRef<HTMLElement>>('timeline');
  private readonly fill = viewChild.required<ElementRef<HTMLElement>>('fill');

  protected readonly t = computed(() => this.i18n.t().home.experience);

  constructor() {
    const destroyRef = inject(DestroyRef);

    // A linha do tempo "se desenha" conforme a rolagem.
    afterNextRender(() => {
      if (this.motion.reducedMotion()) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          this.fill().nativeElement,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: this.timeline().nativeElement, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
          },
        );
      });
      destroyRef.onDestroy(() => ctx.revert());
    });
  }
}
