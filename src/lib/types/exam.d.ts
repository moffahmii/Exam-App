export interface IAnswer {
    id: string;
    text: string;
}

export interface IQuestion {
    id: string;
    text: string;
    examId: string;
    answers: IAnswer[];
}

export interface IExamQuestionsResponse {
    questions: IQuestion[];
}

export interface IApiResponse<T> {
    status: boolean;
    message?: string;
    payload: T;
}