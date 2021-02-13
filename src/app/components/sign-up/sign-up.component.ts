import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent implements OnInit {
    hide = true;
    // email = new FormControl('', [Validators.required, Validators.email]);
    // email;
    // signUpForm;
    constructor(private dataService: DataService) {
        // this.email =
        //     this.dataService.signUpForm.get('email') ??
        //     new FormControl('', [Validators.required, Validators.email]);
        // this.signUpForm = this.dataService.signUpForm;
    }

    ngOnInit(): void {}

    getErrorMessage() {
        if (this.signUpForm.get('email')?.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signUpForm.get('email')?.get('email')?.hasError('email')
            ? 'Not a valid email'
            : '';
    }

    onSubmit(formData: FormGroup): void {
        this.signUp();
        this.dataService.signUpForm.reset();
        // console.log(formData)
    }

    signUp(): void {
        this.dataService.addUser().subscribe((res) => {
            // console.log(data);
            // this.token = res.data.token;
            console.log(res);
        });
    }
    get signUpForm(): FormGroup {
        return this.dataService.signUpForm;
    }
}
