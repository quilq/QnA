import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, Answer } from './question';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getAllQuestions(){
    return this.httpClient.get('api/q');
  }

  //Create questions
  createQuestion(question: Question) {
    let url = `api/q`;
    return this.httpClient.post(url, question);
  }

  //Find questions
  findQuestion(id: string) {
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
  addAnswer(question: Question, answer: Answer) {
    let id = question._id;
    let url = `api/a/add`;
    return this.httpClient.put(url, [id, answer]);
  }

  updateAnswer(question: Question, oldAnswer: Answer, newAnswer: Answer) {
    let id = question._id;
    let url = `api/a/update`;
    return this.httpClient.put(url, [id, oldAnswer, newAnswer]);
  }

  deleteAnswer(question: Question, answer: Answer) {
    let id = question._id;
    let url = `api/a/delete`;
    return this.httpClient.put(url, [id, answer]);
  }
}