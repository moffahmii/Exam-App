import React from 'react';
import { TableRow, TableCell } from "@/shared/components/ui/table";

export function TableSkeleton() {
    return (
        <>
            {[...Array(5)].map((_, i) => (
                <TableRow key={i} className="border-b border-gray-100">
                    <TableCell>
                        <div className="w-14 h-14 bg-gray-200 animate-pulse border border-gray-100" />
                    </TableCell>
                    <TableCell>
                        <div className="h-4 w-3/4 bg-gray-200 animate-pulse mb-2" />
                        <div className="h-3 w-1/2 bg-gray-100 animate-pulse" />
                    </TableCell>
                    <TableCell>
                        <div className="h-4 w-1/2 bg-gray-200 animate-pulse" />
                    </TableCell>

                    <TableCell className="text-center">
                        <div className="w-8 h-8 bg-gray-200 animate-pulse mx-auto border border-gray-200" />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}