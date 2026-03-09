declare interface IQuestion {
    id: number;
    text: string;
    examId: number;
    answers: IAnswer;
}

declare interface IAnswer {
    id: number;
    text: string;
}