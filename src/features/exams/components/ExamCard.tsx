import Image from 'next/image';
import Link from 'next/link';
import { Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { IExam } from '@/shared/types/exam';

interface ExamCardProps {
    exam: IExam;
    diplomaId: string;
}

export default function ExamCard({ exam, diplomaId }: ExamCardProps) {
    return (
        <div className="group flex flex-col md:flex-row items-start md:items-center bg-blue-50 gap-4 p-4 relative overflow-hidden">
            {/* Exam Image */}
            <div className="relative w-25 h-25 bg-blue-100 overflow-hidden justify-center items-center flex border border-blue-300">
                <Image
                    src={exam.image!}
                    alt={exam.title!}
                    width={74}
                    height={74}
                    className="object-contain"
                    unoptimized
                />
            </div>

            {/* Exam Details */}
            <div className="grow f">
                <div className="flex flex-col md:flex-row justify-between gap-2">
                    <h3 className="font-semibold text-xl text-blue-600 uppercase">
                        {exam.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-900 font-normal whitespace-nowrap">
                        <span className="flex items-center gap-2">
                            <HelpCircle size={16} />
                            {exam.questionsCount || 25} Questions
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

            {/* Action Button - 36x77 كما طلبت */}
            <div className="absolute -bottom-2 right-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 hidden md:block z-10">
                <Link
                    href={`/diplomas/exam/questions?id=${exam.id}&diplomaId=${diplomaId}`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 font-mono text-sm hover:bg-blue-700 transition-colors "
                >
                    START
                    <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
}