import { Component, DestroyRef, afterNextRender, effect, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { I18nService } from './core/i18n/i18n.service';
import { MotionService } from './core/motion.service';
import { ThemeService } from './core/theme.service';
import { ContactModal } from './shared/components/contact-modal';
import { CursorGlow } from './shared/components/cursor-glow';
import { FloatingContact } from './shared/components/floating-contact';
import { ScrollProgress } from './shared/components/scroll-progress';
import { SiteControls } from './shared/components/site-controls';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactModal, CursorGlow, FloatingContact, ScrollProgress, SiteControls],
  template: `
    <app-scroll-progress />
    @if (showCursor) {
      <app-cursor-glow />
    }
    <app-site-controls />

    <div class="fx-layer" aria-hidden="true">
      <div class="aurora aurora-1"></div>
      <div class="aurora aurora-2"></div>
      <div class="aurora aurora-3"></div>
      <div class="spotlight"></div>
      <div class="grid-floor"></div>
      <div class="scanlines"></div>
    </div>

    <router-outlet />

    <app-floating-contact />
    <app-contact-modal />
  `,
})
export class App {
  private readonly motion = inject(MotionService);
  private readonly i18n = inject(I18nService);
  private readonly theme = inject(ThemeService);
  protected readonly showCursor = this.motion.finePointer && !this.motion.reducedMotion();

  constructor() {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.motion.initSmoothScroll();
      // As fontes do Google chegam depois do primeiro layout e mudam as alturas.
      document.fonts?.ready.then(() => this.motion.refresh());
    });

    // Cada troca de página começa do topo (ou na âncora, ex.: /projetos#omnistream)
    // e recalcula os gatilhos de rolagem.
    const sub = router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      const fragment = router.parseUrl(e.urlAfterRedirects).fragment;
      this.motion.scrollTo(0, true);
      setTimeout(() => {
        this.motion.refresh();
        if (fragment) this.motion.scrollTo(`#${fragment}`);
      }, 150);
    });
    destroyRef.onDestroy(() => sub.unsubscribe());

    // Idioma e tema (o Cyberpunk troca fontes e tamanhos) mudam as alturas da página:
    // recalcula as posições dos gatilhos de rolagem depois da transição.
    effect(() => {
      this.i18n.lang();
      this.theme.theme();
      setTimeout(() => this.motion.refresh(), 1000);
    });
  }
}
