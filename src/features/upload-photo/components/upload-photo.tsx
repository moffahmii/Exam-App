'use client';

import React, { useEffect, useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { FileText, CloudUpload, Trash2, Download } from 'lucide-react';

import { Field, FieldLabel } from '@/shared/components/ui/field';
import useUploadImage from '@/features/upload-photo/hooks/use-upload-images';

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
    } = useUploadImage();

    const [localFile, setLocalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // preview only for local file
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

                // 🔥 source of truth = RHF ONLY
                const imageSrc = value || previewUrl;

                const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setLocalFile(file);

                    mutate(
                        { image: file },
                        {
                            onSuccess: (uploadedUrl: string) => {
                                onChange(uploadedUrl); // RHF update
                                setPreviewUrl(uploadedUrl);
                                reset();
                            },
                            onError: () => {
                                setLocalFile(null);
                                setPreviewUrl(null);
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

                            {!imageSrc ? (
                                <div className="relative w-full border bg-white overflow-hidden border-gray-200 hover:border-blue-400">

                                    <input
                                        type='file'
                                        disabled={isPending}
                                        accept="image/jpeg,image/png,image/webp"
                                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                                        onChange={handleFileSelect}
                                    />

                                    <div className="flex items-center justify-between py-6 px-6 pointer-events-none">

                                        <FileText size={48} className="text-gray-200" />

                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <CloudUpload size={20} />
                                            <span>
                                                Drop image or select from device
                                            </span>
                                        </div>

                                        <div className="w-12"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full border bg-white flex items-center justify-between p-2">

                                    <div className="flex items-center gap-4 overflow-hidden">

                                        <div className="w-16 h-16 bg-gray-100 overflow-hidden">
                                            <img
                                                src={imageSrc}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <span className="text-sm font-medium truncate max-w-50">
                                            {localFile?.name || value?.split('/').pop()}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <button type="button" onClick={handleDownload}>
                                            <Download size={18} />
                                        </button>

                                        <button type="button" onClick={handleRemove}>
                                            <Trash2 size={18} />
                                        </button>

                                    </div>

                                    {isPending && (
                                        <div className="absolute top-0 left-0 h-1 bg-blue-600 w-full">
                                            <div
                                                className="h-full bg-blue-500"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    )}

                                </div>
                            )}

                        </div>

                        {isSuccess && (
                            <p className="text-green-600 text-xs">
                                Image uploaded successfully
                            </p>
                        )}

                    </Field>
                );
            }}
        />
    );
}