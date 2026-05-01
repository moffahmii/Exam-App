"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { SortDropdown } from "./sort-dropdown";
import { DiplomaActions } from "./diploma-actions";
import { TableSkeleton } from "../skeletons/diploma-table-skeleton";
import { IDiplomas } from "@/shared/types/diplomas";

type SortOption =
    | "title-asc"
    | "title-desc"
    | "newest-asc"
    | "newest-desc";

interface DiplomasTableProps {
    data: IDiplomas[];
    isLoading: boolean;
}

export function DiplomasTable({ data, isLoading }: DiplomasTableProps) {
    const [sort, setSort] = useState<SortOption>("title-asc");

    const sortedData = [...(data || [])].sort((a, b) => {
        switch (sort) {
            case "title-asc":
                return a.title?.localeCompare(b.title);
            case "title-desc":
                return b.title?.localeCompare(a.title);
            case "newest-asc":
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case "newest-desc":
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default:
                return 0;
        }
    });

    return (
        <div className="overflow-hidden bg-white">
   
            <Table className="table-fixed w-full">
                <TableHeader className="bg-blue-600">
                    <TableRow>
                        <TableHead className="text-white w-25">Image</TableHead>
                        <TableHead className="text-white w-50">Title</TableHead>
                        <TableHead className="text-white w-50">Description</TableHead>
                        <TableHead className="text-right w-20">
                            <SortDropdown value={sort} onChange={setSort} />
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {isLoading ? (
                    <TableSkeleton />
                ) : (
                    <TableBody>
                        {sortedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="h-32 text-center text-gray-500 font-medium"
                                >
                                    No diplomas found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedData.map((item) => (
                                <TableRow key={item.id} className="h-25">
                                    <TableCell className="p-2.5">
                                        <div className="relative w-25 h-25">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <span className="text-[10px] text-gray-400 font-medium flex items-center justify-center h-full w-full bg-gray-100">
                                                    No Image
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>

                                    <TableCell className="font-normal text-sm text-gray-800">
                                        {item.title}
                                    </TableCell>

                                    {/* تم إضافة max-w-0 و break-words w-full هنا */}
                                    <TableCell className="text-gray-500 text-sm font-normal max-w-0">
                                        <p className="line-clamp-2 overflow-hidden break-words w-full">
                                            {item.description}
                                        </p>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <DiplomaActions
                                            diplomaTitle={item.title}
                                            diplomaId={item.id}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                )}
            </Table>
        </div>
    );
}