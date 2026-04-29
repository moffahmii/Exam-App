'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteAuditLogAction,  } from "../apis/delete-audit.api";

export function useDeleteAuditLog() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (id: string) => deleteAuditLogAction(id),
        onSuccess: async (res) => {
            if (res.status) {
                await queryClient.invalidateQueries({ queryKey: ['audit-logs'] });
                router.push('/dashboard/settings/audit-logs');
                router.refresh();
            }
        }
    });
}