import ExamsPage from "@/features/dashboard-exams/components/exams-page";

export default async function DiplomaExams({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    console.log("PAGE PARAM ID:", id);

    return <ExamsPage id={id} />;
}