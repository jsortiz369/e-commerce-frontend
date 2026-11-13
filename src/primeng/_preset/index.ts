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
};

export const configPreset = (paletteColor?: PaletteConfig) => {
  const primary = resolvePaletteScale(paletteColor?.primaryColor ?? '#215ada');
  const secondary = resolvePaletteScale(paletteColor?.secondaryColor ?? '#14b8a6');
  const success = resolvePaletteScale(paletteColor?.successColor ?? '#22c55e');
  const info = resolvePaletteScale(paletteColor?.infoColor ?? '#0ea5e9');
  const warn = resolvePaletteScale(paletteColor?.warnColor ?? '#f97316');
  const help = resolvePaletteScale(paletteColor?.helpColor ?? '#a855f7');
  const danger = resolvePaletteScale(paletteColor?.dangerColor ?? '#ef4444');

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
      colorScheme: {
        light: {
          surface: {
            0: '#ffffff',
            50: '{slate.50}',
            100: '{slate.100}',
            200: '{slate.200}',
            300: '{slate.300}',
            400: '{slate.400}',
            500: '{slate.500}',
            600: '{slate.600}',
            700: '{slate.700}',
            800: '{slate.800}',
            900: '{slate.900}',
            950: '{slate.950}',
          },
          primary: {
            ...primary,
            color: '{primary.500}',
            contrastColor: '{surface.0}',
            hoverColor: '{primary.600}',
            activeColor: '{primary.600}',
          },
        },
      },
    },
    components: { ...Aura.components, ..._COMPONENTS },
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
