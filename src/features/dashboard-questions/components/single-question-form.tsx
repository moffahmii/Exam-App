'use client';

import React, { use, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { X, Save, Loader2, LayoutGrid, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { PageHeader } from "@/shared/components/custom/header-page";

import { useExamDetails } from '@/features/dashboard-exams/hooks/use-exam-details';
import { useQuestionDetails } from '../hooks/use-question-details';

import QuestionsAnswers from './questions-answers';
import { useUpsertQuestion } from '../hooks/use-edit-question';
import { SingleQuestionFormValue, IAnswer } from '@/shared/types/questions';

interface PageProps {
    params: Promise<{ id: string; questionId?: string }>;
}

export default function QuestionFormPage({ params }: PageProps) {
    const router = useRouter();
    const { id: examId, questionId } = use(params);
    const isEditMode = !!questionId;

    const { data: examData, isLoading: isLoadingExam } = useExamDetails(examId);
    const { data: questionData, isLoading: isLoadingQuestion } = useQuestionDetails(questionId!);
    const { mutate: upsertQuestion, isPending } = useUpsertQuestion(isEditMode);

    const form = useForm<SingleQuestionFormValue>({
        defaultValues: {
            examId: examId,
            text: "",
            answers: []
        }
    });

    // تعبئة البيانات (Reset) عند الدخول في مود التعديل
    useEffect(() => {
        if (isEditMode && questionData?.status && questionData.payload) {
            form.reset({
                examId: examId,
                text: questionData.payload.text,
                // تم تحديد نوع (a: IAnswer) لحل مشكلة الـ Implicit Any
                answers: questionData.payload.answers.map((a: IAnswer) => ({
                    text: a.text,
                    isCorrect: a.isCorrect
                }))
            });
        }
    }, [questionData, isEditMode, form, examId]);

    const onSubmit = (data: SingleQuestionFormValue) => {
        upsertQuestion({
            id: questionId,
            payload: data
        }, {
            onSuccess: (res) => {
                if (res.status) {
                    router.push(`/dashboard/exams/${examId}`);
                }
            }
        });
    };

    if (isEditMode && isLoadingQuestion) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#F8F9FA]">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-10 bg-[#F8F9FA]">
            <PageHeader breadcrumbs={[
                { label: "Exams", href: "/dashboard/exams" },
                { label: isEditMode ? "Edit Question" : "Create New Question" }
            ]}>
                <div className="flex justify-between items-center w-full">
                    {!isEditMode ? (
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => router.push(`/dashboard/questions/add-bulk/${examId}`)}
                            className="bg-white border-gray-200 text-gray-700 shadow-sm rounded-none h-10"
                        >
                            <LayoutGrid size={18} className="mr-2" />
                            Bulk Add Mode
                        </Button>
                    ) : (
                        <div className="flex items-center text-blue-600 font-bold text-sm bg-blue-50 px-3 py-2 border border-blue-100">
                            <RotateCcw size={16} className="mr-2" />
                            EDIT MODE
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => router.back()}
                            className="bg-gray-100 border-none h-10 px-6 rounded-none text-gray-600"
                        >
                            <X size={16} className="mr-2" /> Cancel
                        </Button>
<Button
    type="button" // خليه button عشان إحنا بننادي handleSubmit يدوياً في الـ onClick
    onClick={(e) => {
        e.preventDefault();
        form.handleSubmit(onSubmit)();
    }}
    disabled={isPending}
    className="bg-[#10B981] ..."
>
    {isPending ? <Loader2 className="animate-spin" /> : <Save />}
    Save
</Button>
                    </div>
                </div>
            </PageHeader>

            <div className="max-w-7xl mx-auto p-6 flex flex-col gap-8">
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Section 1: Question Info */}
                        <div className="border border-gray-200 rounded-none overflow-hidden shadow-sm bg-white">
                            <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-sm uppercase tracking-widest">
                                Question Information
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-gray-400 font-bold uppercase text-[11px] tracking-[0.1em]">Exam</Label>
                                    <Input
                                        readOnly disabled
                                        value={isLoadingExam ? "Loading..." : examData?.title || "No Exam Title"}
                                        className="bg-[#F8F9FA] border-gray-200 text-gray-500 rounded-none h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-400 font-bold uppercase text-[11px] tracking-[0.1em]">Question Headline</Label>
                                    <Input
                                        {...form.register("text", { required: true })}
                                        placeholder="Enter question headline..."
                                        className="border-gray-200 focus:border-blue-500 rounded-none h-12"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Question Answers */}
                        <div className="border border-gray-200 rounded-none overflow-hidden shadow-sm bg-white">
                            <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-sm uppercase tracking-widest">
                                Question Answers
                            </div>
                            <QuestionsAnswers isSingleMode={true} />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}