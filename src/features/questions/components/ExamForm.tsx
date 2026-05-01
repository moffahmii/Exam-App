"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CircleHelp } from "lucide-react";

import CircularTimer from "./CircularTimer";
import { ExamNavigation } from "./ExamNavigation";
import { ExamProgress } from "./ExamProgress";
import { AnswersList } from "./ExamAnswersList";
import { useSubmitExam } from "../hooks/use-submit-exam";
import { AnswersForm, ExamFormProps } from "@/shared/types/exam-quetions-site";
import { WebsiteHeader } from "@/shared/components/custom/website-header";

/**
 * ExamForm Component
 * Manages the multi-step exam process, including question navigation,
 * timer integration, and final submission.
 */
export default function ExamForm({
    examId,
    questions,
    duration,
    examTitle,
    diplomaName,
    diplomaId
}: ExamFormProps) {
    const { sendSubmission, isSubmitting, error: submitError } = useSubmitExam();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Initialize form with default values for tracking answers and start time
    const { handleSubmit, watch, control } = useForm<AnswersForm>({
        defaultValues: {
            examId,
            startedAt: new Date().toISOString(),
            answers: questions.map((q) => ({ questionId: q.id, answerId: "" })),
        },
    });

    const currentAnswers = watch("answers");
    const currentQuestion = questions[currentIndex];
    const currentAnswerId = currentAnswers[currentIndex]?.answerId;
    const isCurrentAnswered = !!currentAnswerId;

    const onSubmit = (data: AnswersForm) => {
        sendSubmission(data.examId, data.answers);
    };

    const breadcrumbsData = [
        { label: "Diplomas", href: "/diplomas" },
        { label: diplomaName || "Diploma Details", href: `/diplomas/${diplomaId}` },
        { label: `${examTitle || "Subject"} Exam` }
    ];

    const HeaderIcon = (
        <CircleHelp size={45} className="text-white" strokeWidth={2} />
    );

    return (
        <div className="w-full min-h-screen">
            <WebsiteHeader
                title={`${examTitle || "Exam"} Questions`}
                icon={HeaderIcon}
                breadcrumbs={breadcrumbsData}
            />

            <div className="max-w-7xl mx-auto px-6 space-y-6">
                <div className="bg-white h-auto p-4">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">

                            {/* Header: Progress tracking and countdown timer */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex-1 mr-8">
                                    <ExamProgress
                                        currentIndex={currentIndex}
                                        total={questions.length}
                                        examTitle={examTitle}
                                        diplomaName={diplomaName}
                                    />
                                </div>
                                <div className="pl-6 border-l border-gray-200">
                                    <CircularTimer
                                        initialMinutes={duration}
                                        onTimeUp={handleSubmit(onSubmit)}
                                    />
                                </div>
                            </div>

                            {/* Form Content: Displays current question and navigation controls */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold text-blue-600 leading-relaxed">
                                        {currentQuestion.text}
                                    </h2>

                                    <AnswersList
                                        key={currentQuestion.id}
                                        answers={currentQuestion.answers}
                                        control={control}
                                        name={`answers.${currentIndex}.answerId`}
                                    />

                                    <ExamNavigation
                                        currentIndex={currentIndex}
                                        total={questions.length}
                                        canNext={isCurrentAnswered}
                                        isSubmitting={isSubmitting}
                                        onPrev={() => setCurrentIndex((p) => p - 1)}
                                        onNext={() => setCurrentIndex((p) => p + 1)}
                                    />

                                    {submitError && (
                                        <div className="text-red-500 text-center mt-6 bg-red-50 p-3 rounded-md border border-red-100 font-mono">
                                            {submitError}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}