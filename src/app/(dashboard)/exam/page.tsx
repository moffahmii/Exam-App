import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, HelpCircle, ChevronLeft, ArrowRight, BookOpenText } from 'lucide-react';
import { getDiplomaDetails } from '@/lib/api/dashboard/diploma-details.api';

export default async function ExamPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>; // استقبال الـ Query Params
}) {
  const { id } = await searchParams;

  if (!id) return notFound();

  const diploma = await getDiplomaDetails(id);
  if (!diploma) return notFound();

  return (
    <main className="min-h-screen">
      {/* Container */}
      <div className="container mx-auto p-4">
        {/* Whole Card */}
        <div className="bg-white p-4 space-y-4">
          {diploma.exams?.map((exam: IExam, index: number) => (
            <div
              key={exam.id}
              className="group flex flex-col md:flex-row items-start md:items-center bg-blue-50 gap-6 p-6 relative"
            >
              {/* Icon */}
              <div className="relative w-24 h-24 bg-blue-100  overflow-hidden shrink-0  shadow-inner border border-blue-300">
                <Image
                  src={exam.image.startsWith('/') ? `https://www.elevate-bootcamp.cloud${exam.image}` : exam.image}
                  alt={exam.title}
                  fill
                  className="object-contain p-3"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="grow font-mono">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-xl text-blue-600">
                    {exam.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-800 font-medium">
                    <span className="flex items-center gap-2">
                      <HelpCircle size={16} className="text-sm" />
                      25 Questions
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      {exam.duration} Minutes
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 mb-4 font-normal">
                  {exam.description}
                </p>
              </div>

              {/* Start Exam */}
              <div className="absolute -bottom-2 right-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 hidden md:block">
                <Link
                  href={`/exams/${exam.id}`}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 font-normal text- font-mono transition-all"
                >
                  START
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-600 font-mono text-lg font-noraml">
              End of list
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}