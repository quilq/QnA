import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { Question } from './question';
import { User } from '../user/user';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit, AfterViewInit {

  constructor(private httpService: HttpService,
    private userService: UserService,
    private questionService: QuestionService,
    private router: Router) { }

  allQuestions: Question[] = [];
  filteredQuestions: Question[] = [];
  questionsToShow: Question[] = [];
  allTags: string[] = [];
  myNewQuestion = '';

  user: User = new User();
  userQuestions: Question[] = [new Question()];

  isLoggedin = false;

  open = false;

  pageIndex: number = 0;
  itemsPerPage: number = 3;
  totalItems: number = 0;
  itemsPerPageOptions: number[] = [3, 6];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.userService.checkUser$.subscribe(isLoggedin => {
      this.isLoggedin = isLoggedin;
    })

    this.userService.user$.subscribe(user => {
      this.user = user;
    });

    this.userService.userQuestions$.subscribe(userQuestions => {
      this.userQuestions = userQuestions;
    });

    this.questionService.allQuestions$.subscribe((questions: Question[]) => {
      this.allQuestions = questions;
      this.filteredQuestions = questions;
      this.questionsToShow = questions;
      this.paginator.pageIndex = 0;
      this.pageIndex = this.paginator.pageIndex;

      this.setPageView();
    }, (error) => {
      console.log(error);
    });

    this.questionService.filteredQuestions$.subscribe((questions: Question[]) => {
      this.filteredQuestions = questions;
      this.paginator.pageIndex = 0;
      this.pageIndex = this.paginator.pageIndex;

      this.setPageView();
    })

    this.questionService.allTags$.subscribe((tags: string[]) => {
      this.allTags = tags;
    })
    
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.getPageData())
      )
      .subscribe();
  }

  setOpen() {
    this.open = true;
  }

  getPageData() {
    this.pageIndex = this.paginator.pageIndex;
    this.itemsPerPage = this.paginator.pageSize;
    this.setPageView();
  }

  setPageView() {
    this.questionsToShow = [];
    for (let i = 0; i < this.itemsPerPage; i++) {
      let ii = i + this.pageIndex * this.itemsPerPage;
      if (ii < this.filteredQuestions.length) {
        this.questionsToShow[i] = this.filteredQuestions[ii];
      } else {
        break;
      }
    }
    this.totalItems = this.filteredQuestions.length;
  }

  findQuestions(value: string) {
    this.filteredQuestions = this.allQuestions.filter(question => question.question.includes(value));
    this.paginator.pageIndex = 0;
    this.pageIndex = this.paginator.pageIndex;
    this.setPageView();
  }

  filterTag(tag: string) {
    this.filteredQuestions = this.allQuestions.filter(question => question.tag === tag);
    this.paginator.pageIndex = 0;
    this.pageIndex = this.paginator.pageIndex;
    this.setPageView();
  }

  showPopularTags() {
    this.filteredQuestions = this.allQuestions;
    this.paginator.pageIndex = 0;
    this.pageIndex = this.paginator.pageIndex;
    this.setPageView();
  }

  canEdit() {
    return this.isLoggedin;
  }

  createQuestion(question: Question) {
    if (this.canEdit()) {
      this.httpService.createQuestion(question).subscribe((response: any) => {
        question._id = response._id;
        this.allQuestions.splice(0,0,question);
        this.filteredQuestions = this.allQuestions;
        this.userQuestions.push(question);
        this.userService.userQuestions$.next(this.userQuestions);
        this.setPageView();
      }, (error) => {this.userService.handleError(error)});
      this.open = false;
    } else {
      this.router.navigate(['/login']);
    }
  }

  onCreateQuestion(questionElement: HTMLInputElement, tagElement: HTMLInputElement) {
    let newQuestion: Question = new Question();
    newQuestion.question = questionElement.value;
    newQuestion.askedByUser = this.user.username;
    newQuestion.tag = tagElement.value;
    this.createQuestion(newQuestion);
    questionElement.value = '';
    tagElement.value = '';
  }

}
