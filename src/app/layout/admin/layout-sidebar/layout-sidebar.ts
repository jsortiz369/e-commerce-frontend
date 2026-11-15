import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarModule } from 'primeng/sidebar';
import { Avatar } from 'primeng/avatar';
import { ScrollAreaModule } from 'primeng/scrollarea';
import { PIcon } from '@primeicons/angular/p-icon';
import { Divider } from 'primeng/divider';

import { LayoutService } from '../../services/layout-service';
import { Layout, SidebarGroup, SidebarItem } from '../../services/admin/layout';

@Component({
  imports: [CommonModule, SidebarModule, ScrollAreaModule, Avatar, PIcon, Divider],
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.html',
  host: {
    class: 'contents',
  },
})
export class LayoutSidebar {
  private readonly _router = inject(Router);
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

  /** Estado de acordeón y selección activa del menú */
  protected readonly _openItemLabel$ = signal<string | null>(null);
  protected readonly _activeItemLabel$ = signal<string>('Resumen');
  protected readonly _activeSubItemLabel$ = signal<string | null>(null);

  constructor() {
    effect(() => {
      const groups = this._sidebarGroups$();
      if (groups.length > 0) {
        this.syncActiveFromUrl(this._router.url);
      }
    });

    this._router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.syncActiveFromUrl(event.urlAfterRedirects);
    });
  }

  onChangeToggleSidebar() {
    this._layoutService$.onMenuToggle();
  }

  getGroupItems(group: SidebarGroup): SidebarItem[] {
    return group.children ?? [];
  }

  isItemOpen(item: SidebarItem): boolean {
    return this._openItemLabel$() === item.label;
  }

  onItemOpenChange(item: SidebarItem, isOpen: boolean): void {
    if (isOpen) {
      this._openItemLabel$.set(item.label);
    } else if (this._openItemLabel$() === item.label) {
      this._openItemLabel$.set(null);
    }
  }

  isItemDirectActive(item: SidebarItem): boolean {
    return !item.children?.length && this._activeItemLabel$() === item.label;
  }

  hasActiveChild(item: SidebarItem): boolean {
    return !!item.children?.length && this._activeItemLabel$() === item.label && this._activeSubItemLabel$() !== null;
  }

  isSubItemActive(item: SidebarItem, sub: SidebarItem): boolean {
    return this._activeItemLabel$() === item.label && this._activeSubItemLabel$() === sub.label;
  }

  onSelectItem(item: SidebarItem): void {
    if (item.children?.length) {
      return;
    }

    this._activeItemLabel$.set(item.label);
    this._activeSubItemLabel$.set(null);

    if (item.route) {
      this._router.navigateByUrl(item.route);
    }

    if (this._layoutService$.isMobile()) {
      this._layoutService$.onMenuToggle();
    }
  }

  onSelectSubItem(item: SidebarItem, sub: SidebarItem): void {
    this._activeItemLabel$.set(item.label);
    this._activeSubItemLabel$.set(sub.label);
    this._openItemLabel$.set(item.label);

    if (sub.route) {
      this._router.navigateByUrl(sub.route);
    }

    if (this._layoutService$.isMobile()) {
      this._layoutService$.onMenuToggle();
    }
  }

  private syncActiveFromUrl(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];
    const groups = this._sidebarGroups$();
    if (!groups.length) return;

    // 1. Priorizar coincidencia en items directos
    for (const group of groups) {
      for (const item of this.getGroupItems(group)) {
        if (!item.children?.length && item.route === cleanUrl) {
          this._activeItemLabel$.set(item.label);
          this._activeSubItemLabel$.set(null);
          return;
        }
      }
    }

    // 2. Buscar coincidencia en sub-items
    for (const group of groups) {
      for (const item of this.getGroupItems(group)) {
        for (const sub of item.children ?? []) {
          if (sub.route === cleanUrl) {
            this._activeItemLabel$.set(item.label);
            this._activeSubItemLabel$.set(sub.label);
            this._openItemLabel$.set(item.label);
            return;
          }
        }
      }
    }
  }
}
