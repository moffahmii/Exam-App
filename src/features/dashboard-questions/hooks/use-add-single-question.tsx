import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addQuestion } from "../apis/add-question.api";
import { ISaveQuestionPayload } from "@/shared/types/questions";

export function useAddQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ISaveQuestionPayload) => addQuestion(payload),
        onSuccess: (res) => {
            if (res.status) {
                window.alert(res.message);
                queryClient.invalidateQueries({ queryKey: ['exam-questions'] });
            } else {
            }
        },
        onError: (error: any) => {
            window.alert(error.message);
            console.error(error);
        }
    });
}