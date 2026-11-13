import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PIcon } from '@primeicons/angular/p-icon';

export type I18nTab = 'LANGUAGES' | 'STATIC_KEYS' | 'ENTITY_TRANSLATIONS';
export type EntityScope = 'CATALOG' | 'STOREFRONT' | 'IAM' | 'GEO';

export interface LanguageRecord {
  id: string;
  name: string;
  code: string;
  flag: string;
  image: string;
  isActive: boolean;
  isDefault: boolean;
  progress: number;
  updatedAt: string;
}

export interface StaticTranslationRow {
  keyId: string;
  key: string;
  module: string;
  defaultText: string;
  translations: Record<string, string>;
}

export interface EntityTranslationItem {
  id: string;
  scope: EntityScope;
  tableName: string;
  referenceCode: string;
  baseName: string;
  baseDescription: string;
  baseSlug?: string;
  baseSeoTitle?: string;
  translatedName: Record<string, string>;
  translatedDescription: Record<string, string>;
  translatedSlug?: Record<string, string>;
  translatedSeoTitle?: Record<string, string>;
}

@Component({
  selector: 'app-i18n',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, PIcon],
  templateUrl: './i18n.html',
})
export class I18n {
  readonly activeTab = signal<I18nTab>('LANGUAGES');
  readonly selectedTargetLang = signal<string>('en-US');

  // 1. Tabla: i18n.tb_languages
  readonly languages = signal<LanguageRecord[]>([
    {
      id: 'uuid-lang-es',
      name: 'Español (Latinoamérica)',
      code: 'es-PE',
      flag: 'PE',
      image: '/assets/flags/es-pe.svg',
      isActive: true,
      isDefault: true,
      progress: 100,
      updatedAt: 'Hace 2 horas',
    },
    {
      id: 'uuid-lang-en',
      name: 'English (United States)',
      code: 'en-US',
      flag: 'US',
      image: '/assets/flags/en-us.svg',
      isActive: true,
      isDefault: false,
      progress: 92,
      updatedAt: 'Hace 1 día',
    },
    {
      id: 'uuid-lang-pt',
      name: 'Português (Brasil)',
      code: 'pt-BR',
      flag: 'BR',
      image: '/assets/flags/pt-br.svg',
      isActive: true,
      isDefault: false,
      progress: 68,
      updatedAt: 'Hace 3 días',
    },
    {
      id: 'uuid-lang-fr',
      name: 'Français (France)',
      code: 'fr-FR',
      flag: 'FR',
      image: '/assets/flags/fr-fr.svg',
      isActive: false,
      isDefault: false,
      progress: 24,
      updatedAt: 'Hace 2 semanas',
    },
  ]);

  // Formulario rápido para nuevo/editar idioma (i18n.tb_languages)
  readonly showNewLanguageForm = signal<boolean>(false);
  readonly newLangName = signal<string>('');
  readonly newLangCode = signal<string>('');
  readonly newLangImage = signal<string>('/assets/flags/default.svg');
  readonly newLangActive = signal<boolean>(true);

  // 2. Tablas: i18n.tb_statics_translations_keys + i18n.tb_statics_translations
  readonly staticSearchQuery = signal<string>('');
  readonly onlyMissingTranslations = signal<boolean>(false);
  readonly showNewKeyModal = signal<boolean>(false);
  readonly newKeyName = signal<string>('');
  readonly newKeyDefaultValue = signal<string>('');

  readonly staticKeys = signal<StaticTranslationRow[]>([
    {
      keyId: 'key-01',
      key: 'storefront.header.search_placeholder',
      module: 'Header',
      defaultText: 'Buscar productos, marcas y más...',
      translations: {
        'en-US': 'Search products, brands and more...',
        'pt-BR': 'Buscar produtos, marcas e mais...',
        'fr-FR': '',
      },
    },
    {
      keyId: 'key-02',
      key: 'checkout.button.complete_order',
      module: 'Checkout',
      defaultText: 'Confirmar y pagar pedido',
      translations: {
        'en-US': 'Confirm and pay order',
        'pt-BR': 'Confirmar e pagar pedido',
        'fr-FR': 'Confirmer et payer la commande',
      },
    },
    {
      keyId: 'key-03',
      key: 'cart.empty_state.title',
      module: 'Carrito',
      defaultText: 'Tu carrito de compras está vacío',
      translations: {
        'en-US': 'Your shopping cart is empty',
        'pt-BR': '',
        'fr-FR': '',
      },
    },
    {
      keyId: 'key-04',
      key: 'product.badge.out_of_stock',
      module: 'Catálogo',
      defaultText: 'Agotado temporalmente',
      translations: {
        'en-US': 'Temporarily out of stock',
        'pt-BR': 'Temporariamente esgotado',
        'fr-FR': '',
      },
    },
    {
      keyId: 'key-05',
      key: 'account.orders.return_request',
      module: 'Postventa',
      defaultText: 'Solicitar devolución de producto',
      translations: {
        'en-US': 'Request product return',
        'pt-BR': '',
        'fr-FR': '',
      },
    },
  ]);

