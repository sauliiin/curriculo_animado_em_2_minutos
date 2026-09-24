export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Lê uma variável CSS de cor do tema (definidas no <body>) e converte para RGB. */
export function readThemeColor(name: string, fallback: string): Rgb {
  const raw = getComputedStyle(document.body).getPropertyValue(name).trim() || fallback;
  // O canvas normaliza qualquer cor CSS válida para #rrggbb.
  const ctx = document.createElement('canvas').getContext('2d')!;
  ctx.fillStyle = fallback;
  ctx.fillStyle = raw;
  const hex = String(ctx.fillStyle).replace('#', '');
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

export const rgba = ({ r, g, b }: Rgb, alpha: number) => `rgba(${r},${g},${b},${alpha})`;
