'use client';
import { ArrowDownAZ, ArrowUpAZ, ArrowDown01, ArrowUp10, CalendarArrowDown, CalendarArrowUp, ListFilter } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface SortProps {
    currentSort: string;
    onSort: (val: string) => void;
}

export function ExamSort({ currentSort, onSort }: SortProps) {
    const options = [
        { label: 'Title', detail: '(descending)', value: 'title_desc', icon: <ArrowDownAZ className="w-4 h-4" /> },
        { label: 'Title', detail: '(ascending)', value: 'title_asc', icon: <ArrowUpAZ className="w-4 h-4" /> },
        { label: 'Questions No.', detail: '(descending)', value: 'questionsCount_desc', icon: <ArrowDown01 className="w-4 h-4" /> },
        { label: 'Questions No.', detail: '(ascending)', value: 'questionsCount_asc', icon: <ArrowUp10 className="w-4 h-4" /> },
        { label: 'Newest', detail: '(descending)', value: 'createdAt_desc', icon: <CalendarArrowDown className="w-4 h-4" /> },
        { label: 'Newest', detail: '(ascending)', value: 'createdAt_asc', icon: <CalendarArrowUp className="w-4 h-4" /> },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 text-white font-bold outline-none mx-auto cursor-pointer">
                Sort <ListFilter className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px] p-0 bg-white border border-gray-300 rounded-none shadow-none z-[100]">
                {options.map((opt) => (
                    <DropdownMenuItem
                        key={opt.value}
                        onClick={() => onSort(opt.value)}
                        className={`flex items-center px-4 py-3 cursor-pointer rounded-none outline-none border-b border-gray-50 last:border-0 ${currentSort === opt.value ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}
                    >
                        <span className="mr-3 text-gray-400">{opt.icon}</span>
                        <div className="flex items-center gap-1.5 text-sm">
                            <span className="text-gray-800">{opt.label}</span>
                            <span className="text-gray-400 text-xs">{opt.detail}</span>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}