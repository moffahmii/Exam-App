"use client";

import { use } from "react";
import { useExamDetails } from "@/features/dashboard-exams/hooks/use-exam-details";
import { ExamForm } from "@/features/exams-CRUD/components/exam-from";

export default function EditExamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); // ✅ فكينا الـ Promise

    const { data, isLoading, isError } = useExamDetails(id); // ✅ استخدم id

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error loading exam</p>;

    return (
        <ExamForm
            initialData={{
                title: data.title,
                description: data.description,
                image: data.image,
                duration: data.duration,
                diplomaId: data.diploma.id, // ✅ مهم جدًا
            }}
            examId={id} // ✅
        />
    );
}