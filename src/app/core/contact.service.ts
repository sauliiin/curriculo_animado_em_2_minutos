import { Injectable } from '@angular/core';
import { Point } from './theme.service';

type Opener = (origin?: Point, celebrate?: boolean) => void;

/** Abre o modal de contato (que vive no App) a partir de qualquer lugar do site. */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private opener?: Opener;

  register(opener: Opener): void {
    this.opener = opener;
  }

  /** `celebrate` dispara o confete (usado pelo botão de presente). */
  open(origin?: Point, celebrate = false): void {
    this.opener?.(origin, celebrate);
  }

  /** Centro do elemento clicado, para o confete sair dali. */
  static originOf(event: Event): Point {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }
}
