import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PIcon } from '@primeicons/angular/p-icon';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { LanguageCreateUpdateComponent } from '../../ui/language-create-update/language-create-update.component';

export type LanguageDirection = 'LTR' | 'RTL';
export type StatusFilterType = 'ALL' | 'ACTIVE' | 'INACTIVE';

export interface LanguageItem {
  id: string;
  name: string;
  nativeName: string;
  code: string;
  flag: string;
  region: string;
  direction: LanguageDirection;
  image: string;
  isActive: boolean;
  isDefault: boolean;
  translatedKeys: number;
  totalKeys: number;
  progress: number;
  updatedAt: string;
}

export interface LanguagePresetOption {
  label: string;
  name: string;
  nativeName: string;
  code: string;
  flag: string;
  region: string;
  direction: LanguageDirection;
  image: string;
}

@Component({
  imports: [
    CommonModule,
    FormsModule,
    PIcon,
    CardModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    TagModule,
    BadgeModule,
    AvatarModule,
    ProgressBarModule,
    ToggleSwitchModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    SelectButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    DividerModule,
    MessageModule,
    PanelModule,
    LanguageCreateUpdateComponent,
  ],
  selector: 'app-languages',
  templateUrl: './languages.html',
})
export class Languages {
  private readonly _messageService = inject(MessageService);
  private readonly _confirmationService = inject(ConfirmationService);

  readonly languages = signal<LanguageItem[]>([
    {
      id: 'lang-01',
      name: 'Español (Latinoamérica)',
      nativeName: 'Español',
      code: 'es-PE',
      flag: 'PE',
      region: 'América Latina',
      direction: 'LTR',
      image: '/assets/flags/es-pe.svg',
      isActive: true,
      isDefault: true,
      translatedKeys: 1240,
      totalKeys: 1240,
      progress: 100,
      updatedAt: 'Hace 15 min',
    },
    {
      id: 'lang-02',
      name: 'Inglés (Estados Unidos)',
      nativeName: 'English (US)',
      code: 'en-US',
      flag: 'US',
      region: 'Norteamérica',
      direction: 'LTR',
      image: '/assets/flags/en-us.svg',
      isActive: true,
      isDefault: false,
      translatedKeys: 1190,
      totalKeys: 1240,
      progress: 96,
      updatedAt: 'Hace 2 horas',
    },
    {
      id: 'lang-03',
      name: 'Portugués (Brasil)',
      nativeName: 'Português (Brasil)',
      code: 'pt-BR',
      flag: 'BR',
      region: 'América Latina',
      direction: 'LTR',
      image: '/assets/flags/pt-br.svg',
      isActive: true,
      isDefault: false,
      translatedKeys: 980,
      totalKeys: 1240,
      progress: 79,
      updatedAt: 'Ayer, 18:40',
    },
    {
      id: 'lang-04',
      name: 'Español (España)',
      nativeName: 'Español (España)',
      code: 'es-ES',
      flag: 'ES',
      region: 'Europa',
      direction: 'LTR',
      image: '/assets/flags/es-es.svg',
      isActive: true,
      isDefault: false,
      translatedKeys: 1215,
      totalKeys: 1240,
      progress: 98,
      updatedAt: 'Hace 3 días',
    },
    {
      id: 'lang-05',
      name: 'Francés (Francia)',
      nativeName: 'Français',
      code: 'fr-FR',
      flag: 'FR',
      region: 'Europa',
      direction: 'LTR',
      image: '/assets/flags/fr-fr.svg',
      isActive: true,
      isDefault: false,
      translatedKeys: 768,
      totalKeys: 1240,
      progress: 62,
      updatedAt: 'Hace 5 días',
    },
    {
      id: 'lang-06',
      name: 'Alemán (Alemania)',
      nativeName: 'Deutsch',
      code: 'de-DE',
      flag: 'DE',
      region: 'Europa',
      direction: 'LTR',
      image: '/assets/flags/de-de.svg',
      isActive: false,
      isDefault: false,
      translatedKeys: 434,
      totalKeys: 1240,
      progress: 35,
      updatedAt: 'Hace 1 semana',
    },
    {
      id: 'lang-07',
      name: 'Italiano (Italia)',
      nativeName: 'Italiano',
      code: 'it-IT',
      flag: 'IT',
      region: 'Europa',
      direction: 'LTR',
      image: '/assets/flags/it-it.svg',
      isActive: false,
      isDefault: false,
      translatedKeys: 298,
      totalKeys: 1240,
      progress: 24,
      updatedAt: 'Hace 2 semanas',
    },
    {
      id: 'lang-08',
      name: 'Árabe (Emiratos Árabes)',
      nativeName: 'العربية',
      code: 'ar-AE',
      flag: 'AE',
      region: 'Medio Oriente',
      direction: 'RTL',
      image: '/assets/flags/ar-ae.svg',
      isActive: false,
      isDefault: false,
      translatedKeys: 186,
      totalKeys: 1240,
      progress: 15,
      updatedAt: 'Hace 3 semanas',
    },
  ]);

