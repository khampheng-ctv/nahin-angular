import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  admin: string = '';
  materialMenu: string = 'menu';
  sidebar: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.auth.get('http://localhost:3000/admin').subscribe((result: any) => {
      this.admin = result.firstName;
    }, error => {
      this.router.navigate(['/login']);
    });
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
    window.location.reload();
  }
}
