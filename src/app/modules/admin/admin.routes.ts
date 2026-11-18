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
    loadChildren: () => import('./i18n/features/i18.routes'),
  },
] as Routes;
