import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { watchInView } from '../in-view';

/**
 * Vídeo mudo que só toca (e só baixa) quando está visível.
 * Os vídeos dos projetos somam ~47 MB — isso evita baixar todos ao abrir a página.
 */
@Directive({ selector: 'video[appAutoplayInView]' })
export class AutoplayInViewDirective {
  constructor() {
    const video = inject<ElementRef<HTMLVideoElement>>(ElementRef).nativeElement;
    let stop: (() => void) | undefined;

    afterNextRender(() => {
      video.muted = true;
      stop = watchInView(
        video,
        (visible) => {
          if (visible) video.play().catch(() => undefined);
          else video.pause();
        },
        { threshold: 0.25 },
      );
    });

    inject(DestroyRef).onDestroy(() => stop?.());
  }
}
