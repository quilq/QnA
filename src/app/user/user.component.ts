import { Component, OnInit } from '@angular/core';
import { Question, Answer } from '../question';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = {
    answers: [new Question('','',[new Answer()])],
    questions: [new Question('','',[new Answer()])]
  }

  constructor() { }

  ngOnInit() {}

}
