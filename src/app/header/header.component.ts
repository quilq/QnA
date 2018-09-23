import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private httpService: HttpService, 
    private router: Router) { }

  isLoggedin;

  ngOnInit() {
    this.isLoggedin = this.httpService.isLoggedin();
  }

  onLogout(){
    if (this.httpService.isLoggedin()) {
      this.logout(localStorage.getItem('token'));
    }
  }

  logout(token: string){
    this.httpService.logout(token).subscribe(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }, (err)=>{
      console.log(err);
    })
  }

}
