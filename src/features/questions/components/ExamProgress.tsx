import React from "react";

interface ExamProgressProps {
    currentIndex: number;
    total: number;
    diplomaName?: string;
    examTitle?: string;
}

export function ExamProgress({ currentIndex, total, diplomaName, examTitle }: ExamProgressProps) {
    // تجهيز النص، لو الأسماء مبعوتة هيعرضهم، لو لأ هيعرض "Quiz Session" كقيمة افتراضية
    const progressTitle = diplomaName && examTitle
        ? `${diplomaName} - ${examTitle} Quiz`
        : "Quiz Session";

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2 text-gray-800">
                <span className="text-base font-normal text-gray-800">
                    {progressTitle}
                </span>
                <p className="text-sm font-bold text-gray-500">
                    Question <span className="text-blue-600">{currentIndex + 1}</span> of {total}
                </p>
            </div>
            <div className="w-full h-4 bg-gray-100 overflow-hidden">
                <div
                    className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                    style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                />
            </div>
        </div>
    );
}