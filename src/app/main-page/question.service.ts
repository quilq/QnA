import { Injectable } from '@angular/core';
import { Question } from './question';
import { HttpService } from '../http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpService: HttpService) { }

  allQuestions$ = new BehaviorSubject<Question[]>([]);
  filteredQuestions$ = new BehaviorSubject<Question[]>([]);
  allTags$ = new BehaviorSubject<string[]>([]);

  allQuestions: Question[] = [];
  filteredQuestions: Question[] = [];
  allTags: string[] = [];

  getQuestions() {
    this.httpService.getAllQuestions().subscribe((questions: Question[]) => {
      this.allQuestions = questions;
      this.filteredQuestions = questions;
      
      this.allQuestions$.next(this.allQuestions);
      this.filteredQuestions$.next(this.filteredQuestions);

      for (const iterator of questions) {
        if (!this.allTags.includes(iterator.tag)) {
          this.allTags.push(iterator.tag);
        }
      }
      this.allTags$.next(this.allTags);
    }, (error) => {
      console.log(error);
    });
  }

  findQuestions(value: string) {
      this.filteredQuestions = this.allQuestions.filter(question => question.question.includes(value));
      this.filteredQuestions$.next(this.filteredQuestions);
  }

  filterTag(tag: string) {
      this.filteredQuestions = this.allQuestions.filter(question => question.tag === tag);
      this.filteredQuestions$.next(this.filteredQuestions);
  }

  showPopularTags() {
      this.filteredQuestions = this.allQuestions;
      this.filteredQuestions$.next(this.filteredQuestions);
  }
}
