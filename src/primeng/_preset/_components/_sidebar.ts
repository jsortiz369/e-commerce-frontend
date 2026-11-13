import { SidebarDesignTokens } from '@primeuix/themes/types/sidebar';

export const _SIDEBAR: SidebarDesignTokens = {
  panel: {
    floatingBorderRadius: '{border.radius.lg}',
  },
  groupLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '{text.muted.color}',
    padding: '0.5rem 0.75rem',
  },
  colorScheme: {
    light: {
      root: {
        borderColor: 'color-mix(in oklab, {surface.200} 80%, transparent)',
      },
      panel: {
        color: '{content.color}',
        background: 'color-mix(in oklab, {surface.0} 95%, transparent)',
        floatingShadow: `0px 12px 16px -4px rgba(0, 0, 0, 0.08), 0px 4px 6px -2px rgba(0, 0, 0, 0.03)`,
      },
      layout: {
        background: '{surface.100}',
      },
      main: {
        background: '{surface.100}',
        floatingBackground: '{surface.100}',
        insetBackground: '{surface.0}',
      },
    },
  },
  css(options) {
    return `
      .ecom-sidebar-layout .ecom-sidebar[data-variant="inset"][data-state="expanded"][data-overlay] .ecom-sidebar-panel {
        border-radius: ${options?.dt?.('sidebar.panel.floating.border.radius')};
        background-color: ${options?.dt?.('sidebar.panel.background')};
        border: 1px solid ${options.dt('sidebar.root.border.color')};
      }
      
      .ecom-sidebar-layout .ecom-sidebar-main header  {
        background-color: ${options?.dt?.('sidebar.panel.background')};
       
      }

      .ecom-sidebar-layout .ecom-sidebar-main header,
      .ecom-sidebar-layout .ecom-sidebar .ecom-sidebar-header
      {
        height: 3.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      }

      .ecom-sidebar-layout:has(.ecom-sidebar[data-variant="inset"]) .ecom-sidebar-main header {
        top: 0px;
        margin-top: 0px;
        
        border-bottom: 1px solid ${options.dt('sidebar.root.border.color')};
      }

      .ecom-sidebar-layout:has(.ecom-sidebar[data-variant="inset"]) .ecom-sidebar .ecom-sidebar-header {
        height: 3rem;
      }

      .ecom-sidebar-layout:has(.ecom-sidebar[data-variant="floating"]) .ecom-sidebar-main header {
        top: 0.25rem;
        margin-inline: 0.625rem;
        margin-top: 0.25rem;
        border: 1px solid ${options.dt('sidebar.root.border.color')};
        border-radius: ${options?.dt?.('sidebar.panel.floating.border.radius')};
      }

      .ecom-sidebar-layout:has(.ecom-sidebar[data-variant="sidebar"]) .ecom-sidebar-main header {
        top: 0x;
        border-bottom: 1px solid ${options.dt('sidebar.root.border.color')};
      }

      .ecom-sidebar-layout:has(.ecom-sidebar[data-variant="floating"]) .ecom-sidebar-main {
        padding-top: 0.25rem;
        padding-bottom: 0.5rem;
      }

      .ecom-sidebar-layout:has(.ecom-sidebar:is([data-variant="floating"], [data-variant="inset"])) .ecom-sidebar-main main {
        padding: 1rem;
      }

      .ecom-sidebar-layout:has(.ecom-sidebar[data-variant="sidebar"]) .ecom-sidebar-main main {
        padding-inline: 1rem;
      }

      .ecom-sidebar-layout:has(.ecom-sidebar[data-variant="inset"]) .ecom-sidebar-main {
        background-color: ${options.dt('sidebar.main.inset.background')};
        border-top-left-radius: ${options?.dt?.('sidebar.panel.floating.border.radius')}+0.5rem;
      }
    `;
  },
};
