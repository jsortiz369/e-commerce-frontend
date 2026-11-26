import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { catchError, delay, map, Observable, OperatorFunction, throwError } from 'rxjs';
import { ZodError } from 'zod';

import { environment } from '../../../../../environments/environment';
import { LanguagesParamsDataTable, LanguagesResponse, LanguageSummaryResponse } from '../interfaces';
import { languagesResponseSchema } from '../schemas/languages';
import { languageSummaryResponseSchema } from '../schemas/languages/language-summary.schema';

export type ApiError = HttpErrorResponse | ZodError;
export function catchApiError<T>(): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    source.pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse || error instanceof ZodError) {
          if (!(error instanceof HttpErrorResponse)) error.issues.forEach((issue) => console.log(issue.message));
          return throwError(() => error);
        }

        return throwError(() => error);
      }),
    );
}

@Service()
export class LanguageService {
  private readonly _http$ = inject(HttpClient);
  private readonly _url$ = environment.urlAdmin;

  constructor() {}

  public getSummary() {
    return this._http$.get<LanguageSummaryResponse>(`${this._url$}/languages/summary`).pipe(
      map((res: LanguageSummaryResponse) => languageSummaryResponseSchema.parse(res)),
      catchApiError(),
      delay(5000),
    );
  }

  public getAll(params: LanguagesParamsDataTable) {
    let paramsFilter = new HttpParams();
    if (params.limit !== undefined) paramsFilter = paramsFilter.set('limit', params.limit);
    if (params.page !== undefined) paramsFilter = paramsFilter.set('page', params.page);
    if (params.sortBy !== undefined) paramsFilter = paramsFilter.set('sortBy', params.sortBy);
    if (params.sortOrder !== undefined) paramsFilter = paramsFilter.set('sortOrder', params.sortOrder);
    if (params.filters !== undefined) paramsFilter = paramsFilter.set('filters', JSON.stringify(params.filters));

    return this._http$.get<LanguagesResponse>(`${this._url$}/languages`, { params: paramsFilter }).pipe(
      map((res: LanguagesResponse) => languagesResponseSchema.parse(res)),
      catchApiError(),
      delay(5000),
    );
  }

  public getById(id: string) {
    return this._http$.get(`${this._url$}/languages/${id}`);
  }
}
