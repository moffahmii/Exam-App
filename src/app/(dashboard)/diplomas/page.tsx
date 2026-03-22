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
    return (
        <section className="container mx-auto ">
            <div className="grid lg:grid-cols-3 gap-2">
                {data?.pages.map((page, i) => (
                    <React.Fragment key={i}>
                        {page.data.map((diploma) => (
                            <Link
                                href={`diplomas/exam?id=${diploma.id}`}
                                key={diploma.id}
                                className="relative h-112 w-105 overflow-hidden"
                            >
                                <Image
                                    src={diploma.image || '/placeholder.png'}
                                    alt={diploma.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    unoptimized
                                />
                                {/* Blue Content */}
                                <div className="absolute bottom-3.5 left-3.5 right-3.5  bg-blue-600/50 backdrop-blur-md flex flex-col justify-center p-6 text-white z-10 font-mono">
                                    <h3 className="text-xl font-semibold mb-2">{diploma.title}</h3>
                                    <p className="text-sm font-normal">{diploma.description}</p>
                                </div>
                            </Link>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            {/* Scroll */}
            <div ref={ref} className="font-normal text-base font-mono text-center text-gray-600 mt-10">
                {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Scroll to view more ∨" : "No more diplomas"}
            </div>
        </section>
    )
}