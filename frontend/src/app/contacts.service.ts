import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

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
}
