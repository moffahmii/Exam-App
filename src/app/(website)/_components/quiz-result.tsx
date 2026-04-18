"use client";

import React from "react";
import { RotateCcw, FolderSymlink } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
interface Answer {
    id?: string;
    text?: string;
    [key: string]: any; // في حال وجود داتا إضافية داخل الأوبجكت
}

interface AnalyticsItem {
    questionId: string;
    questionText: string;
    selectedAnswer: Answer | null;
    isCorrect: boolean;
    correctAnswer: Answer;
}

interface SubmissionData {
    id: string;
    examId: string;
    examTitle: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    startedAt: string;
    submittedAt: string;
}

interface QuizResultsProps {
    data: {
        submission: SubmissionData;
        analytics: AnalyticsItem[];
    };
    onRestart: () => void;
    onExplore: () => void;
}

export default function QuizResults({ data, onRestart, onExplore }: QuizResultsProps) {
    const { submission, analytics } = data;

    // حساب النسبة المئوية للرسم البياني (مع حماية من القسمة على صفر)
    const totalAttempted = submission.correctAnswers + submission.wrongAnswers;
    const correctPercentage = totalAttempted > 0 ? (submission.correctAnswers / totalAttempted) * 100 : 0;

    return (
        <div className="bg-white font-mono min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b-8 border-blue-600 pb-2">
                    <span className="text-gray-800 font-bold text-lg">
                        {submission.examTitle || "Frontend Development - CSS Quiz"}
                    </span>
                    <span className="text-gray-500 font-bold">
                        Score: <span className="text-blue-600">{submission.score}%</span>
                    </span>
                </div>

                <h1 className="text-3xl font-bold text-blue-600 mb-6">Results:</h1>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* الجانب الأيسر: الإحصائيات والرسم البياني */}
                    <div className="lg:w-1/3 bg-[#f8fbff] rounded-lg p-8 flex flex-col items-center justify-center border border-blue-100">
                        {/* Donut Chart (SVG) */}
                        <div className="relative w-48 h-48 mb-8">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                {/* الدائرة الحمراء (الإجابات الخاطئة - الخلفية) */}
                                <path
                                    className="text-red-500"
                                    strokeDasharray="100, 100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                {/* الدائرة الخضراء (الإجابات الصحيحة) */}
                                <path
                                    className="text-[#10b981] transition-all duration-1000 ease-out"
                                    strokeDasharray={`${correctPercentage}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                />
                            </svg>
                        </div>

                        {/* مفتاح الألوان (Legend) */}
                        <div className="space-y-3 font-bold text-gray-700 w-full px-8">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-[#10b981] rounded-sm"></div>
                                    <span>Correct:</span>
                                </div>
                                <span>{submission.correctAnswers}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-red-500 rounded-sm"></div>
                                    <span>Incorrect:</span>
                                </div>
                                <span>{submission.wrongAnswers}</span>
                            </div>
                        </div>
                    </div>

                    {/* الجانب الأيمن: مراجعة الأسئلة */}
                    <div className="lg:w-2/3 border border-dashed border-blue-200 rounded-lg p-6 max-h-[500px] overflow-y-auto">
                        <div className="space-y-8">
                            {analytics.map((item, index) => (
                                <div key={item.questionId || index}>
                                    <h3 className="text-xl font-bold text-blue-600 mb-4">
                                        {index + 1}. {item.questionText}
                                    </h3>

                                    <div className="space-y-3">
                                        {/* عرض إجابة المستخدم */}
                                        {item.selectedAnswer ? (
                                            <div
                                                className={`flex items-center p-4 rounded-md border ${item.isCorrect
                                                        ? "bg-[#ebfbf5] border-transparent text-[#10b981]" // أخضر للإجابة الصحيحة
                                                        : "bg-[#fff1f2] border-transparent text-red-500"    // أحمر للإجابة الخاطئة
                                                    }`}
                                            >
                                                <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center mr-3">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-current" />
                                                </div>
                                                <span className="text-gray-800 font-medium">
                                                    {item.selectedAnswer.text || "Unknown Answer"}
                                                    <span className="ml-2 text-sm opacity-80">
                                                        (Your Answer)
                                                    </span>
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center p-4 rounded-md border bg-gray-100 text-gray-500">
                                                <span className="font-medium">No answer selected</span>
                                            </div>
                                        )}

                                        {/* إذا كانت الإجابة خاطئة، نعرض له الإجابة الصحيحة تحتها */}
                                        {!item.isCorrect && item.correctAnswer && (
                                            <div className="flex items-center p-4 rounded-md border border-green-200 bg-[#ebfbf5] text-[#10b981]">
                                                <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center mr-3">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-current" />
                                                </div>
                                                <span className="text-gray-800 font-medium">
                                                    {item.correctAnswer.text || "Unknown Correct Answer"}
                                                    <span className="ml-2 text-sm text-[#10b981] opacity-80">
                                                        (Correct Answer)
                                                    </span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* أزرار التحكم السفلية */}
                <div className="flex gap-4 mt-6">
                    <Button
                        onClick={onRestart}
                        variant="secondary"
                        className="flex-1 py-6 text-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-sm"
                    >
                        <RotateCcw className="mr-2 w-5 h-5" /> Restart
                    </Button>
                    <Button
                        onClick={onExplore}
                        className="flex-1 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm"
                    >
                        <FolderSymlink className="mr-2 w-5 h-5" /> Explore
                    </Button>
                </div>
            </div>
        </div>
    );
}