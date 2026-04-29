// hooks/use-edit-question.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuestionApi } from "../apis/edit-quetioms"; // تأكد من اسم الملف عندك
import { ISaveQuestionPayload } from "@/shared/types/questions";

export function useEditQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        // هنا بنستقبل الـ questionId والـ payload
        mutationFn: ({ id, payload }: { id: string; payload: ISaveQuestionPayload }) => {
            return updateQuestionApi(id, payload);
        },
        onSuccess: (res) => {
            if (res.status) {
                queryClient.invalidateQueries({ queryKey: ['exam-questions'] });
            }
        },
        onError: (error: any) => {
            console.error(error);
        }
    });
}