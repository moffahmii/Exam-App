import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExamAction } from "../apis/delete-exam.api";

export const useDeleteExam = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteExamAction(id),
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ["exams"] });
            const previousExams = queryClient.getQueryData(["exams"]);

            queryClient.setQueryData(["exams"], (old: any) => {
                if (!old || !old.payload) return old;
                return {
                    ...old,
                    payload: {
                        ...old.payload,
                        data: old.payload.data?.filter((exam: any) => exam.id !== id)
                    }
                };
            });

            return { previousExams };
        },
        onSuccess: (res) => {
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["exams"] });
            }
        },
        onError: (_, __, context: any) => {
            if (context?.previousExams) {
                queryClient.setQueryData(["exams"], context.previousExams);
            }
        },
    });
};