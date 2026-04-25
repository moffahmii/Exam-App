'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X as CloseIcon, Plus } from 'lucide-react';
import { Field, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from '@/shared/components/ui/button';
import { ImageUploadField } from '@/features/upload-photo/components/upload-photo';
import { PageHeader } from '@/features/dashboard-header/components/header-page';
import { useRouter } from 'next/navigation';
import { ExamField, ExamSchema } from '../shceme/exam-schem';
import { useCreateExam } from '../hooks/use-add-exam';
import { useEditExam } from '../hooks/use-update-exam';
import { IDiploma } from '@/features/dashboard-exams/components/exams-filter';
import useDiplomas from '@/features/dashboard-diplomas/hooks/use-diplomas-details';

interface ExamFormProps {
    initialData?: ExamField;
    examId?: string;
}

export function ExamForm({ initialData, examId }: ExamFormProps) {
    const router = useRouter();
    const isEditMode = !!examId;

    const { data: diplomas, isLoading } = useDiplomas();

    const createExam = useCreateExam();
    const editExam = useEditExam(examId!);

    // ✅ RHF source of truth
    const form = useForm<ExamField>({
        resolver: zodResolver(ExamSchema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            image: '',
            duration: 0,
            diplomaId: '',
        },
    });

    // 🔥 sync edit data properly
    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title ?? '',
                description: initialData.description ?? '',
                image: initialData.image ?? '',
                duration: initialData.duration ?? 0,
                diplomaId: initialData.diplomaId ?? '',
            });
        }
    }, [initialData, form]);

    const onSubmit = (data: ExamField) => {
        console.log("SUBMIT DATA:", data);

        if (isEditMode) {
            editExam.mutate(data);
        } else {
            createExam.mutate(data);
        }
    };

    const isSubmitting =
        createExam.isPending || editExam.isPending;

    return (
        <div className="w-full min-h-screen bg-[#f8f9fa] pb-10">

            <PageHeader>
                <div className="flex justify-between items-center w-full">

                    <div>
                        <h2 className="text-lg font-semibold">
                            {isEditMode ? "Edit Exam" : "Add New Exam"}
                        </h2>

                        {initialData && (
                            <p className="text-sm text-gray-500">
                                {initialData.title}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            <CloseIcon size={18} /> Cancel
                        </Button>

                        <Button
                            type="submit"
                            form="exam-form"
                            disabled={isSubmitting}
                            className="bg-emerald-500 text-white"
                        >
                            <Save size={18} />
                            {isSubmitting ? "Saving..." : isEditMode ? "Update" : "Save"}
                        </Button>

                    </div>
                </div>
            </PageHeader>

            <div className="max-w-7xl mx-auto p-6 space-y-8">

                <form
                    id="exam-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="bg-white border shadow-sm"
                >
                    <div className="bg-blue-600 text-white p-3 font-semibold">
                        Exam Information
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input {...form.register('title')} />
                        </Field>

                        <Field>
                            <FieldLabel>Diploma</FieldLabel>
                            <select
                                {...form.register('diplomaId')}
                                className="w-full p-3 border rounded-md"
                            >
                                <option value="">
                                    {isLoading ? "Loading..." : "Select Diploma"}
                                </option>

                                {diplomas?.map((dip: IDiploma) => (
                                    <option key={dip.id} value={dip.id}>
                                        {dip.title}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <ImageUploadField
                            control={form.control}
                            name="image"
                        />

                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <Textarea
                                rows={5}
                                {...form.register('description')}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Duration (min)</FieldLabel>
                            <Input
                                type="number"
                                {...form.register('duration', {
                                    valueAsNumber: true,
                                })}
                            />
                        </Field>

                    </div>
                </form>

                <div className="bg-white border shadow-sm">

                    <div className="bg-blue-600 text-white p-3 flex justify-between">
                        <span>Exam Questions</span>

                        <Button disabled={!isEditMode} className="text-white border">
                            <Plus size={16} /> Add Questions
                        </Button>
                    </div>

                    <div className="p-6 text-center text-gray-500">
                        {isEditMode
                            ? "No questions yet"
                            : "Save exam first to add questions"}
                    </div>

                </div>

            </div>
        </div>
    );
}