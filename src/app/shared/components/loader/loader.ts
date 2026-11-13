import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

export type LoaderActionType = 'product' | 'cart' | 'payment' | 'sync' | 'general';
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
  /** Tipo de acción que se está ejecutando */
  readonly action = input<LoaderActionType>('payment');

  /** Título principal de la acción (ej. 'Creando producto...', 'Guardando cambios...') */
  readonly title = input<string>('Creando producto...');
}
