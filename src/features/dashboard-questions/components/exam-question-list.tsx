"use client";

import React from "react";
import { ArrowDownUp, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/shared/components/ui/table";
import { useExamQuestions } from "../hooks/use-exam-questions";
import { QuestionActions } from "./dropdown";
import Link from "next/link";
import { IQuestion } from "@/shared/types/questions";

interface ExamQuestionsListProps {
    examId: string;
    isImmutable?: boolean;
}

export function ExamQuestionsList({ examId, isImmutable }: ExamQuestionsListProps) {
    const { data: questionsList = [], isLoading, isError } = useExamQuestions(examId);

    return (
        <div className="bg-white w-full">

            {/* 1. Header Section */}
            <div className="bg-blue-600 h-12 px-4 flex justify-between items-center text-white">

                <h2 className="font-semibold text-base tracking-wide">
                    Exam Questions
                </h2>

                <Link
                    href={`/dashboard/questions/add-bulk/${examId}`}
                    className="bg-yellow-400 text-white px-2 py-1.5  text-sm font-medium"
                >
                    + Add Questions
                </Link>
            </div>

            {/* 2. Shadcn Table Section */}
            <Table>
                <TableHeader className="bg-gray-200">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[85%] text-gray-600 font-medium h-10">
                            Title
                        </TableHead>
                        <TableHead className="w-[15%] text-right text-gray-600 font-medium h-10">
                            <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-black">
                                Sort <ArrowDownUp size={14} />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {/* حالة التحميل */}
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={2} className="h-24 text-center">
                                <div className="flex items-center justify-center gap-2 text-gray-500">
                                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                                    Loading questions...
                                </div>
                            </TableCell>
                        </TableRow>
                    )}

                    {/* حالة الخطأ */}
                    {isError && (
                        <TableRow>
                            <TableCell colSpan={2} className="h-24 text-center text-red-500">
                                Failed to load questions. Please try again.
                            </TableCell>
                        </TableRow>
                    )}

                    {/* حالة عدم وجود بيانات */}
                    {!isLoading && !isError && questionsList.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={2} className="h-24 text-center text-gray-500">
                                No questions added yet. Click "Add Questions" to begin.
                            </TableCell>
                        </TableRow>
                    )}

                    {/* حالة عرض البيانات */}
                    {!isLoading && !isError && questionsList.length > 0 && questionsList.map((question: IQuestion) => (
                        <TableRow key={question.id} className="hover:bg-gray-50/50">
                            <TableCell className="font-medium text-gray-800">
                                {question.text}
                            </TableCell>
                            <TableCell className="text-right">
                                <QuestionActions
                                    questionId={question.id}
                                    examId={examId}
                                    questionText={question.text}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
}