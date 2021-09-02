import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  tel: number;
  password: string;
  img: string;
  status: string;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  accounts: User[] = [];
  formAddUser: FormGroup;
  formEditUser!: FormGroup;
  modalAdd: boolean = false;
  modalEdit: boolean = false;
  viewUser: User[] = [];
  deleteUser: string = '';
  imageURL: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
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
      status: ['user', Validators.required],
    });

    //active Route
    this.activeRoute.queryParams.subscribe((params) => {
      let userID = params['userID'];
      if (params['modal'] == 'viewUser' && userID) {
        this.http
          .get<any>(`http://localhost:3000/admin/user/${userID}`)
          .subscribe((data) => {
            this.viewUser = [data];
          });
      }
      if (params['modal'] == 'addUser') {
        this.modalAdd = true;
      }
      if (params['modal'] == 'editUser' && userID) {
        //form edit user
        this.http
          .get<any>(`http://localhost:3000/admin/user/${userID}`)
          .subscribe((user) => {
            this.formEditUser = this.fb.group({
              _id: user._id,
              firstName: [
                user.firstName,
                [Validators.required, Validators.maxLength(40)],
              ],
              lastName: [
                user.lastName,
                [Validators.required, Validators.maxLength(40)],
              ],
              username: [
                user.username,
                [
                  Validators.required,
                  Validators.minLength(8),
                  Validators.maxLength(20),
                ],
              ],
              gender: [user.gender, Validators.required],
              email: [user.email, [Validators.required, Validators.email]],
              password: [
                '',
                [Validators.minLength(6), Validators.maxLength(20)],
              ],
              tel: [
                user.tel,
                [
                  Validators.required,
                  Validators.minLength(8),
                  Validators.maxLength(15),
                ],
              ],
              img: user.img,
              status: user.status,
            });
            this.modalEdit = true;
          });
      }
      if (params['modal'] == 'deleteUser' && userID) {
        this.deleteUser = userID;
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  //hide modal
  hideModal() {
    this.viewUser = [];
    this.deleteUser = '';
    this.modalAdd = false;
    this.modalEdit = false;
    this.imageURL = '';
    this.router.navigate([], {
      queryParams: {
        userID: null,
        modal: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  //controls
  get frmAdd(): { [key: string]: AbstractControl } {
    return this.formAddUser.controls;
  }

  //add new user
  addUser() {
    this.http
      .post<any>('http://localhost:3000/admin/adduser', this.formAddUser.value)
      .subscribe(
        (result) => {
          Swal.fire({
            icon: 'success',
            text: 'Add new user success',
          });
          this.getUsers();
          this.hideModal();
          this.formAddUser.reset();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            text: "Can't add new user",
          });
        }
      );
  }

  //get all user
  getUsers() {
    this.accounts = [];
    this.http
      .get<any>('http://localhost:3000/admin/users')
      .subscribe((data) => {
        for (let user of data) {
          this.accounts.push(user);
        }
      });
  }

  //submit edit user
  submitEditUser(file: any) {
    let formData = new FormData();
    Object.entries(this.formEditUser.value).forEach(([key, value]: any[]) => {
      formData.set(key, value);
    });
    if (file[0]) {
      formData.append('img', file[0]);
    }
    this.http
      .put<any>('http://localhost:3000/admin/editUser', formData)
      .subscribe(
        () => {},
        (error) => {
          if (error.status == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Update user success',
            });
            this.getUsers();
            this.hideModal();
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Sorry, Update user error',
            });
          }
        }
      );
  }

  //delete one
  deleteUserOne(id: string) {
    this.http.delete(`http://localhost:3000/admin/deleteUser/${id}`).subscribe(
      () => {},
      (error) => {
        if (error.status == 200) {
          Swal.fire({
            icon: 'success',
            text: 'Delete user success',
          });
          this.getUsers();
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Sorry, delete user error',
          });
        }
      }
    );
    this.hideModal();
  }

  //preview image
  onChangeFileUpload(e: any) {
    let file = e.target.files[0];
    if (file) {
      if (file.type != 'image/png' && file.type != 'image/jpg') {
        Swal.fire({
          icon: 'warning',
          text: 'Sorry, File not support (support only file *.PNG/*.JPG)',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = String(reader.result);
        // if (str == 'add') {
        //   this.formAddUser.patchValue({
        //     img: reader.result,
        //   });
        // } else {
        //   this.formEditUser.patchValue({
        //     img: reader.result,
        //   });
        // }
      };
      reader.readAsDataURL(file);
    }
  }
}
