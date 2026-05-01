'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import LogDetailsView from '@/features/audit-logs/components/audit-log-details';
import { AuditLogsResponse } from '@/shared/types/audit-logs';

export default function AuditLogDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const queryClient = useQueryClient();

    const log = useMemo(() => {
        if (!id) return null;

        const cachedQueries = queryClient.getQueriesData<AuditLogsResponse>({
            queryKey: ['audit-logs'],
        });

        const allLogs = cachedQueries.flatMap(([, data]) =>
            data?.payload?.data ?? []
        );

        return allLogs.find((item) => String(item.id) === String(id)) || null;
    }, [id, queryClient]);

    const isLoading = !id;

    useEffect(() => {
        if (isLoading) return;

        if (!log) {
            router.replace('/dashboard/audit-logs');
        }
    }, [log, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!log) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return <LogDetailsView log={log} />;
}