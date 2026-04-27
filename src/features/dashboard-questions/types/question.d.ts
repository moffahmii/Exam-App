
export interface IAnswer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface IQuestion {
    id: string;
    text: string;
    examId: string;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
    answers: IAnswer[];
    exam: {
        id: string;
        title: string;
    };
}

export interface IExamQuestionsResponse {
    status: boolean;
    code: number;
    payload: {
        questions: IQuestion[];
    };
}

export interface QuestionsBulkFormValue {
    examId: string,
    questions: Array<{
        text: string,
        answers: Array<{
            text: string,
            isCorrect: boolean
        }>
    }>
}