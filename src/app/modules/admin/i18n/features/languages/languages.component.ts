import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { PIcon } from '@primeicons/angular/p-icon';
import { Card } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { Avatar } from 'primeng/avatar';
import { Badge } from 'primeng/badge';
import { Tag } from 'primeng/tag';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';

import { ApiError, LanguageService } from '../../services/language.service';
import { LanguagesDataTable, LanguagesParamsDataTable } from '../../interfaces';
import { LanguageImgFallbackDirective } from '../../directives/language-img-fallback.directive';
import { LocalizedDatePipe } from '../../pipes/localized-date.pipe';

@Component({
  imports: [
    Card,
    ButtonModule,
    PIcon,
    MenuModule,
    TableModule,
    SkeletonModule,
    Avatar,
    Badge,
    Tag,
    LanguageImgFallbackDirective,
    LocalizedDatePipe,
    InputTextModule,
    IconField,
    InputIcon,
    TooltipModule,
  ],
  selector: 'app-languages',
  templateUrl: './languages.component.html',
})
export class LanguagesComponent implements OnInit {
  private readonly _languageService$ = inject(LanguageService);

  private readonly languagesTable = signal<LanguagesDataTable>({ total: 0, rows: 10, loading: false, data: [] });
  private readonly skeletonLanguages = signal(Array.from({ length: 8 }, (_, i) => ({ id: i.toString() }))).asReadonly();
  private readonly initSortField = signal<Pick<LanguagesParamsDataTable, 'sortBy'>['sortBy']>('createdAt').asReadonly();
  private readonly initSortOrder = signal<Pick<LanguagesParamsDataTable, 'sortOrder'>['sortOrder']>('desc').asReadonly();
  private readonly lastRequestKey = signal<string | null>(null);
  private readonly itemsDataTable = signal<MenuItem[]>([
    {
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        console.log('llega');
      },
    },
  ]);

  ngOnInit(): void {}

  private onLazyLanguages(event: TableLazyLoadEvent) {
    const rows = event?.rows ?? this.languagesTable().rows;

    const paramsFilters: LanguagesParamsDataTable = {
      sortBy: event.sortField as Pick<LanguagesParamsDataTable, 'sortBy'>['sortBy'],
      limit: rows,
      page: Math.ceil((event?.first ?? 0) / rows) + 1,
      sortOrder: event?.sortOrder == -1 ? 'asc' : 'desc',
      search: '',
    };

    if (JSON.stringify(paramsFilters) === this.lastRequestKey()) return;
    this.lastRequestKey.set(JSON.stringify(paramsFilters));
    this.getAllLanguages(paramsFilters);
  }

  private refetchLanguages() {
    const row = this.languagesTable().rows;
    const paramsFilters: LanguagesParamsDataTable = {
      sortBy: this.initSortField(),
      limit: row,
      page: Math.ceil(0 / row) + 1,
      sortOrder: this.initSortOrder(),
      search: '',
    };
    this.getAllLanguages(paramsFilters);
  }

  private getAllLanguages(paramsFilters: LanguagesParamsDataTable) {
    const skeleton = this.skeletonLanguages();
    this.languagesTable.update((last) => ({ ...last, loading: true, data: skeleton, total: skeleton.length }));
    this._languageService$
      .getAll(paramsFilters)
      .pipe(finalize(() => this.languagesTable.update((last) => ({ ...last, loading: false }))))
      .subscribe({
        next: ({ items, ...meta }) => {
          this.languagesTable.update((last) => ({ ...last, data: items, total: meta.total }));
        },
        error: (error: ApiError) => {
          console.log(error);
        },
      });
  }

  private save() {
    console.log('save');
  }
}
