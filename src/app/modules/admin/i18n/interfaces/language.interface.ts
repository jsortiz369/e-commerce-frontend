export type StatusFilterType = 'ALL' | 'ACTIVE' | 'INACTIVE';

export interface FilterStateOptions {
  label: string;
  value: Exclude<StatusFilterType, 'ALL'>;
  severity: 'success' | 'secondary';
  description: string;
}

export interface LanguageData {
  id: string;
  name: string;
  code: string;
  image: string;
  isActive: boolean;
  isVisible: boolean;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LanguageTable extends Omit<LanguageData, 'isVisible'> {}

export interface LanguagesParamsDataTable {
  sortBy: 'code' | 'name' | 'status' | 'createdAt';
  limit: number;
  page: number;
  sortOrder: 'asc' | 'desc';
  filters?: {
    search?: string;
    state?: Omit<StatusFilterType, 'ALL'>;
  };
}

export interface LanguagesDataTable {
  total: number;
  rows: number;
  loading: boolean;
  data: Array<LanguageTable>;
}

export interface LanguageSummary {
  loading: boolean;
  data: LanguageSummaryResponse;
}

export interface LanguagesResponse {
  items: any[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface LanguageSummaryResponse {
  total: number;
  totalVisibles: number;
  translationProgress: number;
  default: {
    id: string;
    code: string;
    name: string;
    image: string;
  };
}
