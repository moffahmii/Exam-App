import ExamPageContent from '@/features/exams/components/ExamPage';
import { notFound } from 'next/navigation';

export default async function Page({ searchParams }: { searchParams: Promise<{ id?: string }>; }) {
  const { id } = await searchParams;

  if (!id) return notFound();

  return <ExamPageContent id={id} />;
}