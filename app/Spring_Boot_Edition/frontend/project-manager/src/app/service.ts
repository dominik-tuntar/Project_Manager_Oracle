import { Employee } from './employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Service {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getAllUsers(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiServerUrl}/api/getAllUsers`)
    }
}