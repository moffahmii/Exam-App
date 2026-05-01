import Image from 'next/image'
import React from 'react'
import { FolderCode } from 'lucide-react' 
import logo from "../../../asstes/elevatelogo.png"

export default function DashLogoSection() {
    return (
        <div className="p-10 flex flex-col items-start gap-2">
            <Image
                src={logo}
                alt="Elevate Logo"
                width={192}
                height={40}
                className="brightness-0 invert object-contain"
                priority
            />
            <div className="flex items-center mt-1 gap-1">
                <FolderCode
                    size={30}
                    className="text-white"
                    strokeWidth={2}
                />
                <h1 className="text-xl text-white font-mono font-semibold tracking-tight leading-none">
                    Exam App
                </h1>
            </div>
        </div>
    )
}