import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userLogin: string = '';
  status: string = '';

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.auth.get('http://localhost:3000/user').subscribe((user: any) => {
      this.userLogin = user.firstName;
      this.status = user.status;
    });
  }

  //logout
  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
