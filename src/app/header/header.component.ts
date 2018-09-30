import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private httpService: HttpService,
    private router: Router,
    private questionService: QuestionService) { }

  isLoggedin = false;

  opened: boolean;

  allTags: string[] = [];

  ngOnInit() {
    this.isLoggedin = this.httpService.isLoggedin();
    this.questionService.getQuestions();
    this.questionService.allTags$.subscribe((allTags) => {
      this.allTags = allTags;
    })
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
    if (this.httpService.isLoggedin()) {
      this.logout(localStorage.getItem('token'));
    }
  }

  logout(token: string) {
    this.httpService.logout(token).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }, (err) => {
      console.log(err);
    })
  }

}
