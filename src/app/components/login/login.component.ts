import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      remember: false,
    });
  }

  onSubmit() {
    this.http
      .post<any>('http://localhost:3000/login', this.form.value)
      .subscribe(
        () => {},
        (error) => {
          if (error.status == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Login success. Please click OK',
            });
          } else if (error.status == 404) {
            Swal.fire({
              icon: 'error',
              text: 'Username or Password incorrect. Please try again',
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Login error. Please try again',
            });
          }
        }
      );
  }

  ngOnInit(): void {}
}
