import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpServie: HttpService, 
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  hide = true;

  onSubmit() {
    this.onLogin(this.loginForm.value.email, this.loginForm.value.password);
  }

  onLogin(email, password) {
    let user = { email, password };
    this.httpServie.login(user).subscribe(response => {
      localStorage.setItem('token', response.headers.get('x-auth'));
      this.userService.onGetUser();
      this.router.navigate(['/user']);
    }, (err) => {
      console.log(err);
    });
  }

}
