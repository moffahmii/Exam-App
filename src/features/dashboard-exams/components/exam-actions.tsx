"use client";

import { useState } from "react";
import { GlobalDeleteModal } from "@/shared/components/custom/delete-modal";
import { useDeleteExam } from "@/features/dashboard-exams/hooks/use-delete-exam";
import { GlobalActionsMenu } from "@/shared/components/custom/actions-menu";

interface ExamActionsProps {
    examId: string;
    examTitle?: string;
}

export function ExamActions({ examId, examTitle }: ExamActionsProps) {
    const [openDelete, setOpenDelete] = useState(false);

    // استخدام هوك الحذف الموحد
    const { mutate: deleteExam, isPending: isDeleting } = useDeleteExam();

    const handleConfirmDelete = () => {
        deleteExam(examId, {
            onSuccess: (res) => {
                if (res?.success) {
                    setOpenDelete(false);
                }
            },
        });
    };

    return (
        <>
            {/* استخدام الكومبوننت الجلوبال */}
            <GlobalActionsMenu
                viewHref={`/dashboard/exams/${examId}`}
                editHref={`/dashboard/exams/edit/${examId}`}
                onDelete={() => setOpenDelete(true)}
            />

            {/* المودال الجلوبال للحذف */}
            <GlobalDeleteModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Exam"
                description={`Are you sure you want to delete "${examTitle || "this exam"}"? This action cannot be undone.`}
                isLoading={isDeleting}
            />
        </>
    );
}