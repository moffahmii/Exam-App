'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function AuditLogsTableSkeleton({ rows = 6 }: { rows?: number }) {
    return (
        <div className="w-full overflow-hidden bg-white">
            <Table className="table-fixed w-full p-4">

                {/* HEADER */}
                <TableHeader className="bg-blue-600">
                    <TableRow>
                        <TableHead className="w-30 text-white text-sm uppercase">Action</TableHead>
                        <TableHead className="w-62.5 text-white text-sm uppercase">User</TableHead>
                        <TableHead className="w-95 text-white text-sm uppercase">Entity</TableHead>
                        <TableHead className="w-50 text-white text-sm uppercase">Time</TableHead>
                        <TableHead className="w-20 text-white text-sm uppercase text-right">Sort</TableHead>
                    </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <TableRow key={i} className="border-b border-gray-100">

                            {/* ACTION */}
                            <TableCell className="w-30 space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-3 w-20" />
                            </TableCell>

                            {/* USER */}
                            <TableCell className="w-62.5 space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-40" />
                                <Skeleton className="h-3 w-20" />
                            </TableCell>

                            {/* ENTITY */}
                            <TableCell className="w-95 space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-48" />
                            </TableCell>

                            {/* TIME */}
                            <TableCell className="w-50 space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-3 w-28" />
                            </TableCell>

                            {/* ACTIONS */}
                            <TableCell className="w-20 flex justify-end">
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}