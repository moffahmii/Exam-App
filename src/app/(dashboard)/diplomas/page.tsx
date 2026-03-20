'use client'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import useDiplomas from '../hooks/use-diplomas'

export default function DiplomasList() {
    const { ref, inView } = useInView({ rootMargin: '200px' })
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useDiplomas()

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage()
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

    if (status === 'pending') return <div className="grid grid-cols-3 gap-6 p-10">{/* Skeletons here */}</div>

    return (
        <section className="container mx-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.pages.map((page, i) => (
                    <React.Fragment key={i}>
                        {page.data.map((diploma) => (
                            <Link
                                href={`/exam?id=${diploma.id}`} 
                                key={diploma.id}
                                className="group relative h-[400px] overflow-hidden rounded-md bg-slate-900"
                            >
                                <Image
                                    src={diploma.image || '/placeholder.png'}
                                    alt={diploma.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    unoptimized
                                />
                                {/* الـ Overlay الأزرق اللي في الصورة */}
                                <div className="absolute inset-0 bg-blue-600/90 flex flex-col justify-center p-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                    <h3 className="text-2xl font-bold mb-4">{diploma.title}</h3>
                                    <p className="text-sm line-clamp-6">{diploma.description}</p>
                                </div>

                                {/* العنوان اللي بيظهر تحت في الحالة العادية (اختياري) */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-blue-600 text-white z-0 group-hover:hidden">
                                    <h3 className="font-bold">{diploma.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {/* مؤشر الـ Scroll */}
            <div ref={ref} className="py-10 text-center text-slate-500">
                {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Scroll to view more ∨" : "No more diplomas"}
            </div>
        </section>
    )
}