import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

import { LayoutService } from '../../services/layout-service';

@Component({
  imports: [CommonModule, PIcon, DividerModule, TagModule],
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.html',
  host: {
    class: 'contents',
  },
})
export class LayoutFooter {
  readonly _layoutService$ = inject(LayoutService);

  protected readonly _currentYear = new Date().getFullYear();
  protected readonly _isFloating$ = computed(
    () => this._layoutService$.layoutState().variant === 'floating',
  );
}
