import { Answer } from "../answers/answer.model";

export class Question {
    _id?: string;
    tag: string;
    question: string;
    askedByUser: string;
    answers: Answer[];
    constructor(tag: string = '', question: string = '', askedByUser: string = '', answers: Answer[] = []) {
        this.tag = tag,
        this.question = question,
        this.askedByUser = askedByUser,
        this.answers = answers
    }
}
