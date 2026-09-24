import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import confetti from 'canvas-confetti';
import { ContactService } from '../../core/contact.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { GITHUB_URL, LINKEDIN_URL } from '../../core/links';
import { MotionService } from '../../core/motion.service';
import { Point } from '../../core/theme.service';
import { MagneticDirective } from '../directives/magnetic.directive';
import { BrandIcon } from './brand-icon';
import { readThemeColor, rgba } from './canvas-colors';

type Copyable = 'phone' | 'email';

/**
 * Modal de contato global, aberto pelo ContactService.
 * Usa <dialog> nativo (foco preso, Esc fecha) animado com @starting-style.
 * O confete é desenhado num canvas dentro do dialog para ficar acima do backdrop
 * (o dialog vive na "top layer", acima de qualquer z-index).
 */
@Component({
  selector: 'app-contact-modal',
  imports: [BrandIcon, MagneticDirective],
  template: `
    <dialog #dialog [attr.aria-label]="t().name" (click)="onBackdropClick($event)" (close)="copied.set(null)">
      <canvas #confetti class="confetti" aria-hidden="true"></canvas>
      <div class="card glass-card neon-frame">
        <button type="button" class="close" [attr.aria-label]="t().close" (click)="close()">&times;</button>

        <img class="avatar" src="assets/foto2.png" alt="" />
        <h3>{{ t().name }}</h3>
        <p class="role">{{ t().title }}</p>
        <p class="location">📍 {{ t().location }}</p>

        <ul class="rows">
          <li>
            <span class="label">{{ t().phoneLabel }}</span>
            <a class="value" [href]="'tel:+' + digits()">{{ t().phone }}</a>
            <button type="button" class="copy" (click)="copy('phone')">
              {{ copied() === 'phone' ? t().copied : t().copy }}
            </button>
          </li>
          <li>
            <span class="label">{{ t().emailLabel }}</span>
            <a class="value" [href]="'mailto:' + t().email">{{ t().email }}</a>
            <button type="button" class="copy" (click)="copy('email')">
              {{ copied() === 'email' ? t().copied : t().copy }}
            </button>
          </li>
        </ul>

        <div class="actions">
          <a class="btn btn-primary" appMagnetic [href]="whatsappHref()" target="_blank" rel="noopener noreferrer"
            >💬 {{ t().whatsapp }}</a
          >
          <a class="btn btn-ghost" appMagnetic [href]="'mailto:' + t().email">✉️ {{ t().sendEmail }}</a>
        </div>
        <div class="actions">
          <a class="btn btn-ghost" appMagnetic [href]="linkedin" target="_blank" rel="noopener noreferrer"
            ><app-brand-icon name="linkedin" /> LinkedIn</a
          >
          <a class="btn btn-ghost" appMagnetic [href]="github" target="_blank" rel="noopener noreferrer"
            ><app-brand-icon name="github" /> GitHub</a
          >
          <a class="btn btn-ghost" appMagnetic [href]="t().cvHref" download>⬇ {{ t().cv }}</a>
        </div>
      </div>
    </dialog>
  `,
  styles: `
    dialog {
      position: fixed;
      inset: 0;
      display: grid;
      place-items: center;
      width: 100%;
      max-width: none;
      height: 100%;
      max-height: none;
      padding: 1rem;
      overflow-y: auto;
      color: var(--text);
      background: transparent;
      border: 0;
      opacity: 0;
      transition:
        opacity 0.35s ease,
        overlay 0.35s allow-discrete,
        display 0.35s allow-discrete;
    }
    dialog:not([open]) {
      display: none;
    }
    dialog[open] {
      opacity: 1;
    }
    @starting-style {
      dialog[open] {
        opacity: 0;
      }
    }
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.72);
      backdrop-filter: blur(8px);
    }
    .confetti {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
    }
    .card {
      position: relative;
      width: min(560px, 100%);
      padding: 2.2rem 1.8rem 1.8rem;
      text-align: center;
      backdrop-filter: blur(22px);
      transform: translateY(40px) scale(0.85) rotateX(18deg);
      transition: transform 0.6s var(--ease-spring);
    }
    dialog[open] .card {
      transform: none;
    }
    @starting-style {
      dialog[open] .card {
        transform: translateY(40px) scale(0.85) rotateX(18deg);
      }
    }
    .close {
      position: absolute;
      top: 12px;
      right: 18px;
      font-size: 2rem;
      line-height: 1;
      color: var(--text);
      background: none;
      border: 0;
      opacity: 0.7;
      cursor: pointer;
      transition:
        opacity 0.3s ease,
        transform 0.4s var(--ease-spring);
    }
    .close:hover {
      opacity: 1;
      transform: rotate(90deg) scale(1.2);
    }
    .avatar {
      width: 92px;
      height: 92px;
      object-fit: cover;
      border-radius: 50%;
      border: 3px solid var(--primary);
      box-shadow: 0 0 24px color-mix(in srgb, var(--primary) 60%, transparent);
    }
    h3 {
      margin-top: 0.8rem;
      font-size: 1.6rem;
      color: var(--primary);
    }
    .role {
      margin: 0.2rem auto 0;
      font-size: 1.05rem;
      font-weight: 700;
    }
    .location {
      margin: 0.2rem auto 1.2rem;
      font-size: 0.92rem;
      color: var(--muted);
    }
    .rows {
      display: grid;
      gap: 0.5rem;
      margin-bottom: 1.2rem;
      list-style: none;
    }
    .rows li {
      display: grid;
      grid-template-columns: 5.5rem 1fr auto;
      align-items: center;
      gap: 0.6rem;
      padding: 0.55rem 0.8rem;
      text-align: left;
      background: color-mix(in srgb, var(--primary) 6%, transparent);
      border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
      border-radius: 12px;
    }
    .label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
    }
    .value {
      max-width: none;
      overflow-wrap: anywhere;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      line-height: 1.3;
      color: var(--text);
    }
    .copy {
      padding: 0.3rem 0.7rem;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--primary);
      background: transparent;
      border: 1px solid var(--primary);
      border-radius: 999px;
      cursor: pointer;
      transition:
        background 0.25s ease,
        color 0.25s ease;
    }
    .copy:hover {
      color: var(--bg-1);
      background: var(--primary);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.6rem;
      margin-top: 0.6rem;
    }
    .actions .btn {
      padding: 0.7rem 1.1rem;
      font-size: 0.92rem;
    }
    :host-context(body.cyberpunk-theme) :is(.rows li, .copy, .avatar) {
      border-radius: 0;
    }
    @media (max-width: 480px) {
      .rows li {
        grid-template-columns: 1fr auto;
      }
      .label {
        grid-column: 1 / -1;
      }
    }
  `,
})
export class ContactModal {
  private readonly i18n = inject(I18nService);
  private readonly motion = inject(MotionService);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('confetti');
  private fire?: confetti.CreateTypes;
  private copyTimer?: ReturnType<typeof setTimeout>;

