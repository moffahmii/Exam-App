import ExamDetailsPage from '@/features/dashboard-exams/components/exam-details'
import React from 'react'

export default async function ExamDetails({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return <ExamDetailsPage params={{ id }} />;
}