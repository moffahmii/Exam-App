import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/shared/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    meta?: {
        page: number;
        totalPages: number;
        total: number;
        limit: number;
    };
    onPageChange: (page: number) => void;
    isFetching: boolean;
}

export const ExamsPagination = ({ meta, onPageChange, isFetching }: Props) => {
    if (!meta) return null;

    const startRange = (meta.page - 1) * meta.limit + 1;
    const endRange = Math.min(meta.page * meta.limit, meta.total);

    return (
        <div className="flex items-center gap-6">
            {/* الجزء الخاص بالعد (1 - 20 of 548) */}
            <span className="text-sm text-gray-800 font-normal tracking-tight">
                {startRange} - {endRange} of {meta.total}
            </span>

            <Pagination className="w-auto mx-0">
                <PaginationContent className="flex items-center -space-x-px overflow-hidden border border-[#E2E8F0]">

                    {/* زر السابق */}
                    <PaginationItem>
                        <button
                            disabled={meta.page === 1 || isFetching}
                            onClick={() => onPageChange(meta.page - 1)}
                            className="h-10 w-10 flex items-center justify-center bg-gray-200  disabled:opacity-50 disabled:cursor-not-allowed "
                        >
                            <ChevronLeft className="w-5 h-5 text-[#64748B]" />
                        </button>
                    </PaginationItem>

                    {/* عرض رقم الصفحة الحالي */}
                    <PaginationItem>
                        <div className="h-10 px-4 flex items-center justify-center bg-white  text-sm text-gray-400 font-normal">
                            Page {meta.page} of {meta.totalPages}
                        </div>
                    </PaginationItem>

                    {/* زر التالي */}
                    <PaginationItem>
                        <button
                            disabled={meta.page >= meta.totalPages || isFetching}
                            onClick={() => onPageChange(meta.page + 1)}
                            className="h-10 w-10 flex items-center justify-center bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed "
                        >
                            <ChevronRight className="w-5 h-5 text-[#1E293B]" />
                        </button>
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </div>
    );
};