import { useQuery } from "@tanstack/react-query";
import { getExamQuestions } from "@/features/questions/apis/exam-questions.api";
import { IApiResponse } from "@/shared/types/api";
import { ExamQuestionsResponse, Question } from "@/shared/types/exam-quetions-site";

export const useExam = (examId: string | null) => {
    const query = useQuery<IApiResponse<ExamQuestionsResponse>>({
        queryKey: ["exam-questions", examId],
        queryFn: () => getExamQuestions(examId!),
        enabled: !!examId,
        staleTime: 1000 * 60 * 5,
    });

    const payload = query.data?.status ? query.data.payload : undefined;

    const questions: Question[] = query.data?.status && payload?.questions ? payload.questions : [];


    const duration: number = query.data?.status && payload?.duration ? payload.duration : 60;

    return {
        questions,
        duration,
        examName: query.data?.message ? "Exam" : "",
        isLoading: query.isLoading,
        error: query.error ? "Failed to load exam data" : null,
    };
};