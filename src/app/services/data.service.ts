import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  getAuth(): Observable<ResponseData<AuthData>> {
    const api = '/auth';
    const body = {
      username: 'aries',
      password: '123456'
    };
    return this.http.post<ResponseData<AuthData>>(`${this.url}${api}`, body);
  }

  getTags(): Observable<ResponseData<TagData>> {
    const api = '/api/tags';
    // const body = {
    //   username: 'aries',
    //   password: '123456'
    // };
    return this.http.get<ResponseData<TagData>>(`${this.url}${api}`);
  }
}
