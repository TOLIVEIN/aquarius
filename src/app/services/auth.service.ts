import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signInForm: FormGroup;



  constructor(private http: HttpClient, private configService: ConfigService, private formBuilder: FormBuilder) {
    this.signInForm = this.formBuilder.group({
      username: '',
      password: '',
    });


   }

   getAuth(): Observable<ResponseData<AuthData>> {
    const api = '/auth';
    const body = this.signInForm.value;
    // console.log(body);
    return this.http.post<ResponseData<AuthData>>(`${this.configService.requestUrl}${api}`, body);
  }
}
