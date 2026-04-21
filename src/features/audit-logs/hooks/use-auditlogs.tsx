import { useQuery } from '@tanstack/react-query';
import { AuditLogsParams } from '../types/audit-logs';
import { getAuditLogs } from '../apis/audit-log.api';

export const useAuditLogs = (params: AuditLogsParams) => {
    return useQuery({
        queryKey: ['audit-logs', params],
        queryFn: () => getAuditLogs(params),
        placeholderData: (previousData) => previousData,
    });
};