import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
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
        (result) => {
          Swal.fire({
            icon: 'success',
            text: 'Login success. Please click OK',
          }).then(() => {
            localStorage.setItem('token', result.token);
            //redirect
            window.location.reload();
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            text: 'Username Or Password is incorrect. Please try again',
          });
        }
      );
  }

  ngOnInit(): void {
    this.auth.get('http://localhost:3000/user').subscribe((user: any) => {
      if (user.status == 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
