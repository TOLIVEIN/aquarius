import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.less'],
})
export class SignInComponent implements OnInit {
    // token!: string;
    // role!: string;

    tags!: TagData;
    articles!: ArticleData;
    constructor(
        private dataService: DataService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    onSubmit(): void {
        this.signIn();
        this.saveCookie();
        this.authService.signInForm.reset();
    }

    signIn(): void {
        this.authService.getAuth().subscribe((res) => {
            this.authService.token = res.data.token;
            res.data.permissions?.split(',').forEach((permission) => {
                this.authService.permissions.push(permission);
            });
            localStorage.setItem('token', this.authService.token);
            localStorage.setItem('permissions', res.data.permissions ?? '');
            this.dataService.authOptions = {
                headers: new HttpHeaders({
                    token: localStorage.getItem('token') ?? '',
                }),
            };
            console.log(localStorage);

            this.authService.isSignIn.next(true);

            this.router.navigate([this.dataService.beforeSignInUrl]);
        });
    }

    saveCookie(): void {
        const expires = new Date();
        expires.setTime(expires.getTime() + 10 * 3600000 * 24);
        // console.log(`username=${this.authService.signInForm.value.username};
        // password=${this.authService.signInForm.value.password}; expires=${expires}`)
        Object.entries(this.authService.signInForm.value).forEach(
            ([key, value]) => {
                document.cookie = `${key}=${value}; expires=${expires}`;
            }
        );
    }

    get signInForm(): FormGroup {
        return this.authService.signInForm;
    }
}
