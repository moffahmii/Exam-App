'use client'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageUploadField } from '@/features/upload-photo/components/upload-photo';
import { DiplomaField, DiplomaScheme } from '@/features/upload-photo/scheme/photo-scheme';
import { createDiploma } from '@/features/create-diploma/apis/add-diploma-api';
// استيراد الـ Server Action اللي عملناه في الخطوة اللي فاتت
// (تأكد من مسار الاستيراد حسب مكان الملف عندك)

export default function DiplomaForm() {
    const [isPending, startTransition] = useTransition();
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const form = useForm<DiplomaField>({
        resolver: zodResolver(DiplomaScheme),
        mode: 'onChange', // مهم عشان يراقب الداتا لايف ويقفل/يفتح الزرار
        defaultValues: {
            image: '', // هيتم تعبئته برابط الصورة من مكون الرفع
            title: '',
            description: ''
        }
    });

    const onSubmit = (data: DiplomaField) => {
        setNotification(null); // تصفير الإشعارات القديمة

        startTransition(async () => {
            try {
                const result = await createDiploma(data);

                if (result.success) {
                    setNotification({ type: 'success', message: result.message });
                    form.reset(); // تفريغ الفورم بالكامل بعد النجاح
                } else {
                    setNotification({ type: 'error', message: result.message });
                }
            } catch (error) {
                setNotification({ type: 'error', message: "حدث خطأ غير متوقع أثناء الحفظ" });
            }
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-slate-100 min-h-screen">
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white border border-slate-200 shadow-sm">

                {/* الهيدر الأزرق */}
                <div className="bg-[#1a56db] text-white font-medium px-4 py-3">
                    Diploma Information
                </div>

                <div className="p-6 space-y-6">
                    {/* عرض إشعارات النجاح أو الخطأ */}
                    {notification && (
                        <div className={`p-4 rounded border ${notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                            {notification.type === 'success' ? '✅ ' : '❌ '}
                            {notification.message}
                        </div>
                    )}

                    {/* 1. حقل رفع الصورة (المكون الذكي) */}
                    {/* تأكد إن ImageUploadField بياخد isPending لو عايز تعطل الرفع أثناء الـ Submit */}
                    <ImageUploadField control={form.control} name="image" label="Image" />

                    {/* 2. حقل العنوان */}
                    <div>
                        <label className="text-slate-800 mb-2 block font-medium">Title</label>
                        <input
                            {...form.register('title')}
                            disabled={isPending}
                            placeholder="Enter diploma title"
                            className={`w-full border p-2 h-11 outline-none transition-colors disabled:bg-slate-50 disabled:text-slate-500 ${form.formState.errors.title ? 'border-red-400' : 'border-slate-200 hover:border-blue-400 focus:border-blue-500'}`}
                        />
                        {form.formState.errors.title && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
                        )}
                    </div>

                    {/* 3. حقل الوصف */}
                    <div>
                        <label className="text-slate-800 mb-2 block font-medium">Description</label>
                        <textarea
                            {...form.register('description')}
                            rows={5}
                            disabled={isPending}
                            placeholder="Enter diploma description"
                            className={`w-full border p-2 outline-none transition-colors disabled:bg-slate-50 disabled:text-slate-500 ${form.formState.errors.description ? 'border-red-400' : 'border-slate-200 hover:border-blue-400 focus:border-blue-500'}`}
                        />
                        {form.formState.errors.description && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
                        )}
                    </div>
                </div>

                {/* زر حفظ الدبلومة بالكامل */}
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
                    <button
                        type="submit"
                        // الزرار مقفول لو بيحمل أو لو الفورم لسه مش Valid (يعني ناقص صورة أو عنوان الخ)
                        disabled={isPending || !form.formState.isValid}
                        className="bg-[#1a56db] text-white font-medium px-8 py-2 shadow hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[120px]"
                    >
                        {isPending ? 'جاري الحفظ...' : 'حفظ البيانات'}
                    </button>
                </div>
            </form>
        </div>
    )
}