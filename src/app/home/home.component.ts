import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { QuestionService } from '../main-page/question.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpService: HttpService,
    private router: Router,
    private questionService: QuestionService,
    private userService: UserService) { }

  isLoggedin = false;
  opened = false;
  allTags: string[] = [];
  onMainPage = false;
  onUserPage = false;

  ngOnInit() {
    this.userService.onGetUser();
    
    this.userService.checkUser$.subscribe(isLoggedin => {
      this.isLoggedin = isLoggedin;
    });

    this.questionService.getQuestions();
    this.questionService.allTags$.subscribe((allTags) => {
      this.allTags = allTags;
    });
  }

  onActivate(){
    let url = this.router.url;
    if (url === '/'){
      this.onMainPage = true;
    } else {
      this.onMainPage = false;
    };
    if (url === '/login' || url === '/signup') {
      this.onUserPage = true;
    } else {
      this.onUserPage = false;
    }
  }

  findQuestions(value: string) {
    this.questionService.findQuestions(value);
    this.opened = !this.opened;

  }

  filterTag(tag: string) {
    this.questionService.filterTag(tag);
    this.opened = !this.opened;
  }

  showPopularTags() {
    this.questionService.showPopularTags();
    this.opened = !this.opened;
  }

  onLogout() {
    if (this.isLoggedin) {
      this.logout(localStorage.getItem('token'));
    }
  }

  logout(token: string) {
    localStorage.removeItem('token');
    this.userService.onGetUser();
    this.router.navigate(['/user']);
    this.httpService.logout(token).subscribe();
  }

}
