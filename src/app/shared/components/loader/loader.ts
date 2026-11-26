import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { LoaderActionType, LoadersSystem } from '../../services/loaders-system';

export type { LoaderActionType };
export type LoaderDisplayMode = 'overlay' | 'card' | 'inline';

export interface LoaderItemDetail {
  name?: string;
  sku?: string;
  badge?: string;
}

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.html',
})
export class Loader {
  protected readonly _loadersSystem$ = inject(LoadersSystem);

  /** Tipo de acción opcional por input (si no se envía en showLoader) */
  readonly action = input<LoaderActionType | undefined>(undefined);

  /** Título opcional por input (si no se envía en showLoader) */
  readonly title = input<string | undefined>(undefined);

  /** Subtítulo opcional por input */
  readonly subtitle = input<string | undefined>(undefined);

  protected readonly resolvedAction = computed<LoaderActionType>(
    () => this.action() ?? this._loadersSystem$.loaderConfig().action ?? 'general',
  );

  protected readonly resolvedTitle = computed<string>(() => {
    const customTitle = this.title() || this._loadersSystem$.loaderConfig().title;
    if (customTitle) return customTitle;
    return 'loader.default.title'.translate('Procesando solicitud...');
  });

  protected readonly resolvedSubtitle = computed<string>(
    () => this.subtitle() ?? this._loadersSystem$.loaderConfig().subtitle ?? '',
  );
}
