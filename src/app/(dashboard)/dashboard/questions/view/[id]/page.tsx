import { QuestionDetails } from "@/features/dashboard-questions/components/question-details";

export default async function QuestionDetailsRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;

    return <QuestionDetails questionId={resolvedParams.id} />;
}