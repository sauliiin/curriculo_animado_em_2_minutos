import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { MotionService } from '../../core/motion.service';
import { gsap } from '../../core/gsap';

export type RevealVariant = 'up' | 'left' | 'right' | 'zoom' | 'blur' | 'flip' | 'clip';

const FROM: Record<RevealVariant, gsap.TweenVars> = {
  up: { y: 60, autoAlpha: 0 },
  left: { x: -90, autoAlpha: 0 },
  right: { x: 90, autoAlpha: 0 },
  zoom: { scale: 0.8, autoAlpha: 0 },
  blur: { y: 30, autoAlpha: 0, filter: 'blur(14px)' },
  flip: { rotationX: -75, y: 40, autoAlpha: 0, transformPerspective: 900, transformOrigin: '50% 0%' },
  clip: { clipPath: 'inset(0% 0% 100% 0%)', y: 30 },
};

/**
 * Anima a entrada do elemento quando ele aparece na tela (GSAP + ScrollTrigger).
 * Uso: `<div appReveal="blur" [revealStagger]="'li'" [revealDelay]="0.2">`
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  readonly appReveal = input<RevealVariant | ''>('');
  readonly revealDelay = input(0);
  /** Seletor dos filhos a animar em sequência, em vez do próprio elemento. */
  readonly revealStagger = input<string | null>(null);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    let ctx: gsap.Context | undefined;

    afterNextRender(() => {
      if (motion.reducedMotion()) return;
      const selector = this.revealStagger();
      const targets = selector ? el.querySelectorAll(selector) : el;
      ctx = gsap.context(() => {
        gsap.from(targets, {
          ...FROM[this.appReveal() || 'up'],
          duration: 1.1,
          ease: 'power4.out',
          delay: this.revealDelay(),
          stagger: selector ? 0.12 : 0,
          clearProps: 'transform,filter,clipPath',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    });

    inject(DestroyRef).onDestroy(() => ctx?.revert());
  }
}
