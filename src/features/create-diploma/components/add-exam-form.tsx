'use client'
import React, { useState, useTransition, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageUploadField } from '@/features/upload-photo/components/upload-photo'
import { ExamField, ExamScheme } from '../scheme/exam-field'
import { createExam } from '../apis/add-exam-actions'

interface ExamFormProps {
    defaultDiplomaId: string;
    diplomas?: { id: string; title: string }[];
}

export default function ExamForm({ defaultDiplomaId, diplomas = [] }: ExamFormProps) {
    const [isPending, startTransition] = useTransition();
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const form = useForm<ExamField>({
        resolver: zodResolver(ExamScheme),
        mode: 'onChange',
        defaultValues: {
            title: '',
            diplomaId: defaultDiplomaId, // القيمة المبدئية
            image: '',
            description: '',
            duration: 0
        }
    });

    // 🔥 تحديث قيمة diplomaId فور وصولها والتأكد من صحة الفورم
    useEffect(() => {
        if (defaultDiplomaId) {
            form.setValue('diplomaId', defaultDiplomaId, { shouldValidate: true });
        }
    }, [defaultDiplomaId, form]);

    const onSubmit = (data: ExamField) => {
        setNotification(null);
        startTransition(async () => {
            try {
                const result = await createExam(data);
                if (result.success) {
                    setNotification({ type: 'success', message: result.message });
                } else {
                    setNotification({ type: 'error', message: result.message });
                }
            } catch (error) {
                setNotification({ type: 'error', message: "حدث خطأ غير متوقع" });
            }
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6 bg-slate-100 min-h-screen space-y-6">

            {/* إشعارات النجاح والخطأ */}
            {notification && (
                <div className={`p-4 rounded border transition-all ${notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                    {notification.type === 'success' ? '✅ ' : '❌ '} {notification.message}
                </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-sm">
                <div className="bg-[#1a56db] text-white font-medium px-4 py-3">
                    Exam Information
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* العمود الأول: البيانات الأساسية والصورة */}
                    <div className="space-y-6">
                        <div>
                            <label className="text-slate-700 mb-2 block font-medium">Title</label>
                            <input
                                {...form.register('title')}
                                disabled={isPending}
                                placeholder="Enter exam title"
                                className={`w-full border p-2 h-11 outline-none transition-all ${form.formState.errors.title ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                            />
                            {form.formState.errors.title && <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>}
                        </div>

                        <div>
                            <ImageUploadField control={form.control} name="image" label="Exam Image" />
                        </div>

                        <div>
                            <label className="text-slate-700 mb-2 block font-medium">Duration (minutes)</label>
                            <input
                                type="number"
                                {...form.register('duration')}
                                disabled={isPending}
                                placeholder="e.g. 60"
                                className={`w-full border p-2 h-11 outline-none transition-all ${form.formState.errors.duration ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                            />
                            {form.formState.errors.duration && <p className="text-red-500 text-xs mt-1">{form.formState.errors.duration.message}</p>}
                        </div>
                    </div>

                    {/* العمود الثاني: المعرف والوصف */}
                    <div className="space-y-6">
                        <div>
                            <label className="text-slate-700 mb-2 block font-medium">Diploma ID (Locked)</label>
                            <input
                                value={defaultDiplomaId || "Fetching ID..."}
                                disabled
                                className="w-full border p-2 h-11 bg-slate-50 text-slate-400 cursor-not-allowed outline-none border-slate-200 font-mono text-sm"
                            />
                            {/* حقل مخفي لضمان إرسال القيمة مع الـ Payload */}
                            <input type="hidden" {...form.register('diplomaId')} />
                        </div>

                        <div className="h-full flex flex-col">
                            <label className="text-slate-700 mb-2 block font-medium">Description</label>
                            <textarea
                                {...form.register('description')}
                                disabled={isPending}
                                placeholder="Provide a brief overview of the exam content..."
                                className={`w-full border p-2 flex-grow outline-none transition-all min-h-[160px] ${form.formState.errors.description ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                            />
                            {form.formState.errors.description && <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Footer مع زر الحفظ */}
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending || !form.formState.isValid}
                        className="bg-[#1a56db] text-white font-medium px-10 py-2.5 rounded-sm shadow-sm hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all min-w-[140px]"
                    >
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Saving...
                            </span>
                        ) : 'Save Exam Info'}
                    </button>
                </div>
            </form>

            {/* سيكشن الأسئلة (Disabled) */}
            <div className="bg-white border border-slate-200 shadow-sm opacity-60 pointer-events-none relative rounded-sm">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                    <span className="bg-slate-900 text-white px-5 py-2.5 rounded shadow-xl text-sm font-medium">
                        Step 2: Save general info to enable question management.
                    </span>
                </div>

                <div className="bg-[#1a56db] text-white font-medium px-4 py-3 flex justify-between items-center">
                    <span>Exam Questions</span>
                    <button className="text-sm font-semibold opacity-80">+ Add Questions</button>
                </div>
                <div className="p-4">
                    <div className="bg-slate-50 p-3 font-medium text-slate-400 text-sm border-b">Question Title</div>
                    <div className="divide-y border-x border-b">
                        <div className="p-4 text-sm italic text-slate-300 italic">No questions added yet.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}