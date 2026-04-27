'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import LogDetailsView from '@/features/audit-logs/components/audit-log-details';
import { Loader2 } from 'lucide-react';
// استورد الـ Type بتاع الـ Response
import { AuditLogsResponse } from '@/features/audit-logs/types/audit-logs';

export default function AuditLogDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();

    // 1. بندور على اللوج في الداتا اللي جات معانا أصلاً في الجدول (الكاش)
    const log = useMemo(() => {
        if (!id) return null;

        // بنجيب كل كاش الجداول اللي اتعملت
        const cachedQueries = queryClient.getQueriesData<AuditLogsResponse>({
            queryKey: ['audit-logs']
        });

        // بندور على اللوج بتاعنا
        for (const [, data] of cachedQueries) {
            const found = data?.payload?.data?.find((item) => item.id === id);
            if (found) return found;
        }

        return null;
    }, [id, queryClient]);

    // 2. لو اليوزر عمل Refresh والكاش طار، نرجعه لصفحة الجدول يحمل من جديد
    useEffect(() => {
        if (!log) {
            // ⚠️ غير المسار ده للمسار الصحيح لصفحة الجدول عندك
            router.replace('/dashboard/audit-logs');
        }
    }, [log, router]);

    // طول ما هو بيعمل Redirect نعرضله لودينج خفيف
    if (!log) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    // 3. نعرض البيانات اللي جات معانا وخلاص!
    return <LogDetailsView log={log} />;
}