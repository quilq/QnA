export class User {
  username: string;
  password: string;
  token: string;
  answer: string[];
  question: string[];
  
  constructor() { 
    this.username = '';
    this.password = '';
    this.token = '';
    this.answer = [];
    this.question = [];
  }
}
