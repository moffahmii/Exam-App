// app/admin/audit-logs/[id]/page.tsx
'use client';

import LogDetailsView from '@/features/audit-logs/components/audit-log-details';
import { AuditLogsResponse } from '@/features/audit-logs/types/audit-logs';
import { useQueryClient } from '@tanstack/react-query';

export default function Page({ params }: { params: { id: string } }) {
    const queryClient = useQueryClient();
    const cachedData = queryClient.getQueryData<AuditLogsResponse>(['audit-logs', { page: 1 }]);
    const log = cachedData?.payload?.data.find((item) => item.id === params.id);
    if (!log) {
        return <div>Log not found in cache.</div>;
    }
    return <LogDetailsView log={log} />;
}