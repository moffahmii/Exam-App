'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X as CloseIcon } from 'lucide-react';

import { Field, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from '@/shared/components/ui/button';
import { PageHeader } from '@/shared/components/custom/header-page';

import { ImageUploadField } from '@/features/upload-photo/components/upload-photo';
import { DiplomaField, DiplomaScheme } from '@/features/upload-photo/scheme/photo-scheme';
import { useEditDiploma } from '../hooks/use-updata-diploma';
import { useCreateDiploma } from '../hooks/use-add-diploma';

interface DiplomaFormProps {
    initialData?: DiplomaField;
    diplomaId?: string;
}

export function DiplomaForm({ initialData, diplomaId }: DiplomaFormProps) {
    const router = useRouter();
    const isEditMode = !!initialData;

    // --- Hooks ---
    const createDiploma = useCreateDiploma();
    const editDiploma = useEditDiploma(diplomaId!);

    // --- Form Setup ---
    const form = useForm<DiplomaField>({
        resolver: zodResolver(DiplomaScheme),
        mode: 'onChange',
        defaultValues: initialData || {
            image: '',
            title: '',
            description: ''
        }
    });

    // --- Handlers ---
    // داخل DiplomaForm.tsx

    const onSubmit = (data: DiplomaField) => {
        if (isEditMode) {
            editDiploma.mutate(data, {
                onSuccess: () => {
                    router.push('/dashboard/diplomas');
                    router.refresh(); // 👈 بتعمل ريفريش خفي وسريع في الخلفية
                }
            });
            return;
        }

        createDiploma.mutate(data, {
            onSuccess: () => {
                router.push('/dashboard/diplomas');
                router.refresh(); // 👈 بتعمل ريفريش خفي وسريع في الخلفية
            }
        });
    };
    // --- Breadcrumbs Setup ---
    const pageBreadcrumbs = [
        { label: "Diplomas", href: "/dashboard/diplomas" },
        { label: isEditMode ? (initialData?.title || "Edit Diploma") : "Add New Diploma" }
    ];

    const isPending = form.formState.isSubmitting || editDiploma.isPending || createDiploma.isPending;

    return (
        <div className="w-full min-h-screen bg-gray-100 relative">

            {/* --- Page Header with Breadcrumbs --- */}
            <PageHeader breadcrumbs={pageBreadcrumbs}>
                <div className="flex justify-between items-center w-full">

                    {/* جهة اليسار (العنوان) */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-black font-semibold font-inter text-lg">
                            {isEditMode ? "Edit Diploma" : "Add New Diploma"}
                        </h2>
                    </div>

                    {/* جهة اليمين (الزراير) */}
                    <div className="flex gap-3 items-center justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                form.reset();
                                router.back();
                            }}
                            className="flex items-center gap-2 px-4 py-2 h-10  text-gray-700 hover:bg-gray-50"
                        >
                            <CloseIcon size={18} /> Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="diploma-form"
                            disabled={isPending}
                            className="bg-emerald-500 hover:bg-emerald-600 h-10 text-white flex items-center gap-2 px-4 py-2 transition-all"
                        >
                            <Save size={18} />
                            {isPending ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </div>
            </PageHeader>

            {/* --- Form Section --- */}
            <div className="p-4 mx-auto ">
                <form id="diploma-form" onSubmit={form.handleSubmit(onSubmit)} className="bg-white overflow-hidden shadow-sm border border-gray-200">

                    <div className="bg-blue-600 text-white font-semibold p-3 text-base tracking-wide">
                        {isEditMode ? "Edit Diploma Information" : "Add Diploma Information"}
                    </div>

                    <div className="p-6 space-y-6">

                        {/* 1. Image Field */}
                        <ImageUploadField control={form.control} name="image" />

                        {/* 2. Title Field */}
                        <Field data-invalid={!!form.formState.errors.title} className="w-full mb-2">
                            <FieldLabel className="text-gray-800 font-medium text-base block">
                                Title
                            </FieldLabel>
                            <Input
                                placeholder="Enter title"
                                {...form.register('title')}
                                className={`p-3 h-auto ${form.formState.errors.title ? "border-red-400 focus-visible:ring-red-400" : "border-gray-200 focus-visible:ring-blue-500"}`}
                            />
                            {form.formState.errors.title && (
                                <p className="text-red-500 text-xs font-medium mt-1">
                                    {form.formState.errors.title.message}
                                </p>
                            )}
                        </Field>

                        {/* 3. Description Field */}
                        <Field data-invalid={!!form.formState.errors.description} className="w-full">
                            <FieldLabel className="text-gray-800 font-medium text-base  block">
                                Description
                            </FieldLabel>
                            <Textarea
                                placeholder="Enter description"
                                rows={6}
                                {...form.register('description')}
                                className={`p-3 resize-none ${form.formState.errors.description ? "border-red-400 focus-visible:ring-red-400" : "border-gray-200 focus-visible:ring-blue-500"}`}
                            />
                            {form.formState.errors.description && (
                                <p className="text-red-500 text-xs font-medium mt-1">
                                    {form.formState.errors.description.message}
                                </p>
                            )}
                        </Field>

                    </div>
                </form>
            </div>
        </div>
    );
}