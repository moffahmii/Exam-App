export interface IAnswer {
    id: string;
    text: string;
}
export interface IQuestion {
    id: string;
    text: string;
    examId: string;
    answers: IAnswer[];
}export interface ExamApiResponse {
    status: boolean;
    message: string;
    payload: {
        questions: IQuestion[];
    };
}