// src/shared/components/custom/ImageUploadField.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { Controller, Control } from 'react-hook-form'
import { Field, FieldLabel } from '@/shared/components/ui/field'
import useUploadImage from '@/features/upload-photo/hooks/use-upload-images' 

interface ImageUploadFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
}

export function ImageUploadField({ name, control, label = "Image" }: ImageUploadFieldProps) {
    const { mutate, isPending, uploadProgress, isSuccess, reset } = useUploadImage()
    const [localFile, setLocalFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    useEffect(() => {
        if (localFile) {
            const objectUrl = URL.createObjectURL(localFile)
            setPreviewUrl(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        } else {
            setPreviewUrl(null)
        }
    }, [localFile])

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024, sizes = ['Bytes', 'KB', 'MB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange }, fieldState }) => {

                const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setLocalFile(file);
                        // مجرد ما يختار الملف، نرفعه فوراً
                        mutate({ image: file }, {
                            onSuccess: (uploadedUrl) => {
                                // 🔥 السحر هنا: بنحفظ الرابط اللي رجع في الـ State بتاعة الفورم الأب
                                onChange(uploadedUrl);
                                setTimeout(() => reset(), 3000);
                            },
                            onError: () => {
                                setLocalFile(null);
                                onChange(''); // نفضي القيمة لو حصل خطأ
                            }
                        });
                    }
                };

                const handleRemoveFile = (e: React.MouseEvent) => {
                    e.preventDefault();
                    setLocalFile(null);
                    onChange(''); // مسح الرابط من الفورم الأب
                    reset();
                };

                return (
                    <Field data-invalid={fieldState.invalid} className="w-full">
                        <FieldLabel className="text-slate-800 mb-2 block font-medium">
                            {label}
                        </FieldLabel>

                        <div className={`relative w-full min-h-[96px] flex items-center px-4 border bg-white overflow-hidden transition-colors ${fieldState.invalid ? 'border-red-400' : 'border-slate-200 hover:border-blue-400'}`}>

                            {!localFile && (
                                <input
                                    type='file'
                                    disabled={isPending}
                                    accept="image/jpeg, image/png, image/webp"
                                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed'
                                    onChange={handleFileSelect}
                                />
                            )}

                            {localFile ? (
                                <div className="flex w-full items-center justify-between z-20 py-3">
                                    <div className="flex items-center gap-4">
                                        {previewUrl && <img src={previewUrl} alt="Preview" className="w-16 h-16 object-cover rounded shadow-sm border border-slate-100" />}
                                        <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">{localFile.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs text-slate-400 font-medium">{formatFileSize(localFile.size)}</span>
                                        <button type="button" onClick={handleRemoveFile} className="text-red-400 hover:text-red-600 transition-colors z-30">
                                            {/* أيقونة الحذف */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex w-full items-center justify-between pointer-events-none py-6">
                                    <div className="text-slate-200">
                                        {/* أيقونة الملف */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><circle cx="10" cy="13" r="2" /><path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" /></svg>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        {/* أيقونة السحابة */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 16 4-4 4 4" /></svg>
                                        <span>Drop an image here or <span className="text-blue-600 font-medium">select from your computer</span></span>
                                    </div>
                                    <div className="w-9"></div>
                                </div>
                            )}

                            {isPending && (
                                <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full z-20">
                                    <div className="h-full bg-blue-600 transition-all duration-300 ease-out" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                            )}
                        </div>

                        <div className="min-h-[24px] mt-1">
                            {isSuccess && !fieldState.error && <p className="text-green-600 text-sm font-medium">✅ تم رفع الصورة بنجاح</p>}
                            {fieldState.error && <p className="text-red-500 text-sm font-medium">{fieldState.error.message}</p>}
                        </div>
                    </Field>
                )
            }}
        />
    )
}