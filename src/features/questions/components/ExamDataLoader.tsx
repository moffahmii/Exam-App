"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useExam } from "../hooks/use-exam";
import ExamSkeleton from "./ExamSkeleton";
import ExamForm from "./ExamForm";

export default function ExamDataLoader() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { questions, isLoading, error } = useExam(id);

    if (isLoading) {
        return <ExamSkeleton />;
    }

    if (error) {
        return (
            <div className="text-red-500 p-6 flex justify-center items-center min-h-[50vh] font-mono">
                <div className="bg-red-50 p-4 rounded-md border border-red-200">
                    {error}
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

    return <ExamForm examId={id ?? ""} questions={questions} />;
}