import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, model, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PIcon } from '@primeicons/angular/p-icon';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { LanguageDirection, LanguageItem, LanguagePresetOption } from '../../features/languages-2/languages';
import { LanguageService } from '../../services/language.service';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    PIcon,
    DialogModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    ToggleSwitchModule,
    DividerModule,
    MessageModule,
  ],
  selector: 'app-language-create-update',
  templateUrl: './language-create-update.component.html',
})
export class LanguageCreateUpdateComponent implements OnInit {
  private readonly _languageService = inject(LanguageService);
  private readonly _messageService = inject(MessageService);

  /** Control de visibilidad sincronizado con el @if del componente padre */
  readonly visible = model<boolean>(true);

  /**
   * Estado interno del p-dialog para permitir que la animación de salida (leave)
   * termine completamente antes de desmontar el componente en (onHide).
   */
  readonly dialogVisible = signal<boolean>(true);

  /** ID del idioma cuando se abre en modo edición (null si es nuevo registro) */
  readonly languageId = input<string | null>(null);

  /** Datos iniciales opcionales mientras responde o se integra la API */
  readonly initialData = input<LanguageItem | null>(null);

  /** Eventos emitidos al componente padre */
  readonly saved = output<LanguageItem>();
  readonly closed = output<void>();

  readonly isEditMode = computed(() => !!this.languageId());
  readonly isLoading = signal<boolean>(false);

  /** Estado del formulario */
  readonly selectedPreset = signal<LanguagePresetOption | null>(null);
  readonly formId = signal<string>('');
  readonly formName = signal<string>('');
  readonly formNativeName = signal<string>('');
  readonly formCode = signal<string>('');
  readonly formFlag = signal<string>('');
  readonly formRegion = signal<string>('América Latina');
  readonly formDirection = signal<LanguageDirection>('LTR');
  readonly formImage = signal<string>('/assets/flags/default.svg');
  readonly formIsActive = signal<boolean>(true);
  readonly formIsDefault = signal<boolean>(false);

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

  ngOnInit(): void {
    const id = this.languageId();
    if (id) {
      this.loadLanguageById(id);
    } else {
      this.resetForm();
    }
  }

  /**
   * Obtiene los datos del idioma desde la API cuando se abre en modo edición
   */
  private loadLanguageById(id: string): void {
    const fallback = this.initialData();
    if (fallback) {
      this.populateForm(fallback);
    }

    // Aquí puedes suscribirte a this._languageService.getById(id) cuando el endpoint esté disponible:
    // this.isLoading.set(true);
    // this._languageService.getById(id).subscribe({
    //   next: (response: any) => {
    //     this.populateForm(response);
    //     this.isLoading.set(false);
    //   },
    //   error: () => this.isLoading.set(false),
    // });
  }

  private populateForm(lang: LanguageItem): void {
    this.selectedPreset.set(null);
    this.formId.set(lang.id);
    this.formName.set(lang.name);
    this.formNativeName.set(lang.nativeName);
    this.formCode.set(lang.code);
    this.formFlag.set(lang.flag);
    this.formRegion.set(lang.region);
    this.formDirection.set(lang.direction);
    this.formImage.set(lang.image);
    this.formIsActive.set(lang.isActive);
    this.formIsDefault.set(lang.isDefault);
  }

  private resetForm(): void {
    this.selectedPreset.set(null);
    this.formId.set('');
    this.formName.set('');
    this.formNativeName.set('');
    this.formCode.set('');
    this.formFlag.set('');
    this.formRegion.set('América Latina');
    this.formDirection.set('LTR');
    this.formImage.set('/assets/flags/default.svg');
    this.formIsActive.set(true);
    this.formIsDefault.set(false);
  }

  applyPreset(preset: LanguagePresetOption | null): void {
    this.selectedPreset.set(preset);
    if (!preset) return;
    this.formName.set(preset.name);
    this.formNativeName.set(preset.nativeName);
    this.formCode.set(preset.code);
    this.formFlag.set(preset.flag);
    this.formRegion.set(preset.region);
    this.formDirection.set(preset.direction);
    this.formImage.set(preset.image);
  }

  /** Inicia el cierre animado del p-dialog */
  closeDialog(): void {
    this.dialogVisible.set(false);
  }

  /** Se ejecuta cuando termina la animación de cierre del p-dialog */
  onDialogHide(): void {
    this.visible.set(false);
    this.closed.emit();
  }

  saveLanguage(): void {
    const name = this.formName().trim();
    const code = this.formCode().trim();
    if (!name || !code) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Campos requeridos',
        detail: 'Ingresa el nombre del idioma y su código ISO (ej. es-PE, en-US).',
      });
      return;
    }

    const flag = (this.formFlag().trim() || code.split('-')[1] || code.slice(0, 2)).toUpperCase();
    const nativeName = this.formNativeName().trim() || name;
    const isDefault = this.formIsDefault();
    const isActive = isDefault ? true : this.formIsActive();
    const existing = this.initialData();

    const languagePayload: LanguageItem = {
      id: this.isEditMode() ? this.formId() || this.languageId()! : 'lang-' + Date.now(),
      name,
      nativeName,
      code,
      flag,
      region: this.formRegion(),
      direction: this.formDirection(),
      image: this.formImage().trim() || `/assets/flags/${code.toLowerCase()}.svg`,
      isActive,
      isDefault,
      translatedKeys: existing?.translatedKeys ?? 0,
      totalKeys: existing?.totalKeys ?? 1240,
      progress: existing?.progress ?? 0,
      updatedAt: 'Justo ahora',
    };

    this.saved.emit(languagePayload);
    this.closeDialog();
  }
}
