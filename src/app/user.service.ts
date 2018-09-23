import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Question, Answer } from './question';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  info: Subject<any> = new Subject();

  user: User = new User();

  onGetUser() {
    this.httpService.getUser(localStorage.getItem('token')).subscribe((info: any) => {
      this.user = info.user;
      this.info.next(info);
    })
  }
}

export class User {
  username: string;
  email: string;
  answers: string[];
  questions: string[];

  constructor() {
    this.username = '';
    this.email = '';
    this.answers = [];
    this.questions = [];
  }
}