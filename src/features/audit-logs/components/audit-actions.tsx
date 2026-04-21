"use client";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Eye, Trash2, MoreHorizontal } from "lucide-react";

export function AuditActions() {
    const [open, setOpen] = useState(false);

    return (
        <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded hover:bg-gray-200 transition opacity-0 group-hover:opacity-100 outline-none">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-40 bg-white p-1 shadow-lg border border-gray-100 rounded-md">
                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 cursor-pointer focus:bg-emerald-50 focus:text-emerald-600">
                        <Eye className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm font-medium">View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 cursor-pointer focus:bg-red-50 focus:text-red-600">
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}