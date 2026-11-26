import { Routes } from '@angular/router';

export default [
  {
    path: 'languages',
    loadComponent: () => import('./languages/languages.component').then((m) => m.LanguagesComponent),
  },
  {
    path: 'translations',
    //loadComponent: () => import('./translations/translations').then((m) => m.Translations),
    loadComponent: () => import('./languages-2/languages').then((m) => m.Languages),
  },
  {
    path: '',
    redirectTo: 'languages',
    pathMatch: 'full',
  },
] as Routes;
