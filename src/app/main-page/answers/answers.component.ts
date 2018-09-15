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

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
  ) { }

  currentAnswer: Answer;
  open = false;
  setOpen() {
    this.open = true;
  }
  duplicateAnswer = false;

  answers: Answer[] = [new Answer()];
  question: Question = new Question();
  relatedQuestions: Question[] = [new Question()];
  editable: boolean[] = [];

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpService.findQuestion(id).subscribe((question: Question) => {
      this.question = question;
      this.answers = question.answers;
      for (let i = 0; i < this.answers.length; i++) {
        this.editable[i] = false;
      }
    });
  }

  findRelatedQuestions() {
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

  onAddAnswer(answer: string) {
    let canAddAnswer = true;
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].answer === answer) {
        canAddAnswer = false;
        break;
      }
    }
    if (canAddAnswer) {
      let newAnswer = new Answer();
      newAnswer.answer = answer;
      this.addAnswer(this.question, newAnswer);
      this.answers.push(newAnswer);
      this.duplicateAnswer = false;
      this.open = false;
    } else {
      this.duplicateAnswer = true;
    }

  }

  onUpdateAnswer(i: number) {
    this.editable[i] = true;
  }

  onCancel(i: number) {
    this.editable[i] = false;
  }

  onUpdate(i: number, answer: string) {
    let newAnswer = new Answer();
    newAnswer.answeredByUser = this.answers[i].answeredByUser;
    newAnswer.isCorrectAnswer = this.answers[i].isCorrectAnswer;
    newAnswer.answer = answer;

    this.updateAnswer(this.question, this.answers[i], newAnswer);
    this.answers[i].answer = answer;
    this.onCancel(i);
  }

  onDeleteAnswer(i: number) {
    this.deleteAnswer(this.question, this.answers[i]);
    this.answers.splice(i, 1);
  }


}
