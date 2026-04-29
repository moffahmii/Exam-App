export interface Answer {
    id: string;
    text: string;
}

export interface Question {
    id: string;
    text: string;
    examId: string;
    answers: Answer[];
}

export interface ExamQuestionsResponse {
    questions: Question[];
    duration?: number;
}
export interface ExamFormProps {
    examId: string;
    questions: Question[];
    duration: number;
    examTitle?: string;     // ضيف دي
    diplomaName?: string;   // وضيف دي
    diplomaId?: string;     // وضيف دي كمان عشان البريد كرامب يرجع للدبلومة الصح
}
export interface AnswersForm {
    examId: string;
    startedAt: string;
    answers: {
        questionId: string;
        answerId: string;
    }[];
}

export interface ExamFormProps {
    examId: string;
    questions: Question[];
    duration: number;
}

export interface SubmitExamPayload {
    examId: string;
    answers: { questionId: string; answerId: string }[];
    startedAt: string;
}