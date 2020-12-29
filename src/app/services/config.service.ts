import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  configUrl = 'assets/config.json';
  requestUrl = 'http://localhost:8000';
//   requestUrl = 'http://42.192.102.206:8080';

  getConfig(): Observable<object> {
    return this.http.get(this.configUrl);
  }

  // postHtml(): void {

  // }
}
