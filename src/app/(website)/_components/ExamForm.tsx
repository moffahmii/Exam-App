"use client";

import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IQuestion } from "@/lib/types/questions";
import CircularTimer from "./CircularTimer";
import { ExamNavigation } from "./ExamNavigation";
import { ExamProgress } from "./ExamProgress";
import { useSubmitExam } from "../_hooks/use-submit-exam";
import { AnswersList } from "./ExamAnswersList";

interface AnswersForm {
    examId: string;
    answers: { questionId: string; answerId: string; }[];
    startedAt: string;
}

interface ExamFormProps {
    examId: string;
    questions: IQuestion[];
}

export default function ExamForm({ examId, questions }: ExamFormProps) {
    const { sendSubmission, isSubmitting, error: submitError } = useSubmitExam();
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const form = useForm<AnswersForm>({
        defaultValues: {
            examId,
            startedAt: new Date().toISOString(),
            answers: questions.map((q) => ({ questionId: q.id, answerId: "" })),
        },
    });

    const { control, handleSubmit } = form;
    const { fields, update } = useFieldArray({ control, name: "answers" });

    const currentQuestion = questions[currentIndex];
    const isCurrentAnswered = !!fields[currentIndex]?.answerId;

    const onSubmit = (data: AnswersForm) => {
        if (data.answers.some((a) => !a.answerId)) return;
        sendSubmission(data.examId, data.answers);
    };

    return (
        <div className="bg-white font-mono h-auto p-6">

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    {/* Header: Progress Bar & Timer */}
                    <div className=" flex justify-between items-center">
                        <div className="flex-1 mr-8">
                            <ExamProgress currentIndex={currentIndex} total={questions.length} />
                        </div>
                        <div className="pl-6 border-l border-gray-200">
                            <CircularTimer
                                initialMinutes={25}
                                onTimeUp={handleSubmit(onSubmit)}
                            />
                        </div>
                    </div>

                    {/* Form: Question, Answers & Navigation */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div >
                            <h2 className="text-2xl font-semibold mb-6 text-blue-600 leading-relaxed">
                                {currentQuestion.text}
                            </h2>
                            
                            <AnswersList 
                                answers={currentQuestion.answers}
                                selected={fields[currentIndex]?.answerId}
                                onSelect={(answerId) => update(currentIndex, { questionId: currentQuestion.id, answerId })}
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
                                <p className="text-red-500 text-center mt-6 bg-red-50 p-3 rounded-md border border-red-100">
                                    {submitError}
                                </p>
                            )}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}