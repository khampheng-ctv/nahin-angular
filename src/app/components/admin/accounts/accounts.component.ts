import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface users {
  _id: number;
  username: string;
  firstName: string;
  lastName: string;
  //gender: string;
  email: string;
  tel: number;
  password: string;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  accounts: users[] = [];
  viewUser: users[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/accounts').subscribe(data => {
      let result = data.result;
      for (let user of result) {
        this.accounts.push(user);
      }
    })
  }
}
