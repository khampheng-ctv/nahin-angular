import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

interface users {
  _id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  tel: number;
  password: string;
  img: string;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  accounts: users[] = [];
  formAddUser: FormGroup;
  modalAdd: boolean = false;
  viewUser: users[] = [];
  deleteUser: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    //active Route
    this.activeRoute.queryParams.subscribe((params) => {
      let userID = params['userID'];
      if (params['modal'] == 'viewUser' && userID) {
        this.http
          .get<any>(`http://localhost:3000/user/${userID}`)
          .subscribe((data) => {
            this.viewUser = [data];
          });
      }
      if (params['modal'] == 'addUser') {
        this.modalAdd = true;
      }
      if (params['modal'] == 'deleteUser' && userID) {
        this.deleteUser = userID;
      }
    });

    //form add user
    this.formAddUser = this.fb.group({
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
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      tel: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
      img: '',
    });
  }

  ngOnInit(): void {
    this.getUserAll();
  }

  //hide modal
  hideModal() {
    this.viewUser = [];
    this.deleteUser = '';
    this.modalAdd = false;
    this.router.navigate([], {
      queryParams: {
        userID: null,
        modal: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  //shortcut
  get frmAdd(): { [key: string]: AbstractControl } {
    return this.formAddUser.controls;
  }

  //add new user
  addUser() {
    this.http
      .post<any>('http://localhost:3000/addUser', this.formAddUser.value)
      .subscribe(
        () => {},
        (error) => {
          if (error.status == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Add user success',
            });
            this.getUserAll();
            this.hideModal();
            this.formAddUser.reset();
          } else {
            Swal.fire({
              icon: 'error',
              text: "Sorry, add user error",
            });
          }
        }
      );
  }


  //get all user
  getUserAll() {
    this.accounts = [];
    this.http.get<any>('http://localhost:3000/users').subscribe((data) => {
      for (let user of data) {
        this.accounts.push(user);
      }
    });
  }

  //delete one
  deleteUserOne(id: string) {
    this.http
      .delete(`http://localhost:3000/deleteUserOne/${id}`).subscribe(() => {}, (error) => {
        if (error.status == 200) {
          Swal.fire({
            icon: 'success',
            text: 'Delete user success'
          })
          this.getUserAll();
        } else {
          Swal.fire({
            icon: 'error',
            text: "Sorry, delete user error"
          })
        }
      })
    this.hideModal();
  }
}
