import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { MagneticDirective } from '../../../shared/directives/magnetic.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-services',
  imports: [MagneticDirective, RevealDirective],
  template: `
    <section id="pandemia" class="section">
      <h2 class="lead" appReveal="blur">{{ t().title }}</h2>
      <div class="service-links" appReveal="zoom" revealStagger="a">
        @for (link of t().links; track link.href; let i = $index) {
          <a class="service" appMagnetic [href]="link.href" target="_blank" rel="noopener noreferrer">
            <span class="index">0{{ i + 1 }}</span>
            <span class="label">{{ link.label }}</span>
            <span class="arrow" aria-hidden="true">↗</span>
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    .lead {
      max-width: 780px;
      font-size: clamp(1.25rem, 2.8vw, 1.8rem);
    }
    .service-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin-top: 2.4rem;
    }
    .service {
      position: relative;
      isolation: isolate;
      display: inline-flex;
      align-items: center;
      gap: 0.7rem;
      padding: 0.75rem 1.2rem;
      overflow: hidden;
      font-weight: 700;
      color: var(--text);
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 999px;
      backdrop-filter: blur(10px);
      transition:
        color 0.3s ease,
        box-shadow 0.3s ease,
        border-color 0.3s ease;
    }
    /* Faixa de brilho que atravessa o botão no hover. */
    .service::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      background: linear-gradient(120deg, var(--primary), var(--accent));
      transform: translateX(-101%);
      transition: transform 0.5s var(--ease-out);
    }
    .service:hover {
      color: var(--bg-1);
      text-decoration: none;
      border-color: transparent;
      box-shadow: 0 0 26px color-mix(in srgb, var(--primary) 60%, transparent);
    }
    .service:hover::before {
      transform: none;
    }
    .index {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      opacity: 0.7;
    }
    .arrow {
      transition: transform 0.3s var(--ease-spring);
    }
    .service:hover .arrow {
      transform: translate(3px, -3px) scale(1.2);
    }
    :host-context(body.cyberpunk-theme) .service {
      border-radius: 0;
      clip-path: polygon(8% 0, 100% 0, 100% 70%, 92% 100%, 0 100%, 0 30%);
    }
  `,
})
export class Services {
  private readonly i18n = inject(I18nService);
  protected readonly t = computed(() => this.i18n.t().home.services);
}
