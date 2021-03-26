import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    tag: Tag;
    article: Article;
    selectedTagIDs: string;

    beforeSignInUrl: string;
    tags$ = new BehaviorSubject<Tag[]>([] as Tag[]);
    // articles$ = new BehaviorSubject<Article[]>([] as Article[]);
    articles = [] as Article[];

    authOptions = {
        headers: new HttpHeaders({
            token: localStorage.getItem('token') ?? '',
        }),
    };

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private authService: AuthService
    ) {
        this.tag = {} as Tag;
        // this.tags = [] as Tag[];
        this.tag.createdBy = this.authService.cookies.get('username') ?? '';
        this.tag.updatedBy = this.authService.cookies.get('username') ?? '';

        this.article = {} as Article;
        this.article.coverImageURL = 'a/b/c';
        this.article.createdBy = this.authService.cookies.get('username') ?? '';
        this.article.updatedBy = this.authService.cookies.get('username') ?? '';

        this.selectedTagIDs = '';

        this.beforeSignInUrl = '/read';
    }

    checkToken(): Observable<ResponseData<unknown>> {
        const api = '/index';
        return this.http.get<ResponseData<unknown>>(
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

    getArticle(id: string): Observable<ResponseData<Article>> {
        const api = '/api/articles/' + id;
        return this.http.get<ResponseData<Article>>(
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
        const user = this.authService.signUpForm.value;
        // console.log(user);
        return this.http.post<Record<string, unknown>>(
            `${this.configService.requestUrl}${api}`,
            user
        );
    }
    addTag(): Observable<ResponseData<Tag[]>> {
        const api = '/api/tags';

        return this.http.post<ResponseData<Tag[]>>(
            `${this.configService.requestUrl}${api}`,
            this.tag,
            this.authOptions
        );
    }
    addArticle(): Observable<ResponseData<ArticleData>> {
        const api = `/api/articles?tags=${this.selectedTagIDs}`;
        return this.http.post<ResponseData<ArticleData>>(
            `${this.configService.requestUrl}${api}`,
            this.article,
            this.authOptions
        );
    }
    deleteTag(tag: Tag): Observable<ResponseData<TagData>> {
        const api = `/api/tags/${tag.id}`;

        return this.http.delete<ResponseData<TagData>>(
            `${this.configService.requestUrl}${api}`,
            this.authOptions
        );
    }

    deleteArticle(article: Article): Observable<ResponseData<ArticleData>> {
        const api = `/api/articles/${article.id}`;
        return this.http.delete<ResponseData<ArticleData>>(
            `${this.configService.requestUrl}${api}`,
            this.authOptions
        );
    }
}
