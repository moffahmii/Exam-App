import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { ExamField } from "../shceme/exam-schem";
import { createExamAction } from "../apis/create-exam-api";

export const useCreateExam = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: ExamField) => createExamAction(data),
        onSuccess: () => {
            // بنعمل Invalidate عشان جدول الامتحانات يعمل ريفريش للداتا الجديدة
            queryClient.invalidateQueries({ queryKey: ["exams"] });
            router.push("/dashboard/exams"); // بنرجع لصفحة لستة الامتحانات
        },
        onError: (error: Error) => {
        },
    });
};