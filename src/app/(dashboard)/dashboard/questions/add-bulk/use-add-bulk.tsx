import { useMutation } from "@tanstack/react-query";
import { addBulkQuestionsApi, AddBulkQuestionsArgs } from "./question-bulk.api";

export const useAddBulkQuestions = () => {
    return useMutation({
        mutationFn: (args: AddBulkQuestionsArgs) => addBulkQuestionsApi(args),
    });
};