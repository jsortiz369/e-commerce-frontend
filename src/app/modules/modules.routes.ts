import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadChildren: () => import('./store/store.routes'),
  },
  {
    path: 'admin-2',
    loadComponent: () => import('../layout/admin-2/layout/layout').then((c) => c.Layout),
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: 'admin',
    loadComponent: () => import('../layout/admin/layout/layout').then((c) => c.Layout),
    loadChildren: () => import('./admin/admin.routes'),
  },
] as Routes;
