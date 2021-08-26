import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  constructor(private http: HttpClient) { }

  file(file: string) {
    this.http.get(`http://localhost:3000/getImage/${file}`).subscribe(data => {
      console.log(data);
    })
  }
}
