import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, Answer } from './main-page/question';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getAllQuestions() {
    return this.httpClient.get('api/q');
  }

  //Create questions
  createQuestion(question: Question) {
    let url = `api/q`;
    return this.httpClient.post(url, question, { headers: { 'x-auth': localStorage.getItem('token') } });
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
    return this.httpClient.put(url, { id, newQuestion }, { headers: { 'x-auth': localStorage.getItem('token') } });
  }

  //Delete question
  deleteQuestion(question: Question) {
    let id = question._id;
    let url = `api/q/${id}`;
    return this.httpClient.delete(url, { headers: { 'x-auth': localStorage.getItem('token') } });
  }

  //Update answer
  addAnswer(question: Question, answer: Answer) {
    let id = question._id;
    let url = `api/a/add`;
    return this.httpClient.put(url, { id, answer }, { headers: { 'x-auth': localStorage.getItem('token') } });
  }

  updateAnswer(question: Question, oldAnswer: Answer, newAnswer: Answer) {
    let id = question._id;
    let url = `api/a/update`;
    return this.httpClient.put(url, { id, oldAnswer, newAnswer }, { headers: { 'x-auth': localStorage.getItem('token') } });
  }

  updateCorrectAnswer(question: Question, i: number){
    let id = question._id;
    let url = `api/a/update2`;
    return this.httpClient.put(url, { id, i }, { headers: { 'x-auth': localStorage.getItem('token') } });
  }

  deleteAnswer(question: Question, answer: Answer) {
    let id = question._id;
    let url = `api/a/delete`;
    return this.httpClient.put(url, { id, answer }, { headers: { 'x-auth': localStorage.getItem('token') } });
  }

  login(user) {
    let url = '/api/user/login';
    return this.httpClient.post(url, user, { observe: 'response' });
  }

  logout() {
    let url = `/api/user/me/token`;
    return this.httpClient.delete(url, { headers: { 'x-auth': localStorage.getItem('token') } });
  }

  getUser() {
    let url = '/api/user/me';
    return this.httpClient.get(url, { headers: { 'x-auth': localStorage.getItem('token') } });
  }

  signup(user) {
    let url = '/api/user/signup';
    return this.httpClient.post(url, user, { observe: 'response' })
  }

}
