import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  signUpForm: FormGroup;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private formBuilder: FormBuilder
    // private authService: AuthService
  ) {
    this.signUpForm = this.formBuilder.group({
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
    });
  }

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
  getUsers(): Observable<ResponseData<UserData>> {
    const api = '/api/users';
    const options = {headers: new HttpHeaders({
      // 'Content-Type':  'application/json',
      Token: localStorage.getItem('token') ?? ''
  })};
    return this.http.get<ResponseData<UserData>>(
      `${this.configService.requestUrl}${api}`, options
    );
  }
  addUser(): Observable<object> {
    const api = '/api/users';
    const user = this.signUpForm.value;
    console.log(user);
    return this.http.post<object>(
      `${this.configService.requestUrl}${api}`,
      user
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
