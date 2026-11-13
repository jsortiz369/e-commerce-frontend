import { computed, Service, signal } from '@angular/core';
import { SidebarCollapsible, SidebarVariant } from 'primeng/sidebar';

import { _PALETTE, PaletteColorName } from '../../../primeng/_preset/_palette';

export interface LayoutConfig {
  primary: PaletteColorName;
  surface: string | undefined | null;
  darkTheme: boolean;
}

interface LayoutState {
  open: boolean;
  collapsible: SidebarCollapsible;
  overlay: boolean;
  openOnHover: boolean;
  variant: SidebarVariant;
}

@Service()
export class LayoutService {
  readonly layoutConfig = signal<LayoutConfig>({
    primary: 'green',
    surface: null,
    darkTheme: false,
  });

  readonly layoutState = signal<LayoutState>({
    open: false,
    collapsible: 'icon',
    openOnHover: false,
    overlay: false,
    variant: 'sidebar',
  });

  readonly currentView = signal<'desktop' | 'mobile' | null>(null);
  readonly isMobile = computed(() => this.currentView() === 'mobile');
  readonly theme = computed(() => (this.layoutConfig().darkTheme ? 'dark' : 'light'));
  readonly isDarkTheme = computed(() => this.layoutConfig().darkTheme);
  readonly getPrimary = computed(() => this.layoutConfig().primary);
  readonly getSurface = computed(() => this.layoutConfig().surface);

  constructor() {
    this.getConfigLayoutLocal();

    //updatePreset(configPreset(this.layoutConfig().primary));
    this.onToggleDarkMode();
    this.onChangePrimary(this.layoutConfig().primary);
  }

  onMenuToggle(header = false) {
    const config = this.layoutState();
    config.open = !config.open;

    if (header && this.isDesktop()) {
      if (!config.open) {
        config.overlay = true;
        config.openOnHover = true;
      } else {
        config.overlay = false;
        config.openOnHover = false;
      }
    }

    this.layoutState.update(() => ({ ...config }));
  }

  onResize() {
    const currentView = this.isDesktop() ? 'desktop' : 'mobile';
    if (currentView == this.currentView()) return;

    this.currentView.set(currentView);

    this.layoutState.update((config) => ({
      ...config,
      collapsible: currentView === 'desktop' ? 'icon' : 'offcanvas',
      openOnHover: false,
      overlay: currentView === 'mobile' ? true : false,
      open: currentView === 'desktop' ? true : false,
    }));
  }

  isDesktop() {
    return window.innerWidth > 768;
  }

  paletteColors() {
    const palettes: { name: PaletteColorName; color: string }[] = [];
    Object.entries(_PALETTE).forEach(([key, value]) => {
      palettes.push({ name: key as PaletteColorName, color: value['500'] });
    });
    return palettes;
  }

  onToggleDarkMode(config?: LayoutConfig): void {
    const _config = config || this.layoutConfig();
    if (_config.darkTheme) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }

    this.setConfigLayoutLocal();
  }

  onChangePrimary(paletteColor: PaletteColorName) {
    // updatePreset(configPreset(paletteColor));
    // this.setConfigLayoutLocal();
  }

  private setConfigLayoutLocal() {
    localStorage.setItem('layout-config', JSON.stringify(this.layoutConfig()));
  }

  private getConfigLayoutLocal() {
    const config = localStorage.getItem('layout-config');
    if (!config) return;
    this.layoutConfig.set(JSON.parse(config));
  }
}
