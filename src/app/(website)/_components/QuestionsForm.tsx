// src/app/diplomas/exam/questions/_components/QuestionsForm.tsx
"use client";
import { IQuestion } from "@/lib/types/questions";
import React, { useState } from "react";

interface Props {
    questions: IQuestion[];
    examId: string;
    diplomaId: string;
}

export default function QuestionsForm({ questions = [], examId, diplomaId }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ questionId: string; answerId: string }[]>([]);

    // 1. أهم سطر لمنع الـ Runtime Error:
    // نتحقق إن المصفوفة موجودة وفيها عناصر قبل ما نحاول نوصل لـ [currentIndex]
    if (!questions || questions.length === 0) {
        return null; // أو رسالة تحميل خفيفة
    }

    const currentQuestion = questions[currentIndex];

    // 2. تأكد إن السؤال الحالي نفسه موجود وله إجابات
    if (!currentQuestion) {
        return null;
    }

    // باقي الكود (handleNext, handleBack, JSX...) يكتب هنا بأمان
    return (
        <div className="max-w-3xl mx-auto font-mono">
            <h2 className="text-xl font-bold">{currentQuestion.text}</h2>
            {/* ... باقي التصميم ... */}
        </div>
    );
}