  /** Filtros y selección de la tabla */
  readonly searchQuery = signal<string>('');
  readonly statusFilter = signal<StatusFilterType>('ALL');
  readonly regionFilter = signal<string | null>(null);
  readonly selectedLanguages = signal<LanguageItem[]>([]);

  readonly statusFilterOptions = [
    { label: 'Todos', value: 'ALL' },
    { label: 'Activos', value: 'ACTIVE' },
    { label: 'Inactivos', value: 'INACTIVE' },
  ];

  readonly regionOptions = [
    { label: 'América Latina', value: 'América Latina' },
    { label: 'Norteamérica', value: 'Norteamérica' },
    { label: 'Europa', value: 'Europa' },
    { label: 'Medio Oriente', value: 'Medio Oriente' },
    { label: 'Asia Pacífico', value: 'Asia Pacífico' },
  ];

  readonly directionOptions = [
    { label: 'LTR (Izquierda a Derecha)', value: 'LTR' },
    { label: 'RTL (Derecha a Izquierda)', value: 'RTL' },
  ];

  readonly languagePresets: LanguagePresetOption[] = [
    {
      label: 'Español (Colombia) - es-CO',
      name: 'Español (Colombia)',
      nativeName: 'Español',
      code: 'es-CO',
      flag: 'CO',
      region: 'América Latina',
      direction: 'LTR',
      image: '/assets/flags/es-co.svg',
    },
    {
      label: 'Español (México) - es-MX',
      name: 'Español (México)',
      nativeName: 'Español',
      code: 'es-MX',
      flag: 'MX',
      region: 'América Latina',
      direction: 'LTR',
      image: '/assets/flags/es-mx.svg',
    },
    {
      label: 'Inglés (Reino Unido) - en-GB',
      name: 'Inglés (Reino Unido)',
      nativeName: 'English (UK)',
      code: 'en-GB',
      flag: 'GB',
      region: 'Europa',
      direction: 'LTR',
      image: '/assets/flags/en-gb.svg',
    },
    {
      label: 'Japonés (Japón) - ja-JP',
      name: 'Japonés (Japón)',
      nativeName: '日本語',
      code: 'ja-JP',
      flag: 'JP',
      region: 'Asia Pacífico',
      direction: 'LTR',
      image: '/assets/flags/ja-jp.svg',
    },
  ];

  /** KPIs calculados reactivamente */
  readonly totalLanguagesCount = computed(() => this.languages().length);
  readonly activeLanguagesCount = computed(() => this.languages().filter((l) => l.isActive).length);
  readonly inactiveLanguagesCount = computed(() => this.languages().filter((l) => !l.isActive).length);
  readonly defaultLanguage = computed(() => this.languages().find((l) => l.isDefault) ?? this.languages()[0]);
  readonly averageCoverage = computed(() => {
    const active = this.languages().filter((l) => l.isActive);
    if (!active.length) return 0;
    const sum = active.reduce((acc, item) => acc + item.progress, 0);
    return Math.round(sum / active.length);
  });
  readonly pendingTranslationsCount = computed(() => {
    return this.languages()
      .filter((l) => l.isActive)
      .reduce((acc, item) => acc + (item.totalKeys - item.translatedKeys), 0);
  });

  /** Lista filtrada para el p-table */
  readonly filteredLanguages = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const status = this.statusFilter();
    const region = this.regionFilter();

