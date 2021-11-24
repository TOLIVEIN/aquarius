import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { UtilService } from '../../services/util.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent implements OnInit {
    hidePassword = true;
    hidePasswordConfirm = true;

    constructor(
        private authService: AuthService,
        private dataService: DataService,
        private router: Router,
        private utilService: UtilService
    ) {}

    get signUpForm(): FormGroup {
        return this.authService.signUpForm;
    }

    ngOnInit(): void {}

    getUsernameErrorMessage() {
        if (this.signUpForm.get('username')?.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signUpForm.get('username')?.hasError('pattern')
            ? 'Username format error'
            : '';
    }

    getPasswordErrorMessage() {
        if (this.signUpForm.get('password')?.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signUpForm.get('password')?.hasError('minlength')
            ? 'Password need to be 6 or more'
            : '';
    }

    getPasswordConfirmErrorMessage() {
        if (this.signUpForm.get('passwordConfirm')?.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signUpForm.get('passwordConfirm')?.hasError('mustMatch')
            ? 'Password do not match'
            : '';
    }

    getEmailErrorMessage() {
        if (this.signUpForm.get('email')?.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signUpForm.get('email')?.hasError('email')
            ? 'Not a valid email'
            : '';
    }

    onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
        this.signUp();
        this.authService.signUpForm.reset();
        formDirective.resetForm();
    }

    signUp(): void {
        this.dataService.addUser().subscribe((res) => {
            if (res.code === 200) {
                this.router.navigate(['signIn']);
            }
            const message = res.message as string;
            this.utilService.openSnackBar(
                message === 'ok' ? '注册成功' : message,
                'OK'
            );
        });
    }
}
