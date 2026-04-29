// في ملف الـ page.tsx الأساسي
import BulkPage from '@/features/dashboard-questions/components/bulk-page'
import React from 'react'

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
    return <BulkPage params={params} />
}