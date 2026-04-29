'use client';

import { useDiplomaExams } from '@/features/exams/hooks/use-diploma-exams';
import ExamCard from '@/features/exams/components/ExamCard';
import LoadingExams from '@/features/exams/components/ExamSkeleton';
import { BookOpenCheck } from 'lucide-react';
import { WebsiteHeader } from '@/shared/components/custom/website-header';
import { IExam } from '@/shared/types/exam';

interface ExamPageContentProps {
    id: string;
}

export default function ExamPageContent({ id }: ExamPageContentProps) {
    const { data: exams, isLoading, isError } = useDiplomaExams(id);

    const diplomaTitle = exams?.[0]?.diploma?.title;

    const breadcrumbs = [
        { label: 'Diplomas', href: '/' },
        { label: diplomaTitle ?? 'Loading...' }
    ];

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-50">
                <WebsiteHeader
                    title="Loading..."
                    icon={<BookOpenCheck size={32} />}
                    breadcrumbs={breadcrumbs}
                />
                <div className="py-8">
                    <LoadingExams />
                </div>
            </main>
        );
    }

    if (isError || !exams) {
        return (
            <main className="min-h-screen bg-gray-50">
                <WebsiteHeader
                    title="Error"
                    icon={<BookOpenCheck size={32} />}
                    breadcrumbs={breadcrumbs}
                />
                <div className="flex justify-center items-center py-20 text-red-500 font-mono">
                    Failed to load exams.
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <WebsiteHeader
                title={diplomaTitle ?? 'Diploma Exams'}
                icon={<BookOpenCheck size={32} />}
                breadcrumbs={breadcrumbs}
            />

            <div className="container mx-auto max-w-7xl p-4">
                <div className="bg-white p-6 space-y-4  ">
                    {exams.length > 0 ? (
                        exams.map((exam: IExam) => (
                            <ExamCard key={exam.id} exam={exam} diplomaId={id} />
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            No exams available.
                        </div>
                    )}

                    <div className="text-center py-4 border-t border-gray-100">
                        <p className="text-gray-400 font-mono text-sm">
                            End of list
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}