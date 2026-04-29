'use client';
import React, { useEffect, use } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Plus, X, Loader2, Save, FilePlus2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input'; // استيراد Input الخاص بـ Shadcn
import { PageHeader } from "@/shared/components/custom/header-page";
import { QuestionsBulkFormValue } from '@/features/dashboard-questions/types/question';
import { useExamDetails } from '@/features/dashboard-exams/hooks/use-exam-details';
import { Label } from '@/shared/components/ui/label';
import { useAddBulkQuestions } from '../hooks/use-add-bulk';
import QuestionFromBody from './form-body';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function BulkPage({ params }: PageProps) {
    const router = useRouter();
    const resolvedParams = use(params);
    const examIdFromUrl = resolvedParams.id;

    const { data: examData, isLoading: isLoadingExam } = useExamDetails(examIdFromUrl);

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

    const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0);
    const { mutate: addBulkQuestions, isPending } = useAddBulkQuestions();

    useEffect(() => {
        if (examIdFromUrl) {
            form.setValue('examId', examIdFromUrl);
        }
    }, [examIdFromUrl, form]);

    const onSubmit = (data: QuestionsBulkFormValue) => {
        if (!data.examId) {
            alert("Exam ID is missing.");
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
                alert("Questions added successfully!");
                router.push(`/dashboard/exams/${data.examId}`);
            },
            onError: (error) => {
                alert(error.message);
            }
        });
    };

    const handleRemoveQuestion = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        remove(index);
        if (activeQuestionIndex >= index && activeQuestionIndex > 0) {
            setActiveQuestionIndex(activeQuestionIndex - 1);
        }
    };

    return (
        <div className="h-auto  min-h-screen pb-10">
            {/* ===== HEADER SECTION ===== */}
            <PageHeader>
                <div className="flex justify-between items-center w-full">
                    {/* Left: Badge */}
                    <div className="flex items-center">
                        <div className="bg-blue-600 text-white px-4 py-2 flex items-center text-sm font-medium ">
                            <FilePlus2 size={18} />
                            Bulk Add Mode
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            className="h-10 px-4 text-gray-800 bg-gray-200 font-medium "
                        >
                            <X size={16} />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            form="bulk-add-form"
                            disabled={isPending || !examIdFromUrl}
                            className="h-10 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
                        >
                            {isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
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
                        <div className="flex flex-col bg-background overflow-hidden">
                            <div className="bg-blue-600 text-white px-4 py-2 font-semibold text-sm">
                                Exam Info
                            </div>
                            <div className="p-4 flex flex-col gap-2 bg-background">
                                <Label className="text-gray-800 text-base font-medium tracking-wide">
                                    Exam
                                </Label>
                                <div className="relative">
                                    <Input
                                        readOnly
                                        disabled
                                        value={
                                            isLoadingExam
                                                ? "Loading exam details..."
                                                : examData?.title || examData?.name || "No Exam Selected"
                                        }
                                        className="w-full bg-muted/50 text-gray-800 cursor-not-allowed border-border shadow-none"
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
                        <div className="flex flex-col overflow-hidden">
                            <div className="bg-blue-600 text-white px-4 py-2 font-semibold text-base">
                                Questions
                            </div>

                            {/* Tabs */}
                            <div className="flex items-end overflow-x-auto bg-white w-full scrollbar-thin">
                                {questions.map((q, index) => {
                                    const isActive = activeQuestionIndex === index;
                                    return (
                                        <div
                                            key={q.id}
                                            onClick={() => setActiveQuestionIndex(index)}
                                            className={`relative h-10 flex items-center justify-center shrink-0 w-32 cursor-pointer transition-colors ${isActive
                                                ? " bg-blue-50 border-l border-blue-600 text-blue-600 z-10 translate-y-px"
                                                : "border-l border-gray-200 text-black"
                                                }`}
                                        >
                                            <span className="text-sm font-medium">Q{index + 1}</span>

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
                                    className="rounded-none h-10 w-12 border-r border-t border-border bg-gray-600  shrink-0"
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

                                <div className="flex-1 border-b border-blue-600 h-10"></div>
                            </div>

                            {/* Active Question Body */}
                            <div className="p-6 bg-background border border-blue-600">
                                {questions.length > 0 ? (
                                    <QuestionFromBody
                                        key={activeQuestionIndex}
                                        ActiveQuestionIndex={activeQuestionIndex}
                                    />
                                ) : (
                                    <p className="text-muted-foreground text-center py-10">No questions added yet.</p>
                                )}
                            </div>
                        </div>

                    </form>
                </FormProvider>
            </div>
        </div>
    );
}