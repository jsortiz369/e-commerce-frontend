import { ConfirmDialogDesignTokens } from '@primeuix/themes/types/confirmdialog';

export const _CONFIRMDIALOG: ConfirmDialogDesignTokens = {
  message: {
    fontSize: '{form.field.font.size}',
    fontWeight: 'normal',
  },
  colorScheme: {
    light: {
      message: {
        color: '{surface.500}',
      },
    },
    dark: {
      message: {
        color: '{surface.400}',
      },
    },
  },
  css: (options) => {
    return `
      .ecom-dialog.ecom-confirmdialog {
        overflow: hidden;
        border-radius: 1rem;
        border: 1px solid ${options.dt('content.border.color')};
        padding: 0;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)
      }

      .ecom-dialog.ecom-confirmdialog .ecom-confirmdialog-title {
        color: ${options.dt('surface.900')}
      }

      .ecom-dark .ecom-dialog.ecom-confirmdialog .ecom-confirmdialog-title {
        color: ${options.dt('surface.0')}
      }
    `;
  },
};
