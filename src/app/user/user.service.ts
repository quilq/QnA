import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  user$: ReplaySubject<any> = new ReplaySubject(1);
  userQuestions$: ReplaySubject<any> = new ReplaySubject(1);
  userAnswers$: ReplaySubject<any> = new ReplaySubject(1);

  checkUser$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  onGetUser() {
    if (localStorage.getItem('token')) {
      this.httpService.getUser(localStorage.getItem('token')).subscribe((info: any) => {
        this.user$.next(info.user);
        this.userQuestions$.next(info.userQuestions);
        this.userAnswers$.next(info.userAnswers);
      });
    }

    this.checkUser$.next((localStorage.getItem('token') != null));
  }


}
