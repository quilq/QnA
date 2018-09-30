import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  info: Subject<any> = new Subject();

  onGetUser() {
    this.httpService.getUser(localStorage.getItem('token')).subscribe((info: any) => {
      this.info.next(info);
    })
  }
}
