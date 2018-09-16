import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private httpServie: HttpService, private router: Router) { }

  ngOnInit() {
  }

  hide = true;

  signupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit(){
    this.onSignup(this.signupForm.value.username, this.signupForm.value.email, this.signupForm.value.password);
  }

  onSignup(username, email, password){
    let user = {username, email, password};
    this.httpServie.signup(user).subscribe(response =>{
      localStorage.setItem('token', response.headers.get('x-auth'));
      this.router.navigate(['/user']);
    }, (err)=>{
      console.log(err);
    });
  }

}
