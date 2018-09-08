export class Answer {
    answer: string;
    isCorrectAnswer: boolean;
    constructor(){
        this.answer = '',
        this.isCorrectAnswer = false
    }
}

export class Question {
    _id?: string;
    tag: string;
    question: string;
    answers: Answer[];
    constructor(tag?: string, question?: string, answers?: Answer[]){
        this.tag = tag,
        this.question = question,
        this.answers = answers
    }

}