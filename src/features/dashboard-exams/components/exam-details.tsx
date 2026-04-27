"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Pencil, Trash2, Ban, ExternalLink, Plus } from "lucide-react";
import { PageHeader } from "@/features/dashboard-header/components/header-page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useExamDetails } from "@/features/dashboard-exams/hooks/use-exam-details";
import { IExam } from "../types/exam";
import { DeleteExamModal } from "@/features/exams-CRUD/components/delete-exam-modal";
import { ExamQuestionsList } from "@/features/dashboard-questions/components/exam-question-list";

export default function ExamDetailsPage({
    params,
}: {
    params: { id: string };
}) {

    const router = useRouter();
    const id = params.id;

    const { data, isLoading, isError } = useExamDetails(id);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f8f9fa]">
                <div className="text-gray-500 font-medium">
                    Loading exam details...
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f8f9fa]">
                <div className="text-red-500 font-medium">
                    Error loading exam details or not found.
                </div>
            </div>
        );
    }

    const examData = data as IExam;

    return (
        <div className="h-auto bg-gray-100 min-h-screen">

            {/* HEADER */}
            <PageHeader>
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

                        {examData.immutable ? (
                            <Button disabled className="flex items-center bg-blue-600 gap-2 px-4 py-2 text-sm font-medium h-10">
                                <Pencil size={18} />
                                Edit
                            </Button>
                        ) : (
                            <Button
                                asChild
                                className="bg-blue-600 h-10 text-sm font-medium text-white flex items-center gap-2 px-4 py-2"
                            >
                                <Link href={`/dashboard/exams/edit/${id}`}>
                                    <Pencil size={18} />
                                    Edit
                                </Link>
                            </Button>
                        )}

                        <Button
                            disabled={examData.immutable}
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-red-600 text-sm font-medium text-white flex items-center gap-2 px-4 py-2 h-10"
                        >
                            <Trash2 size={18} />
                            Delete
                        </Button>

                    </div>
                </div>
            </PageHeader>

            {/* BODY */}
            <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">

                <div className="bg-white p-4">

                    <div className="flex flex-col gap-6">

                        {/* IMAGE */}
                        <div>
                            <h3 className="text-xs font-medium text-gray-400 tracking-wider mb-3">
                                Image
                            </h3>

                            <Image
                                width={300}
                                height={300}
                                unoptimized
                                src={examData.image || "/exam-placeholder.png"}
                                alt={examData.title}
                                className="object-cover"
                            />
                        </div>

                        {/* INFO */}
                        <div className="space-y-6">

                            <div>
                                <h3 className="text-xs font-medium text-gray-400 mb-2">
                                    Title
                                </h3>
                                <p className="text-sm font-medium">
                                    {examData.title}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xs font-medium text-gray-400 mb-2">
                                    Description
                                </h3>
                                <p className="text-sm">
                                    {examData.description || "No description provided."}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xs font-medium text-gray-400 mb-2">
                                    Diploma
                                </h3>

                                <Link
                                    href={`/dashboard/diplomas/view-diploma/${examData.diploma.id}`}
                                    className="text-sm text-blue-600 flex items-center gap-1 w-fit"
                                >
                                    {examData.diploma.title}
                                    <ExternalLink size={14} />
                                </Link>
                            </div>

                            <div>
                                <h3 className="text-xs font-medium text-gray-400 mb-2">
                                    Duration
                                </h3>
                                <p className="text-sm">
                                    {examData.duration} Minutes
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xs font-medium text-gray-400 mb-2">
                                    No. of Questions
                                </h3>
                                <p className="text-sm">
                                    {examData.questionsCount}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* QUESTIONS */}
                <ExamQuestionsList examId={id} isImmutable={examData.immutable} />
            </div>


            {/* DELETE MODAL */}
            <DeleteExamModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                examId={id}
                examTitle={examData.title}
            />

        </div>
    );
}