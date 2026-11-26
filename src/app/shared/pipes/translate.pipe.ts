import { inject, Pipe, PipeTransform } from '@angular/core';

import { StaticTranslationsService } from '../services/static-translations.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly _translationsService = inject(StaticTranslationsService);

  transform(key: string | null | undefined, fallback?: string): string {
    if (!key) return fallback ?? '';
    return this._translationsService.translate(key, fallback);
  }
}
