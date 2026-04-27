'use client';

import React from 'react';
import { MoreHorizontal, Eye, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { AuditLog } from '../types/audit-logs';
import Link from 'next/link';

export function AuditActions({ log }: { log: AuditLog }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                {/* الزرار الرمادي اللي فيه التلات نقط */}
                <Button variant="ghost" className="h-8 w-8 p-0 bg-gray-100 hover:bg-gray-200">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-36">
                <Link href={`/dashboard/audit-logs/${log.id}`}>
                    <DropdownMenuItem className="cursor-pointer font-medium text-emerald-600 gap-2">
                        <Eye className="w-4 h-4" />
                        View
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer font-medium text-red-600 gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}