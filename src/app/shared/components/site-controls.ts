import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { ThemeService } from '../../core/theme.service';
import { MagneticDirective } from '../directives/magnetic.directive';
import { ScrambleDirective } from '../directives/scramble.directive';

/** Botões fixos de tema (esquerda) e idioma (direita). */
@Component({
  selector: 'app-site-controls',
  imports: [MagneticDirective, ScrambleDirective],
  template: `
    <button
      type="button"
      class="control-pill theme-toggle"
      appMagnetic
      [attr.aria-label]="t().controls.themeLabel"
      [attr.aria-pressed]="isCyberpunk()"
      (click)="toggleTheme($event)"
    >
      <span class="led" aria-hidden="true"></span>
      <span [appScramble]="isCyberpunk() ? 'Cyberpunk' : 'Standard'" [scrambleDuration]="0.8"></span>
    </button>

    <button
      type="button"
      class="control-pill lang-toggle"
      appMagnetic
      [attr.aria-label]="t().controls.langSwitchAria"
      (click)="i18n.toggle()"
    >
      {{ t().controls.langSwitch }}
    </button>
  `,
  styles: `
    .control-pill {
      position: fixed;
      top: 18px;
      z-index: 995;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
      min-width: 140px;
      padding: 0.55rem 1.1rem;
      font: inherit;
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--text);
      background: color-mix(in srgb, var(--primary) 16%, transparent);
      border: 2px solid color-mix(in srgb, var(--primary) 45%, transparent);
      border-radius: 999px;
      backdrop-filter: blur(12px);
      cursor: pointer;
      transition:
        background 0.3s ease,
        color 0.3s ease,
        box-shadow 0.3s ease;
    }
    .control-pill:hover,
    .control-pill:focus-visible {
      background: var(--primary);
      color: var(--bg-1);
      box-shadow:
        0 0 14px var(--primary),
        0 0 40px color-mix(in srgb, var(--primary) 50%, transparent);
    }
    .theme-toggle {
      left: 24px;
    }
    .lang-toggle {
      right: 24px;
    }
    .led {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 8px var(--accent);
      animation: led-blink 1.6s ease-in-out infinite;
    }
    @keyframes led-blink {
      50% {
        opacity: 0.35;
        transform: scale(0.8);
      }
    }
    :host-context(body.cyberpunk-theme) .control-pill {
      font-family: 'Orbitron', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-radius: 0;
      clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
    }
    @media (max-width: 600px) {
      .control-pill {
        top: 12px;
        min-width: 0;
        font-size: 0.78rem;
        padding: 0.45rem 0.8rem;
      }
      .theme-toggle {
        left: 12px;
      }
      .lang-toggle {
        right: 12px;
      }
    }
  `,
})
export class SiteControls {
  protected readonly i18n = inject(I18nService);
  private readonly theme = inject(ThemeService);

  protected readonly t = this.i18n.t;
  protected readonly isCyberpunk = computed(() => this.theme.theme() === 'cyberpunk');

  protected toggleTheme(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.theme.toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }
}
