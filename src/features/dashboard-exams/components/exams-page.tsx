'use client';
import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/features/dashboard-header/components/header-page';
import { useExams } from "../hooks/use-exams";
import { SearchFilters } from './exams-filter';
import { ExamsTable } from './exams-table';
import { ExamsPagination } from './exams-pagination';
import Link from 'next/link';

export function ExamsPage() {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ search: '', diplomaId: '', immutable: '' });
    const [sort, setSort] = useState('createdAt_desc'); // دي الحالة اللي بنعرضها في الـ UI

    // هنا بنقسم القيمة عشان الـ Hook مستني sortBy و sortOrder
    const [sortBy, sortOrder] = sort.split('_');

    const { data, isLoading, isFetching } = useExams({
        page,
        limit: 20,
        sortBy,    // بيبعت مثلاً 'createdAt'
        sortOrder, // بيبعت مثلاً 'desc'
        ...filters
    });

    const handleFilterChange = useCallback((newFilters: any) => {
        setFilters(newFilters);
        setPage(1);
    }, []);

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#f8f9fb]">
            <PageHeader>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <ExamsPagination
                            meta={data?.metadata}
                            onPageChange={setPage}
                            isFetching={isFetching}
                        />
                    </div>

                    <Link 
                        href="/dashboard/exams/new"
                        className="ml-auto h-10 px-6  bg-emerald-500 text-white flex items-center justify-center shrink-0"
                    >
                        <Plus className="w-4 h-4 mr-2 stroke-[3px] text-white" />
                        <span>Add New Exam</span>
                    </Link>
                </div>
            </PageHeader>

            <main className="p-8 space-y-6">
                <SearchFilters
                    onFilterChange={handleFilterChange}
                    onClear={() => {
                        setFilters({ search: '', diplomaId: '', immutable: '' });
                        setPage(1);
                    }}
                />

                <ExamsTable
                    exams={data?.data || []}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    currentSort={sort}
                    onSortChange={setSort}
                />
            </main>
        </div>
    );
}