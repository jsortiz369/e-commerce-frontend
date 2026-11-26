import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, Signal, signal } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { catchError, delay, finalize, map, Observable, of, shareReplay, tap } from 'rxjs';

import { buildPrimeNGTranslation } from '../../../primeng/_translations';

export type SupportedLangCode = string;
export type StaticTranslationsMap = Record<string, string>;
export type MultiLangTranslationsPayload = Record<string, StaticTranslationsMap> | StaticTranslationsMap;

declare global {
  interface String {
    /**
     * Traduce una llave estática globalmente desde cualquier plantilla HTML o archivo TS
     * sin necesidad de importar ningún Pipe en el @Component.
     * Al cambiar el idioma activo, todos los textos que usan .translate() se actualizan
     * reactivamente sin recargar la página.
     */
    translate(fallback?: string): string;
  }
}

const CURRENT_LANG$ = signal<SupportedLangCode>(
  (typeof localStorage !== 'undefined' && (localStorage.getItem('app_lang') as SupportedLangCode)) || 'es',
);
const GLOBAL_STATIC_TRANSLATIONS$ = signal<StaticTranslationsMap>({});

if (typeof String.prototype.translate !== 'function') {
  Object.defineProperty(String.prototype, 'translate', {
    value: function (this: string, fallback?: string): string {
      const key = String(this);
      if (!key) return fallback ?? '';
      return GLOBAL_STATIC_TRANSLATIONS$()[key] ?? fallback ?? key;
    },
    writable: true,
    configurable: true,
  });
}

@Service()
export class StaticTranslationsService {
  private readonly _http = inject(HttpClient);
  private readonly _primeng = inject(PrimeNG);

  private readonly _dictionariesByLang = signal<Record<string, StaticTranslationsMap>>({});

  public readonly currentLang = computed(() => CURRENT_LANG$());
  public readonly translations = computed(() => GLOBAL_STATIC_TRANSLATIONS$());
  public readonly hasTranslations = computed(() => Object.keys(GLOBAL_STATIC_TRANSLATIONS$()).length > 0);

  private _request$: Observable<StaticTranslationsMap> | null = null;
  private _applyActiveLanguage(lang: SupportedLangCode, activeDict: StaticTranslationsMap): void {
    CURRENT_LANG$.set(lang);
    GLOBAL_STATIC_TRANSLATIONS$.set(activeDict);
    this._primeng.setTranslation(buildPrimeNGTranslation(activeDict));
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('app_lang', lang);
    }
  }

  /**
   * Obtiene las traducciones del idioma activo (o del idioma indicado) por Observable.
   */
  getStaticTranslations(lang: SupportedLangCode = CURRENT_LANG$()): Observable<StaticTranslationsMap> {
    const cached = this._dictionariesByLang()[lang];
    if (cached && Object.keys(cached).length > 0) {
      this._applyActiveLanguage(lang, cached);
      return of(cached);
    }

    if (this._request$) return this._request$;

    this._request$ = this._http.get<MultiLangTranslationsPayload>('example/static-translations.json').pipe(
      map((payload) => {
        // Soporta JSON multi-idioma { es: {...}, en: {...}, pt: {...}, ... } o plano { "key": "val" }
        const firstValue = payload && typeof payload === 'object' ? Object.values(payload)[0] : null;
        if (payload && typeof payload === 'object' && firstValue && typeof firstValue === 'object') {
          const multi = payload as Record<string, StaticTranslationsMap>;
          this._dictionariesByLang.set(multi);
          return multi[lang] ?? multi[Object.keys(multi)[0]] ?? {};
        }

        const flat = (payload as StaticTranslationsMap) ?? {};
        this._dictionariesByLang.update((prev) => ({ ...prev, [lang]: flat }));
        return flat;
      }),
      tap((activeDict) => {
        this._applyActiveLanguage(lang, activeDict);
      }),
      catchError((error) => {
        console.error('Error al cargar static-translations.json:', error);
        this._applyActiveLanguage(lang, {});
        return of({});
      }),
      finalize(() => (this._request$ = null)),
      shareReplay(1),
      delay(500),
    );

    return this._request$;
  }

  /**
   * Cambia el idioma en caliente sin refrescar la página.
   * Actualiza la señal GLOBAL_STATIC_TRANSLATIONS$ y la configuración de PrimeNG automáticamente.
   */
  changeLanguage(lang: SupportedLangCode): void {
    if (lang === CURRENT_LANG$() && this.hasTranslations()) return;

    const cached = this._dictionariesByLang()[lang];
    if (cached && Object.keys(cached).length > 0) {
      this._applyActiveLanguage(lang, cached);
      return;
    }

    this.getStaticTranslations(lang).subscribe();
  }

  /**
   * Alterna instantáneamente entre Español ('es') e Inglés ('en') sin recargar la página.
   */
  toggleLanguage(): void {
    const nextLang: SupportedLangCode = CURRENT_LANG$() === 'es' ? 'en' : 'es';
    this.changeLanguage(nextLang);
  }

  translate(key: string, fallback?: string): string {
    return GLOBAL_STATIC_TRANSLATIONS$()[key] ?? fallback ?? key;
  }

  select(key: string, fallback?: string): Signal<string> {
    return computed(() => GLOBAL_STATIC_TRANSLATIONS$()[key] ?? fallback ?? key);
  }
}
