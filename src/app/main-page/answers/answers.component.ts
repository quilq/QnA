import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { Answer, Question } from '../question';
import { User } from '../../user/user';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})

export class AnswersComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) { }

  currentAnswer: Answer;
  open = false;
  user: User = new User();

  setOpen() {
    this.open = true;
  }
  duplicateAnswer = false;

  answers: Answer[] = [new Answer()];
  question: Question = new Question();
  relatedQuestions: Question[] = [new Question()];
  userAnswers: Question[] = [new Question()];
  editable: boolean[] = [];
  allQuestions: Question[] = [];
  isLoggedin = false;

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.httpService.findQuestion(id).subscribe((question: Question) => {
      this.question = question;
      this.answers = question.answers;
      this.editable = [];
      for (let i = 0; i < this.answers.length; i++) {
        this.editable[i] = false;
      }
    });

    this.userService.checkUser$.subscribe(isLoggedin => {
      this.isLoggedin = isLoggedin;
    })

    this.userService.user$.subscribe(user => {
      this.user = user;
    });

    this.userService.userAnswers$.subscribe(userAnswers => {
      this.userAnswers = userAnswers;
    });

    this.questionService.allQuestions$.subscribe(questions => {
      this.allQuestions = questions;
      this.relatedQuestions = this.allQuestions.filter(question => question.tag === this.question.tag);
    })
  }


  viewQiestion(question) {
    this.question = question;
    this.answers = question.answers;
    this.editable = [];
    for (let i = 0; i < this.answers.length; i++) {
      this.editable[i] = false;
    }
  }

  canEdit() {
    return this.isLoggedin;
  }

  addAnswer(question: Question, answer: Answer) {
    if (this.canEdit()) {
      this.httpService.addAnswer(question, answer).subscribe(() => {}, (error) => {
        this.userService.handleError(error)
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  onAddAnswer(answerElement: HTMLInputElement) {
    let answer = answerElement.value;
    let canAddAnswer = true;
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].answer === answer) {
        canAddAnswer = false;
        this.duplicateAnswer = true;
        break;
      } else if (this.answers[i].answeredByUser === this.user.username) {
        canAddAnswer = false;
        alert('You\'ve answered this question');
      }
    }
    if (canAddAnswer) {
      let newAnswer = new Answer();
      newAnswer.answer = answer;
      newAnswer.answeredByUser = this.user.username;
      this.addAnswer(this.question, newAnswer);
      this.answers.push(newAnswer);
      this.duplicateAnswer = false;
      this.open = false;
    }
    answerElement.value = '';
  }

  onUpdateAnswer(i: number) {
    this.editable[i] = true;
  }

  onCancel(i: number) {
    this.editable[i] = false;
  }

  markAnswer(i: number) {
    if ((this.user.username === this.question.askedByUser) && (this.answers[i].isCorrectAnswer !== true)) {
      this.httpService.updateCorrectAnswer(this.question, i).subscribe(() => {}, (error) => {
        this.userService.handleError(error)
      });

      for (let index = 0; index < this.answers.length; index++) {
        if (this.answers[index].isCorrectAnswer === true) {
          this.answers[index].isCorrectAnswer = false;
          break;
        }

      }
      this.answers[i].isCorrectAnswer = true;
    } else if (this.user.username !== this.question.askedByUser) {
      alert('You are not the author of this question!');
    }
  }

  
  updateAnswer(question: Question, oldAnswer: Answer, newAnswer: Answer) {
    this.httpService.updateAnswer(question, oldAnswer, newAnswer).subscribe(() => {}, (error) => {
      this.userService.handleError(error)
    });
  }

  onUpdate(i: number, answer: string) {
    if (this.user.username === this.answers[i].answeredByUser) {

      let newAnswer = new Answer();
      newAnswer.answeredByUser = this.answers[i].answeredByUser;
      newAnswer.isCorrectAnswer = this.answers[i].isCorrectAnswer;
      newAnswer.answer = answer;

      this.updateAnswer(this.question, this.answers[i], newAnswer);
      this.answers[i].answer = answer;
      this.onCancel(i);
    } else {
      alert('You cannot update other users\' answers !');
      this.onCancel(i);
    }
  }

  
  deleteAnswer(question: Question, answer: Answer) {
    this.httpService.deleteAnswer(question, answer).subscribe(() => {}, (error) => {
      this.userService.handleError(error)
    });
  }

  onDeleteAnswer(i: number) {
    if (this.user.username === this.answers[i].answeredByUser) {
      this.deleteAnswer(this.question, this.answers[i]);
      this.answers.splice(i, 1);
    } else {
      alert('You cannot delete other users\' answers !');
    }
  }

}
