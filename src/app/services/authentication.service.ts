import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  headers = {
    headers: new HttpHeaders().set(
      'x-access-token',
      String(localStorage.getItem('token'))
    ),
  };

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(url, this.headers);
  }

  post(url: string, data: any) {
    return this.http.post(url, data, this.headers);
  }

  put(url: string, data: any) {
    return this.http.put(url, data, this.headers);
  }

  delete(url: string) {
    return this.http.delete(url, this.headers);
  }
}
