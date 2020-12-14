import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(formData: FormGroup): void {
    this.signUp();
    this.authService.signUpForm.reset();
    // console.log(formData)
  }

  signUp(): void {}
  get signUpForm(): FormGroup {
    return this.authService.loginForm;
  }
}
