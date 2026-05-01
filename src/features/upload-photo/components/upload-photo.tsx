'use client';

import React, { useEffect, useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import { CloudUpload, Trash2, Download, Image as ImageIcon } from 'lucide-react';

import { Field, FieldLabel } from '@/shared/components/ui/field';
import useUploadImage from '@/features/upload-photo/hooks/use-upload-images';
import { ImageScheme } from '@/shared/schemas/photo-scheme';

interface ImageUploadFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
}

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

export function ImageUploadField({
    name,
    control,
    label = "Label"
}: ImageUploadFieldProps) {
    const {
        mutate,
        isPending,
        uploadProgress,
        reset
    } = useUploadImage();

    const [localFile, setLocalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);

    // Manage local object URL for preview and cleanup to avoid memory leaks
    useEffect(() => {
        if (!localFile) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(localFile);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [localFile]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState }) => {

                // Determine source of truth: fallback to previewUrl if RHF value is empty
                const imageSrc = value || previewUrl;
                // Combine RHF errors (like "required") with local file validation errors
                const errorMessage = localError || fieldState.error?.message;

                const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setLocalError(null);

                    // Validate file against Zod schema before uploading
                    const validation = ImageScheme.safeParse({ image: file });

                    if (!validation.success) {
                        // Use .issues instead of .errors to access Zod validation messages
                        setLocalError(validation.error.issues[0].message);
                        e.target.value = ''; // Reset input
                        return;
                    }

                    setLocalFile(file);

                    mutate(
                        { image: file },
                        {
                            onSuccess: (uploadedUrl: string) => {
                                onChange(uploadedUrl); // Update react-hook-form
                                setPreviewUrl(uploadedUrl);
                                reset();
                            },
                            onError: (error) => {
                                setLocalFile(null);
                                setPreviewUrl(null);
                                onChange('');
                                setLocalError(error.message || "Failed to upload image");
                            }
                        }
                    );
                };
                const handleRemove = (e: React.MouseEvent) => {
                    e.preventDefault();
                    setLocalFile(null);
                    setPreviewUrl(null);
                    setLocalError(null);
                    onChange('');
                    reset();
                };

                const handleDownload = (e: React.MouseEvent) => {
                    e.preventDefault();
                    if (!imageSrc) return;

                    const link = document.createElement('a');
                    link.href = imageSrc;
                    link.download = localFile?.name || 'image';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };

                return (
                    <Field data-invalid={!!errorMessage} className="w-full">
                        {label && (
                            <FieldLabel className="text-gray-900 block text-base">
                                Image
                            </FieldLabel>
                        )}

                        <div className="w-full">
                            {!imageSrc ? (
                                // Empty state: File upload dropzone
                                <div className="relative w-full border bg-white overflow-hidden border-gray-200 hover:border-blue-400 transition-colors">
                                    <input
                                        type='file'
                                        disabled={isPending}
                                        accept="image/jpeg,image/png,image/webp"
                                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                                        onChange={handleFileSelect}
                                    />

                                    <div className="flex items-center px-6 py-6 pointer-events-none">
                                        <div className="shrink-0">
                                            <ImageIcon size={44} strokeWidth={1} className="text-gray-300" />
                                        </div>

                                        <div className="grow flex justify-center items-center gap-2 text-sm  text-gray-500">
                                            <CloudUpload size={20} />
                                            <span>
                                                Drop image here or <span className="text-blue-500">select from your computer</span>
                                            </span>
                                        </div>

                                        <div className="w-11 shrink-0" />
                                    </div>

                                    {/* Upload progress bar */}
                                    {isPending && (
                                        <div className="absolute bottom-0 left-0 h-1.5 bg-blue-100 w-full">
                                            <div
                                                className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Filled state: Image preview and actions
                                <div className="relative w-full border border-gray-200 bg-white flex items-center justify-between p-3 overflow-hidden">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-100 shrink-0">
                                            <img
                                                src={imageSrc}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <span className="text-sm  text-gray-600 truncate max-w-xs">
                                            {localFile?.name || value?.split('/').pop() || "Uploaded_Image"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 shrink-0 pl-4">
                                        {localFile?.size && (
                                            <span className="text-sm  text-gray-400">
                                                {formatFileSize(localFile.size)}
                                            </span>
                                        )}

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleDownload}
                                                className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                                            >
                                                <Download size={20} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleRemove}
                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Upload progress bar for ongoing uploads while preview is active */}
                                    {isPending && (
                                        <div className="absolute bottom-0 left-0 h-1.5 bg-blue-100 w-full">
                                            <div
                                                className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Display combined local and RHF errors */}
                        {errorMessage && (
                            <p className="mt-2 text-sm text-red-500 ">
                                {errorMessage}
                            </p>
                        )}
                    </Field>
                );
            }}
        />
    );
}