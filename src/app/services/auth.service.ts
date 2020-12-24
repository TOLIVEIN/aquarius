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
      const cookies = new Map<string, string>();
      document.cookie.split('; ').forEach(item => {
          cookies.set(item.split('=')[0], item.split('=')[1])
        })

      
    this.signInForm = this.formBuilder.group({
      username: cookies.get('username') ?? '',
      password: cookies.get('password') ?? '',
    });


   }

   getAuth(): Observable<ResponseData<AuthData>> {
    const api = '/auth';
    const body = this.signInForm.value;
    // console.log(body);
    return this.http.post<ResponseData<AuthData>>(`${this.configService.requestUrl}${api}`, body);
  }
}
