"use client";

import { useSearchParams } from "next/navigation";
import { useExam } from "../hooks/use-exam";
import { useDiplomaDetails } from "@/features/exams/hooks/use-diploma-exams";
import ExamSkeleton from "./ExamSkeleton";
import ExamForm from "./ExamForm";

/**
 * ExamDataLoader component handles fetching both exam questions and diploma details.
 * It synchronizes the loading states and passes the consolidated data to the ExamForm.
 */
export default function ExamDataLoader() {
    const searchParams = useSearchParams();

    // Extract IDs from URL parameters
    const examId = searchParams.get("id");
    const diplomaId = searchParams.get("diplomaId");

    // Fetch questions for the specific exam
    const {
        questions,
        isLoading: isLoadingQuestions,
        error: questionsError
    } = useExam(examId);

    // Fetch parent diploma details to get the exam title and duration
    const {
        data: diplomaDetails,
        isLoading: isLoadingExams,
        error: examsError
    } = useDiplomaDetails(diplomaId ?? "");

    // Show loading skeleton if either request is pending
    if (isLoadingQuestions || isLoadingExams) {
        return <ExamSkeleton />;
    }

    // Handle data fetching errors
    if (questionsError || examsError) {
        return (
            <div className="text-red-500 p-6 flex justify-center items-center min-h-[50vh]">
                <div className="bg-red-50 p-4 rounded-md border border-red-200 font-mono">
                    {questionsError || examsError?.message || "Failed to load data"}
                </div>
            </div>
        );
    }

    // Handle empty questions state
    if (!questions || questions.length === 0) {
        return (
            <div className="text-gray-500 p-6 flex justify-center items-center min-h-[50vh] font-mono">
                No questions found for this exam.
            </div>
        );
    }

    // Extract metadata for the specific exam from the diploma payload
    const diplomaName = diplomaDetails?.title || "Diploma Details";
    const currentExamDetails = diplomaDetails?.exams?.find(
        (exam) => String(exam.id) === String(examId)
    );

    const examDuration = currentExamDetails?.duration ?? 60;
    const examTitle = currentExamDetails?.title ?? "Subject";

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