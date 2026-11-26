import { ComponentsDesignTokens } from '@primeuix/themes';

import { _BUTTON } from './_button';
import { _SIDEBAR } from './_sidebar';
import { _CARD } from './_card';
import { _VIRTUALSCROLLER } from './_virtualscroller';
import { _SCROLLAREA } from './_scrollarea';
import { _DATATABLE } from './_datatable';
import { _CONFIRMDIALOG } from './_confirmdialog';
import { _DIALOG } from './_dialog';
import { _MESSAGE } from './_message';

export const _COMPONENTS: ComponentsDesignTokens = {
  sidebar: _SIDEBAR,
  button: _BUTTON,
  card: _CARD,
  virtualscroller: _VIRTUALSCROLLER,
  scrollarea: _SCROLLAREA,
  datatable: _DATATABLE,
  confirmdialog: _CONFIRMDIALOG,
  dialog: _DIALOG,
  message: _MESSAGE,
  paginator: {
    root: {
      padding: '0.375rem 0.875rem',
    },
    navButton: {
      selectedColor: '{highlight.color}',
    },
  },
  select: {
    root: {
      sm: {
        fontSize: '{form.field.sm.font.size}',
        paddingX: '{form.field.sm.padding.x}',
        paddingY: '{form.field.sm.padding.y}',
      },
      lg: {
        fontSize: '{form.field.lg.font.size}',
        paddingX: '{form.field.lg.padding.x}',
        paddingY: '{form.field.lg.padding.y}',
      },
    },
    option: {
      padding: '0.375rem 0.625rem',
      fontSize: '{form.field.sm.font.size}',
    },
  },
};
