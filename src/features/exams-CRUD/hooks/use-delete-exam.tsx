import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExamAction } from "../apis/delete-exam.api";

export const useDeleteExam = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteExamAction(id),

        onMutate: async (id: string) => {
            // وقف أي refetch
            await queryClient.cancelQueries({ queryKey: ["exams"] });

            // snapshot
            const previousExams = queryClient.getQueryData(["exams"]);

            // optimistic update (remove exam instantly)
            queryClient.setQueryData(["exams"], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    payload: old.payload?.filter((exam: any) => exam.id !== id),
                };
            });

            return { previousExams };
        },

        onSuccess: () => {
            // تأكيد المزامنة مع السيرفر
            queryClient.invalidateQueries({
                queryKey: ["exams"],
                exact: false,
            });
        },

        onError: (_, __, context: any) => {
            // rollback لو حصل خطأ
            if (context?.previousExams) {
                queryClient.setQueryData(["exams"], context.previousExams);
            }
        },
    });
};