import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService,
    private router:Router) { }

  user$: ReplaySubject<any> = new ReplaySubject(1);
  userQuestions$: ReplaySubject<any> = new ReplaySubject(1);
  userAnswers$: ReplaySubject<any> = new ReplaySubject(1);

  checkUser$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  onGetUser() {
    if (localStorage.getItem('token')) {
      this.httpService.getUser().subscribe((info: any) => {
        console.log(info);

        this.user$.next(info.user);
        this.userQuestions$.next(info.userQuestions);
        this.userAnswers$.next(info.userAnswers);
      }, (error) => {this.handleError(error)});
    }

    this.checkUser$.next((localStorage.getItem('token') != null));
  }

  handleError(error){
    if (error.error.name === 'TokenExpiredError'){
      localStorage.removeItem('token');
      alert('Session expired. Please log in to continue !');
      this.router.navigate(['/login']);
    }
  }

}
