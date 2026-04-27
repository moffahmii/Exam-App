import { QuestionDetails } from "@/features/dashboard-questions/components/question-details";

export default async function QuestionDetailsRoute({
    params,
}: {
    params: Promise<{ id: string }>; // 👈 1. تعديل النوع ليصبح Promise
}) {
    // 👈 2. فك الـ Promise باستخدام await
    const resolvedParams = await params;

    // 👈 3. تمرير الـ id الحقيقي للكومبوننت
    return <QuestionDetails questionId={resolvedParams.id} />;
}