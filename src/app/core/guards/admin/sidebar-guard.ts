import { inject } from '@angular/core';
import { CanActivateFn, NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';
import { catchError, delay, filter, finalize, forkJoin, map, of, take } from 'rxjs';

import { LoadersSystem } from '../../../shared/services/loaders-system';
import { StaticTranslationsService } from '../../../shared/services/static-translations.service';
import { Layout } from '../../../layout/services/admin/layout';

export const sidebarGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _loaderSystem = inject(LoadersSystem);
  const _layout = inject(Layout);
  const _staticTranslations = inject(StaticTranslationsService);

  const hasSidebar = _layout.sidebar().length > 0;
  const hasTranslations = _staticTranslations.hasTranslations();

  if (hasSidebar && hasTranslations) return true;

  _loaderSystem.showLoaderPageAdmin();

  // Ocultar el loader únicamente cuando el Router haya terminado de cargar los chunks lazy (loadComponent/loadChildren) y renderizado la vista
  _router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError),
      take(1),
    )
    .subscribe(() => {
      requestAnimationFrame(() => {
        _loaderSystem.hideLoaderPageAdmin();
      });
    });

  return forkJoin({
    translations: _staticTranslations.getStaticTranslations(),
    sidebar: _layout.getSidebar(),
  }).pipe(
    map(() => true),
    catchError((error) => {
      console.error('Error al cargar sidebar y traducciones en paralelo:', error);
      _loaderSystem.hideLoaderPageAdmin();
      return of(true);
    }),
  );
};
