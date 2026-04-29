export interface ErrorResponse {
    status: false;
    message: string;
    code: number;
    errors?: Array<{
        path: string;
        message: string;
    }>;
}

export interface SuccessResponse<T> {
    status: true;
    code: number;
    message?: string;
    payload: T;
}

export type IApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface IAnswer {
    id?: string;
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

export type IExamQuestionsResponse = IApiResponse<{
    questions: IQuestion[];
}>;

export type ISingleQuestionResponse = IApiResponse<IQuestion>;

export interface ISaveQuestionPayload {
    text: string;
    examId: string;
    answers: Array<{
        text: string;
        isCorrect: boolean;
    }>;
}

export interface SingleQuestionFormValue extends ISaveQuestionPayload { }

export interface QuestionsBulkFormValue {
    examId: string;
    questions: Array<{
        text: string;
        answers: Array<{
            text: string;
            isCorrect: boolean;
        }>;
    }>;
}

export type IBulkSaveResponse = IApiResponse<IQuestion[]>;