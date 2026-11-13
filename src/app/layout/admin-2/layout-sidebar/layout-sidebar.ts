import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, output, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarCollapsible, SidebarSide, SidebarVariant } from 'primeng/types/sidebar';
import { ChevronDown } from '@primeicons/angular/chevron-down';
import { PIcon } from '@primeicons/angular/p-icon';

export interface NavSubItem {
  label: string;
  tables: string[];
  route?: string;
  badge?: string;
  isActive?: boolean;
}

export interface NavItem {
  icon: string;
  label: string;
  schema?: string;
  tables?: string[];
  route?: string;
  isActive?: boolean;
  badge?: string;
  subItems?: NavSubItem[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface NavigationSelection {
  groupLabel: string;
  breadcrumbTrail: string;
  schema: string | null;
  tables: string[];
}

@Component({
  imports: [
    CommonModule,
    RouterModule,
    AvatarModule,
    SidebarModule,
    ChevronDown,
    PIcon,
  ],
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.html',
  host: {
    class: 'contents',
  },
})
export class LayoutSidebar {
  private readonly router = inject(Router);

  readonly variant: SidebarVariant = 'floating';
  readonly collapsible: SidebarCollapsible = 'icon';
  readonly side: SidebarSide = 'left';

  get isFloating(): boolean {
    const v = typeof this.variant === 'function' ? (this.variant as any)() : this.variant;
    return v === 'floating';
  }

  get variantValue(): SidebarVariant {
    return typeof this.variant === 'function' ? (this.variant as any)() : this.variant;
  }

  readonly sidebarOpen = signal<boolean>(true);
  readonly activeItemLabel = signal<string>('Resumen');
  readonly activeSubLabel = signal<string | null>(null);
  readonly openItemLabel = signal<string | null>(null);
  readonly flyoutTop = signal<number>(56);

  readonly navigationChange = output<NavigationSelection>();

  readonly activeFlyoutItem = computed<{ group: NavGroup; item: NavItem } | null>(() => {
    const openLabel = this.openItemLabel();
    if (!openLabel || this.sidebarOpen()) {
      return null;
    }
    for (const group of this.navGroups) {
      for (const item of group.items) {
        if (item.label === openLabel && item.subItems?.length) {
          return { group, item };
        }
      }
    }
    return null;
  });

  navGroups: NavGroup[] = [
    {
      label: 'General',
      items: [
        {
          icon: 'th-large',
          label: 'Resumen',
          route: '/admin',
          isActive: true,
        },
        {
          icon: 'shopping-cart',
          label: 'Terminal POS (Caja)',
          schema: 'sales',
          tables: ['tb_orders', 'tb_order_lines', 'tb_payment_transactions', 'tb_stock_movements'],
          route: '/admin/pos',
          badge: 'POS',
        },
      ],
    },
    {
      label: 'Comercial',
      items: [
        {
          icon: 'box',
          label: 'Catálogo',
          schema: 'catalog',
          subItems: [
            {
              label: 'Productos',
              tables: ['tb_products', 'tb_product_images', 'tb_product_translations'],
            },
            {
              label: 'Variantes y SKUs',
              tables: ['tb_product_variants'],
            },
            {
              label: 'Precios de mercado',
              tables: ['tb_product_market_prices'],
            },
            {
              label: 'Categorías',
              tables: ['tb_categories', 'tb_category_translations'],
            },
            {
              label: 'Marcas',
              tables: ['tb_brands', 'tb_brand_translations'],
            },
          ],
        },
        {
          icon: 'shopping-bag',
          label: 'Ventas y Pedidos',
          schema: 'sales',
          badge: '8',
          subItems: [
            {
              label: 'Caja Físico y Virtual (POS)',
              tables: ['tb_orders', 'tb_order_lines', 'tb_payment_transactions'],
              route: '/admin/pos',
            },
            {
              label: 'Pedidos',
              tables: ['tb_orders', 'tb_order_lines'],
              badge: '8',
            },
            {
              label: 'Historial de estados',
              tables: ['tb_order_status_history'],
            },
            {
              label: 'Carritos de compra',
              tables: ['tb_carts', 'tb_cart_lines'],
            },
          ],
        },
        {
          icon: 'users',
          label: 'Clientes y CRM',
          schema: 'commerce',
          subItems: [
            {
              label: 'Clientes',
              tables: ['tb_customers', 'tb_customers_passwords'],
            },
            {
              label: 'Direcciones de clientes',
              tables: ['tb_customers_addresses'],
            },
            {
              label: 'Productos favoritos',
              tables: ['tb_customer_favorite_products'],
            },
            {
              label: 'Tickets de contacto',
              tables: ['tb_contact_tickets'],
            },
            {
              label: 'Suscriptores Newsletter',
              tables: ['tb_news_letter_subscribers'],
            },
            {
              label: 'Sesiones de clientes',
              tables: ['customer_sessions'],
            },
          ],
        },
        {
          icon: 'star',
          label: 'Reseñas y Devoluciones',
          schema: 'reviews_returns',
          subItems: [
            {
              label: 'Solicitudes de devolución',
              tables: ['tb_return_requests', 'tb_return_lines'],
            },
            {
              label: 'Reseñas de productos',
              tables: ['tb_product_reviews', 'tb_review_votes'],
            },
          ],
        },
      ],
    },
    {
      label: 'Abastecimiento',
      items: [
        {
          icon: 'warehouse',
          label: 'Inventario',
          schema: 'inventories',
          subItems: [
            {
              label: 'Niveles de stock',
              tables: ['tb_stock_levels'],
            },
            {
              label: 'Movimientos de stock',
              tables: ['tb_stock_movements'],
            },
            {
              label: 'Almacenes',
              tables: ['tb_warehouses'],
            },
          ],
        },
        {
          icon: 'truck',
          label: 'Compras y Proveedores',
          schema: 'purchases',
          subItems: [
            {
              label: 'Proveedores',
              tables: ['tb_suppliers'],
            },
            {
              label: 'Facturas de compra',
              tables: ['tb_purchase_invoices'],
            },
          ],
        },
      ],
    },
    {
      label: 'Marketing y Finanzas',
      items: [
        {
          icon: 'percentage',
          label: 'Promociones',
          schema: 'promotions',
          subItems: [
            {
              label: 'Descuentos y cupones',
              tables: ['tb_discounts'],
            },
            {
              label: 'Descuentos por producto',
              tables: ['tb_discount_products', 'tb_discount_product_variants'],
            },
            {
              label: 'Descuentos por categoría',
              tables: ['tb_discount_categories'],
            },
            {
              label: 'Redenciones de cupones',
              tables: ['tb_discount_redemptions'],
            },
          ],
        },
        {
          icon: 'credit-card',
          label: 'Pagos',
          schema: 'payments',
          subItems: [
            {
              label: 'Transacciones',
              tables: ['tb_payment_transactions'],
            },
            {
              label: 'Proveedores de pago',
              tables: ['tb_payment_providers'],
            },
            {
              label: 'Métodos de pago',
              tables: ['tb_payment_methods'],
            },
          ],
        },
        {
          icon: 'wallet',
          label: 'Impuestos y Monedas',
          schema: 'taxes',
          subItems: [
            {
              label: 'Monedas',
              tables: ['tb_currencies', 'tb_currencies_translations'],
            },
            {
              label: 'Tasas de impuesto',
              tables: ['tb_taxes_rates'],
            },
            {
              label: 'Reglas fiscales',
              tables: ['tb_taxes_rules'],
            },
            {
              label: 'Zonas fiscales',
              tables: ['tb_taxes_zones', 'tb_taxes_zones_members'],
            },
            {
              label: 'Roles fiscales (Cliente/Prod)',
              tables: ['tb_customers_tax_roles', 'tb_products_tax_roles'],
            },
          ],
        },
      ],
    },
    {
      label: 'Canales e Idiomas',
      items: [
        {
          icon: 'shop',
          label: 'Storefront (CMS)',
          schema: 'storefront',
          subItems: [
            {
              label: 'Bloques de contenido',
              tables: ['tb_content_blocks'],
            },
            {
              label: 'Líneas y banners',
              tables: ['tb_content_block_lines', 'tb_content_item_translations'],
            },
          ],
        },
        {
          icon: 'globe',
          label: 'Internacionalización (i18n)',
          schema: 'i18n',
          subItems: [
            {
              label: 'Idiomas',
              tables: ['tb_languages'],
              route: '/admin/i18n',
            },
            {
              label: 'Traducciones estáticas',
              tables: ['tb_statics_translations_keys', 'tb_statics_translations'],
              route: '/admin/i18n',
            },
            {
              label: 'Traducciones catálogo',
              tables: ['tb_product_translations', 'tb_category_translations', 'tb_brand_translations'],
              route: '/admin/i18n',
            },
            {
              label: 'Traducciones sistema/CMS',
              tables: ['tb_content_item_translations', 'tb_modules_translations', 'tb_roles_translations'],
              route: '/admin/i18n',
            },
            {
              label: 'Traducciones geográficas',
              tables: [
                'tb_regions_translations',
                'tb_subregions_translations',
                'tb_countries_translations',
                'tb_states_translations',
                'tb_cities_translations',
              ],
              route: '/admin/i18n',
            },
          ],
        },
      ],
    },
    {
      label: 'Administración',
      items: [
        {
          icon: 'sliders-h',
          label: 'Configuración',
          schema: 'config',
          subItems: [
            {
              label: 'Perfil de empresa',
              tables: ['tb_company_profiles'],
            },
            {
              label: 'Direcciones de empresa',
              tables: ['tb_company_addresses'],
            },
            {
              label: 'Temas (Tienda y Admin)',
              tables: ['tb_company_themes'],
            },
            {
              label: 'Verticales de negocio',
              tables: ['tb_business_verticals'],
            },
          ],
        },
        {
          icon: 'compass',
          label: 'Maestros Geográficos',
          schema: 'masters',
          subItems: [
            {
              label: 'Regiones y subregiones',
              tables: ['tb_regions', 'tb_subregions'],
            },
            {
              label: 'Países',
              tables: ['tb_countries'],
            },
            {
              label: 'Estados / Departamentos',
              tables: ['tb_states'],
            },
            {
              label: 'Ciudades',
              tables: ['tb_cities'],
            },
          ],
        },
        {
          icon: 'shield',
          label: 'Seguridad y Accesos (IAM)',
          schema: 'iam',
          subItems: [
            {
              label: 'Usuarios internos',
              tables: ['tb_users', 'tb_users_passwords', 'tb_users_roles'],
            },
            {
              label: 'Roles y permisos',
              tables: ['tb_roles', 'tb_roles_permissions', 'tb_permissions'],
            },
            {
              label: 'Módulos del sistema',
              tables: ['tb_modules'],
            },
            {
              label: 'Sesiones de usuarios',
              tables: ['users_sesion'],
            },
          ],
        },
        {
          icon: 'database',
          label: 'Auditoría',
          schema: 'audit',
          subItems: [
            {
              label: 'Bitácora de cambios',
              tables: ['tb_change_logs'],
            },
          ],
        },
      ],
    },
  ];

  onSidebarOpenChange(isOpen: boolean): void {
    this.sidebarOpen.set(isOpen);
    if (!isOpen) {
      this.openItemLabel.set(null);
    } else if (this.activeSubLabel()) {
      this.openItemLabel.set(this.activeItemLabel());
    }
  }

  onItemOpenChange(itemLabel: string, isOpen: boolean): void {
    if (isOpen) {
      this.openItemLabel.set(itemLabel);
    } else if (this.openItemLabel() === itemLabel) {
      this.openItemLabel.set(null);
    }
  }

  onMenuButtonClick(event: MouseEvent, group: NavGroup, item: NavItem): void {
    if (item.subItems?.length) {
      if (!this.sidebarOpen()) {
        const buttonEl = event.currentTarget as HTMLElement | null;
        if (buttonEl) {
          const rect = buttonEl.getBoundingClientRect();
          const estimatedHeight = (item.subItems.length + 1) * 32 + 16;
          const maxTop = Math.max(12, window.innerHeight - estimatedHeight - 12);
          this.flyoutTop.set(Math.min(rect.top, maxTop));
        }
      }
      return;
    }

    this.openItemLabel.set(null);
    this.clearActiveStates();
    item.isActive = true;
    this.activeItemLabel.set(item.label);
    this.activeSubLabel.set(null);

    this.navigationChange.emit({
      groupLabel: group.label,
      breadcrumbTrail: item.label,
      schema: item.schema ?? null,
      tables: item.tables ?? [],
    });

    if (item.route) {
      this.router.navigateByUrl(item.route);
    }
  }

  selectSubItem(group: NavGroup, item: NavItem, sub: NavSubItem): void {
    this.clearActiveStates();
    item.isActive = true;
    sub.isActive = true;
    this.activeItemLabel.set(item.label);
    this.activeSubLabel.set(sub.label);

    if (!this.sidebarOpen()) {
      this.openItemLabel.set(null);
    } else {
      this.openItemLabel.set(item.label);
    }

    this.navigationChange.emit({
      groupLabel: group.label,
      breadcrumbTrail: `${item.label} / ${sub.label}`,
      schema: item.schema ?? null,
      tables: sub.tables,
    });

    if (sub.route) {
      this.router.navigateByUrl(sub.route);
    }
  }

  openPosTerminal(): void {
    const generalGroup = this.navGroups[0];
    const posItem = generalGroup.items[1];
    this.openItemLabel.set(null);
    this.clearActiveStates();
    posItem.isActive = true;
    this.activeItemLabel.set(posItem.label);
    this.activeSubLabel.set(null);

    this.navigationChange.emit({
      groupLabel: generalGroup.label,
      breadcrumbTrail: posItem.label,
      schema: posItem.schema ?? null,
      tables: posItem.tables ?? [],
    });

    this.router.navigateByUrl('/admin/pos');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.sidebarOpen() || !this.openItemLabel()) {
      return;
    }
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('#admin-sidebar') && !target.closest('#admin-sidebar-flyout')) {
      this.openItemLabel.set(null);
    }
  }

  private clearActiveStates(): void {
    for (const group of this.navGroups) {
      for (const item of group.items) {
        item.isActive = false;
        if (item.subItems) {
          for (const sub of item.subItems) {
            sub.isActive = false;
          }
        }
      }
    }
  }
}
