import { inject } from '@angular/core';
import {
  CanActivateFn,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  Router,
} from '@angular/router';
import { catchError, filter, map, of, take } from 'rxjs';

import { LoadersSystem } from '../../shared/services/loaders-system';
import { StaticTranslationsService } from '../../shared/services/static-translations.service';

export const staticTranslationsGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _loaderSystem = inject(LoadersSystem);
  const _staticTranslations = inject(StaticTranslationsService);

  if (_staticTranslations.hasTranslations()) return true;

  const isAdminRoute = state.url.startsWith('/admin');
  const hideLoader = () => {
    if (isAdminRoute) {
      _loaderSystem.hideLoaderPageAdmin();
    } else {
      _loaderSystem.hideLoaderPage();
    }
  };

  if (isAdminRoute) {
    _loaderSystem.showLoaderPageAdmin();
  } else {
    _loaderSystem.showLoaderPage();
  }

  _router.events
    .pipe(
      filter(
        (event) =>
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError,
      ),
      take(1),
    )
    .subscribe(() => {
      requestAnimationFrame(() => hideLoader());
    });

  return _staticTranslations.getStaticTranslations().pipe(
    map(() => true),
    catchError((error) => {
      console.error('Error al resolver traducciones en staticTranslationsGuard:', error);
      hideLoader();
      return of(true);
    }),
  );
};
