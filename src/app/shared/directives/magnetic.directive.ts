import { Directive, ElementRef, inject, input } from '@angular/core';
import { MotionService } from '../../core/motion.service';
import { gsap } from '../../core/gsap';

/** O elemento é "atraído" pelo cursor e volta com efeito elástico. */
@Directive({
  selector: '[appMagnetic]',
  host: {
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'onLeave()',
  },
})
export class MagneticDirective {
  readonly magneticStrength = input(0.35);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);

  protected onMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || this.motion.reducedMotion()) return;
    const rect = this.el.getBoundingClientRect();
    const strength = this.magneticStrength();
    gsap.to(this.el, {
      x: (event.clientX - (rect.left + rect.width / 2)) * strength,
      y: (event.clientY - (rect.top + rect.height / 2)) * strength,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }

  protected onLeave(): void {
    gsap.to(this.el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
  }
}
