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

/**
 * Props for the main ExamForm component.
 * Includes optional metadata used for UI elements like breadcrumbs.
 */
export interface ExamFormProps {
    examId: string;
    questions: Question[];
    duration: number;
    examTitle?: string;
    diplomaName?: string;
    diplomaId?: string;
}

/**
 * Represents the internal state of the exam form (e.g., in React Hook Form).
 */
export interface AnswersForm {
    examId: string;
    startedAt: string;
    answers: {
        questionId: string;
        answerId: string;
    }[];
}

/**
 * Represents the final payload sent to the API upon exam submission.
 */
export interface SubmitExamPayload {
    examId: string;
    answers: {
        questionId: string;
        answerId: string;
    }[];
    startedAt: string;
}