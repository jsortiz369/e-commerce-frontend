import { computed, Service, signal } from '@angular/core';

export type LoaderActionType = 'product' | 'cart' | 'payment' | 'sync' | 'delete' | 'general';

export interface LoaderConfig {
  action?: LoaderActionType;
  title?: string;
  subtitle?: string;
}

@Service()
export class LoadersSystem {
  private readonly _loaderPageAdmin$ = signal<boolean>(false);
  private readonly _loaderPage$ = signal<boolean>(false);
  private readonly _loader$ = signal<boolean>(false);
  private readonly _loaderConfig$ = signal<LoaderConfig>({
    action: 'general',
    title: '',
    subtitle: '',
  });

  public readonly isLoaderPageAdmin = computed(() => this._loaderPageAdmin$());
  public readonly isLoaderPage = computed(() => this._loaderPage$());
  public readonly isLoader = computed(() => this._loader$());
  public readonly loaderConfig = computed(() => this._loaderConfig$());

  showLoaderPageAdmin(): void {
    this._loaderPageAdmin$.set(true);
  }

  hideLoaderPageAdmin(): void {
    this._loaderPageAdmin$.set(false);
  }

  showLoaderPage(): void {
    this._loaderPage$.set(true);
  }

  hideLoaderPage(): void {
    this._loaderPage$.set(false);
  }

  showLoader(config?: LoaderConfig | string): void {
    if (typeof config === 'string') {
      this._loaderConfig$.set({ action: 'general', title: config, subtitle: '' });
    } else if (config) {
      this._loaderConfig$.set({
        action: config.action ?? 'general',
        title: config.title ?? '',
        subtitle: config.subtitle ?? '',
      });
    } else {
      this._loaderConfig$.set({ action: 'general', title: '', subtitle: '' });
    }
    this._loader$.set(true);
  }

  hideLoader(): void {
    this._loader$.set(false);
  }
}
