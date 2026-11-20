import { SidebarDesignTokens } from '@primeuix/themes/types/sidebar';

export const _SIDEBAR: SidebarDesignTokens = {
  panel: {
    floatingBorderRadius: '{content.border.radius}',
  },
  groupLabel: {
    fontSize: '{form.field.sm.font.size}',
    fontWeight: 'bold',
    color: '{text.muted.color}',
    padding: '0.5rem 0.75rem',
  },
  colorScheme: {
    light: {
      root: {
        borderColor: '{content.border.color}',
      },
      panel: {
        color: '{content.color}',
        background: '{surface.0}', // 'color-mix(in oklab, {surface.0} 100%, transparent)',
        floatingShadow: `0px 12px 16px -4px rgba(0, 0, 0, 0.08), 0px 4px 6px -2px rgba(0, 0, 0, 0.03)`,
      },
      layout: {
        background: '{surface.100}',
      },
      main: {
        background: '{surface.50}',
        floatingBackground: '{surface.50}',
        insetBackground: '{surface.50}',
      },
      menuAction: {
        focusBackground: 'blue',
      },
      menuSub: {},
      menuBadge: { background: 'green', borderColor: 'red' },
      menuButton: {
        focusBackground: '{primary.100}',
        focusColor: '{primary.color}',
        activeBackground: '{primary.color}',
        activeColor: '{primary.contrast.color}',
        icon: {
          focusColor: '{primary.color}',
          size: '1.25rem',
        },
      },
      menuSubButton: {
        focusBackground: 'transparent',
        focusColor: '{primary.color}',
        activeBackground: 'color-mix(in oklab, {primary.100} 45%, transparent)',
        activeColor: '{primary.color}',
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
      .ecom-sidebar-layout .ecom-sidebar .ecom-sidebar-header {
        height: 3rem;
      }

      .ecom-sidebar-layout .ecom-sidebar .ecom-sidebar-header,
      .ecom-sidebar-layout .ecom-sidebar-main header {
        border-bottom: 1px solid ${options.dt('sidebar.root.border.color')};
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      }

      .ecom-sidebar-layout:has(.ecom-sidebar[data-variant="inset"]) .ecom-sidebar-main header {
        top: 0px;
        margin-top: 0px;
      }

      .ecom-sidebar-layout:has(.ecom-sidebar[data-variant="floating"]) .ecom-sidebar-main header {
        top: 0.25rem;
        margin-inline: 0.625rem;
        margin-top: 0.25rem;
        border-radius: ${options?.dt?.('sidebar.panel.floating.border.radius')};
        border: 1px solid ${options.dt('sidebar.root.border.color')};
      }

      .ecom-sidebar-layout .ecom-sidebar-main {
        padding-bottom: 0.5rem;
      }

      .ecom-sidebar-layout:has(.ecom-sidebar[data-variant="floating"]) .ecom-sidebar-main {
        padding-top: 0.25rem;
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

      .ecom-sidebar-layout .ecom-sidebar-menu-button[data-active="true"] svg {
        color: ${options.dt('primary.contrast.color')}
      }

      .ecom-sidebar-layout [class*="sidebar-menu-sub-enter-from"],
      .ecom-sidebar-layout [class*="sidebar-menu-sub-leave-to"] {
        height: 0 !important;
        opacity: 0;
        transform: translateY(-4px);
      }

      .ecom-sidebar-layout [class*="sidebar-menu-sub-enter-to"],
      .ecom-sidebar-layout [class*="sidebar-menu-sub-leave-from"] {
        height: var(--px-sidebar-menu-sub-height, auto);
        opacity: 1;
        transform: translateY(0);
      }

      .ecom-sidebar-layout [class*="sidebar-menu-sub-enter-active"],
      .ecom-sidebar-layout [class*="sidebar-menu-sub-leave-active"] {
        transition: height 240ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease-in-out, transform 200ms ease-out;
        overflow: hidden;
      }
    `;
  },
};
