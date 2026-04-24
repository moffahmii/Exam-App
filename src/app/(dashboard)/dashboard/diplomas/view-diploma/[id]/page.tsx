import DiplomaDetailsPage from '@/features/dashboard-diplomas/componeents/diploma-details-page'
import React from 'react'

export default async function DiplomaDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    return (
        <DiplomaDetailsPage params={resolvedParams} />
    );
}