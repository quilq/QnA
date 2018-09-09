export class User {
  username: string;
  password: string;
  answer: string[];
  question: string[];
  
  constructor() { 
    this.username = '';
    this.password = '';
    this.answer = [];
    this.question = [];
  }
}
