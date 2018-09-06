export class Question {
    _id?: string;
    topic: string;
    question: string;
    answers: string[];
    constructor(topic: string, question: string, answers: string[]){
        this.topic = topic;
        this.question = question;
        this.answers = answers;
    }
}