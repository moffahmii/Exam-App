"use client";

import { DiplomaForm } from "@/features/dashboard-diplomas/componeents/diploma-form";
import useDiplomaDetails from "@/features/dashboard-diplomas/hooks/use-single-diploma-details";
import { IDiplomas } from "@/shared/types/diplomas";

interface EditDiplomaViewProps {
    id: string;
}

export function EditDiplomaView({ id }: EditDiplomaViewProps) {
    const { data: diploma, isLoading, isError } = useDiplomaDetails(id);

    if (isLoading) return <div className="p-6 text-gray-500">Loading diploma...</div>;
    if (isError || !diploma) return <div className="p-6 text-red-500">Error loading diploma</div>;

    const initialData = {
        title: (diploma as IDiplomas).title,
        description: (diploma as IDiplomas).description,
        image: (diploma as IDiplomas).image,
    };

    return <DiplomaForm initialData={initialData} diplomaId={id} />;
}