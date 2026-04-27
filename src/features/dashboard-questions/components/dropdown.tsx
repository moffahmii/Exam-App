'use client';

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
// import { DeleteQuestionModal } from "./delete-question-modal"; 

interface QuestionActionsProps {
    questionId: string;
    examId: string; 
    questionText?: string;
}

export function QuestionActions({ questionId, examId, questionText }: QuestionActionsProps) {
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            <DropdownMenu>

                {/* TRIGGER */}
                <DropdownMenuTrigger >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-black hover:bg-gray-200 bg-gray-100/50"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>

                {/* MENU */}
                <DropdownMenuContent
                    align="end"
                    sideOffset={5}
                    className="w-[160px] p-0 bg-white border border-gray-300 shadow-sm"
                >

                    {/* EDIT - ✅ استخدام asChild مع Link لمنع الـ Hydration Error */}
                    <DropdownMenuItem className="cursor-pointer py-2.5 px-4 focus:bg-gray-100 border-b border-gray-100 rounded-none">
                        <Link
                            href={`/dashboard/questions/view/${questionId}`}
                            className="flex items-center w-full"
                        >
                            <Pencil className="mr-3 h-4 w-4 text-blue-600" />
                            <span className="font-semibold text-gray-700 text-sm">
                                Edit
                            </span>
                        </Link>
                    </DropdownMenuItem>

                    {/* DELETE - ✅ زرار الحذف بيفضل onClick لأنه بيفتح Modal مش بيعمل Navigation */}
                    <DropdownMenuItem
                        onClick={() => setOpenDelete(true)}
                        className="cursor-pointer py-2.5 px-4 focus:bg-red-50 rounded-none flex items-center w-full"
                    >
                        <Trash2 className="mr-3 h-4 w-4 text-red-500" />
                        <span className="font-semibold text-red-600 text-sm">
                            Delete
                        </span>
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

            {/* 🔥 MODAL OUTSIDE DROPDOWN */}
            {/* <DeleteQuestionModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                questionId={questionId}
                questionTitle={questionText || "this question"}
            /> 
            */}
        </>
    );
}