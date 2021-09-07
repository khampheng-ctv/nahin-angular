import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {
  headers = {
    headers: new HttpHeaders().set(
      'x-access-token',
      String(localStorage.getItem('token'))
    ),
  };

  constructor(private http: HttpClient) { }

  getImage(url: string) {
    this.http.get(url, this.headers).subscribe(result => {
      return result;
    });
  }
}
