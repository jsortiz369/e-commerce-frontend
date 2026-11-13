import { Component, inject, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { Sidebar } from '@primeicons/angular/sidebar';
import { PIcon } from '@primeicons/angular/p-icon';
import { ThemePaletteService, ThemePresetOption } from '../../../shared/services/theme-palette.service';

@Component({
  imports: [ButtonModule, SidebarModule, Sidebar, PIcon],
  selector: 'app-layout-topbar',
  templateUrl: './layout-topbar.html',
  host: {
    class: 'contents',
  },
})
export class LayoutTopbar {
  readonly themeService = inject(ThemePaletteService);

  readonly groupLabel = input<string>('General');
  readonly breadcrumbTrail = input<string>('Resumen');
  readonly activeSchema = input<string | null>(null);
  readonly sidebarTarget = input<string>('admin-sidebar');
  readonly isFloating = input<boolean>(false);

  readonly showPaletteMenu = signal<boolean>(false);

  readonly openPos = output<void>();

  togglePaletteMenu(): void {
    this.showPaletteMenu.update((v) => !v);
  }

  closePaletteMenu(): void {
    this.showPaletteMenu.set(false);
  }

  onPrimaryColorInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input?.value) {
      this.themeService.setPrimaryColor(input.value);
    }
  }

  onSecondaryColorInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (input?.value) {
      this.themeService.setSecondaryColor(input.value);
    }
  }

  onSelectPreset(preset: ThemePresetOption): void {
    this.themeService.applyPreset(preset);
  }
}
