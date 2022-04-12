import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  endpoint: string = 'http://localhost:4200/api/contacts';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get(`${this.endpoint}`);
  }

  getContact(id: string): Observable<any> {
    let URL = `${this.endpoint}/${id}`;
    return this.http.get(URL, { headers: this.headers }).pipe(
      map((res) => res || {}),
      catchError(this.errorMgmt),
    );
  }

  addContact(data: Contact): Observable<any> {
    return this.http.post(`${this.endpoint}`, data).pipe(catchError(this.errorMgmt));
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
