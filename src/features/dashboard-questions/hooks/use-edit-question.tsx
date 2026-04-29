import { ISaveQuestionPayload } from "@/shared/types/questions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuestionApi } from "../apis/edit-quetioms";
import { addQuestion } from "../apis/add-question.api";


export function useUpsertQuestion(isEditMode: boolean) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, payload }: { id?: string; payload: ISaveQuestionPayload }) => {
            if (isEditMode && id) {
                return updateQuestionApi(id, payload);
            }
            return addQuestion(payload);
        },
        onSuccess: (res) => {
            if (res.status) {
                queryClient.invalidateQueries({ queryKey: ['exam-questions'] });
            }
        }
    });
}