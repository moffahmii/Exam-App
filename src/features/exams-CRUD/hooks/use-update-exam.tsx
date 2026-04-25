import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExamAction } from "../apis/update-exam.api";
import { useRouter } from "next/navigation";
import { ExamField } from "../shceme/exam-schem";

export const useEditExam = (examId: string) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: ExamField) =>
            updateExamAction(examId, data),

        onMutate: async (newData) => {
            // وقف أي refetch شغال
            await queryClient.cancelQueries({ queryKey: ["exams"] });
            await queryClient.cancelQueries({ queryKey: ["exam", examId] });

            // snapshot (اختياري بس مفيد)
            const previousExams = queryClient.getQueryData(["exams"]);
            const previousExam = queryClient.getQueryData(["exam", examId]);

            return { previousExams, previousExam };
        },

        onSuccess: async (updatedData) => {
            // تحديث الكاش مباشرة (important)
            queryClient.setQueryData(["exam", examId], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    payload: updatedData,
                };
            });

            // refresh list
            await queryClient.invalidateQueries({
                queryKey: ["exams"],
                exact: false,
            });

            router.push("/dashboard/exams");
        },

        onError: (_, __, context: any) => {
            // rollback لو حصل error
            if (context?.previousExams) {
                queryClient.setQueryData(["exams"], context.previousExams);
            }
            if (context?.previousExam) {
                queryClient.setQueryData(["exam", examId], context.previousExam);
            }
        },
    });
};