  // 3. Traducciones de Entidades Dinámicas (Catálogo, CMS, IAM, Geo)
  readonly selectedScope = signal<EntityScope>('CATALOG');
  readonly selectedEntityId = signal<string>('ent-prod-1');

  readonly entityScopes: { code: EntityScope; label: string; tables: string[] }[] = [
    {
      code: 'CATALOG',
      label: 'Catálogo y SEO',
      tables: ['tb_product_translations', 'tb_category_translations', 'tb_brand_translations'],
    },
    {
      code: 'STOREFRONT',
      label: 'Banners y CMS',
      tables: ['tb_content_item_translations'],
    },
    {
      code: 'IAM',
      label: 'Módulos y Roles',
      tables: ['tb_modules_translations', 'tb_roles_translations'],
    },
    {
      code: 'GEO',
      label: 'Geografía y Monedas',
      tables: [
        'tb_countries_translations',
        'tb_states_translations',
        'tb_cities_translations',
        'tb_currencies_translations',
      ],
    },
  ];

  readonly entityItems = signal<EntityTranslationItem[]>([
    {
      id: 'ent-prod-1',
      scope: 'CATALOG',
      tableName: 'i18n.tb_product_translations',
      referenceCode: 'SKU: SUP-CAF-500',
      baseName: 'Café Orgánico Tostado Medio',
      baseDescription: 'Café 100% arábica de altura cultivado sin pesticidas.',
      baseSlug: 'cafe-organico-tostado-medio',
      baseSeoTitle: 'Comprar Café Orgánico Tostado Medio | Tienda Oficial',
      translatedName: {
        'en-US': 'Medium Roast Organic Coffee',
        'pt-BR': 'Café Orgânico Torra Média',
        'fr-FR': '',
      },
      translatedDescription: {
        'en-US': '100% high-altitude Arabica coffee grown without pesticides.',
        'pt-BR': 'Café 100% arábica de altitude cultivado sem pesticidas.',
        'fr-FR': '',
      },
      translatedSlug: {
        'en-US': 'medium-roast-organic-coffee',
        'pt-BR': 'cafe-organico-torra-media',
        'fr-FR': '',
      },
      translatedSeoTitle: {
        'en-US': 'Buy Medium Roast Organic Coffee | Official Store',
        'pt-BR': 'Comprar Café Orgânico Torra Média | Loja Oficial',
        'fr-FR': '',
      },
    },
    {
      id: 'ent-cat-1',
      scope: 'CATALOG',
      tableName: 'i18n.tb_category_translations',
      referenceCode: 'CAT-SUPER',
      baseName: 'Supermercado y Despensa',
      baseDescription: 'Alimentos, bebidas orgánicas y productos de uso diario.',
      baseSlug: 'supermercado-y-despensa',
      translatedName: {
        'en-US': 'Grocery & Pantry',
        'pt-BR': 'Supermercado e Despensa',
        'fr-FR': '',
      },
      translatedDescription: {
        'en-US': 'Food, organic beverages and everyday essentials.',
        'pt-BR': '',
        'fr-FR': '',
      },
      translatedSlug: {
        'en-US': 'grocery-and-pantry',
        'pt-BR': 'supermercado-e-despensa',
        'fr-FR': '',
      },
    },
    {
      id: 'ent-cms-1',
      scope: 'STOREFRONT',
      tableName: 'i18n.tb_content_item_translations',
      referenceCode: 'HERO_MAIN_01',
      baseName: 'Temporada de Descuentos hasta 40% OFF',
      baseDescription: 'Envíos gratis en compras mayores a $50 en todo el país.',
      translatedName: {
        'en-US': 'Season Sale up to 40% OFF',
        'pt-BR': 'Temporada de Descontos até 40% OFF',
        'fr-FR': '',
      },
      translatedDescription: {
        'en-US': 'Free shipping on orders over $50 nationwide.',
        'pt-BR': '',
        'fr-FR': '',
      },
    },
    {
      id: 'ent-iam-1',
      scope: 'IAM',
      tableName: 'i18n.tb_roles_translations',
      referenceCode: 'ROLE_CASHIER',
      baseName: 'Cajero de Punto de Venta',
      baseDescription: 'Acceso a facturación en terminal POS físico y virtual.',
      translatedName: {
        'en-US': 'Point of Sale Cashier',
        'pt-BR': 'Operador de Caixa POS',
        'fr-FR': '',
      },
      translatedDescription: {
        'en-US': 'Access to billing in physical and virtual POS terminals.',
        'pt-BR': '',
        'fr-FR': '',
      },
    },
    {
      id: 'ent-geo-1',
      scope: 'GEO',
      tableName: 'i18n.tb_currencies_translations',
      referenceCode: 'ISO: USD',
      baseName: 'Dólar Estadounidense',
      baseDescription: 'Moneda para transacciones internacionales.',
      translatedName: {
        'en-US': 'US Dollar',
        'pt-BR': 'Dólar Americano',
        'fr-FR': 'Dollar Américain',
      },
      translatedDescription: {
        'en-US': 'Currency for international transactions.',
        'pt-BR': '',
        'fr-FR': '',
      },
    },
  ]);

