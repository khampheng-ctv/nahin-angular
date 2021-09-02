import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.maxLength(40)]],
        lastName: ['', [Validators.required, Validators.maxLength(40)]],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        tel: ['', Validators.required],
        gender: ['', Validators.required],
        remember: [false],
      },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      }
    );
  }

  get f(): { [kery: string]: AbstractControl } {
    return this.form.controls;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  showPassword(e: any, pass: any) {
    if (e.target.checked) {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
  }

  onSubmit() {
    this.http
      .post<any>('http://localhost:3000/register', this.form.value)
      .subscribe(
        (result) => {
          Swal.fire({
            icon: 'success',
            text: 'Register account successfully',
          });

          //save token & redirect
          localStorage.setItem('token', result.token);
          this.router.navigate(['/']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            text: "Can't register account. Please try again",
          });
        }
      );
  }

  ngOnInit(): void {}
}
