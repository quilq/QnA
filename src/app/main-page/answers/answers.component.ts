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

  addAnswer(question: Question, answer: String) {
    this.httpService.updateAnswer(question, answer, 'add').subscribe();
  }

  updateAnswer(question: Question, answer: String) {
    this.httpService.updateAnswer(question, answer, 'update').subscribe();
  }

  deleteAnswer(question: Question, answer: String) {
    this.httpService.updateAnswer(question, answer, 'delete').subscribe();
  }

}
