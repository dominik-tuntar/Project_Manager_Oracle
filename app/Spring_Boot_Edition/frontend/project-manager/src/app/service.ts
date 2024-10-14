import { employee } from './employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class service {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getAllUsers(): Observable<employee[]> {
        return this.http.get<employee[]>(`${this.apiServerUrl}/api/getAllUsers`)
    }
}