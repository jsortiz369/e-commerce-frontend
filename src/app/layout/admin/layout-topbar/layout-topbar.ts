import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { LayoutService } from '../../services/layout-service';

@Component({
  imports: [CommonModule, PIcon, ButtonModule, DividerModule],
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
