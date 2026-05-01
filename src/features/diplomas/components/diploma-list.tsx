'use client';

import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { GraduationCap } from 'lucide-react';

import useDiplomas from '../hooks/use-diplomas';
import { DiplomaCard } from './DiplomaCard';
import { DiplomaSkeleton } from './DiplomaSkelteon';
import { WebsiteHeader } from '@/shared/components/custom/website-header';

// Static configuration extracted outside to prevent unnecessary re-creations on render
const BREADCRUMBS = [
    { label: "Home" }
];

export default function DiplomasList() {
    const { ref, inView } = useInView({ rootMargin: '400px' });
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useDiplomas();

    // Trigger fetching the next page when the sentinel element comes into view
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // Flatten paginated data and filter to keep only immutable diplomas
    const allDiplomas = useMemo(() => {
        const flattened = data?.pages?.flatMap(page => page.data ?? []) ?? [];
        return flattened.filter(diploma => diploma.immutable);
    }, [data]);

    return (
        <main className="w-full min-h-screen">
            <WebsiteHeader
                title="Diplomas"
                icon={<GraduationCap size={45} />}
                breadcrumbs={BREADCRUMBS}
            />

            <section className="w-full space-y-4 px-6">

                {/* Initial Loading State */}
                {status === 'pending' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <DiplomaSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {status === 'error' && (
                    <div className="text-center p-20 text-red-500 bg-red-50 border border-red-100 font-mono">
                        Failed to load diplomas. Please refresh the page.
                    </div>
                )}

                {/* Success State: Data Rendering */}
                {status === 'success' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {allDiplomas.length > 0 ? (
                            allDiplomas.map((diploma) => (
                                <DiplomaCard key={diploma.id} diploma={diploma} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10 font-mono">
                                No immutable diplomas found.
                            </div>
                        )}
                    </div>
                )}

                {/* Infinite Scroll Sentinel & Status Indicators */}
                <div ref={ref} className="flex flex-col items-center gap-2 mt-8">
                    {isFetchingNextPage ? (
                        <div className="flex items-center gap-2 text-blue-600 animate-pulse font-mono text-sm">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                            Loading more...
                        </div>
                    ) : hasNextPage ? (
                        <span className="text-gray-400 text-sm italic font-mono">
                            Scroll view more ↓
                        </span>
                    ) : allDiplomas.length > 0 && (
                        <div className="h-px w-full pb-8 flex justify-center">
                            <span className="px-4 text-sm text-gray-400 font-bold tracking-widest uppercase">
                                End of Diplomas
                            </span>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}