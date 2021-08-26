import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  materialMenu: string = 'menu';
  sidebar: boolean = false;

  constructor() { }

  ngOnInit(): void {
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
