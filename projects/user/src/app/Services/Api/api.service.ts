import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  private readonly Http = inject(HttpClient);

  GetWithPagination(
    Url: string,
    PageNumber: number,
    PageSize: number,
    Filter: object
  ): Observable<any> {
    var Prams = new HttpParams();
    Prams = Prams.append('PageNumber', PageNumber);
    Prams = Prams.append('PageSize', PageSize);

    Object.entries(Filter).forEach(([key, value]: any) => {
      if (value) Prams = Prams.append(key, value);
    });

    return this.Http.get(Url, { params: Prams });
  }

  Get<T>(Url: string): Observable<any> {
    return this.Http.get<T>(Url);
  }
  Post<T>(Url: string, Body: object, options?: object): Observable<any> {
    return this.Http.post<T>(Url, Body, options);
  }

  Put<T>(Url: string, Body: object, options?: object): Observable<any> {
    return this.Http.put<T>(Url, Body, options);
  }
  Delete<T>(Url: string, Id: string): Observable<any> {
    return this.Http.delete<T>(Url.replace('{Id}', Id));
  }
}
