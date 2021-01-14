import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    signUpForm: FormGroup;
    tag: Tag;
    article: Article;
    selectedTags: string;

    authOptions = {
        headers: new HttpHeaders({
            token: localStorage.getItem('token') ?? '',
        }),
    };

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
        // this.signUpForm = {} as FormGroup;
        this.signUpForm = this.formBuilder.group({
            username: '',
            password: '',
            passwordConfirm: '',
            email: '',
        });

        this.tag = {} as Tag;
        this.tag.createdBy = this.authService.cookies.get('username') ?? '';
        this.tag.updatedBy = this.authService.cookies.get('username') ?? '';

        this.article = {} as Article;
        this.article.coverImageURL = 'a/b/c';
        this.article.createdBy = this.authService.cookies.get('username') ?? '';
        this.article.updatedBy = this.authService.cookies.get('username') ?? '';
        // console.log(this.authOptions);

        this.selectedTags = '';
    }

    checkToken(): Observable<ResponseData<any>> {
        const api = '/index';
        return this.http.get<ResponseData<any>>(
            `${this.configService.requestUrl}${api}`,
            this.authOptions
        );
    }

    getTags(): Observable<ResponseData<TagData>> {
        const api = '/api/tags';
        return this.http.get<ResponseData<TagData>>(
            `${this.configService.requestUrl}${api}`
        );
    }

    getTagsByName(tagNames: string[]): Observable<ResponseData<TagData>> {
        const api = `/api/tags?tagNames=${tagNames.join(',')}`;
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
    addUser(): Observable<Record<string, unknown>> {
        const api = '/api/users';
        const user = this.signUpForm.value;
        console.log(user);
        return this.http.post<Record<string, unknown>>(
            `${this.configService.requestUrl}${api}`,
            user
        );
    }
    addTag(): Observable<ResponseData<Tag[]>> {
        const api = '/api/tags';
        // console.log(this.authOptions);

        return this.http.post<ResponseData<Tag[]>>(
            `${this.configService.requestUrl}${api}`,
            this.tag,
            this.authOptions
        );
    }
    addArticle(): Observable<ResponseData<ArticleData>> {
        const api = `/api/articles?tags=${this.selectedTags}`;
        return this.http.post<ResponseData<ArticleData>>(
            `${this.configService.requestUrl}${api}`,
            this.article,
            this.authOptions
        );
    }
    deleteTag(tag: Tag): Observable<ResponseData<TagData>> {
        const api = `/api/tags/${tag.id}`;
        // console.log(this.authOptions);

        return this.http.delete<ResponseData<TagData>>(
            `${this.configService.requestUrl}${api}`,
            this.authOptions
        );
    }
}
