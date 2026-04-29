"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Ban, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { PageHeader } from "@/shared/components/custom/header-page";
import { useQuestionDetails } from "@/features/dashboard-questions/hooks/use-question-details";
import { useDeleteQuestion } from "@/features/dashboard-questions/hooks/use-delete-question";
import { GlobalDeleteModal } from "@/shared/components/custom/delete-modal";

interface QuestionDetailsProps {
    questionId: string;
}

export function QuestionDetails({ questionId }: QuestionDetailsProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: question, isLoading, isError } = useQuestionDetails(questionId);
    const { mutate: deleteMutate, isPending: isDeleting } = useDeleteQuestion();

    const handleDelete = () => {
        deleteMutate(questionId, {
            onSuccess: () => {
                setIsModalOpen(false);
                router.push(`/dashboard/exams/${question?.exam?.id}`);
                router.refresh();
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f8f9fa]">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    if (isError || !question) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f8f9fa]">
                <div className="text-red-500 font-medium text-center">
                    <p>Error loading question details.</p>
                    <Button variant="link" onClick={() => router.back()}>Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-auto bg-gray-100 min-h-screen">
            <PageHeader
                breadcrumbs={[
                    { label: "DASHBOARD", href: "/dashboard" },
                    { label: "EXAMS", href: "/dashboard/exams" },
                    { label: "QUESTION DETAILS" }
                ]}
            >
                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-black font-semibold text-lg max-w-3xl truncate">
                            {question.text}
                        </h2>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            Exam:
                            <Link href={`/dashboard/exams/${question.exam?.id}`} className="text-blue-500 underline ml-1 mr-1">
                                {question.exam?.title}
                            </Link>
                            <ExternalLink size={14} className="text-blue-500" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {question.immutable && (
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-800 text-sm font-medium bg-gray-200 h-10">
                                <Ban size={16} /> Immutable
                            </div>
                        )}

                        <Button
                            asChild
                            disabled={question.immutable}
                            className="bg-blue-600 hover:bg-blue-700 h-10 text-white flex items-center gap-2"
                        >
                            <Link href={`/dashboard/exams/${question.exam?.id}/questions/edit/${questionId}`}>
                                <Pencil size={18} /> Edit
                            </Link>
                        </Button>

                        <Button
                            disabled={question.immutable || isDeleting}
                            onClick={() => setIsModalOpen(true)}
                            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 h-10"
                        >
                            <Trash2 size={18} />
                            Delete
                        </Button>
                    </div>
                </div>
            </PageHeader>

            <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
                <div className="bg-white border shadow-sm overflow-hidden">
                    <div className="bg-blue-600 text-white p-3 font-semibold h-[50px] flex items-center px-6">
                        Question Information
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-widest">Headline</h3>
                            <p className="text-base font-medium text-gray-900">{question.text}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-widest">Linked Exam</h3>
                            <Link href={`/dashboard/exams/${question.exam?.id}`} className="text-sm text-blue-600 flex items-center gap-1 w-fit font-medium">
                                {question.exam?.title} <ExternalLink size={14} />
                            </Link>
                        </div>
                        <div>
                            <h3 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-widest">Options</h3>
                            <p className="text-sm text-gray-900 font-bold">{question.answers?.length || 0} Answers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* استدعاء المودال كمكون وتمرير البيانات */}
            <GlobalDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Question"
                description={`Are you sure you want to delete this question? This action is permanent.`}
            />
        </div>
    );
}