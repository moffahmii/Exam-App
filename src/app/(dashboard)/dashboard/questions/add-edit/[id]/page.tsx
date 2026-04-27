import { QuestionForm } from "@/features/dashboard-questions/components/question-from";

export default function AddQuestionRoute({
    searchParams,
}: {
    searchParams?: { examId?: string }; // لاستقبال examId لو ضغط Add من داخل امتحان معين
}) {
    return <QuestionForm defaultExamId={searchParams?.examId} />;
}