export class User {
  username: string;
  email: string;
  password: string;
  answer: string[];
  question: string[];
  
  constructor() { 
    this.username = '';
    this.email = '';
    this.password = '';
    this.answer = [];
    this.question = [];
  }
}
