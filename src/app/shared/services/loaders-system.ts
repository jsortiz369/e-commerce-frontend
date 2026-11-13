import { computed, Service, signal } from '@angular/core';

@Service()
export class LoadersSystem {
  private readonly _loaderPageAdmin$ = signal<boolean>(false);
  private readonly _loaderPage$ = signal<boolean>(false);

  public readonly isLoaderPageAdmin = computed(() => this._loaderPageAdmin$());
  public readonly isLoaderPage = computed(() => this._loaderPage$());

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
}
