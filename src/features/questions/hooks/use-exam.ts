import { useQuery } from "@tanstack/react-query";
import { getExamQuestions } from "@/features/questions/apis/exam-questions.api";
import { IApiResponse } from "@/shared/types/api";
import { ExamQuestionsResponse, Question } from "@/shared/types/exam-quetions-site";

/**
 * Custom hook to fetch exam questions and metadata based on examId.
 */
export const useExam = (examId: string | null) => {
    const query = useQuery({
        queryKey: ["exam-questions", examId],
        // Cast the API response to enforce our clean interface types
        queryFn: async () => {
            const response = await getExamQuestions(examId!);
            return response as unknown as IApiResponse<ExamQuestionsResponse>;
        },
        enabled: !!examId,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    const payload = query.data?.status ? query.data.payload : undefined;

    const questions: Question[] = payload?.questions ?? [];
    const duration: number = payload?.duration ?? 60;

    return {
        questions,
        duration,
        examName: query.data?.message ? "Exam" : "",
        isLoading: query.isLoading,
        error: query.error ? "Failed to load exam data" : null,
    };
};