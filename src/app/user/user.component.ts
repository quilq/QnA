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
    this.onGetUser(localStorage.getItem('token'));
    this.onGetUserAnswers();
    this.onGetUserQuestions();
  }

  onGetUser(token: string){
    this.httpService.getUser(token).subscribe((user: User)=>{
      this.user.email = user.email;
      this.user.username = user.username;
    });
  }

  onGetUserQuestions(){

  }

  onGetUserAnswers(){

  }

}
