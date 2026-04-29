import { addBulkQuestionsApi, AddBulkQuestionsArgs } from "@/features/dashboard-questions/apis/question-bulk.api";
import { useMutation } from "@tanstack/react-query";

export const useAddBulkQuestions = () => {
    return useMutation({
        mutationFn: (args: AddBulkQuestionsArgs) => addBulkQuestionsApi(args),
    });
};