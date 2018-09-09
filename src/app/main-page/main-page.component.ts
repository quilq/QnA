import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  //Create some questions:
  // myQuestions: Question[] = [
  //   new Question('HTML', 'HTML Question 1?', 'Admin',
  //     [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 1-1 html' },
  //     { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-2 html' },
  //     { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-3 html' }]),
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
  filterQuestions: Question[] = [];
  allTags: string[] = [];

  ngOnInit() {
    // Create some question:
    // for (const iterator of this.myQuestions) {
    //   this.createQuestion(iterator);
    // }

    this.httpService.getAllQuestions().subscribe((questions: Question[]) => {
      this.allQuestions = questions;
      this.filterQuestions = questions;
      for (const iterator of this.allQuestions) {
        if (!this.allTags.includes(iterator.tag)) {
          this.allTags.push(iterator.tag);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  filterTag(tag: string) {
    this.allQuestions = this.filterQuestions.filter(question => question.tag === tag);
  }

  createQuestion(question: Question) {
    this.httpService.createQuestion(question).subscribe();
  }

  updateQuestion(oldQuestion: Question, newQuestion: string) {
    this.httpService.updateQuestion(oldQuestion, newQuestion).subscribe();
  }

  deleteQuestion(question: Question) {
    this.httpService.deleteQuestion(question).subscribe();
  }

  onUpdateQuestion(){
  }

  onDeleteQuestion(){
  }

  onCreateQuestion(){
  }

}
