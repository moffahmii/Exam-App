"use client";

import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import Link from "next/link";

interface GlobalActionsMenuProps {
    viewHref?: string;
    editHref?: string;
    onDelete?: () => void;
}

export function GlobalActionsMenu({
    viewHref,
    editHref,
    onDelete,
}: GlobalActionsMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray-400" >
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 bg-gray-400 hover:bg-gray-100"
                >
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-[160px] p-1 rounded-none"
            >
                {/* View */}
                {viewHref && (
                    <DropdownMenuItem >
                        <Link
                            href={viewHref}
                            className="flex items-center px-2 py-2.5 text-green-600"
                        >
                            <Eye className="mr-3 h-4 w-4" />
                            <span className="text-sm font-medium">View</span>
                        </Link>
                    </DropdownMenuItem>
                )}

                {/* Edit */}
                {editHref && (
                    <DropdownMenuItem >
                        <Link
                            href={editHref}
                            className="flex items-center px-2 py-2.5 text-blue-600"
                        >
                            <Pencil className="mr-3 h-4 w-4" />
                            <span className="text-sm font-medium">Edit</span>
                        </Link>
                    </DropdownMenuItem>
                )}

                {/* Delete */}
                {onDelete && (
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="flex items-center px-2 py-2.5 text-red-600 focus:text-red-600"
                    >
                        <Trash2 className="mr-3 h-4 w-4" />
                        <span className="text-sm font-medium">Delete</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}