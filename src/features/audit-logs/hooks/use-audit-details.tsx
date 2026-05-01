import { useQuery } from "@tanstack/react-query";
import { getAuditLogById } from "../apis/single-audit.api";

export function useAuditLogDetails(id: string) {
    return useQuery({
        queryKey: ['audit-log', id],
        queryFn: () => getAuditLogById(id),
        enabled: !!id,
    });
}