import { Employee } from './employee';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public getCustomAttributes(table_name: string, table_row: number): Observable<any> {
    let params = new HttpParams()
      .set('table_name', table_name)
      .set('table_row', table_row);

    return this.http.get<any>(`${this.apiServerUrl}/api/getCustomAttributes`, { params });
  }

  public createCustomAttribute(table_name: string, table_row: number, title: string, content: string): Observable<any> {
    let params = new HttpParams()
      .set('table_name', table_name)
      .set('table_row', table_row)
      .set('title', title)
      .set('content_', content);

      return this.http.post(`${this.apiServerUrl}/api/createCustomAttribute`, null, { 
        params: params, 
        responseType: 'text'  // Expecting a plain text response from the backend
      });
  }

  public updateUser(id_employee: number, fullname: string, username: string, pass_word: string): Observable<any> {
    // Construct query parameters
    let params = new HttpParams()
      .set('v_id_employee', id_employee.toString())
      .set('v_fullname', fullname)
      .set('v_username', username)
      .set('v_pass_word', pass_word)

    // Make the PUT request with query parameters
    return this.http.put(`${this.apiServerUrl}/api/updateUser`, null, { 
      params: params, 
      responseType: 'text'  // Expecting a plain text response from the backend
    });
  }

  public updateCustomAttribute(id_c_attribute: number, title: string, content: string): Observable<any> {
    // Construct query parameters
    let params = new HttpParams()
      .set('v_id_c_attribute', id_c_attribute.toString())
      .set('v_title', title)
      .set('v_content_', content)

    // Make the PUT request with query parameters
    return this.http.put(`${this.apiServerUrl}/api/updateCustomAttribute`, null, { 
      params: params, 
      responseType: 'text'  // Expecting a plain text response from the backend
    });
  }

  public deleteCustomAttribute(id_c_attribute: number): Observable<any> {
    // Construct query parameters
    let params = new HttpParams()
      .set('v_id_c_attribute', id_c_attribute.toString())

    // Make the PUT request with query parameters
    return this.http.delete(`${this.apiServerUrl}/api/deleteCustomAttribute`, { 
      params: params, 
      responseType: 'text'  // Expecting a plain text response from the backend
    });
  }

  public createUser(fullname: string, username: string, pass_word: string): Observable<any> {
    // Construct query parameters
    let params = new HttpParams()
      .set('fullname', fullname)
      .set('username', username)
      .set('pass_word', pass_word)

    // Make the PUT request with query parameters
    return this.http.post(`${this.apiServerUrl}/api/createUser`, null, { 
      params: params, 
      responseType: 'text'  // Expecting a plain text response from the backend
    });
  }

  public disableUser(id_employee: number): Observable<any> {
    // Construct query parameters
    let params = new HttpParams()
      .set('v_id_employee', id_employee)

    // Make the PUT request with query parameters
    return this.http.put(`${this.apiServerUrl}/api/disableUser`, null, { 
      params: params, 
      responseType: 'text'  // Expecting a plain text response from the backend
    });
  }

  public enableUser(id_employee: number): Observable<any> {
    // Construct query parameters
    let params = new HttpParams()
      .set('v_id_employee', id_employee)

    // Make the PUT request with query parameters
    return this.http.put(`${this.apiServerUrl}/api/enableUser`, null, { 
      params: params, 
      responseType: 'text'  // Expecting a plain text response from the backend
    });
  }

  // Get all clients
  public getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/api/getAllClients`);
  }

  // Create a client
  public createClient(name: string, email: string): Observable<any> {
    let params = new HttpParams()
      .set('name_', name)
      .set('email', email);

    return this.http.post(`${this.apiServerUrl}/api/createClient`, null, {
      params: params,
      responseType: 'text'  // Expecting a plain text response from the backend
    });
  }

  // Update a client
  public updateClient(id_client: number, name: string, email: string): Observable<any> {
    let params = new HttpParams()
      .set('v_id_client', id_client.toString())
      .set('v_name_', name)
      .set('v_email', email);

    return this.http.put(`${this.apiServerUrl}/api/updateClient`, null, {
      params: params,
      responseType: 'text'  // Expecting a plain text response from the backend
    });
  }

  // Delete a client
  public deleteClient(id_client: number): Observable<any> {
    let params = new HttpParams()
      .set('v_id_client', id_client.toString());

    return this.http.delete(`${this.apiServerUrl}/api/deleteClient`, {
      params: params,
      responseType: 'text'  // Expecting a plain text response from the backend
    });
  }
}