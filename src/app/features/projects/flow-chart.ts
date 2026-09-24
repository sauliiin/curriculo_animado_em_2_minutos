import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { MotionService } from '../../core/motion.service';
import { gsap } from '../../core/gsap';

/** Fluxograma vertical: nós surgem em sequência e as conexões se desenham, com um pulso percorrendo-as. */
@Component({
  selector: 'app-flow-chart',
  template: `
    <ol class="flow" #flow>
      @for (step of steps(); track $index; let last = $last) {
        <li class="step">
          <span class="node">{{ step }}</span>
          @if (!last) {
            <span class="connector" aria-hidden="true"><span class="pulse"></span></span>
          }
        </li>
      }
    </ol>
  `,
  styles: `
    .flow {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 2.2rem 0;
      padding: 2rem 1rem;
      list-style: none;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid color-mix(in srgb, var(--project-accent) 35%, transparent);
      border-radius: 14px;
    }
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .node {
      display: inline-block;
      padding: 0.6rem 1.2rem;
      font-family: var(--font-mono);
      font-size: 0.98rem;
      color: var(--project-accent);
      background: color-mix(in srgb, var(--project-accent) 8%, transparent);
      border: 1px solid color-mix(in srgb, var(--project-accent) 55%, transparent);
      border-radius: 10px;
      box-shadow: 0 0 16px color-mix(in srgb, var(--project-accent) 22%, transparent);
      transition:
        transform 0.3s var(--ease-spring),
        box-shadow 0.3s ease;
    }
    .node:hover {
      transform: scale(1.06);
      box-shadow: 0 0 26px color-mix(in srgb, var(--project-accent) 55%, transparent);
    }
    .connector {
      position: relative;
      width: 2px;
      height: 34px;
      margin: 4px 0;
      overflow: hidden;
      transform-origin: 50% 0;
      background: color-mix(in srgb, var(--project-accent) 35%, transparent);
    }
    .connector::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 50%;
      width: 8px;
      height: 8px;
      border-right: 2px solid var(--project-accent);
      border-bottom: 2px solid var(--project-accent);
      transform: translateX(-50%) rotate(45deg);
    }
    .pulse {
      position: absolute;
      left: 0;
      width: 100%;
      height: 12px;
      background: linear-gradient(transparent, var(--project-accent), transparent);
      animation: travel 1.6s linear infinite;
    }
    @keyframes travel {
      from {
        top: -12px;
      }
      to {
        top: 100%;
      }
    }
  `,
})
export class FlowChart {
  readonly steps = input.required<string[]>();
  private readonly flow = viewChild.required<ElementRef<HTMLElement>>('flow');

  constructor() {
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (motion.reducedMotion()) return;
      const flow = this.flow().nativeElement;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: flow, start: 'top 80%', once: true } });
        flow.querySelectorAll('.step').forEach((step) => {
          tl.from(step.querySelector('.node'), { autoAlpha: 0, scale: 0.6, y: 12, duration: 0.45, ease: 'back.out(2.2)' });
          const connector = step.querySelector('.connector');
          if (connector) tl.from(connector, { scaleY: 0, duration: 0.25, ease: 'power1.in' });
        });
      });
      destroyRef.onDestroy(() => ctx.revert());
    });
  }
}
