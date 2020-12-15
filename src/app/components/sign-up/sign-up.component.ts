import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

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
