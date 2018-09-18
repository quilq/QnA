import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { HttpService } from '../http.service';
import { QuestionsService } from '../questions.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  constructor(private httpService: HttpService,
    private userService: UserService,
    private router: Router) { }

  // // Create some questions:
  // myQuestions: Question[] = [
  //   new Question('HTML', 'HTML Question 1?', 'Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 1-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-3 html' }]),
  //   new Question('HTML', 'HTML Question 2?','Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 2-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-3 html' }]),
  //   new Question('CSS', 'CSS Question 1?','Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 1-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-3 html' }]),
  //   new Question('CSS', 'CSS Question 2?','Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 2-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-3 html' }]),
  //   new Question('Javascript', 'Javascript Question 1?','Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 1-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-3 html' }]),
  //   new Question('Javascript', 'Javascript Question 2?','Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 2-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-3 html' }]),
  // ];

  allQuestions: Question[] = [];
  filteredQuestions: Question[] = [];
  allTags: string[] = [];
  myNewQuestion = '';
  editable: boolean[] = [];

  ngOnInit() {
    // // Create some question:
    // for (const iterator of this.myQuestions) {
    //   this.createQuestion(iterator);
    // }
    if (this.httpService.isLoggedin()) {
      this.userService.onGetUser();
    }

    this.httpService.getAllQuestions().subscribe((questions: Question[]) => {
      this.allQuestions = questions;
      this.filteredQuestions = questions;
      for (const iterator of this.allQuestions) {
        if (!this.allTags.includes(iterator.tag)) {
          this.allTags.push(iterator.tag);
        }
      }
      for (let i = 0; i < this.allQuestions.length; i++) {
        this.editable[i] = false;
      }
    }, (error) => {
      console.log(error);
    });
  }

  canEdit() {
    return this.httpService.isLoggedin();
  }

  findQuestions(value: string) {
    console.log(value);
    this.allQuestions = this.filteredQuestions.filter(question => question.question.includes(value));
    console.log(this.allQuestions);
  }

  filterTag(tag: string) {
    this.allQuestions = this.filteredQuestions.filter(question => question.tag === tag);
  }

  createQuestion(question: Question) {
    if (this.canEdit()) {
      this.httpService.createQuestion(question).subscribe((response) => {
        question._id = response.toString();
        this.allQuestions.push(question);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateQuestion(oldQuestion: Question, newQuestion: string) {
    this.httpService.updateQuestion(oldQuestion, newQuestion).subscribe();
  }

  deleteQuestion(question: Question) {
    this.httpService.deleteQuestion(question).subscribe();
  }

  onUpdateQuestion(i: number) {
    this.editable[i] = true;
  }

  onCancel(i: number) {
    this.editable[i] = false;
  }

  onUpdate(i: number, newQuestion: string) {
    if (this.userService.user.username === this.allQuestions[i].askedByUser) {
      this.updateQuestion(this.allQuestions[i], newQuestion);
      this.allQuestions[i].question = newQuestion;
      this.onCancel(i);
    } else {
      alert('You cannot update other users\' questions !');
    }
  }

  onDeleteQuestion(i: number) {
    if (this.userService.user.username === this.allQuestions[i].askedByUser) {
      this.deleteQuestion(this.allQuestions[i]);
      this.allQuestions.splice(i, 1);

    } else {
      alert('You cannot delete other users\' questions !');
    }
  }

  onCreateQuestion(element: HTMLInputElement) {
    let newQuestion: Question = new Question();
    newQuestion.question = element.value;
    newQuestion.askedByUser = this.userService.user.username;
    this.createQuestion(newQuestion);
    element.value = '';
  }

}
