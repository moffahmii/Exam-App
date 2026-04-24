'use client';

import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import Link from "next/link";

interface ExamActionsProps {
    examId: string;
}

export function ExamActions({ examId }: ExamActionsProps) {
    return (
        <DropdownMenu>
            {/* الزرار Trigger: شيلنا الحواف والشادو وخليناه Sharp */}
            <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-none bg-gray-200 border border-gray-200 hover:bg-gray-50 transition-colors outline-none mx-auto shadow-none">
                <MoreHorizontal className="h-5 w-5 text-gray-600" />
                <span className="sr-only">Open menu</span>
            </DropdownMenuTrigger>

            {/* القائمة: rounded-none و shadow-none مع border واضح */}
            <DropdownMenuContent
                align="end"
                sideOffset={5}
                className="w-[160px] p-0 bg-white border border-gray-300 rounded-none shadow-none"
            >
                {/* 1. View */}
                <DropdownMenuItem  className="cursor-pointer py-2.5 px-4 focus:bg-gray-100 rounded-none outline-none border-b border-gray-100 last:border-0 transition-colors">
                    <Link href={`/dashboard/exams/${examId}`} className="flex items-center w-full">
                        <Eye className="mr-3 h-4 w-4 text-emerald-600" />
                        <span className="font-semibold text-gray-700 text-sm">View Details</span>
                    </Link>
                </DropdownMenuItem>

                {/* 2. Edit */}
                <DropdownMenuItem  className="cursor-pointer py-2.5 px-4 focus:bg-gray-100 rounded-none outline-none border-b border-gray-100 last:border-0 transition-colors">
                    <Link href={`/dashboard/exams/edit/${examId}`} className="flex items-center w-full">
                        <Pencil className="mr-3 h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-gray-700 text-sm">Edit Exam</span>
                    </Link>
                </DropdownMenuItem>

                {/* 3. Delete */}
                <DropdownMenuItem className="cursor-pointer py-2.5 px-4 focus:bg-red-50 rounded-none outline-none transition-colors">
                    <div className="flex items-center w-full">
                        <Trash2 className="mr-3 h-4 w-4 text-red-500" />
                        <span className="font-semibold text-red-600 text-sm">Delete Exam</span>
                    </div>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}