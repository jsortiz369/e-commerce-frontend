import { ScrollAreaDesignTokens } from '@primeuix/themes/types/scrollarea';

export const _SCROLLAREA: ScrollAreaDesignTokens = {
  root: {
    background: 'red',
  },
  scrollbar: {
    transitionDuration: '100ms',
    background: '{surface.100}',
  },
  handle: {
    background: '{surface.300}',
  },
  css(options) {
    return `
      ::-webkit-scrollbar {
        width: ${options.dt('scrollarea.scrollbar.size')}     ;  
        height: ${options.dt('scrollarea.scrollbar.size')};     
      }

      ::-webkit-scrollbar-track {
        background: ${options.dt('scrollarea.scrollbar.background')};
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: ${options.dt('scrollarea.handle.background')};
        border-radius: 4px;
      }
    `;
  },
};
