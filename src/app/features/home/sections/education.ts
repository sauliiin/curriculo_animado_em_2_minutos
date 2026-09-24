import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';
import { TiltDirective } from '../../../shared/directives/tilt.directive';

@Component({
  selector: 'app-education',
  imports: [RevealDirective, ScrambleDirective, TiltDirective],
  template: `
    <section id="formacao" class="section">
      <h2 class="section-title" [appScramble]="t().title"></h2>

      <div class="grid" appReveal="up" revealStagger=".card">
        @for (item of t().items; track item.course) {
          <article class="card glass-card" appTilt [tiltMax]="6">
            <span class="icon" aria-hidden="true">🎓</span>
            <span class="period">{{ item.period }}</span>
            <h3>{{ item.course }}</h3>
            <p>{{ item.school }}</p>
          </article>
        }
      </div>

      <div class="languages" appReveal="zoom">
        <span class="languages-title">{{ t().languagesTitle }}</span>
        @for (language of t().languages; track language) {
          <span class="chip">{{ language }}</span>
        }
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.2rem;
      width: 100%;
    }
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 1.5rem 1.3rem;
      text-align: left;
    }
    .icon {
      font-size: 1.8rem;
      margin-bottom: 0.6rem;
    }
    .period {
      margin-bottom: 0.4rem;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--highlight);
    }
    h3 {
      font-size: 1.05rem;
      color: var(--primary);
    }
    p {
      max-width: none;
      margin: 0.4rem 0 0;
      font-size: 0.95rem;
      color: var(--muted);
    }
    .languages {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      margin-top: 2rem;
    }
    .languages-title {
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.85rem;
      color: var(--muted);
    }
    .languages .chip {
      font-size: 0.95rem;
      padding: 0.45rem 1rem;
    }
  `,
})
export class EducationSection {
  private readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.t().home.education);
}
