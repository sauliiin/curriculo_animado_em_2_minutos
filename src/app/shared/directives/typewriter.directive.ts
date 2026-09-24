import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, effect, inject, input, untracked } from '@angular/core';
import { MotionService } from '../../core/motion.service';
import { onceInView } from '../in-view';

/** Divide em grafemas para não quebrar emojis compostos (ex.: 🦸🏻‍♂️). */
function graphemes(text: string, locale: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    return Array.from(new Intl.Segmenter(locale, { granularity: 'grapheme' }).segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

/** Efeito máquina de escrever, iniciado quando o elemento aparece na tela. */
@Directive({ selector: '[appTypewriter]' })
export class TypewriterDirective {
  readonly appTypewriter = input.required<string>();
  readonly typeSpeed = input(55);
  readonly typeDelay = input(700);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const doc = inject(DOCUMENT);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let done = false;

    const type = (text: string) => {
      const chars = graphemes(text, doc.documentElement.lang);
      let index = 0;
      el.classList.add('is-typing');
      const next = () => {
        el.textContent = chars.slice(0, index).join('');
        index += 1;
        if (index <= chars.length) {
          timer = setTimeout(next, this.typeSpeed());
        } else {
          el.classList.remove('is-typing');
          done = true;
        }
      };
      timer = setTimeout(next, this.typeDelay());
    };

    effect(() => {
      const text = this.appTypewriter();
      // Depois de digitado (ou sem animação), trocas de idioma aparecem direto.
      untracked(() => {
        if (done || motion.reducedMotion()) el.textContent = text;
      });
    });

    const stop = onceInView(el.parentElement ?? el, () => {
      if (motion.reducedMotion()) return;
      type(this.appTypewriter());
    });

    inject(DestroyRef).onDestroy(() => {
      stop();
      clearTimeout(timer);
    });
  }
}
