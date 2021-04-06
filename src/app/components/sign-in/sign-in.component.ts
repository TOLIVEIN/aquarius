import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../services/util.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.less'],
})
export class SignInComponent implements OnInit {
    // token!: string;
    // role!: string;

    tags!: TagsData;
    articles!: ArticleData;
    hide = true;
    constructor(
        private dataService: DataService,
        private authService: AuthService,
        private router: Router,
        private utilService: UtilService
    ) {}

    ngOnInit(): void {}

    getUsernameErrorMessage() {
        if (this.signInForm.get('username')?.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signInForm.get('username')?.hasError('pattern')
            ? 'Username format error'
            : '';
    }

    getPasswordErrorMessage() {
        if (this.signInForm.get('password')?.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signInForm.get('password')?.hasError('minlength')
            ? 'Password need to be 6 or more'
            : '';
    }

    onSubmit(): void {
        this.signIn();
        this.saveCookie();
        // this.authService.signInForm.reset();
    }

    signIn(): void {
        this.authService.signIn().subscribe((res) => {
            if (res.data.token) {
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
            }
            this.utilService.openSnackBar(
                res.message === 'ok' ? '登录成功！' : res.message,
                'OK'
            );
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
