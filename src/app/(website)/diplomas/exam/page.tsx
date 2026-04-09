import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { getDiplomaDetails } from '@/lib/api/dashboard/diploma-details.api';
import { IExam } from '@/lib/types/exam';

export default async function ExamPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  if (!id) return notFound();
  const response = await getDiplomaDetails(id);
  const exams = response?.payload?.diploma?.exams;
  if (!exams || !Array.isArray(exams)) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="bg-white p-4 space-y-4 ">
          {exams.map((exam: IExam) => (
            <div
              key={exam.id}
              className="group flex flex-col md:flex-row items-start md:items-center bg-blue-50 gap-6 p-6 relative  overflow-hidden"
            >
              <div className="relative w-24 h-24 bg-blue-100 overflow-hidden shrink-0 shadow-inner border border-blue-300 ">
                <Image
                  src={exam.image?.startsWith('http') ? exam.image : `https://exam-app.elevate-bootcamp.cloud${exam.image}`}
                  alt={exam.title || "Exam Image"}
                  fill
                  className="object-contain p-1"
                  unoptimized // مطلوب لأن روابط الصور لا تمر عبر بروكسب Next.js
                />
              </div>
              <div className="grow font-mono">
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <h3 className="font-semibold text-xl text-blue-600 uppercase">
                    {exam.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-800 font-medium whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      <HelpCircle size={16} />
                      25 Questions
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      {exam.duration} Minutes
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 mb-4 font-normal line-clamp-2">
                  {exam.description}
                </p>
              </div>
              <div className="absolute -bottom-2 right-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 hidden md:block z-10">
                <Link
                  href={`/diplomas/exam/questions?id=${exam.id}&diplomaId=${id}`}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 font-mono text-sm hover:bg-blue-700 transition-colors "
                >
                  START
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="block md:hidden w-full mt-2">
                <Link
                  href={`/diplomas/exam/questions?id=${exam.id}`}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 font-mono text-sm  shadow w-full"
                >
                  START
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
          <div className="text-center py-4 border-t border-gray-100 mt-6">
            <p className="text-gray-400 font-mono text-sm">End of list</p>
          </div>
        </div>
      </div>
    </main>
  );
}