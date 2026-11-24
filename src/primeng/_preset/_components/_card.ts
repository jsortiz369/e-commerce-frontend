import { CardDesignTokens } from '@primeuix/themes/types/card';

export const _CARD: CardDesignTokens = {
  root: {
    background: '{surface.0}',
    borderRadius: '{content.border.radius}',
    color: '{content.color}',
    shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  },
  body: {
    padding: '0.5rem',
    gap: '0.5rem',
  },
  caption: {
    gap: '0.5rem',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '500',
  },
  subtitle: {
    color: '{text.muted.color}',
    fontSize: '0.875rem',
  },
  css: (options) => `
    .p-card {
      border-color: ${options?.dt?.('content.border.color')};
      border-width: 1px
    }
  `,
  /*  
  colorScheme: {
    dark: {
      root: {
        background: '{surface.900}',
      },
    },
  }, */
};
