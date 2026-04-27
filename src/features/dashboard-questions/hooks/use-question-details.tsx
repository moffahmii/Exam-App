import { useQuery } from "@tanstack/react-query";
import { getQuestionDetails } from "../apis/question-details.api";

export const useQuestionDetails = (questionId: string) => {
    return useQuery({
        queryKey: ["question", questionId],
        queryFn: () => getQuestionDetails(questionId),
        enabled: !!questionId,
        select: (data) => data.payload.question,
    });
};