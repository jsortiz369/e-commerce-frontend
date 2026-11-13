import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIcon } from '@primeicons/angular/p-icon';

import { LayoutService } from '../../services/layout-service';

@Component({
  imports: [CommonModule, PIcon],
  selector: 'app-layout-topbar',
  templateUrl: './layout-topbar.html',
  host: {
    class: 'contents',
  },
})
export class LayoutTopbar {
  readonly _layoutService$ = inject(LayoutService);

  private toggleSidebar() {
    this._layoutService$.onMenuToggle(true);
  }
}
