export interface Answer { id: string; text: string; }
export interface AnalyticsRecord { questionId: string; questionText: string; selectedAnswer: Answer | null; isCorrect: boolean; correctAnswer: Answer; }
export interface SubmissionDetails { id: string; examId: string; examTitle: string; score: number; totalQuestions: number; correctAnswers: number; wrongAnswers: number; startedAt: string; submittedAt: string; }
export interface SubmissionData { submission: SubmissionDetails; analytics: AnalyticsRecord[]; }