import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';
import { Question } from '../main-page/question.model';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { QuestionService } from '../main-page/question.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private httpService: HttpService,
    private questionService: QuestionService) { }

  isLoggedin: boolean = false;

  user: User = new User();
  userQuestions: Question[] = [new Question()];
  userAnswers: Question[] = [new Question()];
  editable: boolean[] = [];

  open = false;

  ngOnInit() {
    this.userService.checkUser$.subscribe(isLoggedin => {
      this.isLoggedin = isLoggedin;
    })

    this.userService.user$.subscribe(user => {
      this.user = user;
    });

    this.userService.userQuestions$.subscribe(userQuestions => {
      this.userQuestions = userQuestions;
      for (let i = 0; i < this.userQuestions.length; i++) {
        this.editable[i] = false;
      }
    });
    
    this.userService.userAnswers$.subscribe(userAnswers => {
      this.userAnswers = userAnswers;
      for (let i = 0; i < this.userQuestions.length; i++) {
        this.editable[i] = false;
      }
    });


  }

  setOpen() {
    this.open = true;
  }

  canEdit() {
    return this.isLoggedin;
  }

  onUpdateQuestion(i: number) {
    this.editable[i] = true;
  }

  onCancel(i: number) {
    this.editable[i] = false;
  }

  updateQuestion(oldQuestion: Question, newQuestion: string) {
    this.httpService.updateQuestion(oldQuestion, newQuestion).subscribe((response) => {
      console.log('update', response);
      this.questionService.getQuestions();
    }, (error) => {this.userService.handleError(error)});
  }

  onUpdate(i: number, newQuestion: string) {
      this.updateQuestion(this.userQuestions[i], newQuestion);
      this.userQuestions[i].question = newQuestion;
      this.onCancel(i);
  }

  deleteQuestion(question: Question) {
    this.httpService.deleteQuestion(question).subscribe((response) => {
      console.log('delete', response);
      this.questionService.getQuestions();
    }, (error) => {this.userService.handleError(error)});
  }
  
  onDeleteQuestion(i: number) {
      this.deleteQuestion(this.userQuestions[i]);
      this.userQuestions.splice(i, 1);
  }

  createQuestion(question: Question) {
    if (this.isLoggedin) {
      this.httpService.createQuestion(question).subscribe((response: any) => {
        question._id = response._id;
        console.log(question);
        this.userQuestions.splice(0,0,question);
        this.questionService.getQuestions();
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
