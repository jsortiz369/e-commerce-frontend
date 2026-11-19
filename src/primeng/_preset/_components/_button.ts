import { ButtonDesignTokens } from '@primeuix/themes/types/button';

export const _BUTTON: ButtonDesignTokens = {
  root: {
    borderRadius: '{form.field.border.radius}',
    gap: '0.375rem',
    fontSize: '{form.field.font.size}',
    paddingX: '{form.field.padding.x}',
    paddingY: '{form.field.padding.y}',
    iconOnlyWidth: '{form.field.icon.only.width}',
    sm: {
      fontSize: '{form.field.sm.font.size}',
      paddingX: '{form.field.sm.padding.x}',
      paddingY: '{form.field.sm.padding.y}',
      iconOnlyWidth: '{form.field.sm.icon.only.width}',
    },
    lg: {
      fontSize: '{form.field.lg.font.size}',
      paddingX: '{form.field.lg.padding.x}',
      paddingY: '{form.field.lg.padding.y}',
      iconOnlyWidth: '{form.field.lg.icon.only.width}',
    },
    label: {
      fontWeight: '{form.field.font.weight}',
    },
  },
  colorScheme: {
    light: {
      root: {
        primary: {
          background: '{primary.color}',
          hoverBackground: '{primary.hover.color}',
          activeBackground: '{primary.active.color}',
          borderColor: '{primary.color}',
          hoverBorderColor: '{primary.hover.color}',
          activeBorderColor: '{primary.active.color}',
          color: '{primary.contrast.color}',
          hoverColor: '{primary.contrast.color}',
          activeColor: '{primary.contrast.color}',
          focusRing: {
            color: '{primary.color}',
            shadow: 'none',
          },
        },
        secondary: {
          background: '{secondary.100}',
          hoverBackground: '{secondary.200}',
          activeBackground: '{secondary.300}',
          borderColor: '{secondary.100}',
          hoverBorderColor: '{secondary.200}',
          activeBorderColor: '{secondary.300}',
          color: '{secondary.contrast.color}',
          hoverColor: '{secondary.contrast.color}',
          activeColor: '{secondary.contrast.color}',
          focusRing: {
            color: '{secondary.600}',
            shadow: 'none',
          },
        },
        info: {
          background: '{info.500}',
          hoverBackground: '{info.600}',
          activeBackground: '{info.700}',
          borderColor: '{info.500}',
          hoverBorderColor: '{info.600}',
          activeBorderColor: '{info.700}',
          color: '{info.contrast.color}',
          hoverColor: '{info.contrast.color}',
          activeColor: '{info.contrast.color}',
          focusRing: {
            color: '{info.500}',
            shadow: 'none',
          },
        },
        success: {
          background: '{success.500}',
          hoverBackground: '{success.600}',
          activeBackground: '{success.700}',
          borderColor: '{success.500}',
          hoverBorderColor: '{success.600}',
          activeBorderColor: '{success.700}',
          color: '{success.contrast.color}',
          hoverColor: '{success.contrast.color}',
          activeColor: '{success.contrast.color}',
          focusRing: {
            color: '{success.500}',
            shadow: 'none',
          },
        },
        warn: {
          background: '{warn.500}',
          hoverBackground: '{warn.600}',
          activeBackground: '{warn.700}',
          borderColor: '{warn.500}',
          hoverBorderColor: '{warn.600}',
          activeBorderColor: '{warn.700}',
          color: '{warn.contrast.color}',
          hoverColor: '{warn.contrast.color}',
          activeColor: '{warn.contrast.color}',
          focusRing: {
            color: '{warn.500}',
            shadow: 'none',
          },
        },
        help: {
          background: '{help.500}',
          hoverBackground: '{help.600}',
          activeBackground: '{help.700}',
          borderColor: '{help.500}',
          hoverBorderColor: '{help.600}',
          activeBorderColor: '{help.700}',
          color: '{help.contrast.color}',
          hoverColor: '{help.contrast.color}',
          activeColor: '{help.contrast.color}',
          focusRing: {
            color: '{help.500}',
            shadow: 'none',
          },
        },
        danger: {
          background: '{danger.500}',
          hoverBackground: '{danger.600}',
          activeBackground: '{danger.700}',
          borderColor: '{danger.700}',
          hoverBorderColor: '{danger.700}',
          activeBorderColor: '{danger.700}',
          color: '{danger.contrast.color}',
          hoverColor: '{danger.contrast.color}',
          activeColor: '{danger.contrast.color}',
          focusRing: {
            color: '{danger.500}',
            shadow: 'none',
          },
        },
        contrast: {
          background: '{secondary.950}',
          hoverBackground: '{secondary.900}',
          activeBackground: '{secondary.800}',
          borderColor: '{secondary.950}',
          hoverBorderColor: '{secondary.900}',
          activeBorderColor: '{secondary.800}',
          color: '{secondary.50}',
          hoverColor: '{secondary.100}',
          activeColor: '{secondary.100}',
          focusRing: {
            color: '{secondary.950}',
            shadow: 'none',
          },
        },
      },
    },
  },
  css(options) {
    return ` 
      .ecom-button[size="small"] span {
        font-weight: ${options?.dt?.('form.field.sm.font.weight')};
      }

      .ecom-button[size="large"] span {
        font-weight: ${options?.dt?.('form.field.lg.font.weight')};
      }
    `;
  },
};
