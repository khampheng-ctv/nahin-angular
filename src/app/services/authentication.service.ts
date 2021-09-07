import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  get(url: string) {
    const accessToken = String(localStorage.getItem('token'));
    return this.http.get(url, { headers: { 'x-access-token': accessToken } });
  }

  post(url: string) {
    const accessToken = String(localStorage.getItem('token'));
    return this.http.post(url, { headers: { 'x-access-token': accessToken } });
  }
}
