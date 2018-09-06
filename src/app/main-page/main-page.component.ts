import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Question } from '../question';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  // Create some question:
  // myQuestions: Question[] = [
  //   new Question('HTML','what is <!DOCTYPE html>?',['']),
  //   new Question('CSS','what is css padding?',['']),
  //   new Question('JS','what is JavaScript Closures?',[''])
  // ];

  allQuestions: Question[];
  allTopics: string[] = [];

  ngOnInit() {
    //Create some question
    // for (const iterator of this.myQuestions) {
    //   this.createQuestion(iterator);
    // }

    this.httpService.getAllQuestions().subscribe((questions: Question[]) => {
      this.allQuestions = questions;
      for (const iterator of this.allQuestions) {
        if (!this.allTopics.includes(iterator.topic)) {
          this.allTopics.push(iterator.topic);
        }
      }
    }, (error) => {
      console.log(error);
    });
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

  findQuestion(question: Question) {
    this.httpService.findQuestion(question).subscribe();
  }

}
