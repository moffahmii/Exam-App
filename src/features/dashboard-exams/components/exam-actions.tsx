'use client';

import { useState } from "react";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import Link from "next/link";
import { DeleteExamModal } from "@/features/exams-CRUD/components/delete-exam-modal";

interface ExamActionsProps {
    examId: string;
    examTitle?: string;
}

export function ExamActions({ examId, examTitle }: ExamActionsProps) {

    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            <DropdownMenu>

                {/* TRIGGER */}
                <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-none bg-gray-200 border border-gray-200 hover:bg-gray-50 transition-colors outline-none mx-auto shadow-none">
                    <MoreHorizontal className="h-5 w-5 text-gray-600" />
                    <span className="sr-only">Open menu</span>
                </DropdownMenuTrigger>

                {/* MENU */}
                <DropdownMenuContent
                    align="end"
                    sideOffset={5}
                    className="w-[160px] p-0 bg-white border border-gray-300 rounded-none shadow-none"
                >

                    {/* VIEW */}
                    <DropdownMenuItem className="cursor-pointer py-2.5 px-4 focus:bg-gray-100 border-b border-gray-100">
                        <Link href={`/dashboard/exams/${examId}`} className="flex items-center w-full">
                            <Eye className="mr-3 h-4 w-4 text-emerald-600" />
                            <span className="font-semibold text-gray-700 text-sm">
                                View Details
                            </span>
                        </Link>
                    </DropdownMenuItem>

                    {/* EDIT */}
                    <DropdownMenuItem className="cursor-pointer py-2.5 px-4 focus:bg-gray-100 border-b border-gray-100">
                        <Link href={`/dashboard/exams/edit/${examId}`} className="flex items-center w-full">
                            <Pencil className="mr-3 h-4 w-4 text-blue-600" />
                            <span className="font-semibold text-gray-700 text-sm">
                                Edit Exam
                            </span>
                        </Link>
                    </DropdownMenuItem>

                    {/* DELETE */}
                    <DropdownMenuItem
                        onClick={() => setOpenDelete(true)}
                        className="cursor-pointer py-2.5 px-4 focus:bg-red-50"
                    >
                        <div className="flex items-center w-full">
                            <Trash2 className="mr-3 h-4 w-4 text-red-500" />
                            <span className="font-semibold text-red-600 text-sm">
                                Delete Exam
                            </span>
                        </div>
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

            {/* 🔥 MODAL OUTSIDE DROPDOWN */}
            <DeleteExamModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                examId={examId}
                examTitle={examTitle || "this exam"}
            />
        </>
    );
}