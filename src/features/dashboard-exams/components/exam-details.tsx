"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Ban, ExternalLink } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { PageHeader } from "@/shared/components/custom/header-page";
import { GlobalDeleteModal } from "@/shared/components/custom/delete-modal";

import { useExamDetails } from "@/features/dashboard-exams/hooks/use-exam-details";
import { ExamQuestionsList } from "@/features/dashboard-questions/components/exam-question-list";
import { IExam } from "../../../shared/types/exam";
import { useDeleteExam } from "@/features/dashboard-exams/hooks/use-delete-exam";
import { ExamDetailsSkeleton } from "../skeleton/exam-details-skeleton";

export default function ExamDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { id } = params;

    // --- Hooks ---
    const { data, isLoading, isError } = useExamDetails(id);
    const { mutate: deleteExam, isPending: isDeleting } = useDeleteExam();

    // --- State ---
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // --- Conditional Rendering ---
    if (isLoading) return <ExamDetailsSkeleton />;

    if (isError || !data) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f8f9fa] text-red-500 font-medium">
                Error loading exam details or not found.
            </div>
        );
    }

    const examData = data as IExam;

    // --- Handlers ---
    const handleConfirmDelete = () => {
        deleteExam(id, {
            onSuccess: (res) => {
                if (res?.success) {
                    setShowDeleteModal(false);
                    router.push("/dashboard/exams");
                }
            }
        });
    };

    return (
        <div className="h-auto bg-gray-100 w-full min-h-screen">
            {/* HEADER */}
            <PageHeader
                breadcrumbs={[
                    { label: "Exams", href: "/dashboard/exams" },
                    { label: examData.title }
                ]}
            >
                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-black font-semibold text-lg">
                            {examData.title}
                        </h2>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            Diploma:
                            <Link
                                href={`/dashboard/diplomas/view-diploma/${examData.diploma.id}`}
                                className="text-blue-500 underline ml-1 mr-1"
                            >
                                {examData.diploma.title}
                            </Link>
                            <ExternalLink size={14} className="text-blue-500" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {examData.immutable && (
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-800 text-sm font-medium bg-gray-200 h-10">
                                <Ban size={16} />
                                Immutable
                            </div>
                        )}

                        {!examData.immutable ? (
                            <Button asChild className="bg-blue-600 h-10 text-sm font-medium text-white flex items-center gap-2 px-4 py-2">
                                <Link href={`/dashboard/exams/edit/${id}`}>
                                    <Pencil size={18} /> Edit
                                </Link>
                            </Button>
                        ) : (
                            <Button disabled className="bg-blue-600 h-10 text-sm font-medium text-white flex items-center gap-2 px-4 py-2">
                                <Pencil size={18} /> Edit
                            </Button>
                        )}

                        <Button
                            disabled={examData.immutable}
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-red-600 text-sm font-medium text-white flex items-center gap-2 px-4 py-2 h-10"
                        >
                            <Trash2 size={18} /> Delete
                        </Button>
                    </div>
                </div>
            </PageHeader>

            {/* BODY */}
            <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
                <div className="bg-white p-4 border border-gray-200">
                    <div className="flex flex-col gap-8">
                        {/* IMAGE */}
                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-3">Image</h3>
                            <div className="relative overflow-hidden">
                                <Image
                                    width={300}
                                    height={300}
                                    unoptimized
                                    src={examData.image || "/exam-placeholder.png"}
                                    alt={examData.title}
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-2">Title</h3>
                            <p className="text-base font-medium text-black">
                                {examData.title}
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-2">Description</h3>
                            <p className="text-sm font-normal text-gray-800 leading-relaxed">
                                {examData.description || "No description provided."}
                            </p>
                        </div>

                        {/* Diploma */}
                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-2">Diploma</h3>
                            <Link
                                href={`/dashboard/diplomas/view-diploma/${examData.diploma.id}`}
                                className="text-sm font-medium text-gray-900 flex items-center gap-1"
                            >
                                {examData.diploma.title}
                                <ExternalLink size={14} className="text-gray-600" />
                            </Link>
                        </div>

                        {/* Duration */}
                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-2">Duration</h3>
                            <p className="text-sm font-medium text-black">
                                {examData.duration} Minutes
                            </p>
                        </div>

                        {/* No. of Questions */}
                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-2">No. of Questions</h3>
                            <p className="text-sm font-medium text-black">
                                {examData.questionsCount}
                            </p>
                        </div>
                    </div>
                </div>

                {/* QUESTIONS SECTION */}
                <div className="bg-white border border-gray-200">
                    <ExamQuestionsList examId={id} isImmutable={examData.immutable} />
                </div>
            </div>

            {/* GLOBAL DELETE MODAL */}
            <GlobalDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Exam"
                description={`Are you sure you want to delete "${examData.title}"?`}
                isLoading={isDeleting}
            />
        </div>
    );
}

