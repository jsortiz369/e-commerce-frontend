import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { PIcon } from '@primeicons/angular/p-icon';
import { filter } from 'rxjs';
import { SidebarModule } from 'primeng/sidebar';
import { Avatar } from 'primeng/avatar';
import { ScrollAreaModule } from 'primeng/scrollarea';

import { LayoutService } from '../../services/layout-service';
import { Layout, SidebarGroup, SidebarItem } from '../../services/admin/layout';

@Component({
  imports: [CommonModule, SidebarModule, ScrollAreaModule, Avatar, PIcon],
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

  /**
   * _openItemLabel$: menú desplegable actualmente abierto para ver sus submenús.
   * _activeItemLabel$: menú principal perteneciente a la ruta/selección activa actual.
   * _activeSubItemLabel$: submenú perteneciente a la ruta/selección activa actual.
   */
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

    this._router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.syncActiveFromUrl(event.urlAfterRedirects);
      });
  }

  onChangeToggleSidebar() {
    this._layoutService$.onMenuToggle();
  }

  getGroupItems(group: SidebarGroup): SidebarItem[] {
    return group.children ?? [];
  }

  /** Indica si el menú desplegable está abierto en este momento */
  isItemOpen(item: SidebarItem): boolean {
    return this._openItemLabel$() === item.label;
  }

  /**
   * Al abrir un menú para ver sus submenús se marca como abierto (y por ende activo).
   * Si se pasa a otro menú, el anterior se cierra y se desactiva (salvo que sea el de la ruta actual).
   */
  onItemOpenChange(item: SidebarItem, isOpen: boolean): void {
    if (isOpen) {
      this._openItemLabel$.set(item.label);
    } else if (this._openItemLabel$() === item.label) {
      this._openItemLabel$.set(null);
    }
  }

  /** Indica si el menú principal corresponde a la ruta/selección activa actual (directa o por submenú) */
  isItemRouteActive(item: SidebarItem): boolean {
    if (!item.children?.length) {
      return this._activeItemLabel$() === item.label;
    }
    return this._activeItemLabel$() === item.label && this._activeSubItemLabel$() !== null;
  }

  /**
   * El menú principal se muestra activo si:
   * 1. Es el menú (o padre del submenú) de la ruta actual, O
   * 2. Está desplegado actualmente viendo sus submenús.
   */
  isItemActive(item: SidebarItem): boolean {
    return this.isItemRouteActive(item) || this.isItemOpen(item);
  }

  hasActiveChild(item: SidebarItem): boolean {
    return (
      !!item.children?.length &&
      this._activeItemLabel$() === item.label &&
      this._activeSubItemLabel$() !== null
    );
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
    this._openItemLabel$.set(null);

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

    // Si ya hay un sub-item activo cuya ruta coincide con la URL actual, conservarlo
    const currentItemLabel = this._activeItemLabel$();
    const currentSubLabel = this._activeSubItemLabel$();
    if (currentSubLabel) {
      for (const group of groups) {
        for (const item of this.getGroupItems(group)) {
          if (item.label === currentItemLabel) {
            const matchingSub = (item.children ?? []).find(
              (s) => s.label === currentSubLabel && s.route === cleanUrl,
            );
            if (matchingSub) {
              return;
            }
          }
        }
      }
    }

    // 1. Buscar coincidencia en sub-items
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

    // 2. Buscar coincidencia en items directos
    for (const group of groups) {
      for (const item of this.getGroupItems(group)) {
        if (!item.children?.length && item.route === cleanUrl) {
          this._activeItemLabel$.set(item.label);
          this._activeSubItemLabel$.set(null);
          return;
        }
      }
    }
  }
}
