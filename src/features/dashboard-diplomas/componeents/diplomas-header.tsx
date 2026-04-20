"use client";

import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/shared/components/ui/pagination";

interface DiplomasHeaderProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

export function DiplomasHeader({ currentPage, totalPages, totalItems, onPageChange }: DiplomasHeaderProps) {
    // حساب الأرقام (مثال: 1 - 20)
    const itemsPerPage = 20;
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

            {/* الجزء الأيسر: الترقيم باستخدام مكونات shadcn */}
            <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {startItem} - {endItem} of {totalItems}
                </span>

                <Pagination className="mx-0 w-auto">
                    <PaginationContent>
                        {/* زر السابق */}
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault(); // لمنع إعادة تحميل الصفحة
                                    if (currentPage > 1) onPageChange(currentPage - 1);
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {/* النص الأوسط */}
                        <PaginationItem>
                            <span className="flex h-9 items-center justify-center px-4 text-sm font-medium text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </span>
                        </PaginationItem>

                        {/* زر التالي */}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                                }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* الجزء الأيمن: زر الإضافة */}
            <Button className="bg-[#10b981] hover:bg-[#059669] text-white flex items-center gap-2 px-6">
                <Plus size={18} />
                Add New Diploma
            </Button>

        </div>
    );
}