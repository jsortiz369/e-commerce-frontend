import { TableLazyLoadEvent } from 'primeng/table';

export interface LanguagesParamsDataTable {
  sort: 'code' | 'name' | 'status' | 'createdAt';
  limit: number;
  page: number;
  sortOrder: 'asc' | 'desc';
  search?: string;
}

export interface LanguagesDataTable {
  total: number;
  rows: number;
  event: TableLazyLoadEvent;
  loading: boolean;
  data: any[];
}

export interface LanguagesResponse {
  items: any[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
