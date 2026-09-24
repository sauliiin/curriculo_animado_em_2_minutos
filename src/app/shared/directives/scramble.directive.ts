import { DestroyRef, Directive, ElementRef, effect, inject, input, untracked } from '@angular/core';
import { MotionService } from '../../core/motion.service';
import { gsap } from '../../core/gsap';
import { onceInView } from '../in-view';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01アイウエオカキクケコ';

/**
 * Texto que "decodifica" a partir de caracteres aleatórios ao entrar na tela
 * e sempre que o texto muda (ex.: troca de idioma).
 * Também expõe o texto em `data-text`, usado pelo efeito glitch do tema Cyberpunk.
 */
@Directive({ selector: '[appScramble]' })
export class ScrambleDirective {
  readonly appScramble = input.required<string>();
  readonly scrambleDuration = input(1.4);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    let seen = false;
    let tween: gsap.core.Tween | undefined;

    const play = (text: string) => {
      tween?.kill();
      tween = gsap.to(el, {
        duration: this.scrambleDuration(),
        ease: 'none',
        scrambleText: { text, chars: GLYPHS, revealDelay: 0.25, speed: 0.5 },
      });
    };

    effect(() => {
      const text = this.appScramble();
      el.dataset['text'] = text;
      untracked(() => {
        if (seen && !motion.reducedMotion()) play(text);
        else el.textContent = text;
      });
    });

    const stop = onceInView(el, () => {
      seen = true;
      if (!motion.reducedMotion()) play(this.appScramble());
    });

    inject(DestroyRef).onDestroy(() => {
      stop();
      tween?.kill();
    });
  }
}
