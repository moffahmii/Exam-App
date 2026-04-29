import QuestionFormPage from "@/features/dashboard-questions/components/single-question-form";

interface PageProps {
    params: Promise<{ id: string; questionId?: string }>;
    searchParams: Promise<{ examId?: string }>;
}

export default async function AddQuestionRoute({ params, searchParams }: PageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    return (
        <QuestionFormPage
            params={Promise.resolve({
                id: resolvedParams.id || resolvedSearchParams.examId || "",
                questionId: resolvedParams.questionId
            })}
        />
    );
}