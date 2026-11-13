import { Component, computed, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { Avatar } from 'primeng/avatar';

import { LayoutService } from '../../services/layout-service';

@Component({
  imports: [SidebarModule, Avatar],
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.html',
  host: {
    class: 'contents',
  },
})
export class LayoutSidebar {
  private readonly _layoutService$ = inject(LayoutService);

  private readonly _isOpen$ = computed(() => this._layoutService$.layoutState().open);
  private readonly _collapsible$ = computed(() => this._layoutService$.layoutState().collapsible);
  private readonly _overlay$ = computed(() => this._layoutService$.layoutState().overlay);
  private readonly _openOnHover$ = computed(() => this._layoutService$.layoutState().openOnHover);
  private readonly _sidebarBackdrop$ = computed(() => this._isOpen$() && this._layoutService$.isMobile());
  private readonly _variant$ = computed(() => this._layoutService$.layoutState().variant);

  onChangeToggleSidebar() {
    this._layoutService$.onMenuToggle();
  }
}
