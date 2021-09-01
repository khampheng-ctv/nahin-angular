import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  materialMenu: string = 'menu';
  sidebar: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.post('http://localhost:3000/admin', '').subscribe(
      (result) => {},
      (error) => {
        if (error.status != 200) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  sidebarToggle() {
    this.sidebar = !this.sidebar;
    if (this.sidebar) {
      this.materialMenu = 'close';
    } else {
      this.materialMenu = 'menu';
    }
  }
}
