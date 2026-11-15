import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { catchError, finalize, map, of } from 'rxjs';

import { LoadersSystem } from '../../../shared/services/loaders-system';
import { Layout } from '../../../layout/services/admin/layout';

export const sidebarGuard: CanActivateFn = (route, state) => {
  const _loaderSystem = inject(LoadersSystem);
  const _layout = inject(Layout);

  if (_layout.sidebar().length > 0) return true;

  //_loaderSystem.showLoaderPageAdmin(); // descomentar mas adelante
  return _layout.getSidebar().pipe(
    map((sidebar) => true),
    catchError((error) => {
      console.error('Error al resolver sidebar en sidebarGuard:', error);
      return of(true);
    }),
    finalize(() => _loaderSystem.hideLoaderPageAdmin()),
  );
};
