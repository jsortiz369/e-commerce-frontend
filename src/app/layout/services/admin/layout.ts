import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { delay, finalize, Observable, of, shareReplay, tap } from 'rxjs';

export interface SidebarSubItem {
  label: string;
  route?: string;
  badge?: string;
  icon?: string;
  tables?: string[];
}

export interface SidebarItem {
  icon?: string;
  label: string;
  route?: string;
  badge?: string;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  label: string;
  children?: SidebarItem[];
}

@Service()
export class Layout {
  private readonly _http = inject(HttpClient);

  private readonly _sidebar$ = signal<SidebarGroup[]>([]);
  public readonly sidebar = computed(() => this._sidebar$());

  private _request$: Observable<SidebarGroup[]> | null = null;

  getSidebar(): Observable<SidebarGroup[]> {
    if (this._sidebar$().length > 0) return of(this._sidebar$());
    if (this._request$) return this._request$;

    this._request$ = this._http.get<SidebarGroup[]>('example/sidebar.json').pipe(
      tap((data) => this._sidebar$.set(data ?? [])),
      finalize(() => (this._request$ = null)),
      shareReplay(1),
      delay(500),
    );

    return this._request$;
  }
}
