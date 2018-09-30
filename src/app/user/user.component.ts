import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpService } from '../http.service';
import { User } from '../user';
import { Question } from '../question';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private httpService: HttpService,
  private userService: UserService) { }
  
  didLogout = false;

  user: User = new User();
  userQuestions: Question[] = [new Question()];
  userAnswers: Question[] = [new Question()];

  ngOnInit() { 
    if (this.httpService.isLoggedin()){
      this.userService.onGetUser();
    } else {
      this.didLogout = true;
    }
    this.userService.info.subscribe(info =>{
      this.user = info.user;
      this.userQuestions = info.userQuestions;
      this.userAnswers = info.userAnswers;
    })

  }

}
