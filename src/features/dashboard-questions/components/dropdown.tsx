'use client';

import { useState } from "react";
import { useDeleteQuestion } from "@/features/dashboard-questions/hooks/use-delete-question";
import { GlobalActionsMenu } from "@/shared/components/custom/actions-menu";
import { GlobalDeleteModal } from "@/shared/components/custom/delete-modal";

interface QuestionActionsProps {
    questionId: string;
    examId: string;
    questionText?: string;
}

export function QuestionActions({ questionId, examId, questionText }: QuestionActionsProps) {
    const [openDelete, setOpenDelete] = useState(false);

    const { mutate: deleteMutate, isPending: isDeleting } = useDeleteQuestion();

    const handleDeleteConfirm = () => {
        deleteMutate(questionId, {
            onSuccess: () => {
                setOpenDelete(false);
            }
        });
    };

    return (
        <>
            <GlobalActionsMenu
                viewHref={`/dashboard/questions/view/${questionId}`}
                editHref={`/dashboard/exams/${examId}/questions/edit/${questionId}`}
                onDelete={() => setOpenDelete(true)}
            />

            <GlobalDeleteModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
                title="Delete Question"
                description={`Are you sure you want to delete this question?`}
            />
        </>
    );
}