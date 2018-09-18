import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  user: User = new User();

  onGetUser(){
    this.httpService.getUser(localStorage.getItem('token')).subscribe((user: User)=>{
      this.user.email = user.email;
      this.user.username = user.username;
    });
  }

  onGetUserQuestions(){

  }

  onGetUserAnswers(){

  }

}

export class User {
  username: string;
  email: string;
  password: string;
  answer: string[];
  question: string[];
  
  constructor() { 
    this.username = '';
    this.email = '';
    this.password = '';
    this.answer = [];
    this.question = [];
  }
}