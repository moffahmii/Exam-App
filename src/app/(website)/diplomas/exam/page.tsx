'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { useDiplomaExams } from '@/features/exams/hooks/use-diploma-exams';
import ExamCard from '@/features/exams/components/ExamCard';
import { IExam } from '@/features/exams/types/exam';
import LoadingExams from '@/features/exams/components/ExamSkeleton';

export default function ExamPage({ searchParams }: { searchParams: Promise<{ id?: string }>; }) {
  const { id } = use(searchParams);

  if (!id) return notFound();
  const { data: exams, isLoading, isError } = useDiplomaExams(id);
  if (isLoading) {
    return <LoadingExams />;
  }


  return (
    <main className="min-h-screenpy-8">
      <div className="container mx-auto ">
        <div className="bg-white p-4 space-y-4">
          {exams?.map((exam: IExam) => (
            <ExamCard key={exam.id} exam={exam} diplomaId={id} />
          ))}
          <div className="text-center py-4 mt-6 border-t border-gray-100">
            <p className="text-gray-400 font-mono text-sm">End of list</p>
          </div>
        </div>
      </div>
    </main>
  );
}