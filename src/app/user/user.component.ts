import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private httpService: HttpService,
  private userService: UserService) { }

  user: User = this.userService.user;

  didLogout = false;

  ngOnInit() { 
    if (this.httpService.isLoggedin()){
      this.userService.onGetUser();
    } else {
      this.didLogout = true;
    }
  }

}
