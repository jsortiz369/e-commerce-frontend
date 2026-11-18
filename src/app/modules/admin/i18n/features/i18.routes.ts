import { Routes } from '@angular/router';

export default [
  {
    path: 'languages',
    loadComponent: () => import('./languages/languages').then((m) => m.Languages),
  },
  {
    path: 'translations',
    loadComponent: () => import('./translations/translations').then((m) => m.Translations),
  },
  {
    path: '',
    loadComponent: () => import('../i18n').then((m) => m.I18n),

    // redirectTo: 'languages',
    // pathMatch: 'full',
  },
] as Routes;
