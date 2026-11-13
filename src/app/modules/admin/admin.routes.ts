import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'pos',
    loadComponent: () => import('./pos/pos').then((m) => m.Pos),
  },
  {
    path: 'i18n',
    loadComponent: () => import('./i18n/i18n').then((m) => m.I18n),
  },
] as Routes;
