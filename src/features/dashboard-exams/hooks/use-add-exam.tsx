import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createExamAction } from "../apis/create-exam-api";
import { ExamField } from "../../exams-CRUD/shceme/exam-schem";

export const useCreateExam = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: ExamField) => createExamAction(data),
        onSuccess: (res) => {
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["exams"] });
                router.push("/dashboard/exams");
            }
        },
    });
};