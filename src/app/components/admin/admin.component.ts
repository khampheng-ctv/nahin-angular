import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  admin: string = '';
  materialMenu: string = 'menu';
  sidebar: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (localStorage && localStorage.getItem('token')) {
      let token = { token: localStorage.getItem('token') };
      this.http.post('http://localhost:3000/admin', token).subscribe(
        (result: any) => {
          this.admin = result.firstName;
        },
        (error) => {
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  sidebarToggle() {
    this.sidebar = !this.sidebar;
    if (this.sidebar) {
      this.materialMenu = 'close';
    } else {
      this.materialMenu = 'menu';
    }
  }

  //logout
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
