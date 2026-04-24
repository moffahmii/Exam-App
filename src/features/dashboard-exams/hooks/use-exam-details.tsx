import { useQuery } from "@tanstack/react-query";
import { getExamDetailsAction } from "../apis/exam-details.api";
export const useExamDetails = (examId: string) => {
    return useQuery({
        queryKey: ["exam", examId],
        queryFn: () => getExamDetailsAction(examId),
        enabled: !!examId,
        staleTime: 1000 * 60 * 5,
    });
};