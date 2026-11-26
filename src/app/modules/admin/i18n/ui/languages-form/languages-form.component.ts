import { NgClass } from '@angular/common';
import { Component, computed, model, OnDestroy, output, signal } from '@angular/core';
import { form, FormField, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { PIcon } from '@primeicons/angular/p-icon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileRemoveEvent, FileSelectEvent, FileUpload, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

export interface LanguageFormModel {
  flag: File | null;
  name: string;
  code: string;
  direction: 'LTR' | 'RTL';
  isVisible: boolean;
  isActive: boolean;
  isDefault: boolean;
}

export interface LanguageCreatePayload extends LanguageFormModel {
  formData: FormData;
}

@Component({
  imports: [
    FormsModule,
    DialogModule,
    ButtonModule,
    PIcon,
    MessageModule,
    FileUploadModule,
    InputTextModule,
    ToggleSwitchModule,
    SelectButtonModule,
    TagModule,
    FormField,
  ],
  selector: 'app-languages-form',
  templateUrl: './languages-form.component.html',
})
export class LanguagesFormComponent implements OnDestroy {
  readonly visible = model.required<boolean>();

  private readonly maxFileSize = 1 * 1024 * 1024; // 2 MB
  private readonly acceptedFormatsLabel = 'WEBP, PNG, JPG, SVG';
  private readonly languageModel = signal<LanguageFormModel>({
    flag: null,
    name: '',
    code: '',
    direction: 'LTR',
    isVisible: true,
    isActive: true,
    isDefault: false,
  });

  protected readonly languageForm = form(this.languageModel, (schema) => {
    required(schema.flag, { message: 'La imagen de la bandera es obligatoria.' });
    required(schema.name, { message: 'El nombre del idioma es obligatorio.' });
    minLength(schema.name, 2, { message: 'El nombre debe tener al menos 2 caracteres.' });
    maxLength(schema.name, 60, { message: 'El nombre no puede superar los 60 caracteres.' });
    required(schema.code, { message: 'El código ISO del idioma es obligatorio.' });
    pattern(schema.code, /^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$/, {
      message: 'Usa un código ISO válido (ej. es, en, pt-BR).',
    });
  });

  ngOnDestroy(): void {}

  onFileSelect(event: FileSelectEvent) {
    console.log('Selected file:', event);
  }

  private formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  /* 

  protected readonly directionOptions = [
    { label: 'LTR', value: 'LTR' as const },
    { label: 'RTL', value: 'RTL' as const },
  ];

  

  protected readonly selectedFile = signal<File | null>(null);
  protected readonly previewUrl = signal<string | null>(null);
  protected readonly fileError = signal<string | null>(null);
  protected readonly submitted = signal<boolean>(false);

 

  protected readonly canSubmit = computed(() => {
    const modelVal = this.languageModel();
    return Boolean(this.selectedFile() && modelVal.name.trim().length >= 2 && /^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})?$/.test(modelVal.code.trim()));
  });

  onFileSelect(event: FileSelectEvent, fileUpload?: FileUpload): void {
    this.fileError.set(null);
    const file = event.currentFiles?.[0] ?? event.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.fileError.set('El archivo seleccionado debe ser una imagen válida.');
      this.clearSelectedFile(fileUpload);
      return;
    }

    if (file.size > this.maxFileSize) {
      this.fileError.set(`La imagen supera el tamaño máximo permitido (${this.formatSize(this.maxFileSize)}).`);
      this.clearSelectedFile(fileUpload);
      return;
    }

    this.revokeCurrentPreview();
    const objectUrl = (file as File & { objectURL?: string }).objectURL || URL.createObjectURL(file);

    this.selectedFile.set(file);
    this.previewUrl.set(objectUrl);
    this.languageModel.update((prev) => ({ ...prev, flag: file }));
  }

  onFileRemove(_event?: FileRemoveEvent, fileUpload?: FileUpload): void {
    this.clearSelectedFile(fileUpload);
  }

  clearSelectedFile(fileUpload?: FileUpload): void {
    this.revokeCurrentPreview();
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.languageModel.update((prev) => ({ ...prev, flag: null }));
    if (fileUpload) {
      fileUpload.clear();
    }
  }

  updateDirection(direction: 'LTR' | 'RTL'): void {
    if (!direction) return;
    this.languageModel.update((prev) => ({ ...prev, direction }));
  }

  updateToggle(field: 'isVisible' | 'isActive' | 'isDefault', value: boolean): void {
    this.languageModel.update((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'isDefault' && value ? { isActive: true, isVisible: true } : {}),
    }));
  }

  closeDialog(fileUpload?: FileUpload): void {
    this.resetForm(fileUpload);
    this.visible.set(false);
  }

  saveLanguage(fileUpload?: FileUpload): void {
    this.submitted.set(true);
    const current = this.languageModel();
    const file = this.selectedFile();

    if (!file) {
      this.fileError.set('Selecciona una imagen de bandera para el idioma.');
      return;
    }

    if (!this.canSubmit()) return;

    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('flag', file, file.name);
    formData.append('name', current.name.trim());
    formData.append('code', current.code.trim().toLowerCase());
    formData.append('direction', current.direction);
    formData.append('isVisible', String(current.isVisible));
    formData.append('isActive', String(current.isActive));
    formData.append('isDefault', String(current.isDefault));

    const payload: LanguageCreatePayload = {
      ...current,
      flag: file,
      name: current.name.trim(),
      code: current.code.trim().toLowerCase(),
      formData,
    };
  }

  

  ngOnDestroy(): void {
    this.revokeCurrentPreview();
  }

  private resetForm(fileUpload?: FileUpload): void {
    this.clearSelectedFile(fileUpload);
    this.fileError.set(null);
    this.submitted.set(false);
    this.languageModel.set({
      flag: null,
      name: '',
      code: '',
      direction: 'LTR',
      isVisible: true,
      isActive: true,
      isDefault: false,
    });
  }

  private revokeCurrentPreview(): void {
    const currentUrl = this.previewUrl();
    if (currentUrl && currentUrl.startsWith('blob:')) {
      URL.revokeObjectURL(currentUrl);
    }
  } */
}
