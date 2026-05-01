'use client';

import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { useAuditLogs } from '@/features/audit-logs/hooks/use-auditlogs';
import { AuditLogsTableSkeleton } from '@/features/audit-logs/components/audit-skeleton';
import AuditLogsTable from '@/features/audit-logs/components/audit-logs-table';
import { PageHeader } from '@/shared/components/custom/header-page';
import { AppPagination } from '@/shared/components/custom/app-pagination';
import { GlobalFilters } from '@/shared/components/custom/search-filters';
import { Button } from '@/shared/components/ui/button';

export function AuditLogsPageClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Memoize params to prevent unnecessary recalculations
    const params = useMemo(() => ({
        page: Number(searchParams.get('page')) || 1,
        limit: Number(searchParams.get('limit')) || 20,
        category: searchParams.get('category') || '',
        action: searchParams.get('action') || '',
        search: searchParams.get('search') || '',
        sort: searchParams.get('sort') || 'createdAt-desc',
    }), [searchParams]);

    const [sortField, sortOrder] = params.sort.split('-');

    const [localFilters, setLocalFilters] = useState({
        search: params.search,
        category: params.category,
        action: params.action
    });

    useEffect(() => {
        setLocalFilters({
            search: params.search,
            category: params.category,
            action: params.action
        });
    }, [params.search, params.category, params.action]);

    const { data, isLoading, isFetching } = useAuditLogs({
        page: params.page,
        limit: params.limit,
        category: params.category || undefined,
        action: params.action || undefined,
        search: params.search || undefined,
        sortOrder: sortOrder as 'asc' | 'desc',
        sortBy: sortField,
    });

    const logsData = useMemo(() => {
        if (data?.status === true) {
            return {
                logs: data.payload.data || [],
                meta: data.payload.metadata || { page: 1, totalPages: 1, total: 0, limit: 20 }
            };
        }
        return { logs: [], meta: { page: 1, totalPages: 1, total: 0, limit: 20 } };
    }, [data]);

    const updateQueryParams = useCallback((newParams: Record<string, string | number | undefined>) => {
        const nextParams = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value !== undefined && value !== '') nextParams.set(key, String(value));
            else nextParams.delete(key);
        });
        router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
    }, [pathname, router, searchParams]);

    const auditBreadcrumbs = [
        { label: "Audit Logs" }
    ];

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-100">
            <PageHeader breadcrumbs={auditBreadcrumbs}>
                <div className="flex items-center gap-4 w-full">
                    <AppPagination
                        meta={logsData.meta}
                        onPageChange={(p) => updateQueryParams({ page: p })}
                        isFetching={isFetching || isLoading}
                    />
                    <Button
                        onClick={() => confirm('Clear all logs?') && console.log("Cleared")}
                        className="ml-auto h-10 px-6 bg-red-600 hover:bg-red-600 text-white flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Clear All Logs</span>
                    </Button>
                </div>
            </PageHeader>

            <div className="px-4">
                <GlobalFilters
                    showSearch searchQuery={localFilters.search}
                    onSearchChange={(v) => setLocalFilters(prev => ({ ...prev, search: v }))}
                    dropdowns={[
                        {
                            value: localFilters.category,
                            onChange: (v) => setLocalFilters(prev => ({ ...prev, category: v })),
                            placeholder: "All Categories",
                            options: [
                                { label: "All Categories", value: "" },
                                { label: "DIPLOMA", value: "DIPLOMA" },
                                { label: "EXAM", value: "EXAM" },
                                { label: "USER", value: "USER" },
                            ]
                        },
                        {
                            value: localFilters.action,
                            onChange: (v) => setLocalFilters(prev => ({ ...prev, action: v })),
                            placeholder: "All Actions",
                            options: [
                                { label: "All Actions", value: "" },
                                { label: "CREATE", value: "CREATE" },
                                { label: "UPDATE", value: "UPDATE" },
                                { label: "DELETE", value: "DELETE" },
                            ]
                        }
                    ]}
                    onClear={() => router.push(pathname)}
                    onApply={() => updateQueryParams({ ...localFilters, page: 1 })}
                />
            </div>

            <div className="p-4 relative">
                {isLoading ? (
                    <AuditLogsTableSkeleton rows={params.limit} />
                ) : (
                    <>
                        <AuditLogsTable
                            logs={logsData.logs}
                            sortValue={params.sort}
                            onSortChange={(v) => updateQueryParams({ sort: v, page: 1 })}
                        />
                        {isFetching && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-40">
                                <span className="text-sm text-blue-600 font-medium animate-pulse">Updating...</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
} 