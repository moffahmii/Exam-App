// src/features/diplomas/components/diploma-form.tsx
'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, X as CloseIcon } from 'lucide-react'
import { Field, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Button } from '@/shared/components/ui/button'
import { ImageUploadField } from '@/features/upload-photo/components/upload-photo';
import { DiplomaField, DiplomaScheme } from '@/features/upload-photo/scheme/photo-scheme';
import { PageHeader } from '@/features/dashboard-header/components/header-page'
import { useRouter } from 'next/navigation'
import { createDiploma } from '../apis/add-diploma-api'
import { useEditDiploma } from '../hooks/use-updata-diploma'
import { useCreateDiploma } from '../hooks/use-add-diploma'


interface DiplomaFormProps { initialData?: DiplomaField; diplomaId?: string; }

export function DiplomaForm({ initialData, diplomaId }: DiplomaFormProps) {

    // consts
    const router = useRouter();
    const isEditMode = !!initialData;
    // Form
    const form = useForm<DiplomaField>({
        resolver: zodResolver(DiplomaScheme),
        mode: 'onChange',
        defaultValues: initialData || {
            image: '',
            title: '',
            description: ''
        }
    });

    const createDiploma = useCreateDiploma();
    const editDiploma = useEditDiploma(diplomaId!);
    const onSubmit = (data: DiplomaField) => {
        if (isEditMode) {
            editDiploma.mutate(data);
            return;
        }

        createDiploma.mutate(data);
    };
    // Actions
// Actions
const headerActions = (
    <div className="flex gap-3 items-center justify-end w-full">
        <Button
            type="button"
            variant="outline"
            onClick={() => {
                form.reset();
                router.back();
            }}
            className="flex items-center gap-2 px-4 py-2 h-10 border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
        >
            <CloseIcon size={18} /> Cancel
        </Button>
        <Button
            type="submit"
            form="diploma-form"
            disabled={form.formState.isSubmitting || editDiploma.isPending || createDiploma.isPending}
            className="bg-emerald-500 hover:bg-emerald-600 h-10 text-white flex items-center gap-2 px-4 py-2 transition-all shadow-sm"
        >
            <Save size={18} />
            {form.formState.isSubmitting || editDiploma.isPending || createDiploma.isPending 
                ? 'Saving...' 
                : 'Save'}
        </Button>
    </div>
);

    return (
        <div className="w-full min-h-screen bg-gray-100 relative">
            <PageHeader Children={' '} actions={headerActions} />

            <div className="p-4 mx-auto ">
                <form id="diploma-form" onSubmit={form.handleSubmit(onSubmit)} className="bg-white overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="bg-blue-600 text-white font-semibold p-3 text-base tracking-wide">
                        {isEditMode ? "Edit Diploma Information" : "Add Diploma Information"}
                    </div>

                    <div className="p-6 space-y-6">

                        {/* 1. Image Field */}
                        <ImageUploadField control={form.control} name="image" />

                        {/* 2. Title Field */}
                        <Field data-invalid={!!form.formState.errors.title} className="w-full">
                            <FieldLabel className="text-gray-800 font-medium text-base">
                                Title
                            </FieldLabel>
                            <Input
                                placeholder="Enter title"
                                {...form.register('title')}
                                className={`p-3 h-auto ${form.formState.errors.title ? "border-red-400 focus-visible:ring-red-400" : "border-gray-200 focus-visible:ring-blue-500"}`}
                            />
                            {form.formState.errors.title && (
                                <p className="text-red-500 text-xs font-medium">
                                    {form.formState.errors.title.message}
                                </p>
                            )}
                        </Field>

                        {/* 3. Description Field */}
                        <Field data-invalid={!!form.formState.errors.description} className="w-full">
                            <FieldLabel className="text-gray-800 font-medium text-base">
                                Description
                            </FieldLabel>
                            <Textarea
                                placeholder="Enter description"
                                rows={6}
                                {...form.register('description')}
                                className={`p-3 resize-none ${form.formState.errors.description ? "border-red-400 focus-visible:ring-red-400" : "border-gray-200 focus-visible:ring-blue-500"}`}
                            />
                            {form.formState.errors.description && (
                                <p className="text-red-500 text-xs font-medium">
                                    {form.formState.errors.description.message}
                                </p>
                            )}
                        </Field>
                    </div>
                </form>
            </div>
        </div>
    )
}