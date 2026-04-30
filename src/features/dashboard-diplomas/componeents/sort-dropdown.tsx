"use client";

import { useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { ArrowDownWideNarrow, ArrowUpAZ, ArrowDownAZ, CalendarArrowDown, CalendarArrowUp, MoreHorizontal } from "lucide-react";
import useDiplomas from "../hooks/use-diplomas";

export type SortOption = "title-asc" | "title-desc" | "newest-asc" | "newest-desc";

const SORT_OPTIONS = [
    { id: "title-desc", label: "Title (descending)", Icon: ArrowDownAZ },
    { id: "title-asc", label: "Title (ascending)", Icon: ArrowUpAZ },
    { id: "newest-desc", label: "Newest (descending)", Icon: CalendarArrowDown },
    { id: "newest-asc", label: "Newest (ascending)", Icon: CalendarArrowUp },
] as const;

interface SortDropdownProps {
    value: SortOption;
    onChange: (val: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none ml-auto block">
                <div className="text-white flex items-center gap-2 px-3 py-2 hover:bg-blue-700 rounded-md cursor-pointer transition-colors">
                    Sort <ArrowDownWideNarrow size={16} />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[185px] h-[200px]">
                {SORT_OPTIONS.map(({ id, label, Icon }) => (
                    <DropdownMenuItem
                        key={id}
                        onClick={() => onChange(id)}
                        className={value === id ? "bg-muted" : ""}
                    >
                        <Icon className="mr-2 h-4 w-4" /> {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

