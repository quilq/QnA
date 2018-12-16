import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private httpServie: HttpService, 
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  hide = true;

  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onSubmit() {
    this.onSignup(this.signupForm.value.username, this.signupForm.value.email, this.signupForm.value.password);
  }

  onSignup(username, email, password) {
    let user = { username, email, password };
    this.httpServie.signup(user).subscribe(response => {
      localStorage.setItem('token', response.headers.get('x-auth'));
      this.userService.onGetUser();
      this.router.navigate(['/user']);
    }, (err) => {
      console.log(err);
    });
  }

}
