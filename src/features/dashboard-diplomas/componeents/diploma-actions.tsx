"use client";

import { useState } from "react";
import { GlobalActionsMenu } from "@/shared/components/custom/actions-menu";
import { GlobalDeleteModal } from "@/shared/components/custom/delete-modal";
import useDeleteDiploma from "../hooks/use-delete-diploma";

interface DiplomaActionsProps {
    diplomaId: string;
    diplomaTitle: string;
}

export function DiplomaActions({ diplomaId, diplomaTitle }: DiplomaActionsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutateAsync: deleteDiploma, isPending } = useDeleteDiploma();

    const handleConfirmDelete = async () => {
        await deleteDiploma(diplomaId);
        setIsModalOpen(false);
    };

    return (
        <>
            <GlobalActionsMenu
                viewHref={`/dashboard/diplomas/view-diploma/${diplomaId}`}
                editHref={`/dashboard/diplomas/edit/${diplomaId}`}
                onDelete={() => setIsModalOpen(true)}
            />

            <GlobalDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                isPending={isPending}
                title="Are you sure you want to delete this diploma?"
                description={`The diploma "${diplomaTitle}" will be permanently removed.`}
            />
        </>
    );
}