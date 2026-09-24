import { Component, computed, inject } from '@angular/core';
import { ContactService } from '../../../core/contact.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { MagneticDirective } from '../../../shared/directives/magnetic.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { ScrambleDirective } from '../../../shared/directives/scramble.directive';

@Component({
  selector: 'app-cta',
  imports: [MagneticDirective, RevealDirective, ScrambleDirective],
  template: `
    <section id="cta" class="section">
      <h2 class="title glitch" [appScramble]="t().title"></h2>
      <p appReveal="blur">{{ t().text }}</p>

      <div class="gift" appReveal="zoom" [revealDelay]="0.2">
        <span class="ring" aria-hidden="true"></span>
        <span class="ring ring-2" aria-hidden="true"></span>
        <button
          type="button"
          class="gift-button"
          appMagnetic
          [magneticStrength]="0.5"
          [attr.aria-label]="t().buttonAria"
          (click)="openContact($event)"
        >
          {{ t().button }}
        </button>
      </div>
    </section>
  `,
  styles: `
    .section {
      padding-bottom: clamp(8rem, 22vh, 14rem);
    }
    .title {
      font-size: clamp(2.2rem, 6vw, 3.6rem);
      margin-bottom: 1rem;
    }
    .gift {
      position: relative;
      display: grid;
      place-items: center;
      margin-top: 3rem;
    }
    .ring {
      position: absolute;
      inset: -6px;
      border: 2px solid var(--primary);
      border-radius: 999px;
      animation: ripple 2.4s var(--ease-out) infinite;
      pointer-events: none;
    }
    .ring-2 {
      animation-delay: 1.2s;
      border-color: var(--accent);
    }
    @keyframes ripple {
      from {
        opacity: 0.8;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(1.5, 1.9);
      }
    }
    .gift-button {
      position: relative;
      overflow: hidden;
      padding: 1.1rem 2.3rem;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--bg-1);
      background: linear-gradient(120deg, var(--primary), var(--accent));
      border: 0;
      border-radius: 999px;
      box-shadow: 0 0 30px color-mix(in srgb, var(--primary) 60%, transparent);
      cursor: pointer;
      animation: wiggle 4s ease-in-out infinite;
      transition: box-shadow 0.3s ease;
    }
    /* Brilho que passa pelo botão. */
    .gift-button::after {
      content: '';
      position: absolute;
      top: 0;
      left: -60%;
      width: 40%;
      height: 100%;
      background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.7), transparent);
      transform: skewX(-20deg);
      animation: shine 3s ease-in-out infinite;
    }
    .gift-button:hover {
      box-shadow:
        0 0 30px var(--primary),
        0 0 60px var(--accent);
    }
    @keyframes shine {
      60%,
      100% {
        left: 130%;
      }
    }
    @keyframes wiggle {
      0%,
      80%,
      100% {
        rotate: 0deg;
      }
      84% {
        rotate: -6deg;
      }
      88% {
        rotate: 6deg;
      }
      92% {
        rotate: -4deg;
      }
      96% {
        rotate: 3deg;
      }
    }
    :host-context(body.cyberpunk-theme) .gift-button {
      font-family: 'Orbitron', sans-serif;
      text-transform: uppercase;
      border-radius: 0;
      clip-path: polygon(5% 0, 100% 0, 100% 80%, 95% 100%, 0 100%, 0 20%);
    }
    :host-context(body.cyberpunk-theme) .ring {
      border-radius: 0;
    }
  `,
})
export class Cta {
  private readonly i18n = inject(I18nService);
  private readonly contact = inject(ContactService);
  protected readonly t = computed(() => this.i18n.t().home.cta);

  protected openContact(event: MouseEvent): void {
    this.contact.open(ContactService.originOf(event), true);
  }
}
