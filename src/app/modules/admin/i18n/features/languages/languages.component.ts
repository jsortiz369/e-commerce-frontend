import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Card } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { Avatar } from 'primeng/avatar';
import { Badge } from 'primeng/badge';
import { Tag } from 'primeng/tag';
import { SplitButtonModule } from 'primeng/splitbutton';

import { ApiError, LanguageService } from '../../services/language.service';
import { LanguagesDataTable, LanguagesParamsDataTable } from '../../interfaces';
import { LanguageImgFallbackDirective } from '../../directives/language-img-fallback.directive';
import { LocalizedDatePipe } from '../../pipes/localized-date.pipe';
import { MenuItem } from 'primeng/api';

@Component({
  imports: [Card, TableModule, SkeletonModule, Avatar, Badge, Tag, SplitButtonModule, LanguageImgFallbackDirective, LocalizedDatePipe],
  selector: 'app-languages',
  templateUrl: './languages.component.html',
})
export class LanguagesComponent implements OnInit {
  private readonly _languageService$ = inject(LanguageService);

  private readonly languagesTable = signal<LanguagesDataTable>({ total: 0, rows: 10, loading: false, data: [], event: {} });
  private readonly skeletonLanguages = signal(Array.from({ length: 6 }, (_, i) => ({ id: i.toString() }))).asReadonly();
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

  onLazyLanguages(event: TableLazyLoadEvent) {
    const skeleton = this.skeletonLanguages();
    this.languagesTable.update((last) => ({ ...last, loading: true, data: skeleton, total: skeleton.length }));
    const rows = event?.rows ?? this.languagesTable().rows;

    const paramsFilters: LanguagesParamsDataTable = {
      sort: event.sortField as Pick<LanguagesParamsDataTable, 'sort'>['sort'],
      limit: rows,
      page: Math.ceil((event?.first ?? 0) / rows) + 1,
      sortOrder: event?.sortOrder == 1 ? 'asc' : 'desc',
      search: '',
    };

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

  save() {
    console.log('save');
  }
}
