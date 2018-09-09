import { Component, OnInit } from '@angular/core';
import { Question, Answer } from '../../question';
import { HttpService } from '../../http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  constructor(private httpService: HttpService, private route: ActivatedRoute
  ) { }

  answers: Answer[] = [new Answer()];
  question: Question = new Question();
  relatedQuestions: Question[] = [new Question()];

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpService.findQuestion(id).subscribe((question: Question)=>{
      this.question = question;
      this.answers = question.answers;
    });
  }

  findRelatedQuestions(){
  }

  addAnswer(question: Question, answer: Answer) {
    this.httpService.addAnswer(question, answer).subscribe();
  }

  updateAnswer(question: Question, oldAnswer: Answer, newAnswer: Answer) {
    this.httpService.updateAnswer(question, oldAnswer, newAnswer).subscribe();
  }

  deleteAnswer(question: Question, answer: Answer) {
    this.httpService.deleteAnswer(question, answer).subscribe();
  }

  onAddAnswer() {
  }

  onUpdateAnswer() {
  }

  onDeleteAnswer() {
  }


}
