import { useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
export interface Question {
    id: string; 
}
export interface ExamFormValues {
    examId: string;
    startedAt: string;
    answers: {
        questionId: string;
        answerId: string;
    }[];
}
export const useExamForm = (questions: Question[], examId: string) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const defaultValues = useMemo((): ExamFormValues | undefined => {
        if (!questions?.length) return undefined;
        return {
            examId,
            startedAt: new Date().toISOString(),
            answers: questions.map((q) => ({
                questionId: q.id,
                answerId: "",
            })),
        };
    }, [questions, examId]);
    const form = useForm<ExamFormValues>({values: defaultValues,});
    const { control } = form;
    const { fields, update } = useFieldArray({control,name: "answers",});
    const selectAnswer = (answerId: string) => {
        update(currentIndex, {
            questionId: questions[currentIndex].id,
            answerId,
        });
    };
    const isCurrentAnswered = !!fields[currentIndex]?.answerId;
    return { form, fields,currentIndex, setCurrentIndex, selectAnswer, isCurrentAnswered, };
};