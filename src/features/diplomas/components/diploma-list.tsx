'use client'
import React, { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import useDiplomas from '../hooks/use-diplomas'
import { DiplomaCard } from './DiplomaCard'
import { DiplomaSkeleton } from './DiplomaSkelteon'

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
    if (status === 'pending') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
                {Array.from({ length: 6 }).map((_, i) => <DiplomaSkeleton key={i} />)}
            </div>
        )
    }
    if (status === 'error') {
        return (
            <div className="text-center p-20  text-red-500 bg-red-50 rounded-xl border border-red-100">
                Failed to load diplomas. Please refresh the page.
            </div>
        )
    }
    return (
        <section className="w-full space-y-12 p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {allDiplomas.map((diploma) => (
                    <DiplomaCard key={diploma.id} diploma={diploma} />
                ))}
            </div>
            {/* Infinite Scroll Trigger */}
            <div ref={ref} className=" flex flex-col items-center gap-2">
                {isFetchingNextPage ? (
                    <div className="flex items-center gap-2  text-blue-600 animate-pulse">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                        Loading more...
                    </div>
                ) : hasNextPage ? (
                    <span className=" text-gray-400 text-sm italic">
                        Scroll down to discover more ↓
                    </span>
                ) : (
                    <div className="h-px w-full relative">
                        <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-4 text-base text-gray-600">
                            END OF DIPLOMAS
                        </span>
                    </div>
                )}
            </div>
        </section>
    )
}