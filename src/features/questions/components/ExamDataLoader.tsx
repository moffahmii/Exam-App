"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useExam } from "../hooks/use-exam";
import { useDiplomaExams } from "@/features/exams/hooks/use-diploma-exams";
import ExamSkeleton from "./ExamSkeleton";
import ExamForm from "./ExamForm";

export default function ExamDataLoader() {
    const searchParams = useSearchParams();

    const examId = searchParams.get("id");
    const diplomaId = searchParams.get("diplomaId");

    // 💡 بنجيب اسم الدبلومة من الرابط
    const diplomaName = searchParams.get("diplomaName") || "Diploma Details";

    const { questions, isLoading: isLoadingQuestions, error: questionsError } = useExam(examId);
    const { data: exams, isLoading: isLoadingExams, error: examsError } = useDiplomaExams(diplomaId ?? "");

    if (isLoadingQuestions || isLoadingExams) {
        return <ExamSkeleton />;
    }

    if (questionsError || examsError) {
        return (
            <div className="text-red-500 p-6 flex justify-center items-center min-h-[50vh] font-mono">
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                    {questionsError || examsError?.message || "Failed to load data"}
                </div>
            </div>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <div className="text-gray-500 p-6 flex justify-center items-center min-h-[50vh] font-mono">
                No questions found for this exam.
            </div>
        );
    }

    const currentExamDetails = exams?.find((exam) => String(exam.id) === String(examId));

    // 💡 الأسماء والوقت الديناميك
    const examDuration = currentExamDetails?.duration ?? 60;
    const examTitle = currentExamDetails?.title ?? "Subject";

    // بنرجع الـ ExamForm بس زي ما أنت كنت عامل، مع الـ props الجديدة
    return (
        <ExamForm
            examId={examId ?? ""}
            questions={questions}
            duration={examDuration}
            examTitle={examTitle}
            diplomaName={diplomaName}
        />
    );
}