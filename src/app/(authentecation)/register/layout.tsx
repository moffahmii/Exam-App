import React from "react";
import RegistrationStepper from "../_components/stepper";

interface RegisterLayoutProps {
    children: React.ReactNode;
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
    return (
        <div className="flex flex-col w-full max-w-lg mx-auto">
            <div className="mb-8">
                <RegistrationStepper />
            </div>
            <div className="flex-1 transition-all duration-500 ease-in-out">
                {children}
            </div>
        </div>
    );
}