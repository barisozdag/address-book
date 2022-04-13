import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError
} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  endpoint: string = '/api/search';
  queryUrl: string = '?q=';

  constructor(
    private http: HttpClient,
  ) { }

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term) => this.searchEntries(term))
    );
  }

  searchEntries(term: string) {
    return this.http
      .get(`${this.endpoint}${this.queryUrl}${term}`)
      .pipe(
        map((res) => res || []),
        catchError(this.errorMgmt),
      );
  }

  check(name: Observable<string>) {
    return name.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((name) => this.checkContact(name))
    );
  }

  checkContact(name: string) {
    const URL = `${this.endpoint}/contact${this.queryUrl}${name}`;
    return this.http
      .get(URL)
      .pipe(
        map((res) => res || {}),
        catchError(this.errorMgmt),
      );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
