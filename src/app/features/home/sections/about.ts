import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';
import { SplitTextDirective } from '../../../shared/directives/split-text.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, ScrambleDirective, SplitTextDirective],
  template: `
    <section id="betterflix" class="section">
      <h2 class="section-title" [appScramble]="t().title"></h2>
      <p appReveal="blur">{{ t().text }}</p>
      <blockquote class="quote">
        <span class="mark" aria-hidden="true">“</span>
        <p [appSplitText]="t().quote" splitEffect="scrub"></p>
      </blockquote>
    </section>
  `,
  styles: `
    .quote {
      position: relative;
      max-width: 820px;
      margin-top: 3rem;
      padding: 2rem 1rem 0;
    }
    .quote p {
      max-width: none;
      font-family: var(--font-display);
      font-size: clamp(1.35rem, 3.2vw, 2.1rem);
      font-weight: 700;
      line-height: 1.45;
      color: var(--primary);
      text-shadow: 0 0 14px color-mix(in srgb, var(--primary) 60%, transparent);
    }
    .mark {
      position: absolute;
      top: -2.2rem;
      left: 50%;
      transform: translateX(-50%);
      font-family: Georgia, serif;
      font-size: 7rem;
      line-height: 1;
      color: var(--accent);
      opacity: 0.55;
      text-shadow: 0 0 30px var(--accent);
    }
  `,
})
export class About {
  private readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.t().home.about);
}
