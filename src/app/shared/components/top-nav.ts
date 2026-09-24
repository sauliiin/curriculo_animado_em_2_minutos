import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from '../../core/i18n/content.model';
import { MotionService } from '../../core/motion.service';

/**
 * Navegação flutuante com "scrollspy": destaca a seção visível
 * com uma pílula neon que desliza até o link ativo.
 */
@Component({
  selector: 'app-top-nav',
  imports: [RouterLink],
  template: `
    <nav class="top-nav" aria-label="Navegação principal">
      <ul #list>
        <li class="indicator" #indicator aria-hidden="true"></li>
        @for (item of items(); track item.fragment ?? item.route ?? item.href) {
          <li>
            @if (item.route) {
              <a [routerLink]="item.route">{{ item.label }}</a>
            } @else if (item.href) {
              <a [href]="item.href" target="_blank" rel="noopener noreferrer">{{ item.label }} ↗</a>
            } @else {
              <a
                [href]="'#' + item.fragment"
                [attr.data-fragment]="item.fragment"
                [class.active]="active() === item.fragment"
                [attr.aria-current]="active() === item.fragment ? 'location' : null"
                (click)="go($event, item.fragment!)"
                >{{ item.label }}</a
              >
            }
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    .top-nav {
      position: fixed;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 990;
      max-width: calc(100vw - 340px);
      padding: 0.35rem;
      border-radius: 999px;
      background: color-mix(in srgb, var(--bg-1) 55%, transparent);
      border: 1px solid var(--card-border);
      backdrop-filter: blur(14px) saturate(160%);
      box-shadow:
        0 10px 40px rgba(0, 0, 0, 0.35),
        inset 0 0 0 1px rgba(255, 255, 255, 0.03);
      overflow-x: auto;
      scrollbar-width: none;
    }
    ul {
      position: relative;
      display: flex;
      gap: 0.25rem;
      list-style: none;
      white-space: nowrap;
    }
    a {
      position: relative;
      z-index: 1;
      display: block;
      padding: 0.45rem 0.95rem;
      border-radius: 999px;
      color: var(--text);
      font-size: 0.88rem;
      font-weight: 700;
      max-width: none;
      line-height: 1.4;
      transition:
        color 0.3s ease,
        text-shadow 0.3s ease;
    }
    a:hover,
    a.active {
      color: var(--primary);
      text-decoration: none;
      text-shadow: 0 0 10px var(--primary);
    }
    .indicator {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0;
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary) 16%, transparent);
      box-shadow:
        0 0 18px color-mix(in srgb, var(--primary) 45%, transparent),
        inset 0 0 0 1px color-mix(in srgb, var(--primary) 55%, transparent);
      opacity: 0;
      transition:
        transform 0.55s cubic-bezier(0.65, 0, 0.35, 1.3),
        width 0.55s cubic-bezier(0.65, 0, 0.35, 1.3),
        opacity 0.3s ease;
      pointer-events: none;
    }
    :host-context(body.cyberpunk-theme) .top-nav,
    :host-context(body.cyberpunk-theme) .indicator {
      border-radius: 0;
      clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
    }
    @media (max-width: 900px) {
      .top-nav {
        top: auto;
        bottom: 16px;
        max-width: calc(100vw - 32px);
      }
      a {
        font-size: 0.8rem;
        padding: 0.4rem 0.75rem;
      }
    }
  `,
})
export class TopNav {
  readonly items = input.required<NavItem[]>();

  protected readonly active = signal<string | null>(null);
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');
  private readonly indicator = viewChild.required<ElementRef<HTMLElement>>('indicator');
  private readonly motion = inject(MotionService);

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      this.active();
      this.items();
      requestAnimationFrame(() => this.placeIndicator());
    });

    afterNextRender(() => {
      const sections = this.items()
        .map((item) => (item.fragment ? document.getElementById(item.fragment) : null))
        .filter((el): el is HTMLElement => !!el);

      // A seção que cruza a faixa central da tela é a ativa.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.active.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      sections.forEach((section) => observer.observe(section));

      const onResize = () => this.placeIndicator();
      window.addEventListener('resize', onResize);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        window.removeEventListener('resize', onResize);
      });
    });
  }

  protected go(event: MouseEvent, fragment: string): void {
    event.preventDefault();
    this.motion.scrollTo(`#${fragment}`);
  }

  private placeIndicator(): void {
    const indicator = this.indicator().nativeElement;
    const link = this.list().nativeElement.querySelector<HTMLElement>(`a[data-fragment="${this.active()}"]`);
    if (!link) {
      indicator.style.opacity = '0';
      return;
    }
    const left = link.parentElement!.offsetLeft;
    const width = link.offsetWidth;
    indicator.style.opacity = '1';
    indicator.style.width = `${width}px`;
    indicator.style.transform = `translateX(${left}px)`;

    // No mobile a barra rola na horizontal: mantém o link ativo à vista.
    const nav = this.list().nativeElement.parentElement!;
    if (left < nav.scrollLeft || left + width > nav.scrollLeft + nav.clientWidth) {
      nav.scrollTo({ left: left - nav.clientWidth / 2 + width / 2, behavior: 'smooth' });
    }
  }
}