  readonly saveFeedback = signal<string | null>(null);

  readonly defaultLanguage = computed(
    () => this.languages().find((l) => l.isDefault) ?? this.languages()[0],
  );

  readonly nonDefaultLanguages = computed(() =>
    this.languages().filter((l) => !l.isDefault),
  );

  readonly activeLanguagesCount = computed(
    () => this.languages().filter((l) => l.isActive).length,
  );

  readonly filteredStaticKeys = computed(() => {
    const q = this.staticSearchQuery().trim().toLowerCase();
    const target = this.selectedTargetLang();
    const onlyMissing = this.onlyMissingTranslations();

    return this.staticKeys().filter((row) => {
      const matchesSearch =
        !q ||
        row.key.toLowerCase().includes(q) ||
        row.defaultText.toLowerCase().includes(q) ||
        (row.translations[target] ?? '').toLowerCase().includes(q);

      const isMissing = !(row.translations[target] ?? '').trim();
      return matchesSearch && (!onlyMissing || isMissing);
    });
  });

  readonly filteredEntities = computed(() =>
    this.entityItems().filter((item) => item.scope === this.selectedScope()),
  );

  readonly currentEntity = computed(() => {
    const list = this.filteredEntities();
    return list.find((e) => e.id === this.selectedEntityId()) ?? list[0] ?? null;
  });

  setDefaultLanguage(langId: string): void {
    this.languages.update((list) =>
      list.map((l) => ({
        ...l,
        isDefault: l.id === langId,
        isActive: l.id === langId ? true : l.isActive,
      })),
    );
    this.triggerFeedback('Idioma predeterminado actualizado (uq_language_default).');
  }

  toggleLanguageActive(langId: string): void {
    this.languages.update((list) =>
      list.map((l) => {
        if (l.id !== langId || l.isDefault) {
          return l;
        }
        return { ...l, isActive: !l.isActive };
      }),
    );
  }

  addLanguage(): void {
    const name = this.newLangName().trim();
    const code = this.newLangCode().trim();
    if (!name || !code) {
      return;
    }

    this.languages.update((list) => [
      ...list,
      {
        id: `uuid-lang-${Date.now()}`,
        name,
        code,
        flag: code.slice(-2).toUpperCase(),
        image: this.newLangImage().trim() || '/assets/flags/default.svg',
        isActive: this.newLangActive(),
        isDefault: false,
        progress: 0,
        updatedAt: 'Ahora mismo',
      },
    ]);

    this.newLangName.set('');
    this.newLangCode.set('');
    this.showNewLanguageForm.set(false);
    this.triggerFeedback(`Idioma "${name}" (${code}) registrado en i18n.tb_languages.`);
  }

  addStaticKey(): void {
    const key = this.newKeyName().trim();
    const defVal = this.newKeyDefaultValue().trim();
    if (!key || !defVal) {
      return;
    }

    this.staticKeys.update((rows) => [
      {
        keyId: `key-${Date.now()}`,
        key,
        module: key.split('.')[0] || 'General',
        defaultText: defVal,
        translations: { 'en-US': '', 'pt-BR': '', 'fr-FR': '' },
      },
      ...rows,
    ]);

    this.newKeyName.set('');
    this.newKeyDefaultValue.set('');
    this.showNewKeyModal.set(false);
    this.triggerFeedback(`Llave "${key}" creada en tb_statics_translations_keys.`);
  }

  selectScope(scope: EntityScope): void {
    this.selectedScope.set(scope);
    const first = this.entityItems().find((i) => i.scope === scope);
    if (first) {
      this.selectedEntityId.set(first.id);
    }
  }

  triggerFeedback(msg: string): void {
    this.saveFeedback.set(msg);
    setTimeout(() => this.saveFeedback.set(null), 2800);
  }
}

