"use client";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSubmitExam } from "@/app/(website)/_hooks/use-submit-exam";
import { IAnswer, IQuestion } from "@/lib/types/questions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CircularTimer from "./CircularTimer";

interface AnswersForm {
    examId: string;
    answers: {
        questionId: string;
        answerId: string;
    }[];
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
            answers: questions.map((q) => ({
                questionId: q.id,
                answerId: "",
            })),
        },
    });

    const { control, handleSubmit } = form;
    const { fields, update } = useFieldArray({
        control,
        name: "answers",
    });

    const currentQuestion = questions[currentIndex];
    const currentAnswers = currentQuestion.answers;
    const isCurrentAnswered = !!fields[currentIndex]?.answerId;

    const handleSelect = (answerId: string) => {
        update(currentIndex, {
            questionId: currentQuestion.id,
            answerId,
        });
    };

    const onSubmit = (data: AnswersForm) => {
        const hasEmpty = data.answers.some((a) => !a.answerId);
        if (hasEmpty) return;

        sendSubmission(data.examId, data.answers);
    };

    return (
        <div className="bg-white font-mono min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    {/* Progress Section */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">

                        {/* الجزء الأيسر (معلومات السؤال وشريط التقدم) */}
                        <div className="flex-1 mr-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-800 text-lg font-bold">Frontend Development - CSS Quiz</span>
                                <p className="text-sm font-bold text-gray-500">
                                    Question <span className="text-blue-600">{currentIndex + 1}</span> of {questions.length}
                                </p>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-300"
                                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* الجزء الأيمن (التايمر الدائري) */}
                        <div className="pl-6 border-l border-gray-200">
                            <CircularTimer
                                initialMinutes={25}
                                onTimeUp={() => {
                                    // هنا تقدر تنادي على الفانكشن بتاعت تسليم الامتحان فوراً
                                    // handleSubmit(onSubmit)();
                                    alert("Time is up! Submitting exam...");
                                }}
                            />
                        </div>
                    </div>
                    {/* Form Section */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6 text-blue-600">
                                {currentQuestion.text}
                            </h2>

                            <div className="space-y-4">
                                {currentAnswers.map((answer: IAnswer) => {
                                    const isSelected = fields[currentIndex]?.answerId === answer.id;

                                    return (
                                        <label
                                            key={answer.id}
                                            className={`flex items-center p-4 cursor-pointer border rounded-lg transition-all ${isSelected
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                className="mr-3 w-4 h-4 text-blue-600"
                                                checked={isSelected}
                                                onChange={() => handleSelect(answer.id)}
                                            />
                                            <span className="text-gray-800">{answer.text}</span>
                                        </label>
                                    );
                                })}
                            </div>

                            {/* Navigation Controls */}
                            <div className="flex justify-between items-center mt-10 border-t pt-6 gap-6">
                                <button
                                    type="button"
                                    onClick={() => setCurrentIndex((p) => p - 1)}
                                    disabled={currentIndex === 0}
                                    className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-200 text-gray-600 font-bold disabled:opacity-40 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronLeft className="mr-2 w-5 h-5" /> Previous
                                </button>

                                {currentIndex < questions.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentIndex((p) => p + 1)}
                                        disabled={!isCurrentAnswered}
                                        className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
                                    >
                                        Next <ChevronRight className="ml-2 w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !isCurrentAnswered}
                                        className="flex-1 px-6 py-3 bg-green-600 text-white font-bold disabled:bg-gray-400 hover:bg-green-700 transition-colors"
                                    >
                                        {isSubmitting ? "Submitting..." : "Finish Exam"}
                                    </button>
                                )}
                            </div>

                            {submitError && (
                                <p className="text-red-500 text-center mt-4 bg-red-50 p-3 rounded-md">
                                    {submitError}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}