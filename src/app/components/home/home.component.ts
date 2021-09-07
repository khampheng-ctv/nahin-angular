import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    // this.auth.get('http://localhost:3000/header').subscribe(result => {
    //   console.log(result);
    // })
  }

}
