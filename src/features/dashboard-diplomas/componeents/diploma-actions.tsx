"use client";

import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useRouter } from "next/router";
import Link from "next/link";

interface DiplomaActionsProps {
    diplomaId: string | number;
}

export function DiplomaActions({ diplomaId }: DiplomaActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <Button variant="ghost" className="h-8 w-8 p-0 bg-gray-100 hover:bg-gray-200">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[160px] p-2">

                {/* 1. View */}
                <DropdownMenuItem  className="cursor-pointer py-2">
                    <Link href={`/dashboard/exams/${diplomaId}`} className="flex items-center w-full">
                        <Eye className="mr-2 h-4 w-4 text-[#10b981]" />
                        <span className="font-medium text-gray-700">View</span>
                    </Link>
                </DropdownMenuItem>

                {/* 2. Edit */}
                <DropdownMenuItem  className="cursor-pointer py-2">
                    <Link href={`/dashboard/diplomas/view-diploma/${diplomaId}`} className="flex items-center w-full">
                        <Pencil className="mr-2 h-4 w-4 text-[#3b82f6]" />
                        <span className="font-medium text-gray-700">Edit</span>
                    </Link>
                </DropdownMenuItem>

                {/* 3. Delete */}
                <DropdownMenuItem  className="cursor-pointer py-2 focus:bg-red-50">
                    <Link href={`/dashboard/diplomas/${diplomaId}`} className="flex items-center w-full">
                        <Trash2 className="mr-2 h-4 w-4 text-[#ef4444]" />
                        <span className="font-medium text-red-600">Delete</span>
                    </Link>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}