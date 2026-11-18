import { inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { _PALETTE, resolvePaletteScale } from '../../../primeng/_preset/_palette';

export interface ThemePresetOption {
  name: string;
  primaryName: string;
  primaryHex: string;
  secondaryName: string;
  secondaryHex: string;
}

const STORAGE_KEY = 'ecom_admin_theme_palette';

@Injectable({
  providedIn: 'root',
})
export class ThemePaletteService {
  private readonly document = inject(DOCUMENT);

  readonly presets: ThemePresetOption[] = [
    {
      name: 'Azul Real & Pizarra',
      primaryName: 'Royal Blue',
      primaryHex: '#215ada',
      secondaryName: 'Slate',
      secondaryHex: '#64748b',
    },
    {
      name: 'Índigo Moderno & Zinc',
      primaryName: 'Indigo',
      primaryHex: '#6366f1',
      secondaryName: 'Zinc',
      secondaryHex: '#71717a',
    },
    {
      name: 'Esmeralda & Pizarra',
      primaryName: 'Emerald',
      primaryHex: '#059669',
      secondaryName: 'Slate',
      secondaryHex: '#64748b',
    },
    {
      name: 'Violeta & Zinc',
      primaryName: 'Violet',
      primaryHex: '#8b5cf6',
      secondaryName: 'Zinc',
      secondaryHex: '#71717a',
    },
    {
      name: 'Rosa & Piedra (Stone)',
      primaryName: 'Rose',
      primaryHex: '#f43f5e',
      secondaryName: 'Stone',
      secondaryHex: '#78716c',
    },
    {
      name: 'Ámbar Cálido & Gris',
      primaryName: 'Amber',
      primaryHex: '#d97706',
      secondaryName: 'Gray',
      secondaryHex: '#6b7280',
    },
    {
      name: 'Cian Nórdico & Neutro',
      primaryName: 'Cyan',
      primaryHex: '#06b6d4',
      secondaryName: 'Neutral',
      secondaryHex: '#737373',
    },
  ];

  readonly activePrimaryHex = signal<string>('#215ada');
  readonly activeSecondaryHex = signal<string>('#64748b');

  constructor() {
    this.initSavedPalette();
  }

  setPrimaryColor(hex: string): void {
    if (!hex) return;
    this.activePrimaryHex.set(hex);
    this.applyPalette(hex, this.activeSecondaryHex());
  }

  setSecondaryColor(hex: string): void {
    if (!hex) return;
    this.activeSecondaryHex.set(hex);
    this.applyPalette(this.activePrimaryHex(), hex);
  }

  applyPreset(preset: ThemePresetOption): void {
    this.activePrimaryHex.set(preset.primaryHex);
    this.activeSecondaryHex.set(preset.secondaryHex);
    this.applyPalette(preset.primaryHex, preset.secondaryHex);
  }

  private applyPalette(primaryHex: string, secondaryHex: string): void {
    /* const root = this.document?.documentElement;
    if (!root) return;

    try {
      const primaryScale = resolvePaletteScale(primaryHex);
      const secondaryScale = resolvePaletteScale(secondaryHex);

      const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

      for (const shade of shades) {
        root.style.setProperty(`--ecom-primary-${shade}`, primaryScale[shade]);
        root.style.setProperty(`--ecom-secondary-${shade}`, secondaryScale[shade]);
      }

      // Calcular contraste para el color primary (blanco o negro según luminosidad)
      const contrast = this.calculateContrastColor(primaryScale[500]);
      root.style.setProperty('--ecom-primary-contrast-color', contrast);
      root.style.setProperty('--ecom-secondary-contrast-color', '#ffffff');

      // Persistir selección del admin
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ primary: primaryHex, secondary: secondaryHex }));
      }
    } catch (e) {
      console.warn('Error applying palette theme:', e);
    } */
  }

  private initSavedPalette(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { primary, secondary } = JSON.parse(saved);
        if (primary && secondary) {
          this.activePrimaryHex.set(primary);
          this.activeSecondaryHex.set(secondary);
          this.applyPalette(primary, secondary);
          return;
        }
      }
    } catch (e) {
      // Ignorar error si JSON corrupto
    }
    // Si no hay configuración guardada, aplicar los valores por defecto
    this.applyPalette(this.activePrimaryHex(), this.activeSecondaryHex());
  }

  private calculateContrastColor(hexColor: string): string {
    const cleanHex = hexColor.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    // Luminosidad relativa según fórmula W3C
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 150 ? '#0f172a' : '#ffffff';
  }
}
