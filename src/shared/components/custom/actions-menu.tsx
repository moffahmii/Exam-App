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

    // ضفنا ml-auto هنا برضه عشان لو بيحمل يفضل في نفس مكانه في الآخر
    if (!mounted) return <div className="h-8 w-8 bg-gray-200 ml-auto" />;

    return (
        /* 💡 غلفنا المنيو بـ div بيزق المحتوى للآخر عشان نضمن إنها تيجي في آخر المساحة */
        <div className="flex justify-end w-full">
            <DropdownMenu>
                <DropdownMenuTrigger
                    /* 💡 ضفنا ml-auto هنا ومسحنا item-end اللي كانت مكتوبة غلط */
                    className="flex h-8 w-8 ml-auto items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
                >
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                    <span className="sr-only">Open menu</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    sideOffset={5}
                    className="w-40 p-0 bg-white "
                >
                    {viewHref && (
                        <DropdownMenuItem className="p-0 focus:bg-gray-100 border-b border-gray-50">
                            <Link
                                href={viewHref}
                                className="flex items-center w-full px-3 py-2.5"
                            >
                                <Eye className="mr-3 h-4 w-4 text-emerald-500" />
                                <span className="text-sm font-semibold">View</span>
                            </Link>
                        </DropdownMenuItem>
                    )}

                    {editHref && (
                        <DropdownMenuItem className="p-0 focus:bg-gray-100 border-b border-gray-50">
                            <Link
                                href={editHref}
                                className="flex items-center w-full px-3 py-2.5"
                            >
                                <Pencil className="mr-3 h-4 w-4 text-blue-600" />
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
                            className="flex items-center px-3 py-2.5"
                        >
                            <Trash2 className="mr-3 h-4 w-4 text-red-600" />
                            <span className="text-sm font-semibold">Delete</span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}