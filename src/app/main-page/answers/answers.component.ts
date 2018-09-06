import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Question } from '../../question';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  constructor(private httpService: HttpService) { }  

  ngOnInit() {
  }

  addAnswer(question: Question, answer: string) {
    this.httpService.addAnswer(question, answer).subscribe();
  }

  updateAnswer(question: Question, oldAnswer: string, newAnswer: string) {
    this.httpService.updateAnswer(question, oldAnswer, newAnswer).subscribe();
  }

  deleteAnswer(question: Question, answer: string) {
    this.httpService.deleteAnswer(question, answer).subscribe();
  }

}
