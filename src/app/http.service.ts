import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private httpClient: HttpClient) { }

  //Create questions
  createQuestion(question: Question) {
    let url = `api/q`;
    return this.httpClient.post(url, question);
  }

  //Find questions
  findQuestion(question: Question) {
    let id = question._id;
    let url = `api/q/${id}`;
    return this.httpClient.get(url);
  }

  //Update question
  updateQuestion(oldQuestion: Question, newQuestion: string) {
    let id = oldQuestion._id;
    let url = 'api/q';
    return this.httpClient.put(url, [id, newQuestion]);
  }

  //Delete question
  deleteQuestion(question: Question) {
    let id = question._id;
    let url = `api/q/${id}`;
    return this.httpClient.delete(url);
  }

  //Update answer
  updateAnswer(question: Question, answer: string, method: string) {
    //method = add | update | delete
    let id = question._id;
    let url = `api/a/${method}`;
    return this.httpClient.put(url, [id, answer]);
  }
}