    return this.languages().filter((lang) => {
      const matchesQuery =
        !query ||
        lang.name.toLowerCase().includes(query) ||
        lang.nativeName.toLowerCase().includes(query) ||
        lang.code.toLowerCase().includes(query) ||
        lang.flag.toLowerCase().includes(query) ||
        lang.region.toLowerCase().includes(query);

      const matchesStatus = status === 'ALL' || (status === 'ACTIVE' && lang.isActive) || (status === 'INACTIVE' && !lang.isActive);

      const matchesRegion = !region || lang.region === region;

      return matchesQuery && matchesStatus && matchesRegion;
    });
  });

  /** Estado del diálogo modal Crear / Editar idioma (componente separado) */
  readonly languageDialogVisible = signal<boolean>(false);
  readonly selectedLanguageId = signal<string | null>(null);
  readonly selectedLanguageForEdit = signal<LanguageItem | null>(null);

  getProgressSeverity(progress: number): 'success' | 'info' | 'warn' | 'danger' {
    if (progress >= 90) return 'success';
    if (progress >= 65) return 'info';
    if (progress >= 35) return 'warn';
    return 'danger';
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.statusFilter.set('ALL');
    this.regionFilter.set(null);
  }

  openNewLanguageDialog(): void {
    this.selectedLanguageId.set(null);
    this.selectedLanguageForEdit.set(null);
    this.languageDialogVisible.set(true);
  }

  openEditLanguageDialog(lang: LanguageItem): void {
    this.selectedLanguageId.set(lang.id);
    this.selectedLanguageForEdit.set(lang);
    this.languageDialogVisible.set(true);
  }

  onLanguageSaved(savedLang: LanguageItem): void {
    const isEditing = !!this.selectedLanguageId();

    if (isEditing) {
      this.languages.update((list) =>
        list.map((item) => {
          if (item.id === savedLang.id) {
            return savedLang;
          }
          return savedLang.isDefault ? { ...item, isDefault: false } : item;
        }),
      );

      this._messageService.add({
        severity: 'success',
        summary: 'Idioma actualizado',
        detail: `Se guardaron los cambios para ${savedLang.name} (${savedLang.code}).`,
      });
    } else {
      this.languages.update((list) => {
        const updated = savedLang.isDefault ? list.map((item) => ({ ...item, isDefault: false })) : list;
        return [savedLang, ...updated];
      });

      this._messageService.add({
        severity: 'success',
        summary: 'Idioma registrado',
        detail: `${savedLang.name} (${savedLang.code}) fue añadido a i18n.tb_languages.`,
      });
    }
  }

  onToggleActive(lang: LanguageItem): void {
    if (lang.isDefault && !lang.isActive) {
      lang.isActive = true;
      this._messageService.add({
        severity: 'warn',
        summary: 'Acción no permitida',
        detail: 'El idioma predeterminado debe permanecer siempre activo.',
      });
      return;
    }

    this.languages.update((list) =>
      list.map((item) => (item.id === lang.id ? { ...item, isActive: lang.isActive, updatedAt: 'Justo ahora' } : item)),
    );

    this._messageService.add({
      severity: lang.isActive ? 'success' : 'info',
      summary: lang.isActive ? 'Idioma habilitado' : 'Idioma deshabilitado',
      detail: `${lang.name} (${lang.code}) ahora está ${lang.isActive ? 'visible' : 'oculto'} en la tienda.`,
    });
  }

  setAsDefault(lang: LanguageItem): void {
    this.languages.update((list) =>
      list.map((item) => ({
        ...item,
        isDefault: item.id === lang.id,
        isActive: item.id === lang.id ? true : item.isActive,
        updatedAt: item.id === lang.id ? 'Justo ahora' : item.updatedAt,
      })),
    );

    this._messageService.add({
      severity: 'success',
      summary: 'Idioma principal actualizado',
      detail: `${lang.name} (${lang.code}) es ahora el idioma predeterminado de la plataforma.`,
    });
  }

  confirmDeleteLanguage(lang: LanguageItem): void {
    if (lang.isDefault) return;

    this._confirmationService.confirm({
      header: 'Eliminar idioma',
      message: `¿Estás seguro de eliminar "${lang.name} (${lang.code})"? Se desvincularán sus traducciones asociadas.`,
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: {
        severity: 'danger',
        size: 'small',
      },
      rejectButtonProps: {
        severity: 'secondary',
        variant: 'outlined',
        size: 'small',
      },
      accept: () => {
        this.languages.update((list) => list.filter((item) => item.id !== lang.id));
        this.selectedLanguages.update((sel) => sel.filter((item) => item.id !== lang.id));
        this._messageService.add({
          severity: 'success',
          summary: 'Idioma eliminado',
          detail: `${lang.name} fue eliminado correctamente.`,
        });
      },
    });
  }

  activateSelected(activeState: boolean): void {
    const selectedIds = new Set(this.selectedLanguages().map((s) => s.id));
    if (!selectedIds.size) return;

    this.languages.update((list) =>
      list.map((item) => {
        if (selectedIds.has(item.id) && !item.isDefault) {
          return { ...item, isActive: activeState, updatedAt: 'Justo ahora' };
        }
        return item;
      }),
    );

    this.selectedLanguages.set([]);
    this._messageService.add({
      severity: 'success',
      summary: 'Actualización masiva',
      detail: `Se actualizaron los idiomas seleccionados.`,
    });
  }

  onSyncCoverage(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Cobertura sincronizada',
      detail: 'Se verificaron 1,240 llaves estáticas y de catálogo en i18n.tb_languages.',
    });
  }
}
