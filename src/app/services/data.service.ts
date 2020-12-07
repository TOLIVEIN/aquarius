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
    return this.http.get<ResponseData<TagData>>(`${this.url}${api}`);
  }
  getArticles(): Observable<ResponseData<ArticleData>> {
    const api = '/api/articles';
    return this.http.get<ResponseData<ArticleData>>(`${this.url}${api}`);
  }
  addTag(): Observable<ResponseData<TagData>> {
    const api = '/api/tags';
    const tag = {
      name: 'gin',
      createdBy: 'aries'
    };
    return this.http.post<ResponseData<TagData>>(`${this.url}${api}`, tag);
  }
  addArticle(): Observable<ResponseData<ArticleData>> {
    const api = '/api/articles';
    const article = {
      title: 'first',
      description: 'desc',
      content: 'content',
      createdBy: 'aries',
      coverImageURL: '/a/b/c.jpg'
    };
    return this.http.post<ResponseData<ArticleData>>(`${this.url}${api}`, article);
  }
}
