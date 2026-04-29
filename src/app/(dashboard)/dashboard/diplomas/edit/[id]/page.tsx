import { EditDiplomaView } from "@/features/dashboard-diplomas/componeents/diploma-edit-page";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditDiplomaPage({ params }: PageProps) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    return <EditDiplomaView id={id} />;
}