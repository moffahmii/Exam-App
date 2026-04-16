'use client'

import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import useDiplomas from '../_hooks/use-diplomas'
import { Skeleton } from "@/components/ui/skeleton" // استيراد السكيلتون

export default function DiplomasList() {
    const { ref, inView } = useInView({ rootMargin: '200px' })
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useDiplomas()

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

    if (status === 'pending') {
        return (
            <section className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] justify-items-center">
                    {/* بنعرض 6 كروت سكيلتون بشكل افتراضي عشان نملى الشاشة */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <DiplomaSkeleton key={i} />
                    ))}
                </div>
            </section>
        )
    }

    if (status === 'error') {
        return <div className="text-center p-10 font-mono text-red-500">Failed to load diplomas.</div>
    }

    return (
        <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] justify-items-center">
                {data?.pages.map((page, i) => (
                    <React.Fragment key={i}>
                        {page.data.map((diploma: any) => (
                            <DiplomaCard key={diploma.id} diploma={diploma} />
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <div ref={ref} className="font-normal text-base font-mono text-center text-gray-400 mt-12 py-4">
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                        ? "Scroll to view more ↓"
                        : "No more diplomas"}
            </div>
        </section>
    )
}

function DiplomaSkeleton() {
    return (
        <div className="w-full max-w-[336px] h-[446px] p-[10px] rounded-2xl bg-white shadow-sm flex flex-col">
            {/* المساحة الرمادية اللي بتمثل الصورة */}
            <Skeleton className="w-full h-full rounded-xl relative overflow-hidden">

                {/* المربع اللي تحت اللي بيمثل المحتوى الأزرق */}
                <div className="absolute bottom-[20px] left-[20px] right-[20px] bg-gray-200/50 backdrop-blur-sm p-4 rounded-xl flex flex-col gap-2">
                    {/* سكيلتون للعنوان */}
                    <Skeleton className="h-6 w-3/4 bg-gray-300" />
                    {/* سكيلتون للوصف (سطرين) */}
                    <Skeleton className="h-4 w-full bg-gray-300 mt-1" />
                    <Skeleton className="h-4 w-4/5 bg-gray-300" />
                </div>

            </Skeleton>
        </div>
    )
}

function DiplomaCard({ diploma }: { diploma: IDiplomas }) {
    return (
        <Link
            href={`/diplomas/exam?id=${diploma.id}`}
            className="group block relative w-full max-w-[336px] h-[446px] p-[10px] rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                    src={
                        diploma.image
                            ? (diploma.image.startsWith('http') ? diploma.image : `https://exam-app.elevate-bootcamp.cloud${diploma.image}`)
                            : '/placeholder.png'
                    }
                    alt={diploma.title || "Diploma Image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />
            </div>

            <div className="absolute bottom-[20px] left-[20px] right-[20px] bg-blue-600/70 backdrop-blur-md flex flex-col justify-center p-4 rounded-xl text-white z-10 font-mono transform transition-transform duration-300 group-hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-1 truncate">{diploma.title}</h3>
                <p className="text-sm font-medium text-blue-50 line-clamp-2">
                    {diploma.description}
                </p>
            </div>
        </Link>
    )
}