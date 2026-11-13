import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { finalize, map, timer } from 'rxjs';

import { LoadersSystem } from '../../../shared/services/loaders-system';

export const sidebarGuard: CanActivateFn = (route, state) => {
  const _loaderSystem = inject(LoadersSystem);

  _loaderSystem.showLoaderPageAdmin();
  return timer(5000).pipe(
    map(() => {
      console.log('Consulta finalizada');
      return true;
    }),
    finalize(() => _loaderSystem.hideLoaderPageAdmin()),
  );
};
