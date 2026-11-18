import { Routes } from '@angular/router';
import { sidebarGuard } from '../core/guards/admin/sidebar-guard';

export default [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
    //loadChildren: () => import('./store/store.routes'),
  },
  {
    path: 'admin-2',
    loadComponent: () => import('../layout/admin-2/layout/layout').then((c) => c.Layout),
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: 'admin',
    canActivate: [sidebarGuard],
    loadComponent: () => import('../layout/admin/layout/layout').then((c) => c.Layout),
    loadChildren: () => import('./admin/admin.routes'),
  },
] as Routes;
