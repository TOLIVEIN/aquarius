import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    // private authService: AuthService
  ) {}

  getTags(): Observable<ResponseData<TagData>> {
    const api = '/api/tags';
    return this.http.get<ResponseData<TagData>>(
      `${this.configService.requestUrl}${api}`
    );
  }
  getArticles(): Observable<ResponseData<ArticleData>> {
    const api = '/api/articles';
    return this.http.get<ResponseData<ArticleData>>(
      `${this.configService.requestUrl}${api}`
    );
  }
  addTag(): Observable<ResponseData<TagData>> {
    const api = '/api/tags';
    const tag = {
      name: 'gin',
      createdBy: 'aries',
    };
    return this.http.post<ResponseData<TagData>>(
      `${this.configService.requestUrl}${api}`,
      tag
    );
  }
  addArticle(): Observable<ResponseData<ArticleData>> {
    const api = '/api/articles';
    const article = {
      title: 'first',
      description: 'desc',
      content: 'content',
      createdBy: 'aries',
      coverImageURL: '/a/b/c.jpg',
    };
    return this.http.post<ResponseData<ArticleData>>(
      `${this.configService.requestUrl}${api}`,
      article
    );
  }
}
