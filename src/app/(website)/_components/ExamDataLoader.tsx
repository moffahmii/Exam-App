"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useExam } from "@/app/(website)/_hooks/use-exam";
import ExamForm from "./ExamForm";
import ExamSkeleton from "./ExamSkeleton";
export default function ExamDataLoader() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { questions, isLoading, error } = useExam(id);
    if (isLoading) {return ( <ExamSkeleton />);
    }
    if (error) {
        return (
            <div className="text-red-500 p-6 flex justify-center items-center h-screen font-mono">
                {error}
            </div>
        );
    }
    if (!questions || questions.length === 0) {
        return (
            <div className="text-gray-500 p-6 text-center font-mono mt-10">
                No questions found.
            </div>
        );
    }
    return <ExamForm examId={id ?? ""} questions={questions} />;
}