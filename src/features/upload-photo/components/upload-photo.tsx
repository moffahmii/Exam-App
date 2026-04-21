'use client'

import React, { useEffect, useState } from 'react'
import { Controller, Control } from 'react-hook-form'
import { FileText, CloudUpload, Trash2, Download } from 'lucide-react'

import { Field, FieldLabel } from '@/shared/components/ui/field'
import useUploadImage from '@/features/upload-photo/hooks/use-upload-images'

interface ImageUploadFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
}

export function ImageUploadField({
    name,
    control,
    label = "Image"
}: ImageUploadFieldProps) {

    const {
        mutate,
        isPending,
        uploadProgress,
        isSuccess,
        reset
    } = useUploadImage()

    const [localFile, setLocalFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    useEffect(() => {
        if (!localFile) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(localFile);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [localFile]);

    const formatFileSize = (bytes?: number) => {
        if (!bytes || bytes <= 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.min(
            Math.floor(Math.log(bytes) / Math.log(k)),
            sizes.length - 1
        );
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState }) => {

                // 🧠 source of truth fix (edit + create)
                const imageSrc = previewUrl || value;

                const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setLocalFile(file);

                    mutate(
                        { image: file },
                        {
                            onSuccess: (uploadedUrl: string) => {
                                onChange(uploadedUrl); // RHF value
                                reset();
                            },
                            onError: () => {
                                setLocalFile(null);
                                onChange('');
                            }
                        }
                    );
                };

                const handleRemove = (e: React.MouseEvent) => {
                    e.preventDefault();
                    setLocalFile(null);
                    setPreviewUrl(null);
                    onChange('');
                    reset();
                };

                const handleDownload = (e: React.MouseEvent) => {
                    e.preventDefault();
                    if (!imageSrc) return;

                    const link = document.createElement('a');
                    link.href = imageSrc;
                    link.download = 'image';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };

                return (
                    <Field data-invalid={fieldState.invalid} className="w-full mb-2">

                        {label && (
                            <FieldLabel className="text-gray-800 block font-medium text-base">
                                {label}
                            </FieldLabel>
                        )}

                        <div className="w-full h-22">

                            {/* EMPTY STATE */}
                            {!imageSrc ? (
                                <div className={`
                                    relative w-full border bg-white overflow-hidden
                                    ${fieldState.invalid ? 'border-red-400' : 'border-gray-200 hover:border-blue-400'}
                                `}>
                                    <input
                                        type='file'
                                        disabled={isPending}
                                        accept="image/jpeg, image/png, image/webp"
                                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed'
                                        onChange={handleFileSelect}
                                    />

                                    <div className="flex w-full items-center justify-between py-6 px-6 pointer-events-none">

                                        <div className="text-gray-200">
                                            <FileText size={48} strokeWidth={1} />
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <CloudUpload size={20} />
                                            <span>
                                                Drop an image here or{' '}
                                                <span className="text-blue-500 font-medium">
                                                    select from your computer
                                                </span>
                                            </span>
                                        </div>

                                        <div className="w-12"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className={`
                                    relative w-full border bg-white flex items-center justify-between p-2
                                    ${fieldState.invalid ? 'border-red-400' : 'border-gray-200'}
                                `}>

                                    {/* LEFT */}
                                    <div className="flex items-center gap-4 overflow-hidden">

                                        <div className="w-16 h-16 shrink-0 bg-gray-100 border border-gray-100 overflow-hidden">
                                            <img
                                                src={imageSrc}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <span className="text-sm font-medium text-gray-700 truncate max-w-50 sm:max-w-75">
                                            {localFile?.name || value?.split('/').pop()}
                                        </span>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex items-center gap-5 pr-2">

                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                            {localFile ? formatFileSize(localFile.size) : ''}
                                        </span>

                                        <div className="flex items-center gap-3">

                                            <button
                                                type="button"
                                                onClick={handleDownload}
                                                className="text-blue-500 hover:text-blue-700 transition-colors"
                                            >
                                                <Download size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleRemove}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                        </div>
                                    </div>

                                    {/* PROGRESS */}
                                    {isPending && (
                                        <div className="absolute top-10 left-0 h-1 bg-blue-600 w-full z-20">
                                            <div
                                                className="h-full bg-blue-500 transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* MESSAGES */}
                        <div className="min-h-2.5">

                            {isSuccess && !fieldState.error && (
                                <p className="text-emerald-600 text-xs font-medium">
                                    Image uploaded successfully
                                </p>
                            )}

                            {fieldState.error && (
                                <p className="text-red-500 text-xs font-medium">
                                    {fieldState.error.message}
                                </p>
                            )}
                        </div>

                    </Field>
                );
            }}
        />
    );
}