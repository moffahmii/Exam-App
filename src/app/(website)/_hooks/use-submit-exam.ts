// @/app/(website)/_hooks/use-submit-exam.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitExam } from '@/lib/api/website/exam-questions.api';

export const useSubmitExam = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const sendSubmission = async (examId: string, answers: any[]) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const formattedAnswers = answers
                .filter(ans => ans.selectedOption && ans.selectedOption !== "")
                .map(ans => ({
                    questionId: ans.questionId,
                    answerId: ans.selectedOption
                }));

            const res = await submitExam(examId, formattedAnswers);

            console.log("Submit Response Full Data:", res);

            if (res.status) {
                // الضبط هنا بناءً على الـ Log بتاعك:
                // المسار هو res -> payload -> submission -> id
                const submissionId = res.payload?.submission?.id;

                if (submissionId) {
                    router.push(`/diplomas/exam/result/${submissionId}`);
                } else {
                    console.error("Critical: submissionId is missing in res.payload.submission.id", res);
                    setError("تم إرسال الامتحان بنجاح، ولكن فشل الحصول على رقم المحاولة.");
                }
            } else {
                setError(res.message || "فشل إرسال الإجابات");
            }
        } catch (err: any) {
            console.error("Submission Error:", err);
            setError(err.message || "حدث خطأ غير متوقع أثناء الإرسال");
        } finally {
            setIsSubmitting(false);
        }
    };

    return { sendSubmission, isSubmitting, error };
};