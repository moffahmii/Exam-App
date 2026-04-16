import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { submitExam } from "@/lib/api/website/exam-questions.api";

type Answer = {
    questionId: string;
    answerId: string;
};

type Payload = {
    examId: string;
    answers: Answer[];
    startedAt: string;
};

export const useSubmitExam = () => {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: async (payload: Payload) => {
            const res = await submitExam(payload);
            if (!res.status) {
                throw new Error(res.message || "Failed to submit");
            }
            return res;
        },
        onSuccess: (res) => {
            const submissionId = res.payload?.submission?.id;
            router.push(`/diplomas/exam/result/${submissionId}`);
        },
    });
    const sendSubmission = (examId: string, answers: Answer[]) => {
        const filteredAnswers = answers.filter(
            (a) => a.questionId && a.answerId
        );
        mutation.mutate({
            examId,
            answers: filteredAnswers,
            startedAt: new Date().toISOString(),
        });
    };
    return {
        sendSubmission,
        isSubmitting: mutation.isPending,
        error: mutation.error?.message || null,
    };
};