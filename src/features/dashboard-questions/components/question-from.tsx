'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X as CloseIcon, Plus, Trash2, Check, Loader2 } from 'lucide-react';
import { Input } from "@/shared/components/ui/input";
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/features/dashboard-header/components/header-page';
import { useRouter } from 'next/navigation';
import { QuestionFormValues, QuestionSchema } from '../scheme/questions-scheme';

// TODO: استدعاء Hooks الإضافة والتعديل الخاصة بك
// import { useCreateQuestion } from '../hooks/use-create-question';
// import { useEditQuestion } from '../hooks/use-update-question';

interface QuestionFormProps {
    initialData?: QuestionFormValues;
    questionId?: string;
    defaultExamId?: string;
    examTitle?: string; // 👈 استقبلنا اسم الامتحان عشان نعرضه
}

export function QuestionForm({ initialData, questionId, defaultExamId, examTitle }: QuestionFormProps) {
    const router = useRouter();
    const isEditMode = !!questionId;

    // const createMutation = useCreateQuestion();
    // const editMutation = useEditQuestion(questionId!);

    const [newAnswerText, setNewAnswerText] = useState("");

    const form = useForm<QuestionFormValues>({
        resolver: zodResolver(QuestionSchema),
        mode: 'onChange',
        defaultValues: {
            examId: defaultExamId || '',
            text: '',
            answers: [],
        },
        values: initialData ? {
            examId: initialData.examId ?? '',
            text: initialData.text ?? '',
            answers: initialData.answers ?? [],
        } : undefined,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "answers",
    });

    // إضافة إجابة جديدة
    const handleAddAnswer = () => {
        if (!newAnswerText.trim()) return;
        append({ text: newAnswerText.trim(), isCorrect: false });
        setNewAnswerText("");
    };

    // تحديد إجابة واحدة صحيحة
    const handleMarkCorrect = (indexToMark: number) => {
        const currentAnswers = form.getValues("answers");
        const updatedAnswers = currentAnswers.map((ans, idx) => ({
            ...ans,
            isCorrect: idx === indexToMark
        }));
        form.setValue("answers", updatedAnswers, { shouldValidate: true });
    };

    const onSubmit = (data: QuestionFormValues) => {
        // تجهيز الـ Payload حسب طلبك
        const payload = {
            text: data.text,
            examId: data.examId,
            answers: data.answers.map((ans) => ({
                text: ans.text,
                isCorrect: ans.isCorrect,
                // بنبعت الـ ID بس لو كنا في وضع التعديل والإجابة دي كان ليها ID
                ...(isEditMode && ans.id ? { id: ans.id } : {})
            }))
        };

        console.log("🚀 SUBMIT PAYLOAD:", payload);

        // إرسال الداتا للـ API
        // if (isEditMode) {
        //     editMutation.mutate(payload);
        // } else {
        //     createMutation.mutate(payload);
        // }
    };

    // const isSubmitting = createMutation.isPending || editMutation.isPending;
    const isSubmitting = false;

    return (
        <div className="w-full min-h-screen bg-[#f8f9fa] pb-10">

            <PageHeader>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                        <Button onClick={()=> router.push(`/dashboard/quetions/add-bulk/${questionId}`)} type="button" variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-none">
                            <Plus size={16} className="mr-2" /> Bulk Add Mode
                        </Button>
                    </div>

                    <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            <CloseIcon size={18} className="mr-1" /> Cancel
                        </Button>

                        <Button
                            type="submit"
                            form="question-form"
                            disabled={isSubmitting}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-none"
                        >
                            {isSubmitting ? <Loader2 size={18} className="animate-spin mr-1" /> : <Save size={18} className="mr-1" />}
                            {isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            </PageHeader>

            <div className="max-w-5xl mx-auto p-6 space-y-6">

                {Object.keys(form.formState.errors).length > 0 && (
                    <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-sm text-sm font-medium">
                        يرجى التأكد من كتابة السؤال، وإضافة إجابتين على الأقل مع تحديد إجابة صحيحة.
                    </div>
                )}

                <form id="question-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* SECTION 1: QUESTION INFO */}
                    <div className="bg-white border shadow-sm">
                        <div className="bg-blue-600 text-white p-3 font-semibold text-sm tracking-wide">
                            Question Information
                        </div>

                        <div className="p-6 space-y-6">

                            {/* EXAM INFO (READ ONLY) */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Exam</label>

                                {/* الحقل المخفي عشان نبعت الـ examId صح */}
                                <input type="hidden" {...form.register("examId")} />

                                <div className="w-full p-2.5 border rounded-sm bg-gray-50 text-gray-500 text-sm cursor-not-allowed">
                                    {examTitle || "Loading exam details..."}
                                </div>
                            </div>

                            {/* QUESTION HEADLINE */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Question Headline</label>
                                <Input
                                    {...form.register("text")}
                                    placeholder="Enter question text here..."
                                    className="rounded-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: QUESTION ANSWERS */}
                    <div className="bg-white border shadow-sm">
                        <div className="bg-blue-600 text-white p-3 flex justify-between items-center text-sm font-semibold tracking-wide">
                            <span>Question Answers</span>
                        </div>

                        <div className="w-full">
                            <div className="grid grid-cols-[50px_1fr_150px] bg-gray-100/80 border-b text-sm font-medium text-gray-600">
                                <div></div>
                                <div className="p-3">Body</div>
                                <div className="p-2">
                                    <Button type="button" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-8 text-xs rounded-sm shadow-none" onClick={() => document.getElementById("new-answer-input")?.focus()}>
                                        <Plus size={14} className="mr-1" /> Add Answer
                                    </Button>
                                </div>
                            </div>

                            {fields.map((field, index) => {
                                const isCorrect = form.watch(`answers.${index}.isCorrect`);

                                return (
                                    <div key={field.id} className="grid grid-cols-[50px_1fr_150px] items-center border-b last:border-0 hover:bg-gray-50/50 transition-colors">

                                        <div className="p-3 text-center flex justify-center">
                                            <button type="button" onClick={() => remove(index)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="p-3 text-sm text-gray-800 font-medium">
                                            <input type="hidden" {...form.register(`answers.${index}.text`)} />
                                            {field.text}
                                        </div>

                                        <div className="p-3 flex justify-end">
                                            {isCorrect ? (
                                                <div className="flex items-center text-emerald-500 text-xs font-semibold mr-2">
                                                    <Check size={14} className="mr-1" /> Correct Answer
                                                </div>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={() => handleMarkCorrect(index)}
                                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 h-8 text-xs shadow-none rounded-sm px-3"
                                                >
                                                    <Check size={14} className="mr-1" /> Mark Correct
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* ADD NEW ANSWER ROW */}
                            <div className="grid grid-cols-[50px_1fr_100px] items-center bg-emerald-50/50 p-3 border-t">
                                <div></div>
                                <div className="pr-4">
                                    <Input
                                        id="new-answer-input"
                                        value={newAnswerText}
                                        onChange={(e) => setNewAnswerText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAnswer())}
                                        placeholder="Enter answer body"
                                        className="border-emerald-200 focus-visible:ring-emerald-500 bg-white"
                                    />
                                </div>
                                <div>
                                    <Button
                                        type="button"
                                        onClick={handleAddAnswer}
                                        disabled={!newAnswerText.trim()}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-none rounded-sm"
                                    >
                                        <Plus size={16} className="mr-1" /> Add
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}