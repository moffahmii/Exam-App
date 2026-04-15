"use client";

import React, { useEffect, useState, use } from 'react';
import { getSubmissionResult } from "@/lib/api/website/exam-questions.api";
import Link from 'next/link';

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            const response = await getSubmissionResult(id);
            if (response.status) {
                setData(response.payload.submission);
                console.log("Fetched Result Data:", response.payload.submission);
            }
            setLoading(false);
        };
        fetchResult();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-pulse text-xl font-bold text-blue-600">Calculating Results...</div>
        </div>
    );

    if (!data) return <div className="p-10 text-center text-red-500 font-bold">لم يتم العثور على نتيجة لهذه المحاولة.</div>;

    const isPassed = data.score >= 50;

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-blue-100/20 p-10 text-center relative overflow-hidden">

                {/* شريط علوي ملون حسب النتيجة */}
                <div className={`absolute top-0 left-0 w-full h-2 ${isPassed ? 'bg-green-500' : 'bg-red-500'}`} />

                <h1 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-10">Exam Result</h1>

                {/* الدائرة المركزية (Score) */}
                <div className="relative inline-flex items-center justify-center mb-10">
                    <svg className="w-48 h-48 transform -rotate-90">
                        <circle
                            cx="96" cy="96" r="80"
                            stroke="currentColor" strokeWidth="10" fill="transparent"
                            className="text-gray-100"
                        />
                        <circle
                            cx="96" cy="96" r="80"
                            stroke="currentColor" strokeWidth="10" fill="transparent"
                            strokeDasharray={502}
                            strokeDashoffset={502 - (502 * data.score) / 100}
                            className={`${isPassed ? 'text-green-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-5xl font-black text-gray-900">{data.score}%</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Score</span>
                    </div>
                </div>

                <h2 className="text-3xl font-black text-gray-900 mb-3">
                    {isPassed ? "Great Job! 🏆" : "Keep Trying! 💪"}
                </h2>
                <p className="text-gray-500 mb-10 px-6">
                    {isPassed
                        ? `Excellent performance in "${data.examTitle}". You've demonstrated a strong understanding.`
                        : `Don't worry, every mistake is a lesson. Review the topics of "${data.examTitle}" and try again.`}
                </p>

                {/* الإحصائيات (Total / Correct / Wrong) */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                    <div className="p-5 bg-blue-50 rounded-[24px]">
                        <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Total</p>
                        <p className="text-xl font-black text-blue-900">{data.totalQuestions}</p>
                    </div>
                    <div className="p-5 bg-green-50 rounded-[24px]">
                        <p className="text-[10px] font-bold text-green-400 uppercase mb-1">Correct</p>
                        <p className="text-xl font-black text-green-900">{data.correctAnswers}</p>
                    </div>
                    <div className="p-5 bg-red-50 rounded-[24px]">
                        <p className="text-[10px] font-bold text-red-400 uppercase mb-1">Wrong</p>
                        <p className="text-xl font-black text-red-900">{data.wrongAnswers}</p>
                    </div>
                </div>

                {/* الأزرار */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/diplomas"
                        className="flex-[2] py-4 bg-[#111827] text-white rounded-[20px] font-bold hover:bg-black transition-all shadow-lg shadow-gray-200"
                    >
                        Back to Dashboard
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="flex-1 py-4 border-2 border-gray-100 text-gray-600 rounded-[20px] font-bold hover:bg-gray-50 transition-all"
                    >
                        Print Result
                    </button>
                </div>
            </div>
        </div>
    );
}