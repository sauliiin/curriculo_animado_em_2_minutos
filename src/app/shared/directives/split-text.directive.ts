import { DestroyRef, Directive, ElementRef, effect, inject, input, untracked } from '@angular/core';
import { MotionService } from '../../core/motion.service';
import { SplitText, gsap } from '../../core/gsap';

export type SplitEffect = 'intro' | 'scrub';

/**
 * Divide o texto em letras/palavras (GSAP SplitText) e anima:
 * - `intro`: letras entram girando em 3D, com atraso escalonado (usado no título do hero);
 * - `scrub`: palavras "acendem" conforme a rolagem avança.
 */
@Directive({ selector: '[appSplitText]' })
export class SplitTextDirective {
  readonly appSplitText = input.required<string>();
  readonly splitEffect = input<SplitEffect>('intro');
  readonly splitDelay = input(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    let split: SplitText | undefined;
    let ctx: gsap.Context | undefined;

    const cleanup = () => {
      ctx?.revert();
      split?.revert();
    };

    effect(() => {
      const text = this.appSplitText();
      untracked(() => {
        cleanup();
        el.textContent = text;
        el.dataset['text'] = text;
        if (motion.reducedMotion()) return;

        if (this.splitEffect() === 'intro') {
          split = SplitText.create(el, { type: 'words,chars', charsClass: 'split-char' });
          ctx = gsap.context(() => {
            gsap.from(split!.chars, {
              yPercent: 120,
              rotationX: -90,
              autoAlpha: 0,
              transformOrigin: '50% 100%',
              transformPerspective: 600,
              duration: 1,
              ease: 'back.out(1.8)',
              stagger: { each: 0.035, from: 'start' },
              delay: this.splitDelay(),
              clearProps: 'transform,opacity,visibility',
            });
          });
        } else {
          split = SplitText.create(el, { type: 'words', wordsClass: 'split-word' });
          ctx = gsap.context(() => {
            gsap.fromTo(
              split!.words,
              { opacity: 0.12, filter: 'blur(3px)' },
              {
                opacity: 1,
                filter: 'blur(0px)',
                stagger: 0.1,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: true },
              },
            );
          });
        }
      });
    });

    inject(DestroyRef).onDestroy(cleanup);
  }
}
