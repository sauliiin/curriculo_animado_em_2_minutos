import { Directive, ElementRef, inject, input } from '@angular/core';
import { MotionService } from '../../core/motion.service';
import { gsap } from '../../core/gsap';

/**
 * Inclinação 3D que segue o mouse, com reflexo de luz (`.tilt::after`, ver styles.css).
 */
@Directive({
  selector: '[appTilt]',
  host: {
    class: 'tilt',
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'onLeave()',
  },
})
export class TiltDirective {
  /** Inclinação máxima em graus. */
  readonly tiltMax = input(10);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);

  protected onMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || this.motion.reducedMotion()) return;
    const rect = this.el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const max = this.tiltMax();

    gsap.to(this.el, {
      rotationY: (px - 0.5) * 2 * max,
      rotationX: -(py - 0.5) * 2 * max,
      transformPerspective: 900,
      scale: 1.02,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
    this.el.style.setProperty('--glare-x', `${px * 100}%`);
    this.el.style.setProperty('--glare-y', `${py * 100}%`);
  }

  protected onLeave(): void {
    gsap.to(this.el, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 1.2,
      ease: 'elastic.out(1, 0.45)',
      overwrite: 'auto',
    });
  }
}
