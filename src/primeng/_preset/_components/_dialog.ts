import { DialogDesignTokens } from '@primeuix/themes/types/dialog';

export const _DIALOG: DialogDesignTokens = {
  root: {
    borderRadius: '{overlay.modal.border.radius}',
    shadow: '{overlay.modal.shadow}',
  },
  header: {
    padding: '{overlay.modal.padding}',
    gap: '{overlay.modal.gap}',
  },
  content: {
    padding: '{overlay.modal.padding}',
  },
  footer: {
    padding: '{overlay.modal.padding}',
    gap: '{overlay.modal.gap}',
  },
  title: {
    fontSize: '1.075rem',
    fontWeight: '600',
  },
  colorScheme: {
    light: {
      root: {
        borderColor: '{overlay.modal.border.color}',
      },
    },
  },
};
