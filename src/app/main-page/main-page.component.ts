import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { Question } from '../question';
import { User } from '../user';
import { QuestionService } from '../question.service';

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
  editable: boolean[] = [];
  user: User = new User();

  open = false;

  pageIndex: number = 0;
  itemsPerPage: number = 3;
  totalItems: number = 0;
  itemsPerPageOptions: number[] = [3, 6];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    if (this.httpService.isLoggedin()) {
      this.userService.onGetUser();
    }

    this.userService.info.subscribe(info => {
      this.user = info.user;
    })

    this.questionService.allQuestions$.subscribe((questions: Question[]) => {
      this.allQuestions = questions;
      this.filteredQuestions = questions;
      this.questionsToShow = questions;
      this.paginator.pageIndex = 0;
      this.pageIndex = this.paginator.pageIndex;
      console.log('update questions');
      this.setPageView();
      for (let i = 0; i < this.allQuestions.length; i++) {
        this.editable[i] = false;
      }
    }, (error) => {
      console.log(error);
    });

    this.questionService.filteredQuestions$.subscribe((questions: Question[]) => {
      this.filteredQuestions = questions;
      this.paginator.pageIndex = 0;
      this.pageIndex = this.paginator.pageIndex;
      console.log('update filter questions');
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
    //Show loading icon...

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
    return this.httpService.isLoggedin();
  }

  onUpdateQuestion(i: number) {
    this.editable[i] = true;
  }

  onCancel(i: number) {
    this.editable[i] = false;
  }

  updateQuestion(oldQuestion: Question, newQuestion: string) {
    this.httpService.updateQuestion(oldQuestion, newQuestion).subscribe();
  }

  onUpdate(i: number, newQuestion: string) {
    if (this.user.username === this.questionsToShow[i].askedByUser) {
      this.updateQuestion(this.questionsToShow[i], newQuestion);
      this.questionsToShow[i].question = newQuestion;
      this.onCancel(i);
    } else {
      alert('You cannot update other users\' questions !');
    }
  }

  deleteQuestion(question: Question) {
    this.httpService.deleteQuestion(question).subscribe();
  }

  onDeleteQuestion(i: number) {
    if (this.user.username === this.questionsToShow[i].askedByUser) {
      this.deleteQuestion(this.questionsToShow[i]);
      this.allQuestions.splice(i, 1);
      this.filteredQuestions = this.allQuestions;
      this.setPageView();
    } else {
      alert('You cannot delete other users\' questions !');
    }
  }

  createQuestion(question: Question) {
    if (this.canEdit()) {
      this.httpService.createQuestion(question).subscribe((response) => {
        question._id = response.toString();
        this.allQuestions.push(question);
        this.filteredQuestions = this.allQuestions;
        this.setPageView();
      });
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
