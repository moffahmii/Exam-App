import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAuditLogs } from '../apis/audit-log.api';
import { AuditLogsParams, AuditLogsResponse } from '@/shared/types/audit-logs';

export const useAuditLogs = (params: AuditLogsParams) => {
    const {
        page,
        limit,
        category,
        action,
        search,
        sortOrder,
        sortBy
    } = params;

    return useQuery<AuditLogsResponse>({
        queryKey: [
            'audit-logs',
            page,
            limit,
            category,
            action,
            search,
            sortOrder,
            sortBy
        ],
        queryFn: () => getAuditLogs(params),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 30,
    });
};