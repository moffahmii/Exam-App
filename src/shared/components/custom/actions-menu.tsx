"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/shared/utils/cn.util";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface GlobalActionsMenuProps {
    viewHref?: string;
    editHref?: string;
    onDelete?: () => void;
}

export function GlobalActionsMenu({ viewHref, editHref, onDelete }: GlobalActionsMenuProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-8 w-8 bg-gray-200" />;

    return (
        <DropdownMenu>
            {/* 1. حولنا الـ Trigger لـ button عادي بستايلك المعتاد بدل ما نحط Button جواه */}
            <DropdownMenuTrigger
                className="flex h-8 w-8 items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors outline-none rounded-none border-none cursor-pointer"
            >
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
                <span className="sr-only">Open menu</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={5}
                className="w-[160px] p-0 bg-white border border-gray-200 rounded-none shadow-md"
            >
                {/* 2. الـ Link هيفضل جوه الـ Item بس شلنا asChild عشان ميعملش Error */}
                {viewHref && (
                    <DropdownMenuItem className="p-0 focus:bg-gray-100 border-b border-gray-50">
                        <Link
                            href={viewHref}
                            className="flex items-center w-full px-3 py-2.5 text-emerald-600"
                        >
                            <Eye className="mr-3 h-4 w-4" />
                            <span className="text-sm font-semibold">View</span>
                        </Link>
                    </DropdownMenuItem>
                )}

                {editHref && (
                    <DropdownMenuItem className="p-0 focus:bg-gray-100 border-b border-gray-50">
                        <Link
                            href={editHref}
                            className="flex items-center w-full px-3 py-2.5 text-blue-600"
                        >
                            <Pencil className="mr-3 h-4 w-4" />
                            <span className="text-sm font-semibold">Edit</span>
                        </Link>
                    </DropdownMenuItem>
                )}

                {onDelete && (
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="flex items-center px-3 py-2.5 text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-600"
                    >
                        <Trash2 className="mr-3 h-4 w-4" />
                        <span className="text-sm font-semibold">Delete</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}