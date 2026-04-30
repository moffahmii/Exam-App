import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ExamField } from "../../../shared/schemas/exam-schem";
import { updateExamAction } from "../apis/update-exam.api";

export const useEditExam = (examId: string) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: ExamField) => updateExamAction(examId, data),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["exams"] });
            await queryClient.cancelQueries({ queryKey: ["exam", examId] });

            const previousExams = queryClient.getQueryData(["exams"]);
            const previousExam = queryClient.getQueryData(["exam", examId]);

            return { previousExams, previousExam };
        },
        onSuccess: (res) => {
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["exams"] });
                queryClient.invalidateQueries({ queryKey: ["exam", examId] });
                router.push("/dashboard/exams");
            }
        },
        onError: (_, __, context: any) => {
            if (context?.previousExams) {
                queryClient.setQueryData(["exams"], context.previousExams);
            }
            if (context?.previousExam) {
                queryClient.setQueryData(["exam", examId], context.previousExam);
            }
        },
    });
};