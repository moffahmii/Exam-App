import { z } from "zod";

/** Answer */
export const AnswerSchema = z.object({
    text: z.string().min(1, "Answer text is required"),
    isCorrect: z.boolean().default(false),
});

/** Question */
export const QuestionSchema = z.object({
    text: z.string().min(1, "Question is required"),

    answers: z
        .array(AnswerSchema)
        .min(2, "At least 2 answers required")
        .refine(
            (answers) => answers.some((a) => a.isCorrect),
            {
                message: "You must select a correct answer",
            }
        ),
});

/** Full Form */
export const QuestionsBulkSchema = z.object({
    questions: z
        .array(QuestionSchema)
        .min(1, "At least one question is required"),
});

/** Type */
export type QuestionsBulkFormValue =
    z.infer<typeof QuestionsBulkSchema>;