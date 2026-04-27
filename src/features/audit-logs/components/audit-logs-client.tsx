'use client';

import React, { useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Trash2 } from 'lucide-react';

import { useAuditLogs } from '../hooks/use-auditlogs';
import { PageHeader } from '@/features/dashboard-header/components/header-page';
import { AuditLogsPagination } from './audit-logs-pagination';
import { AuditLogsSearchFilters } from './audit-logs-filters';
import AuditLogsTable from './audit-logs-table';

import { Button } from '@/shared/components/ui/button';
import { AuditLogsTableSkeleton } from './audit-skeleton';

export function AuditLogsPageClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // =========================
    // 1. Query Params
    // =========================
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 20;
    const category = searchParams.get('category') || '';
    const action = searchParams.get('action') || '';
    const search = searchParams.get('search') || '';

    const sort = searchParams.get('sort') || 'createdAt-desc';
    const [sortField, sortOrder] = sort.split('-');

    // =========================
    // 2. API Call
    // =========================
    const { data, isLoading, isFetching } = useAuditLogs({
        page,
        limit,
        category: category || undefined,
        action: action || undefined,
        search: search || undefined,
        sortOrder: sortOrder as 'asc' | 'desc',
        sortBy: sortField,
    });

    const responseData = data as any;
    const logs = responseData?.payload?.data || [];

    // ✅ وحدنا اسم المتغير لـ meta وهيقرأ من الباك إند سواء كان اسمها metadata أو meta
    const meta = responseData?.payload?.metadata || responseData?.payload?.meta || {
        page: 1,
        totalPages: 1,
        total: 0,
        limit: 20
    };

    // =========================
    // 3. URL Handler
    // =========================
    const updateQueryParams = useCallback((newParams: Record<string, string | number | undefined>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(newParams).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.set(key, String(value));
            } else {
                params.delete(key);
            }
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams]);

    // =========================
    // 4. Handlers
    // =========================
    const handlePageChange = (newPage: number) => {
        updateQueryParams({ page: newPage });
    };

    const handleFilterChange = (filters: { search: string; category: string; action: string }) => {
        updateQueryParams({ ...filters, page: 1 });
    };

    const handleSortChange = (value: string) => {
        updateQueryParams({ sort: value, page: 1 });
    };

    const handleClearAllLogs = () => {
        if (confirm('Are you sure you want to clear all logs?')) {
            console.log("Clearing all logs...");
        }
    };

    // =========================
    // 5. UI
    // =========================
    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-100">
            <PageHeader>
                <div className="flex items-center gap-4 w-full">
                    {/* ✅ باصينا الـ meta هنا صح بدون أي Reference Error */}
                    <AuditLogsPagination
                        meta={meta}
                        onPageChange={handlePageChange}
                        isFetching={isFetching || isLoading}
                    />

                    <Button onClick={handleClearAllLogs} className="ml-auto h-10 px-6 bg-[#EF4444] hover:bg-red-600 text-white flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Clear All Logs</span>
                    </Button>
                </div>
            </PageHeader>

            <div className="p-4">
                <AuditLogsSearchFilters
                    onFilterChange={handleFilterChange}
                    onClear={() => router.push(pathname)}
                    isLoading={isFetching || isLoading}
                    initialValues={{ search, category, action }}
                />
            </div>

            <div className="p-4 relative">
                {isLoading ? (
                    <AuditLogsTableSkeleton rows={limit} />
                ) : (
                    <>
                        <AuditLogsTable
                            logs={logs}
                            sortValue={sort}
                            onSortChange={handleSortChange}
                        />

                        {isFetching && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-40">
                                <span className="text-sm text-gray-500">Updating...</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}