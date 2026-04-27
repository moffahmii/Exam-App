"use client";

import { useState } from "react"; // 👈 استيراد useState
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import Link from "next/link";
import { DeleteDiplomaModal } from "./diploma-deletion-moadal";

interface DiplomaActionsProps {
    diplomaId: string | number;
    diplomaTitle: string; // 👈 إضافة العنوان لأن المودال يحتاجه
}

export function DiplomaActions({ diplomaId, diplomaTitle }: DiplomaActionsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false); // 👈 حالة لفتح وإغلاق المودال

    return (
        <>
            <DropdownMenu>
                {/* TRIGGER: أيقونة الثلاث نقط */}
                <DropdownMenuTrigger >
                    <Button variant="ghost" className="h-8 w-8 p-0 bg-gray-100 hover:bg-gray-200 focus-visible:ring-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4 text-gray-600" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[160px] p-2">
                    {/* 1. View - لينك صريح */}
                    <DropdownMenuItem className="cursor-pointer py-2 hover:bg-gray-50 focus:bg-gray-50" >
                        <Link href={`/dashboard/exams/${diplomaId}`} className="flex items-center w-full outline-none">
                            <Eye className="mr-2 h-4 w-4 text-[#10b981]" />
                            <span className="font-medium text-gray-700">View</span>
                        </Link>
                    </DropdownMenuItem>

                    {/* 2. Edit - لينك صريح */}
                    <DropdownMenuItem className="cursor-pointer py-2 hover:bg-gray-50 focus:bg-gray-50" >
                        <Link href={`/dashboard/diplomas/view-diploma/${diplomaId}`} className="flex items-center w-full outline-none">
                            <Pencil className="mr-2 h-4 w-4 text-[#3b82f6]" />
                            <span className="font-medium text-gray-700">Edit</span>
                        </Link>
                    </DropdownMenuItem>

                    {/* 3. Delete - تغيير اللينك ليفتح المودال */}
                    <DropdownMenuItem
                        className="cursor-pointer py-2 hover:bg-red-50 focus:bg-red-50 text-red-600"
                        onSelect={() => setIsModalOpen(true)} // 👈 فتح المودال عند الضغط
                    >
                        <div className="flex items-center w-full outline-none">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span className="font-medium">Delete</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* 👈 استدعاء المودال خارج الـ DropdownMenu */}
            <DeleteDiplomaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                diplomaId={String(diplomaId)} // تحويل الـ ID لـ String لتطابق الـ Props في المودال
                diplomaTitle={diplomaTitle}
            />
        </>
    );
}