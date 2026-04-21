"use client";
import { use } from "react";
import { DiplomaForm } from "@/features/create/edit-diploma/components/diploma-form";
import useDiplomaDetails from "@/features/dashboard-diplomas/hooks/use-single-diploma-details";
export default function EditDiplomaPage({params}: {params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const { data: diploma, isLoading, isError } = useDiplomaDetails(id);
    if (isLoading) return <div className="p-6 text-gray-500">Loading diploma...</div>;
    if (isError || !diploma) return <div className="p-6 text-red-500">Error loading diploma</div>;
    const initialData = {
        title: (diploma as IDiplomas).title,
        description: (diploma as IDiplomas).description,
        image: (diploma as IDiplomas).image,
    };
    return <DiplomaForm initialData={initialData} diplomaId={id} />
    
}