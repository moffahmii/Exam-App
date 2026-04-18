import { useQuery } from "@tanstack/react-query";
import { getExamQuestions } from "@/features/questions/apis/exam-questions.api";
import { IApiResponse } from "@/shared/types/api";
import { ExamQuestionsResponse, Question } from '../types/questions';

export const useExam = (examId: string | null) => {
    const query = useQuery< IApiResponse<ExamQuestionsResponse>>
        ({
        queryKey: ["exam-questions", examId],
        queryFn: () => getExamQuestions(examId!),
        enabled: !!examId,
        staleTime: 1000 * 60 * 5,
    });

    const questions: Question[] =
        query.data?.status
            ? query.data.payload.questions
            : [];
    return {
        questions,
        examName: query.data?.message
            ? "Exam"
            : "",
        isLoading: query.isLoading,
        error: query.error
            ? "Failed to load exam data"
            : null,
    };
};