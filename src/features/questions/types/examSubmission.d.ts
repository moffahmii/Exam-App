declare interface IExamSubmission {
    id: number;
    examId: number;
    examTitle: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    startedAt: string;
    submittedAt: string;
}