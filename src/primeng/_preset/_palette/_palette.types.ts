import { ColorScale } from '@primeuix/themes';

export type PaletteScale = Omit<Required<ColorScale>, 0>;
export interface PaletteColor {
  [key: string]: PaletteScale;
}
