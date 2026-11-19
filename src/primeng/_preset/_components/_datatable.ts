import { DataTableDesignTokens } from '@primeuix/themes/types/datatable';

export const _DATATABLE: DataTableDesignTokens = {
  root: {
    borderColor: '{content.border.color}',
  },
  headerCell: {
    padding: '0.5rem 0.875rem',
    sm: {
      padding: '0.125rem 0.375rem',
    },
    lg: {
      padding: '0.75rem 1.125rem',
    },
  },
  footer: {
    sm: {
      padding: '5px',
    },
  },
  paginatorBottom: {
    borderColor: '{content.border.color}',
  },
  colorScheme: {
    light: {
      header: {
        background: '',
      },
      headerCell: {
        background: '{primary.100}',
        color: '{primary.800}',
        hoverBackground: '{primary.200}',
        hoverColor: '{primary.800}',
        selectedBackground: '{primary.500}',
        selectedColor: '{primary.contrast.color}',
      },
      bodyCell: {
        selectedBorderColor: 'red',
      },
    },
    dark: {
      headerCell: {
        background: '{primary.950}',
        color: '{primary.100}',
        hoverBackground: '{primary.900}',
        hoverColor: '{primary.100}',
      },
    },
  },
  css(options) {
    return `
      .ecom-datatable .ecom-paginator .ecom-select .ecom-select-label {
        padding: ${options.dt('select.sm.padding.y')}  ${options.dt('select.sm.padding.x')};
      }

      .ecom-datatable.ecom-datatable-gridlines .ecom-datatable-paginator-bottom {
        border-radius: 0
      }

      .ecom-datatable[paginatorposition="bottom"]:not(:has(> .ecom-datatable-header)) .ecom-datatable-table-container,
      .ecom-datatable:not(:has(> .ecom-datatable-header)) .ecom-datatable-table-container,
      .ecom-datatable .ecom-datatable-header {
        border-top-left-radius: ${options.dt('content.border.radius')};
        border-top-right-radius: ${options.dt('content.border.radius')};
      }

      .ecom-datatable[paginatorposition="bottom"] .ecom-paginator {
        border-bottom-left-radius: ${options.dt('content.border.radius')};
        border-bottom-right-radius: ${options.dt('content.border.radius')};
      }

      .ecom-datatable[paginatorposition="top"] .ecom-paginator {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;    
      }
    `;
  },
};