  protected readonly linkedin = LINKEDIN_URL;
  protected readonly github = GITHUB_URL;
  protected readonly t = computed(() => this.i18n.t().home.contact);
  protected readonly digits = computed(() => this.t().phone.replace(/\D/g, ''));
  protected readonly whatsappHref = computed(
    () => `https://wa.me/${this.digits()}?text=${encodeURIComponent(this.t().whatsappMessage)}`,
  );
  protected readonly copied = signal<Copyable | null>(null);

  constructor() {
    inject(ContactService).register((origin, celebrate) => this.open(origin, celebrate));

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.fire = confetti.create(this.canvas().nativeElement, { resize: true });
    });
    destroyRef.onDestroy(() => {
      this.fire?.reset();
      clearTimeout(this.copyTimer);
    });
  }

  open(origin?: Point, celebrate = false): void {
    const dialog = this.dialog().nativeElement;
    if (!dialog.open) dialog.showModal();
    if (celebrate && !this.motion.reducedMotion()) this.celebrate(origin);
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  protected onBackdropClick(event: MouseEvent): void {
    // O dialog ocupa a tela toda; clicar fora do cartão fecha.
    if (event.target === this.dialog().nativeElement) this.close();
  }

  protected copy(what: Copyable): void {
    const text = what === 'phone' ? this.t().phone : this.t().email;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.copied.set(what);
        clearTimeout(this.copyTimer);
        this.copyTimer = setTimeout(() => this.copied.set(null), 2000);
      })
      .catch(() => undefined);
  }

  private celebrate(origin?: Point): void {
    const fire = this.fire;
    if (!fire) return;
    const colors = ['--primary', '--accent', '--highlight'].map((name) => rgba(readThemeColor(name, '#ffffff'), 1));
    const center = origin
      ? { x: origin.x / window.innerWidth, y: origin.y / window.innerHeight }
      : { x: 0.5, y: 0.6 };

    fire({ particleCount: 140, spread: 90, startVelocity: 48, origin: center, colors, scalar: 1.1 });
    setTimeout(() => {
      fire({ particleCount: 70, angle: 60, spread: 65, origin: { x: 0, y: 0.85 }, colors });
      fire({ particleCount: 70, angle: 120, spread: 65, origin: { x: 1, y: 0.85 }, colors });
    }, 250);
    setTimeout(() => {
      fire({ particleCount: 40, spread: 360, startVelocity: 30, shapes: ['star'], origin: { x: 0.5, y: 0.35 }, colors, scalar: 1.4 });
    }, 550);
  }
}
