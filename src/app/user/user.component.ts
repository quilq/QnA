import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  user: User = new User();

  ngOnInit() {
    console.log('is logged in: ', this.httpService.isLoggedin());
    console.log('token: ', localStorage.getItem('token'));
  }

  onGetUser(token: string){}

}
