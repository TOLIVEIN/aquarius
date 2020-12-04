import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  getAuth(): Observable<object> {
    const api = '/auth';
    const body = {
      username: 'aries',
      password: '123456'
    };
    return this.http.post(`${this.url}${api}`, body);
  }
}
