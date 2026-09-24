import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { MagneticDirective } from '../../../shared/directives/magnetic.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';
import { TiltDirective } from '../../../shared/directives/tilt.directive';

@Component({
  selector: 'app-featured',
  imports: [MagneticDirective, RevealDirective, RouterLink, ScrambleDirective, TiltDirective],
  template: `
    <section id="destaques" class="section">
      <h2 class="section-title" [appScramble]="t().title"></h2>
      <p class="subtitle" appReveal="blur">{{ t().subtitle }}</p>

      <div class="grid" appReveal="up" revealStagger=".card">
        @for (item of t().items; track item.id; let i = $index) {
          <article class="card glass-card" appTilt [tiltMax]="6">
            <span class="index" aria-hidden="true">0{{ i + 1 }}</span>
            <span class="metric">{{ item.metric }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
            <ul class="tags">
              @for (tag of item.tags; track tag) {
                <li class="chip">{{ tag }}</li>
              }
            </ul>
            <div class="links">
              <a routerLink="/projetos" [fragment]="item.id">{{ t().details }} →</a>
              @if (item.link) {
                <a [href]="item.link.href" target="_blank" rel="noopener noreferrer">{{ item.link.label }} ↗</a>
              }
            </div>
          </article>
        }
      </div>

      <a class="btn btn-ghost more" routerLink="/projetos" appMagnetic>{{ t().all }}</a>
    </section>
  `,
  styles: `
    .subtitle {
      margin: -1rem auto 2.2rem;
      color: var(--muted);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.3rem;
      width: 100%;
    }
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 1.8rem 1.6rem 1.5rem;
      overflow: hidden;
      text-align: left;
      transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
    }
    .card:hover {
      border-color: var(--primary);
      box-shadow: 0 0 34px color-mix(in srgb, var(--primary) 35%, transparent);
    }
    .index {
      position: absolute;
      top: 0.6rem;
      right: 1rem;
      font-family: var(--font-display);
      font-size: 3.4rem;
      font-weight: 900;
      line-height: 1;
      color: transparent;
      -webkit-text-stroke: 1px color-mix(in srgb, var(--primary) 40%, transparent);
      pointer-events: none;
    }
    .metric {
      align-self: flex-start;
      margin-bottom: 0.8rem;
      padding: 0.25rem 0.7rem;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--bg-1);
      background: var(--highlight);
      border-radius: 999px;
      box-shadow: 0 0 14px color-mix(in srgb, var(--highlight) 45%, transparent);
    }
    h3 {
      max-width: 85%;
      margin-bottom: 0.6rem;
      font-size: 1.3rem;
      color: var(--primary);
    }
    p {
      max-width: none;
      margin: 0 0 1rem;
      font-size: 0.98rem;
      line-height: 1.6;
      color: var(--muted);
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.2rem;
      list-style: none;
    }
    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 1.2rem;
      margin-top: auto;
    }
    .links a {
      max-width: none;
      font-size: 0.95rem;
      font-weight: 700;
    }
    .more {
      margin-top: 2.2rem;
    }
    :host-context(body.cyberpunk-theme) .metric {
      border-radius: 0;
    }
    @media (max-width: 760px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Featured {
  private readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.t().home.featured);
}
