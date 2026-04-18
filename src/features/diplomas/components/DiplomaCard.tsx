'use client'

import Image from 'next/image'
import Link from 'next/link'

export function DiplomaCard({ diploma }: { diploma: IDiplomas }) {
    return (
        <Link
            href={`/diplomas/exam?id=${diploma.id}`}
            className="group block relative w-full min-w-84 h-111.5 "
        >
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src={diploma.image}
                    alt={diploma.title || "Diploma Image"}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
            <div className="absolute bottom-5 left-5 right-5 bg-blue-600/80 flex flex-col justify-center p-4 font-mono">
                <h3 className="text-2xl font-bold text-white mb-1 truncate">
                    {diploma.title}
                </h3>
                <p className="text-sm font-normal text-white/90 line-clamp-2 leading-relaxed">
                    {diploma.description}
                </p>
            </div>
        </Link>
    )
}