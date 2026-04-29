'use client';

import { useQuery } from "@tanstack/react-query";
import { getAuditLogById } from "../apis/single-audit.api";

export function useAuditLogDetails(id: string) {
    return useQuery({
        queryKey: ['audit-log', id],
        queryFn: () => getAuditLogById(id),
        enabled: !!id, // لا يتم التنفيذ إلا إذا كان الـ id موجوداً
    });
}