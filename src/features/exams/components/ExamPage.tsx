'use client';

import { use } from 'react';
import { useDiplomaExams } from '../hooks/use-diploma-exams';
import LoadingExams from './ExamSkeleton';
import ExamCard from './ExamCard';

export default function ExamPage({ searchParams }: { searchParams: Promise<{ id: string }>; }) {
    const { id } = use(searchParams);
    const { data: exams, isLoading, isError } = useDiplomaExams(id as string);
    if (isLoading) {
        return <LoadingExams />;
    }

    if (isError || !exams || exams.length === 0) {
        return (
            <div className="min-h-screen bg-gray-900 flex justify-center items-center text-white">
                No exams found for this diploma.
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-900 py-8">
            <div className="container mx-auto max-w-5xl px-4">
                <div className="bg-white p-6 space-y-4">

                    {exams.map((exam) => (
                        <ExamCard key={exam.id} exam={exam} diplomaId={id} />
                    ))}
                    <div className="text-center py-4 mt-6 border-t border-gray-100">
                        <p className="text-gray-400 text-sm">End of list</p>
                    </div>
                </div>
            </div>
        </main>
    );
}