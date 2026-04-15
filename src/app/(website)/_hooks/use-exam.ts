import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getExamQuestions } from '@/lib/api/website/exam-questions.api';
import { IQuestion } from "@/lib/types/questions";
import { IApiResponse } from "@/lib/types/api"; 

export const useExam = (examId: string | null) => {
    const formMethods = useForm({
        defaultValues: {
            answers: {} as Record<string, string>
        }
    });
    const { reset } = formMethods;
    const { data, isLoading, error } = useQuery({
        queryKey: ['exam-questions', examId],
        queryFn: () => getExamQuestions(examId!),
        enabled: !!examId,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (data?.status && data.payload?.questions) {
            const fetchedQuestions = data.payload.questions;
            const initialAnswers = fetchedQuestions.reduce((acc, q) => {
                acc[q.id] = "";
                return acc;
            }, {} as Record<string, string>);
            reset({ answers: initialAnswers });
        }
    }, [data, reset]);

    return {
        questions: data?.status ? data.payload.questions : [],
        examName: "Exam", 
        isLoading,
        error: error ? "Failed to load exam data" : null,
        formMethods,
    };
};