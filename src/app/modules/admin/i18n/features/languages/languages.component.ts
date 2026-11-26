import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { PIcon } from '@primeicons/angular/p-icon';
import { Card } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule, TableLazyLoadEvent, Table } from 'primeng/table';
import { Badge } from 'primeng/badge';
import { Tag } from 'primeng/tag';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { GalleryModule } from 'primeng/gallery';

import { ApiError, LanguageService } from '../../services/language.service';
import {
  FilterStateOptions,
  LanguagesDataTable,
  LanguagesParamsDataTable,
  LanguageSummary,
  LanguageSummaryResponse,
  LanguageTable,
  StatusFilterType,
} from '../../interfaces';
import { LanguageImgFallbackDirective } from '../../directives/language-img-fallback.directive';
import { LocalizedDatePipe } from '../../pipes/localized-date.pipe';

@Component({
  imports: [
    FormsModule,
    Card,
    ButtonModule,
    PIcon,
    MenuModule,
    TableModule,
    SkeletonModule,
    Badge,
    Tag,
    LanguageImgFallbackDirective,
    LocalizedDatePipe,
    InputTextModule,
    IconField,
    InputIcon,
    TooltipModule,
    SelectModule,
    GalleryModule,
  ],
  selector: 'app-languages',
  templateUrl: './languages.component.html',
})
export class LanguagesComponent implements OnInit {
  private readonly _languageService$ = inject(LanguageService);

  private readonly languagesSummary = signal<LanguageSummary>({ loading: false, data: {} as LanguageSummaryResponse });
  private readonly languagesTable = signal<LanguagesDataTable>({ total: 0, rows: 10, loading: false, data: [] });
  private readonly skeletonLanguages = signal(Array.from({ length: 8 }, (_, i) => ({ id: i.toString() }))).asReadonly();
  private readonly initSortField = signal<Pick<LanguagesParamsDataTable, 'sortBy'>['sortBy']>('createdAt').asReadonly();
  private readonly initSortOrder = signal<Pick<LanguagesParamsDataTable, 'sortOrder'>['sortOrder']>('desc').asReadonly();
  private readonly lastRequestKey = signal<string | null>(null);
  private readonly searchValue = signal<string>('');
  private readonly statusFilter = signal<StatusFilterType>('ALL');
  private readonly hasActiveFilters = computed(() => this.searchValue().trim().length > 0 || this.statusFilter() !== 'ALL');
  private readonly filterStateOptions = signal<FilterStateOptions[]>([
    { label: 'Activo', description: 'Habilitados', value: 'ACTIVE', severity: 'success' },
    { label: 'Inactivo', description: 'Deshabilitados', value: 'INACTIVE', severity: 'secondary' },
  ]).asReadonly();
  private readonly itemsDataTable = signal<MenuItem[]>([
    { label: 'Update', icon: 'pi pi-refresh', command: () => console.log('llega') },
  ]).asReadonly();
  private readonly imagePreviewVisible = signal<boolean>(false);
  private readonly selectedPreviewLanguage = signal<LanguageTable | null>(null);

  ngOnInit(): void {
    this.getSummary();
  }

  private getSummary() {
    this.languagesSummary.update((last) => ({ ...last, loading: true }));
    this._languageService$
      .getSummary()
      .pipe(finalize(() => this.languagesSummary.update((last) => ({ ...last, loading: false }))))
      .subscribe({
        next: (summary) => this.languagesSummary.update((last) => ({ ...last, data: summary })),
        error: (error: ApiError) => {
          this.languagesSummary.update((last) => ({ ...last, data: {} as LanguageSummaryResponse }));
        },
      });
  }

  private onLazyLanguages(event: TableLazyLoadEvent) {
    const rows = event?.rows ?? this.languagesTable().rows;

    const globalFilter = event.filters?.['global'];
    const stateFilter = event.filters?.['isActive'] ?? event.filters?.['state'];
    const search = Array.isArray(globalFilter) ? (globalFilter[0]?.value ?? '') : (globalFilter?.value ?? '');
    const rawState = Array.isArray(stateFilter) ? (stateFilter[0]?.value ?? null) : (stateFilter?.value ?? null);
    const activeState: StatusFilterType = rawState === 'ACTIVE' || rawState === 'INACTIVE' ? rawState : 'ALL';
    const allFiltersEmpty = !search && activeState === 'ALL';

    const paramsFilters: LanguagesParamsDataTable = {
      sortBy: (event.sortField as Pick<LanguagesParamsDataTable, 'sortBy'>['sortBy']) ?? this.initSortField(),
      limit: rows,
      page: Math.ceil((event?.first ?? 0) / rows) + 1,
      sortOrder: event?.sortOrder == -1 ? 'asc' : 'desc',
      filters: allFiltersEmpty
        ? undefined
        : {
            search: search.length === 0 ? undefined : search,
            state: activeState === 'ALL' ? undefined : activeState,
          },
    };

    const stringParamsFilters = JSON.stringify(paramsFilters);
    if (stringParamsFilters === this.lastRequestKey()) return;
    this.lastRequestKey.set(stringParamsFilters);
    this.getAllLanguages(paramsFilters);
  }

  private refetchLanguages() {
    const row = this.languagesTable().rows;
    const paramsFilters: LanguagesParamsDataTable = {
      sortBy: this.initSortField(),
      limit: row,
      page: 1,
      sortOrder: this.initSortOrder(),
      filters: undefined,
    };
    this.searchValue.set('');
    this.statusFilter.set('ALL');
    this.getAllLanguages(paramsFilters);
  }

  private getAllLanguages(paramsFilters: LanguagesParamsDataTable) {
    const skeleton = this.skeletonLanguages() as unknown as Array<LanguageTable>;
    this.languagesTable.update((last) => ({ ...last, loading: true, data: skeleton, total: skeleton.length }));
    this._languageService$
      .getAll(paramsFilters)
      .pipe(finalize(() => this.languagesTable.update((last) => ({ ...last, loading: false }))))
      .subscribe({
        next: ({ items, ...meta }) => this.languagesTable.update((last) => ({ ...last, data: items, total: meta.total })),
        error: (error: ApiError) => {
          this.languagesTable.update((last) => ({ ...last, data: [], total: 0 }));
        },
      });
  }

  private onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.searchValue.set(value);
    table.filterGlobal(value, 'contains');
  }

  private clearFilters(table: Table) {
    this.searchValue.set('');
    this.statusFilter.set('ALL');
    table.clear();
    //table.sortField = this.initSortField();
    //table.sortOrder = -1;
  }

  private openImagePreview(item: LanguageTable): void {
    this.selectedPreviewLanguage.set(item);
    this.imagePreviewVisible.set(true);
  }

  private save() {
    console.log('save');
  }
}
