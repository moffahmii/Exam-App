'use client';

import React, { useState } from 'react';
import { GlobalActionsMenu } from "@/shared/components/custom/actions-menu";
import { GlobalDeleteModal } from "@/shared/components/custom/delete-modal";
import { AuditLog } from '@/shared/types/audit-logs';
import { useDeleteAuditLog } from '../hooks/use-delete-audit';

export function AuditActions({ log }: { log: AuditLog }) {
    const [openDelete, setOpenDelete] = useState(false);
    const { mutate, isPending } = useDeleteAuditLog();

    const handleConfirmDelete = () => {
        mutate(log.id, {
            onSettled: () => setOpenDelete(false)
        });
    };

    return (
        <>
            <GlobalActionsMenu
                viewHref={`/dashboard/audit-logs/${log.id}`}
                onDelete={() => setOpenDelete(true)}
            />

            <GlobalDeleteModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
                isLoading={isPending}
                title="Delete Audit Log"
                description={`Are you sure you want to delete log #${log.id}?`}
            />
        </>
    );
}