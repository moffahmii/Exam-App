import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { AuditLogsParams } from '../types/audit-logs';
import { getAuditLogs } from '../apis/audit-log.api';

export const useAuditLogs = (params: AuditLogsParams) => {
    const {
        page,
        limit,
        category,
        action,
        search,
        sortOrder,
        sortBy // ضفناها هنا عشان الترتيب يشتغل صح
    } = params;

    return useQuery({
        queryKey: [
            'audit-logs',
            page,
            limit,
            category,
            action,
            search,
            sortOrder,
            sortBy // لازم تكون في الـ queryKey عشان لما تتغير يعمل Fetch جديد
        ],

        queryFn: () => getAuditLogs(params),

        // ✅ التعديل الجديد الخاص بـ React Query v5
        placeholderData: keepPreviousData,

        staleTime: 1000 * 30,
    });
};