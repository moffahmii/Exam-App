'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { useExams } from "../hooks/use-exams";
import { IExam } from '../types/exam';

export default function ExamsTable() {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useExams({
        page,
        limit: 12,
    });

    const exams = data?.data || [];
    const meta = data?.metadata;

    if (isLoading) {
        return <p className="p-4">Loading...</p>;
    }

    return (
        <div className="w-full bg-white border rounded-lg overflow-hidden p-6">

            {/* TABLE */}
            <Table className="table-fixed w-full">

                {/* HEADER */}
                <TableHeader className="bg-blue-600">
                    <TableRow className="border-b border-blue-700 hover:bg-blue-600">

                        <TableHead className="w-[100px] text-white text-xs uppercase">
                            Image
                        </TableHead>

                        <TableHead className="w-[250px] text-white text-xs uppercase">
                            Title
                        </TableHead>

                        <TableHead className="w-[200px] text-white text-xs uppercase">
                            Diploma
                        </TableHead>

                        <TableHead className="w-[120px] text-white text-xs uppercase">
                            Questions
                        </TableHead>


                        <TableHead className="w-[80px] text-white text-xs uppercase text-right">
                            Actions
                        </TableHead>

                    </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>
                    {exams.map((exam: IExam) => (
                        <TableRow
                            key={exam.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                        >

                            {/* IMAGE */}
                            <TableCell className="w-[100px]">
                                <div className="relative w-16 h-16 rounded overflow-hidden">
                                    <Image
                                        src={exam.image}
                                        alt={exam.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </TableCell>

                            {/* TITLE */}
                            <TableCell className="w-[250px]">
                                <div className="font-medium text-sm truncate">
                                    {exam.title}
                                </div>
                                <div className="text-xs text-gray-500 line-clamp-2">
                                    {exam.description}
                                </div>
                            </TableCell>

                            {/* DIPLOMA */}
                            <TableCell className="w-[300px]">
                                <div className="text-sm font-medium">
                                    {exam.diploma?.title}
                                </div>
                            </TableCell>

                            {/* QUESTIONS */}
                            <TableCell className="w-[120px]">
                                <span className="text-sm font-semibold">
                                    {exam.questionsCount}
                                </span>
                            </TableCell>


                            {/* ACTIONS */}
                            <TableCell className="w-[80px] text-right">
                                <button className="p-1 rounded hover:bg-gray-200">
                                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                                </button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>

            {/* PAGINATION */}
            <div className="flex items-center justify-between p-4">

                {/* RANGE */}
                <span className="text-sm text-gray-500">
                    {((meta?.page - 1) * meta?.limit) + 1} -{" "}
                    {Math.min(meta?.page * meta?.limit, meta?.total)} of {meta?.total}
                </span>

                {/* CONTROLS */}
                <div className="flex items-center gap-2">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="text-sm">
                        Page {meta?.page} of {meta?.totalPages}
                    </span>

                    <button
                        disabled={page === meta?.totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>
            </div>

        </div>
    );
}