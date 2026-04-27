// features/dashboard-questions/schema/question-schema.ts
import * as z from 'zod';

export const AnswerSchema = z.object({
    id: z.string().optional(),
    text: z.string().min(1, "Answer text cannot be empty"),
    isCorrect: z.boolean().default(false),
});

export const QuestionsBulkSchema = z.object({
    // خليناه اختياري هنا لأننا بنضمنه برمجياً من الـ URL
    examId: z.string().optional(),
    questions: z.array(z.object({
        text: z.string().min(5, "Question headline must be at least 5 characters"),
        answers: z.array(AnswerSchema)
            .min(2, "You must provide at least 2 answers")
            .refine((answers) => answers.some(a => a.isCorrect), {
                message: "Each question must have at least one correct answer",
            }),
    })).min(1, "You must add at least one question"),
});