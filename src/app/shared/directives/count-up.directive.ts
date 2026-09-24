import { DestroyRef, Directive, ElementRef, effect, inject, input } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { MotionService } from '../../core/motion.service';
import { gsap } from '../../core/gsap';
import { onceInView } from '../in-view';

/** Número que conta de `countFrom` até o valor quando aparece na tela. */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective {
  readonly appCountUp = input.required<number>();
  readonly countFrom = input(0);
  readonly countPrefix = input('');
  readonly countSuffix = input('');

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const i18n = inject(I18nService);
    const motion = inject(MotionService);
    const state = { value: 0, started: false };

    const render = () => {
      const formatted = new Intl.NumberFormat(i18n.locale()).format(Math.round(state.value));
      el.textContent = `${this.countPrefix()}${formatted}${this.countSuffix()}`;
    };

    effect(() => {
      state.value = state.started ? this.appCountUp() : this.countFrom();
      render();
    });

    const stop = onceInView(el, () => {
      state.started = true;
      if (motion.reducedMotion()) {
        state.value = this.appCountUp();
        render();
        return;
      }
      gsap.fromTo(
        state,
        { value: this.countFrom() },
        { value: this.appCountUp(), duration: 2.4, ease: 'power3.out', onUpdate: render },
      );
    });

    inject(DestroyRef).onDestroy(() => {
      stop();
      gsap.killTweensOf(state);
    });
  }
}
