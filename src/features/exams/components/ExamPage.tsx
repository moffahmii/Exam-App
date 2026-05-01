'use client';

// استدعينا الهوك بالاسم الجديد
import { useDiplomaDetails } from '@/features/exams/hooks/use-diploma-exams';
import ExamCard from '@/features/exams/components/ExamCard';
import LoadingExams from '@/features/exams/components/ExamSkeleton';
import { BookOpenCheck } from 'lucide-react';
import { WebsiteHeader } from '@/shared/components/custom/website-header';
import { IExam } from '@/shared/types/exam';

interface ExamPageContentProps {
    id: string;
}

export default function ExamPageContent({ id }: ExamPageContentProps) {
    // 🔥 بنسحب الداتا اللي الهوك رجعها
    const { data, isLoading, isError } = useDiplomaDetails(id);

    // 🔥 فصلنا الاسم عن الامتحانات
    const diplomaTitle = data?.title || 'Loading...';
    const exams = data?.exams || [];

    const breadcrumbs = [
        { label: 'Diplomas', href: '/' },
        { label: diplomaTitle }
    ];

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-50">
                <WebsiteHeader
                    title={diplomaTitle}
                    icon={<BookOpenCheck size={32} />}
                    breadcrumbs={breadcrumbs}
                />
                <div className="py-8">
                    <LoadingExams />
                </div>
            </main>
        );
    }

    if (isError) {
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
                title={diplomaTitle}
                icon={<BookOpenCheck size={32} />}
                breadcrumbs={breadcrumbs}
            />

            <div className="container mx-auto max-w-7xl px-4">
                <div className="bg-white p-6 space-y-4">
                    {exams.length > 0 ? (
                        exams.map((exam: IExam) => (
                            <ExamCard key={exam.id} exam={exam} diplomaId={id} />
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            {/* 🔥 استخدمنا الاسم هنا كمان عشان الرسالة تكون مخصصة */}
                            No exams available for {diplomaTitle}.
                        </div>
                    )}

                    <div className="text-center py-2">
                        <p className="text-gray-500text-sm">
                            End of list
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}