export class User {
    username: string;
    email: string;
    answers: string[];
    questions: string[];
  
    constructor() {
      this.username = '';
      this.email = '';
      this.answers = [];
      this.questions = [];
    }
  }