"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function RegistrationStepper() {
    const pathname = usePathname();

    // الخطوات الـ 4 بالترتيب الجديد
    const steps = [
        { label: "Email", path: "/register" },
        { label: "Verify", path: "/register/verify" },
        { label: "Info", path: "/register/complete" }, // الصفحة اللي فيها الاسم والفون
        { label: "Password", path: "/register/password" }, // الصفحة الأخيرة
    ];

    const currentStepIndex = steps.findIndex((s) => s.path === pathname);

    return (
        <div className="relative flex w-full flex-col items-center">
            <div className="relative flex w-full items-center justify-between px-2">

                {/* الخط الرمادي المنقط الخلفي */}
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 border-t-2 border-dotted border-slate-200 -z-10" />

                {steps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isActive = index === currentStepIndex;

                    return (
                        <div key={index} className="flex flex-col items-center gap-3 relative">

                            {/* الـ Diamond */}
                            <div
                                className={cn(
                                    "h-3 w-3 rotate-45 border-2 transition-all duration-500",
                                    isCompleted || isActive
                                        ? "bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                                        : "bg-white border-slate-300"
                                )}
                            />

                            {/* الخط الأزرق الواصل */}
                            {index < steps.length -1 && (
                                <div
                                    className={cn(
                                        "absolute left-full top-1/2 h-0.5 -translate-y-1/2 -z-10 transition-all duration-700",
                                        index < currentStepIndex ? "bg-blue-600" : "bg-transparent"
                                    )}
                                    // هنا عدلنا المعادلة عشان تقسم الشاشة على 4 نقط (3 فواصل)
                                    style={{ width: "calc(100vw / 6.5)" }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}