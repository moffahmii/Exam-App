import { useQuery } from "@tanstack/react-query";
import { getExamQuestions } from "@/lib/api/website/exam-questions.api";
import { IExamQuestionsResponse, IQuestion } from "@/lib/types/exam";
import { IApiResponse } from "@/shared/types/api";

export const useExam = (examId: string | null) => {
    const query = useQuery<
        IApiResponse<IExamQuestionsResponse>
    >({
        queryKey: ["exam-questions", examId],
        queryFn: () => getExamQuestions(examId!),
        enabled: !!examId,
        staleTime: 1000 * 60 * 5,
    });

    const questions: IQuestion[] =
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