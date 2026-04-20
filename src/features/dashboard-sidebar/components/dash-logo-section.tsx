import Image from 'next/image'
import React from 'react'
import icon from "../../../asstes/folder-code.png"
import logo from "../../../asstes/elevatelogo.png"

export default function DashLogoSection() {
    return (
        <div className="p-10 flex flex-col items-start gap-2">
            <Image
                src={logo}
                alt="Elevate Logo"
                width={192}
                height={40}
                /* تعديل الـ brightness والـ invert لجعل اللوجو يظهر باللون الأبيض */
                className="brightness-0 invert object-contain"
                priority
            />
            <div className="flex items-center mt-1 gap-1">
                <Image
                    src={icon}
                    alt="Exam App Icon"
                    width={30}
                    height={30}
                    /* إذا كان الأيقونة ملونة، يمكنك جعلها بيضاء أيضاً باستخدام brightness-0 invert */
                    className="object-contain brightness-0 invert"
                />
                <h1 className="text-xl text-white font-mono font-semibold tracking-tight leading-none">
                    Exam App
                </h1>
            </div>
        </div>
    )
}
