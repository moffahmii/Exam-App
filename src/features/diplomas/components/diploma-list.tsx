'use client'
import React, { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import useDiplomas from '../hooks/use-diplomas'
import { DiplomaCard } from './DiplomaCard'
import { DiplomaSkeleton } from './DiplomaSkelteon'
import { GraduationCap } from 'lucide-react'
import { WebsiteHeader } from '@/shared/components/custom/website-header'

export default function DiplomasList() {
    const { ref, inView } = useInView({ rootMargin: '400px' })
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useDiplomas()

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

    const allDiplomas = useMemo(() =>
        data?.pages.flatMap(page => page.data) || [],
        [data])

    // تجهيز البريد كرامب
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Diplomas" }
    ];

    return (
        <main className="w-full min-h-screen">
            <WebsiteHeader
                title="Diplomas"
                icon={<GraduationCap size={32} />}
                breadcrumbs={breadcrumbs}
            />

            <section className="w-full space-y-6 p-4">

                {/* حالة التحميل الأولية */}
                {status === 'pending' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
                        {Array.from({ length: 6 }).map((_, i) => <DiplomaSkeleton key={i} />)}
                    </div>
                )}

                {/* حالة الخطأ */}
                {status === 'error' && (
                    <div className="text-center p-20 text-red-500 bg-red-50 border border-red-100">
                        Failed to load diplomas. Please refresh the page.
                    </div>
                )}

                {/* عرض البيانات */}
                {status === 'success' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {allDiplomas.map((diploma) => (
                            <DiplomaCard key={diploma.id} diploma={diploma} />
                        ))}
                    </div>
                )}

                {/* Infinite Scroll Trigger */}
                <div ref={ref} className="flex flex-col items-center gap-2">
                    {isFetchingNextPage ? (
                        <div className="flex items-center gap-2 text-blue-600 animate-pulse">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                            Loading more...
                        </div>
                    ) : hasNextPage ? (
                        <span className="text-gray-400 text-sm italic">
                            Scroll down to discover more ↓
                        </span>
                    ) : allDiplomas.length > 0 && (
                        <div className="h-px w-full relative border-t border-gray-200 mt-10">
                            <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-4 bg-gray-50 text-xs text-gray-400 font-bold tracking-widest uppercase">
                                End of Diplomas
                            </span>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}