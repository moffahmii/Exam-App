import { getExamQuestions } from "@/features/questions/apis/exam-questions.api";
import { useQuery } from "@tanstack/react-query";

export const useExamQuestions = (examId: string) => {
    return useQuery({
        queryKey: ["exam-questions", examId],
        queryFn: () => getExamQuestions(examId),
        enabled: !!examId,
        // السر هنا: بنفلتر الداتا اللي راجعة وبنبعت للكومبوننت المصفوفة فقط
        // ولو مفيش داتا بنرجع مصفوفة فاضية [] عشان الـ map ميضربش أبداً
        select: (data) => data?.payload?.questions || [],
    });
};311