'use client';

import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/shared/components/ui/pagination";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

interface Props {
    meta?: {
        page: number;
        totalPages: number;
        total: number;
        limit: number;
    };
    onPageChange: (page: number) => void;
    isFetching: boolean;
    onClearAllLogs?: () => void; // دالة إضافية لزر مسح كل السجلات
}

export const AuditLogsPagination = ({ meta, onPageChange, isFetching, onClearAllLogs }: Props) => {
    if (!meta) return null;

    const startRange = (meta.page - 1) * meta.limit + 1;
    const endRange = Math.min(meta.page * meta.limit, meta.total);

    return (
        <div className="flex justify-between items-center w-full">
            {/* الباجنيشن والعد */}
            <div className="flex items-center gap-6">
                <span className="text-sm text-gray-800 font-normal tracking-tight">
                    {startRange} - {endRange} of {meta.total}
                </span>

                <Pagination className="w-auto mx-0">
                    <PaginationContent className="flex items-center -space-x-px overflow-hidden border border-[#E2E8F0]">
                        <PaginationItem>
                            <button
                                disabled={meta.page === 1 || isFetching}
                                onClick={() => onPageChange(meta.page - 1)}
                                className="h-10 w-10 flex items-center justify-center bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-5 h-5 text-[#64748B]" />
                            </button>
                        </PaginationItem>

                        <PaginationItem>
                            <div className="h-10 px-4 flex items-center justify-center bg-white text-sm text-gray-400 font-normal">
                                Page {meta.page} of {meta.totalPages}
                            </div>
                        </PaginationItem>

                        <PaginationItem>
                            <button
                                disabled={meta.page >= meta.totalPages || isFetching}
                                onClick={() => onPageChange(meta.page + 1)}
                                className="h-10 w-10 flex items-center justify-center bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-5 h-5 text-[#1E293B]" />
                            </button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* زر مسح السجلات (Clear All Logs) */}
            {onClearAllLogs && (
                <button
                    onClick={onClearAllLogs}
                    className="flex items-center gap-2 bg-[#EF4444] hover:bg-red-600 text-white px-4 py-2 text-sm font-medium transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                    Clear All Logs
                </button>
            )}
        </div>
    );
};