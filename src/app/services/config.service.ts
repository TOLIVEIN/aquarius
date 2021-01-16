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
    // requestUrl = 'http://localhost:8000';
    // requestUrl = 'http://42.192.102.206:8080';

    constructor(private http: HttpClient) {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    getConfig(): Observable<object> {
        return this.http.get(this.configUrl);
    }

    // postHtml(): void {

    // }
}
