import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginForm: FormGroup;
  signUpForm: FormGroup;


  constructor(private http: HttpClient, private configService: ConfigService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });

    this.signUpForm = this.formBuilder.group({
      username: '',
      password: '',
      rePassword: '',
      email: '',

    });
   }

   getAuth(): Observable<ResponseData<AuthData>> {
    const api = '/auth';
    const body = this.loginForm.value;
    // console.log(body);
    return this.http.post<ResponseData<AuthData>>(`${this.configService.requestUrl}${api}`, body);
  }
}
