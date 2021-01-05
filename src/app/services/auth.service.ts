import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    signInForm: FormGroup;
    token: string;
    permissions: string[];
    cookies: Map<string, string> = new Map<string, string>();

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private formBuilder: FormBuilder
    ) {
        // const cookies = new Map<string, string>();
        document.cookie.split('; ').forEach((item) => {
            this.cookies.set(item.split('=')[0], item.split('=')[1]);
        });
        this.signInForm = this.formBuilder.group({
            username: this.cookies.get('username') ?? '',
            password: this.cookies.get('password') ?? '',
        });

        this.token = localStorage.getItem('token') ?? '';
        this.permissions = localStorage.getItem('permissions')?.split(',') ?? [];
    }

    getAuth(): Observable<ResponseData<AuthData>> {
        const api = '/auth';
        const body = this.signInForm.value;
        // console.log(body);
        return this.http.post<ResponseData<AuthData>>(
            `${this.configService.requestUrl}${api}`,
            body
        );
    }
}
