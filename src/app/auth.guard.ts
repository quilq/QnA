import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {
  constructor(private userService: UserService,
    private router: Router){}

  isLoggedin = false;

  ngOnInit(){
    this.userService.checkUser$.subscribe(isLoggedin => {
      this.isLoggedin = isLoggedin;
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      let url: string = state.url;
      if (this.isLoggedin) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }

  }
}
