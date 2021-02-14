import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    configUrl = 'assets/config.json';
    requestUrl = environment.baseUrl;
    letters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*~`/.,<>?|]}{[';

    constructor(private http: HttpClient) {}

    getConfig(): Observable<unknown> {
        return this.http.get(this.configUrl);
    }
}
