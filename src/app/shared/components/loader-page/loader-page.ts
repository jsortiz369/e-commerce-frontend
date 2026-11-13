import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { LoadersSystem } from '../../services/loaders-system';

@Component({
  selector: 'app-loader-page',
  imports: [CommonModule],
  templateUrl: './loader-page.html',
})
export class LoaderPage {
  private readonly _loadersSystem$ = inject(LoadersSystem);

  private readonly _title$ = computed(() => (this._loadersSystem$.isLoaderPageAdmin() ? `Preparando el panel` : `Preparando la tienda`));
  private readonly _subTitle$ = computed(() =>
    this._loadersSystem$.isLoaderPageAdmin()
      ? `Estamos organizando tus herramientas de trabajo...`
      : `Estamos cargando los productos y contenidos...`,
  );
}
