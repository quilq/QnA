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

  ngOnInit() {
  }

  createQuestion(question: Question) {
    this.httpService.createQuestion(question).subscribe();
  }

  updateQuestion(oldQuestion: Question, newQuestion: Question) {
    this.httpService.updateQuestion(oldQuestion, newQuestion).subscribe();
  }

  deleteQuestion(question: Question) {
    this.httpService.deleteQuestion(question).subscribe();
  }

  displayQuestion(question: Question) {
    this.httpService.findQuestion(question).subscribe();
  }

}
