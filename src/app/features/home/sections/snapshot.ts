import { Component, computed, inject } from '@angular/core';
import { ContactService } from '../../../core/contact.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { CountUpDirective } from '../../../shared/directives/count-up.directive';
import { MagneticDirective } from '../../../shared/directives/magnetic.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';
import { TiltDirective } from '../../../shared/directives/tilt.directive';

/** "Em 30 segundos": o que um recrutador precisa ver primeiro. */
@Component({
  selector: 'app-snapshot',
  imports: [CountUpDirective, MagneticDirective, RevealDirective, ScrambleDirective, TiltDirective],
  template: `
    <section id="resumo" class="section">
      <h2 class="section-title" [appScramble]="t().title"></h2>

      <div class="layout">
        <div class="summary glass-card neon-frame" appReveal="left">
          <p [innerHTML]="t().summary"></p>
          <dl class="facts">
            @for (fact of t().facts; track fact.label) {
              <div>
                <dt>{{ fact.label }}</dt>
                <dd>{{ fact.value }}</dd>
              </div>
            }
          </dl>
          <div class="actions">
            <button type="button" class="btn btn-primary" appMagnetic (click)="openContact($event)">
              💬 {{ hero().ctaContact }}
            </button>
            <a class="btn btn-ghost" appMagnetic [href]="cvHref()" download>⬇ {{ hero().ctaCv }}</a>
          </div>
        </div>

        <div class="stats" appReveal="right" revealStagger=".stat">
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
      </div>
    </section>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 1.6rem;
      width: 100%;
      align-items: stretch;
    }
    .summary {
      display: flex;
      flex-direction: column;
      padding: 2rem;
      text-align: left;
    }
    .summary p {
      max-width: none;
      margin: 0;
      font-size: 1.08rem;
    }
    .facts {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.9rem 1.2rem;
      margin: 1.6rem 0;
      padding-top: 1.4rem;
      border-top: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
    }
    dt {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--primary);
    }
    dd {
      margin-top: 0.15rem;
      font-weight: 700;
      line-height: 1.35;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.7rem;
      margin-top: auto;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    .stat {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.35rem;
      padding: 1.2rem 1rem;
      text-align: left;
      transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
    }
    .stat:hover {
      border-color: var(--primary);
      box-shadow: 0 0 28px color-mix(in srgb, var(--primary) 35%, transparent);
    }
    .value {
      font-family: var(--font-display);
      font-size: clamp(1.7rem, 3.4vw, 2.3rem);
      font-weight: 800;
      line-height: 1.1;
      font-variant-numeric: tabular-nums;
      background: linear-gradient(120deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      filter: drop-shadow(0 0 10px color-mix(in srgb, var(--primary) 40%, transparent));
    }
    .label {
      font-size: 0.86rem;
      line-height: 1.4;
      color: var(--muted);
    }
    @media (max-width: 860px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 480px) {
      .summary {
        padding: 1.4rem;
      }
      .facts {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Snapshot {
  private readonly i18n = inject(I18nService);
  private readonly contact = inject(ContactService);

  protected readonly t = computed(() => this.i18n.t().home.snapshot);
  protected readonly hero = computed(() => this.i18n.t().home.hero);
  protected readonly cvHref = computed(() => this.i18n.t().home.contact.cvHref);

  protected openContact(event: MouseEvent): void {
    this.contact.open(ContactService.originOf(event));
  }
}
