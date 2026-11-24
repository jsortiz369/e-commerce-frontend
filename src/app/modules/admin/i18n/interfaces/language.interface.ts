import { TableLazyLoadEvent } from 'primeng/table';

export interface LanguagesParamsDataTable {
  sortBy: 'code' | 'name' | 'status' | 'createdAt';
  limit: number;
  page: number;
  sortOrder: 'asc' | 'desc';
  search?: string;
}

export interface LanguagesDataTable {
  total: number;
  rows: number;
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
