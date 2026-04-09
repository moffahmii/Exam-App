export interface IAnswer {
    id: string; 
    text: string;
}
export interface IQuestion {
    id: string;    
    text: string;
    examId: string; 
    answers: IAnswer[]; 
    immutable?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export interface IExamPayload {
    questions: IQuestion[];
}