import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { ContactService } from '../../core/contact.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { MagneticDirective } from '../directives/magnetic.directive';

/** Botão de contato sempre à mão; aparece depois que o hero sai da tela. */
@Component({
  selector: 'app-floating-contact',
  imports: [MagneticDirective],
  template: `
    <button
      type="button"
      class="fab"
      appMagnetic
      [class.is-visible]="visible()"
      [attr.tabindex]="visible() ? null : -1"
      [attr.aria-hidden]="!visible()"
      [attr.aria-label]="label()"
      (click)="open($event)"
    >
      <span class="ping" aria-hidden="true"></span>
      💬 <span class="label">{{ label() }}</span>
    </button>
  `,
  styles: `
    .fab {
      position: fixed;
      right: 24px;
      bottom: 24px;
      z-index: 980;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.85rem 1.3rem;
      font-size: 1rem;
      font-weight: 800;
      color: var(--bg-1);
      background: linear-gradient(120deg, var(--primary), var(--accent));
      border: 0;
      border-radius: 999px;
      box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.4),
        0 0 24px color-mix(in srgb, var(--primary) 55%, transparent);
      cursor: pointer;
      opacity: 0;
      translate: 0 120%;
      pointer-events: none;
      transition:
        opacity 0.4s ease,
        translate 0.6s var(--ease-spring),
        box-shadow 0.3s ease;
    }
    .fab.is-visible {
      opacity: 1;
      translate: 0 0;
      pointer-events: auto;
    }
    .fab:hover {
      box-shadow:
        0 0 26px var(--primary),
        0 0 50px var(--accent);
    }
    .ping {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border: 2px solid var(--primary);
      animation: ping 2.2s var(--ease-out) infinite;
      pointer-events: none;
    }
    @keyframes ping {
      from {
        opacity: 0.8;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(1.35, 1.7);
      }
    }
    :host-context(body.cyberpunk-theme) .fab {
      font-family: 'Orbitron', sans-serif;
      text-transform: uppercase;
      border-radius: 0;
      clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
    }
    :host-context(body.cyberpunk-theme) .ping {
      display: none;
    }
    @media (max-width: 900px) {
      .fab {
        right: 16px;
        bottom: 84px;
        padding: 0.8rem;
        font-size: 1.3rem;
      }
      .label {
        display: none;
      }
    }
  `,
})
export class FloatingContact {
  private readonly i18n = inject(I18nService);
  private readonly contact = inject(ContactService);
  protected readonly label = computed(() => this.i18n.t().home.contact.floating);
  protected readonly visible = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = () => this.visible.set(window.scrollY > window.innerHeight * 0.7);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  protected open(event: MouseEvent): void {
    this.contact.open(ContactService.originOf(event));
  }
}
