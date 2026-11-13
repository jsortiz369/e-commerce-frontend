import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Loader, LoaderItemDetail } from '../../../shared/components/loader/loader';
import { LoadersSystem } from '../../../shared/services/loaders-system';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Loader],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly _loadersSystem$ = inject(LoadersSystem);
  readonly showPageLoader = signal<boolean>(false);
  readonly showActionLoader = signal<boolean>(false);
  readonly actionProgress = signal<number | null>(null);

  readonly sampleItem: LoaderItemDetail = {
    name: 'Auriculares Inalámbricos Pro Bass',
    sku: 'AUDIO-BT-001',
    badge: 'Nuevo Producto',
  };

  demoProductLoader(): void {
    this.showActionLoader.set(true);
    this.actionProgress.set(15);

    const interval = setInterval(() => {
      const current = this.actionProgress() ?? 0;
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.showActionLoader.set(false);
          this.actionProgress.set(null);
        }, 500);
      } else {
        this.actionProgress.set(Math.min(100, current + 25));
      }
    }, 500000);
  }
}
