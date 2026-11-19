import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import { _SEMANTIC } from './_semantic';
import { _COMPONENTS } from './_components';
import { _PALETTE, resolvePaletteScale } from './_palette';

export type PaletteConfig = {
  primaryColor: string;
  secondaryColor: string;
  infoColor: string;
  successColor: string;
  warnColor: string;
  helpColor: string;
  dangerColor: string;
  surface: string;
};

export const configPreset = (paletteColor?: PaletteConfig) => {
  //const primary = resolvePaletteScale(paletteColor?.primaryColor ?? '#f43f5e');
  const primary = resolvePaletteScale(paletteColor?.primaryColor ?? '#2F6FE3');
  const secondary = resolvePaletteScale(paletteColor?.secondaryColor ?? '#14b8a6');
  const success = resolvePaletteScale(paletteColor?.successColor ?? '#22c55e');
  const info = resolvePaletteScale(paletteColor?.infoColor ?? '#0ea5e9');
  const warn = resolvePaletteScale(paletteColor?.warnColor ?? '#f97316');
  const help = resolvePaletteScale(paletteColor?.helpColor ?? '#a855f7');
  const danger = resolvePaletteScale(paletteColor?.dangerColor ?? '#ef4444');
  const surface = resolvePaletteScale(paletteColor?.surface ?? '#64748b');

  return definePreset(Aura, {
    primitive: {
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
      },
      ..._PALETTE,
    },
    semantic: {
      ..._SEMANTIC,
      surface: {
        0: '#ffffff',
        ...surface,
      },
      colorScheme: {
        light: {
          primary: {
            ...primary,
            color: '{primary.500}',
            contrastColor: '{surface.0}',
            hoverColor: '{primary.600}',
            activeColor: '{primary.600}',
          },
          highlight: {
            background: '{primary.50}',
            focusBackground: '{primary.100}',
            color: '{primary.700}',
            focusColor: '{primary.800}',
          },
        },
      },
    },
    components: { /*...Aura.components,*/ ..._COMPONENTS },
    extend: {
      secondary: {
        ...secondary,
        color: '{secondary.500}',
        contrastColor: '{secondary.600}',
        hoverColor: '{secondary.600}',
        activeColor: '{secondary.600}',
      },
      info: {
        ...info,
        color: '{info.500}',
        contrastColor: '{surface.0}',
        hoverColor: '{info.600}',
        activeColor: '{info.600}',
      },
      success: {
        ...success,
        color: '{success.500}',
        contrastColor: '{surface.0}',
        hoverColor: '{success.600}',
        activeColor: '{success.600}',
      },
      warn: {
        ...warn,
        color: '{warn.500}',
        contrastColor: '{surface.0}',
        hoverColor: '{warn.600}',
        activeColor: '{warn.600}',
      },
      help: {
        ...help,
        color: '{help.500}',
        contrastColor: '{surface.0}',
        hoverColor: '{help.600}',
        activeColor: '{help.600}',
      },
      danger: {
        ...danger,
        color: '{danger.500}',
        contrastColor: '{surface.0}',
        hoverColor: '{danger.600}',
        activeColor: '{danger.600}',
      },
    },
  });
};
