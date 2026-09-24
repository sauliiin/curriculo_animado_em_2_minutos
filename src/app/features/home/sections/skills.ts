import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';
import { TiltDirective } from '../../../shared/directives/tilt.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective, ScrambleDirective, TiltDirective],
  template: `
    <section id="skills" class="section">
      <h2 class="section-title" [appScramble]="t().title"></h2>

      <!-- Faixas infinitas de tecnologias (conteúdo decorativo; a lista acessível está nos cards) -->
      <div class="marquees" aria-hidden="true">
        @for (row of rows(); track $index; let odd = $odd) {
          <div class="marquee" [class.reverse]="odd">
            <div class="track">
              @for (copy of [0, 1]; track copy) {
                @for (item of row; track item) {
                  <span class="tech">{{ item }}</span>
                  <span class="sep">✦</span>
                }
              }
            </div>
          </div>
        }
      </div>

      <div class="grid" appReveal="up" revealStagger=".card">
        @for (group of t().groups; track group.name) {
          <article class="card glass-card" appTilt>
            <span class="icon" aria-hidden="true">{{ group.icon }}</span>
            <h3>{{ group.name }}</h3>
            <ul>
              @for (item of group.items; track item) {
                <li class="chip">{{ item }}</li>
              }
            </ul>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .marquees {
      width: 100vw;
      margin: 0 calc(50% - 50vw) 3rem;
      transform: rotate(-2deg);
    }
    .marquee {
      overflow: hidden;
      padding: 0.6rem 0;
      background: color-mix(in srgb, var(--primary) 8%, transparent);
      border-block: 1px solid color-mix(in srgb, var(--primary) 35%, transparent);
      mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
    }
    .marquee + .marquee {
      margin-top: 0.8rem;
      background: color-mix(in srgb, var(--accent) 8%, transparent);
      border-color: color-mix(in srgb, var(--accent) 35%, transparent);
    }
    .track {
      display: flex;
      width: max-content;
      align-items: center;
      gap: 1.4rem;
      animation: marquee 38s linear infinite;
    }
    .reverse .track {
      animation-direction: reverse;
      animation-duration: 44s;
    }
    .marquee:hover .track {
      animation-play-state: paused;
    }
    @keyframes marquee {
      to {
        transform: translateX(calc(-50% - 0.7rem));
      }
    }
    .tech {
      font-family: var(--font-display);
      font-size: clamp(1.1rem, 2.4vw, 1.6rem);
      font-weight: 800;
      text-transform: uppercase;
      white-space: nowrap;
      color: transparent;
      -webkit-text-stroke: 1px var(--primary);
      transition: color 0.3s ease;
    }
    .reverse .tech {
      -webkit-text-stroke-color: var(--accent);
    }
    .tech:hover {
      color: var(--primary);
    }
    .sep {
      color: var(--highlight);
      font-size: 0.9rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.3rem;
      width: 100%;
    }
    .card {
      position: relative;
      padding: 1.6rem 1.3rem;
      text-align: left;
      transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
    }
    .card:hover {
      border-color: var(--primary);
      box-shadow: 0 0 32px color-mix(in srgb, var(--primary) 35%, transparent);
    }
    .icon {
      display: inline-grid;
      place-items: center;
      width: 48px;
      height: 48px;
      margin-bottom: 0.9rem;
      font-size: 1.5rem;
      border-radius: 14px;
      background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 30%, transparent), transparent);
      border: 1px solid color-mix(in srgb, var(--primary) 40%, transparent);
      transform: translateZ(30px);
    }
    h3 {
      margin-bottom: 0.9rem;
      font-size: 1.1rem;
      transform: translateZ(20px);
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      list-style: none;
      transform: translateZ(10px);
    }
  `,
})
export class Skills {
  private readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.t().home.skills);

  /** Tecnologias únicas divididas em duas faixas. */
  protected readonly rows = computed(() => {
    const unique = [...new Set(this.t().groups.flatMap((g) => g.items))];
    const half = Math.ceil(unique.length / 2);
    return [unique.slice(0, half), unique.slice(half)];
  });
}
