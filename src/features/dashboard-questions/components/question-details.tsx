"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Pencil, Trash2, Ban, ExternalLink } from "lucide-react";
import { PageHeader } from "@/features/dashboard-header/components/header-page";
import { useState } from "react";
import { useQuestionDetails } from "@/features/dashboard-questions/hooks/use-question-details";
// import { DeleteQuestionModal } from "@/features/questions-CRUD/components/delete-question-modal";

interface QuestionDetailsProps {
    questionId: string;
}

export function QuestionDetails({ questionId }: QuestionDetailsProps) {
    const { data: question, isLoading, isError } = useQuestionDetails(questionId);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f8f9fa]">
                <div className="text-gray-500 font-medium">
                    Loading question details...
                </div>
            </div>
        );
    }

    if (isError || !question) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f8f9fa]">
                <div className="text-red-500 font-medium">
                    Error loading question details or not found.
                </div>
            </div>
        );
    }

    return (
        <div className="h-auto bg-gray-100 min-h-screen">

            {/* HEADER */}
            <PageHeader>
                <div className="flex justify-between items-center w-full">

                    <div className="flex flex-col justify-center">
                        <h2 className="text-black font-semibold text-lg max-w-3xl truncate" title={question.text}>
                            {question.text}
                        </h2>

                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            Exam:
                            <Link
                                href={`/dashboard/exams/${question.exam?.id}`}
                                className="text-blue-500 underline ml-1 mr-1"
                            >
                                {question.exam?.title}
                            </Link>
                            <ExternalLink size={14} className="text-blue-500" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">

                        {question.immutable && (
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-800 text-sm font-medium bg-gray-200 h-10">
                                <Ban size={16} />
                                Immutable
                            </div>
                        )}

                        {question.immutable ? (
                            <Button disabled className="flex items-center bg-blue-600 gap-2 px-4 py-2 text-sm font-medium h-10">
                                <Pencil size={18} />
                                Edit
                            </Button>
                        ) : (
                            <Button
                                asChild
                                className="bg-blue-600 hover:bg-blue-700 h-10 text-sm font-medium text-white flex items-center gap-2 px-4 py-2"
                            >
                                <Link href={`/dashboard/exams/${question.exam?.id}/questions/edit/${questionId}`}>
                                    <Pencil size={18} />
                                    Edit
                                </Link>
                            </Button>
                        )}

                        <Button
                            disabled={question.immutable}
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-red-600 hover:bg-red-700 text-sm font-medium text-white flex items-center gap-2 px-4 py-2 h-10"
                        >
                            <Trash2 size={18} />
                            Delete
                        </Button>

                    </div>
                </div>
            </PageHeader>

            {/* BODY */}
            <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">

                <div className="bg-white p-6 border shadow-sm">

                    <div className="space-y-6">

                        {/* HEADLINE / QUESTION TEXT */}
                        <div>
                            <h3 className="text-xs font-medium text-gray-400 mb-2">
                                Headline
                            </h3>
                            <p className="text-sm font-medium text-gray-900">
                                {question.text}
                            </p>
                        </div>

                        {/* EXAM DETAILS */}
                        <div>
                            <h3 className="text-xs font-medium text-gray-400 mb-2">
                                Exam
                            </h3>
                            <Link
                                href={`/dashboard/exams/${question.exam?.id}`}
                                className="text-sm text-blue-600 flex items-center gap-1 w-fit"
                            >
                                {question.exam?.title}
                                <ExternalLink size={14} />
                            </Link>
                        </div>

                        {/* ANSWERS COUNT */}
                        <div>
                            <h3 className="text-xs font-medium text-gray-400 mb-2">
                                Answers
                            </h3>
                            <p className="text-sm text-gray-900 font-medium">
                                {question.answers?.length || 0}
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            {/* DELETE MODAL */}
            {/* <DeleteQuestionModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                questionId={questionId}
                questionTitle={question.text}
            /> */}

        </div>
    );
}