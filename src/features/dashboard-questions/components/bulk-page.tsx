'use client';

import React, { useEffect, use, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Plus, X, Loader2, Save, FilePlus2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { PageHeader } from "@/shared/components/custom/header-page";

import { useExamDetails } from '@/features/dashboard-exams/hooks/use-exam-details';
import { useAddBulkQuestions } from '../hooks/use-add-bulk';
import QuestionFromBody from './form-body';
import { QuestionsBulkFormValue } from '@/shared/types/questions';
import { useQueryClient } from '@tanstack/react-query';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function BulkPage({ params }: PageProps) {
    const queryClient = useQueryClient()
    const router = useRouter();
    const resolvedParams = use(params);
    const examIdFromUrl = resolvedParams.id;

    // --- Hooks & State ---
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const { data: examData, isLoading: isLoadingExam } = useExamDetails(examIdFromUrl);
    const { mutate: addBulkQuestions, isPending } = useAddBulkQuestions();

    // --- Form Setup ---
    const form = useForm<QuestionsBulkFormValue>({
        defaultValues: {
            examId: examIdFromUrl,
            questions: [
                {
                    text: "",
                    answers: [{ text: "", isCorrect: false }]
                }
            ]
        }
    });

    const { fields: questions, append, remove } = useFieldArray({
        control: form.control,
        name: "questions"
    });

    // --- Effects ---
    useEffect(() => {
        if (examIdFromUrl) {
            form.setValue('examId', examIdFromUrl);
        }
    }, [examIdFromUrl, form]);

    // --- Handlers ---
    const onSubmit = (data: QuestionsBulkFormValue) => {
        if (!data.examId) {
            return;
        }

        const payload = {
            questions: data.questions.map(q => ({
                text: q.text,
                answers: q.answers.map(a => ({
                    text: a.text,
                    isCorrect: a.isCorrect
                }))
            }))
        };

        addBulkQuestions({ examId: data.examId, payload }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["exam-questions", data.examId] });
                queryClient.invalidateQueries({ queryKey: ["exam-details", data.examId] });
                router.push(`/dashboard/exams/${data.examId}`);
            },
        });
    };

    const handleRemoveQuestion = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        remove(index);

        if (activeQuestionIndex >= index && activeQuestionIndex > 0) {
            setActiveQuestionIndex((prev) => prev - 1);
        }
    };

    return (
        <div className="h-auto w-full min-h-screen pb-10">
            {/* ===== HEADER SECTION ===== */}
            <PageHeader
                breadcrumbs={[
                    { label: "Exams", href: "/dashboard/exams" },
                    { label: examData ? `Manage: ${examData.title || examData.name}` : "Bulk Add Questions" }
                ]}
            >
                <div className="flex justify-between items-center w-full">
                    {/* Left: Badge */}
                    <div className="flex items-center">
                        <div className="bg-blue-600 text-white px-4 py-2 flex items-center text-sm font-medium">
                            <FilePlus2 size={18} className="mr-2" />
                            Bulk Add Mode
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            className="h-10 px-4 text-gray-800 bg-gray-200 font-medium"
                        >
                            <X size={16} className="mr-2" />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            form="bulk-add-form"
                            disabled={isPending || !examIdFromUrl}
                            className="h-10 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
                        >
                            {isPending ? <Loader2 size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            </PageHeader>

            {/* ===== BODY SECTION ===== */}
            <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
                <FormProvider {...form}>
                    <form id="bulk-add-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-6">

                        {/* ===== Exam Info Section ===== */}
                        <div className="flex flex-col bg-background overflow-hidden border border-gray-200 shadow-sm rounded-none">
                            <div className="bg-blue-600 text-white px-4 py-2 font-semibold text-sm tracking-widest uppercase">
                                Exam Info
                            </div>
                            <div className="p-6 flex flex-col gap-2 bg-white">
                                <Label className="text-gray-400 font-bold text-sm">
                                    Exam
                                </Label>
                                <div className="relative">
                                    <Input
                                        readOnly
                                        disabled
                                        value={
                                            isLoadingExam
                                                ? "Loading exam details..."
                                                : examData?.title
                                        }
                                        className="w-full bg-[#F8F9FA] text-gray-500 cursor-not-allowed border-gray-200 rounded-none h-11"
                                    />
                                    {isLoadingExam && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <Loader2 className="animate-spin text-blue-600" size={16} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ===== Questions Section ===== */}
                        <div className="flex flex-col overflow-hidden border border-gray-200 shadow-sm rounded-none bg-white">
                            <div className="bg-blue-600 text-white px-4 py-2 font-semibold text-sm tracking-widest ">
                                Questions
                            </div>

                            {/* Tabs */}
                            <div className="flex items-end overflow-x-auto bg-gray-50 w-full scrollbar-thin border-b border-gray-200">
                                {questions.map((q, index) => {
                                    const isActive = activeQuestionIndex === index;
                                    return (
                                        <div
                                            key={q.id}
                                            onClick={() => setActiveQuestionIndex(index)}
                                            className={`relative h-11 flex items-center justify-center shrink-0 w-32 cursor-pointer transition-colors ${isActive
                                                ? "bg-white border-x border-t border-blue-600 text-blue-600 z-10 translate-y-px font-bold"
                                                : "border-l border-transparent text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            <span className="text-sm">Q{index + 1}</span>

                                            {questions.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveQuestion(e, index);
                                                    }}
                                                    className="absolute right-1 h-6 w-6 text-red-400 hover:text-red-600 hover:bg-red-100/50 rounded-sm"
                                                >
                                                    <X size={14} />
                                                </Button>
                                            )}
                                        </div>
                                    );
                                })}

                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="rounded-none h-11 w-12 border-l border-gray-200 bg-gray-100 hover:bg-gray-200 shrink-0 text-gray-600"
                                    onClick={() => {
                                        append({
                                            text: "",
                                            answers: [{ text: "", isCorrect: false }]
                                        });
                                        setActiveQuestionIndex(questions.length);
                                    }}
                                >
                                    <Plus size={18} />
                                </Button>

                                {/* Separator */}
                                <div className="flex-1 h-11 border-b border-gray-200"></div>
                            </div>

                            {/* Active Question Body */}
                            <div className="p-6 bg-white border border-blue-600">
                                {questions.length > 0 ? (
                                    <QuestionFromBody
                                        key={activeQuestionIndex} // لإجبار الرياكت على إعادة التحديث لو اندكس السؤال اتغير
                                        ActiveQuestionIndex={activeQuestionIndex}
                                    />
                                ) : (
                                    <p className="text-gray-400 text-center py-10">No questions added yet. Click the + button to add one.</p>
                                )}
                            </div>
                        </div>

                    </form>
                </FormProvider>
            </div>
        </div>
    );
}