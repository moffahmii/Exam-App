'use client';

import AuditLogsTable from '@/features/audit-logs/components/audit-logs-table';
import { useAuditLogs } from '@/features/audit-logs/hooks/use-auditlogs';
import { useState } from 'react';


export default function AuditLogsPage() {
    const [page, setPage] = useState(1);

    // استدعاء الداتا الحقيقية من الـ API
    const { data, isLoading } = useAuditLogs({ page, limit: 12 });

    // استخراج المصفوفة
    const logsData = data?.payload?.data || [];

    return (
        <div className="p-6 w-full">
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    {/* تقدر تحط Spinner هنا */}
                    <span className="text-gray-500">Loading data...</span>
                </div>
            ) : (
                <AuditLogsTable logs={logsData} />
            )}
        </div>
    );
}