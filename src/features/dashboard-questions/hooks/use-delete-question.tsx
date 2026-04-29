// features/dashboard-questions/hooks/use-delete-question.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestionApi } from "../apis/delete-quetions.api";

export const useDeleteQuestion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteQuestionApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
            queryClient.invalidateQueries({ queryKey: ["exam-details"] });
        },
        onError: (error: any) => {
            console.error("Delete Error:", error.message);
        },
    });
};