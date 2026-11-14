import { Component, computed, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { Avatar } from 'primeng/avatar';

import { LayoutService } from '../../services/layout-service';
import { Layout } from '../../services/admin/layout';

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
  protected readonly _adminLayout$ = inject(Layout);

  protected readonly _sidebarGroups$ = computed(() => this._adminLayout$.sidebar());
  protected readonly _isOpen$ = computed(() => this._layoutService$.layoutState().open);
  protected readonly _collapsible$ = computed(() => this._layoutService$.layoutState().collapsible);
  protected readonly _overlay$ = computed(() => this._layoutService$.layoutState().overlay);
  protected readonly _openOnHover$ = computed(() => this._layoutService$.layoutState().openOnHover);
  protected readonly _sidebarBackdrop$ = computed(() => this._isOpen$() && this._layoutService$.isMobile());
  protected readonly _variant$ = computed(() => this._layoutService$.layoutState().variant);
  protected readonly _isDesktop$ = computed(() => this._layoutService$.isDesktop());

  constructor() {}

  onChangeToggleSidebar() {
    this._layoutService$.onMenuToggle();
  }
}
