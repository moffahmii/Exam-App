'use client';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import LogDetailsView from '@/features/audit-logs/components/audit-log-details';
import { Loader2 } from 'lucide-react';
import { AuditLogsResponse } from '@/shared/types/audit-logs';
// استورد الـ Type بتاع الـ Response

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
 // ... نفس الكود اللي قبل الـ loop ...

// بندور على اللوج بتاعنا
for (const [, data] of cachedQueries) {
    // 1. نتأكد أولاً إن الداتا موجودة، وإن الـ payload موجود، وإن الـ data (الأري) موجودة
    const logsArray = data?.payload?.data;

    // 2. نتأكد إنها فعلاً Array (دي الخطوة اللي TypeScript بيحبها جداً عشان يحدد النوع)
    if (Array.isArray(logsArray)) {
        // 3. هنا TypeScript خلاص هيعرف إن logsArray هي AuditLog[]
        // والـ item تلقائياً هيكون نوعه AuditLog بدون ما نحتاج نكتب النوع يدوياً
        const found = logsArray.find((item) => item.id === String(id));
        
        if (found) return found;
    }
}

// ... نفس الكود اللي بعد الـ loop ...

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