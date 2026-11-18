import { converter, formatHex } from 'culori';

import { _PALETTE } from './_palette.constants';
import { PaletteScale } from './_palette.types';

const toOklch = converter('oklch');
const COLOR_MAP: Record<keyof PaletteScale, { l: number; c: number }> = {
  50: { l: 0.985, c: 0.003 },
  100: { l: 0.953, c: 0.006 },
  200: { l: 0.908, c: 0.012 },
  300: { l: 0.847, c: 0.018 },
  400: { l: 0.72, c: 0.021 },
  500: { l: 0.55, c: 0.03 },
  600: { l: 0.45, c: 0.025 },
  700: { l: 0.38, c: 0.022 },
  800: { l: 0.29, c: 0.018 },
  900: { l: 0.22, c: 0.014 },
  950: { l: 0.14, c: 0.01 },
};

function generateScaleFrom500(baseHex: string): PaletteScale {
  const base = toOklch(baseHex);
  if (!base) throw new Error('Invalid HEX color');

  const reference = COLOR_MAP[500];
  const scale = {} as PaletteScale;
  for (const key in COLOR_MAP) {
    if (!Object.hasOwn(COLOR_MAP, key)) continue;
    const step = Number(key) as keyof PaletteScale;

    if (step === 500) {
      scale[step] = baseHex.toLowerCase();
      continue;
    }

    const target = COLOR_MAP[step];
    const l = Math.min(0.99, Math.max(0.01, base.l + (target.l - reference.l)));
    const c = Math.max(0, base.c * (target.c / reference.c));
    scale[step] = formatHex({ mode: 'oklch', l, c, h: base.h }) ?? baseHex.toLowerCase();
  }

  return scale;
}

export function resolvePaletteScale(inputColor: string) {
  const normalizedInput = inputColor?.toLowerCase().trim() ?? '#215ada';

  /* for (const [name, scale] of Object.entries(_PALETTE)) {
    if (scale[500]?.toLowerCase() === normalizedInput) return scale;
  } */

  return generateScaleFrom500(normalizedInput);
}
