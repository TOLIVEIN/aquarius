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
  tag: Tag;

  authOptions = {
    headers: new HttpHeaders({
      Token: localStorage.getItem('token') ?? '',
    }),
  };

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private formBuilder: FormBuilder
  ) // private authService: AuthService
  {
    // this.signUpForm = {} as FormGroup;
    this.signUpForm = this.formBuilder.group({
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
    });

    this.tag = {} as Tag;
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
    return this.http.get<ResponseData<UserData>>(
      `${this.configService.requestUrl}${api}`,
      this.authOptions
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
    console.log(this.authOptions);

    return this.http.post<ResponseData<TagData>>(
      `${this.configService.requestUrl}${api}`,
      this.tag,
      this.authOptions
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
