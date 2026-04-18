import React from 'react';

interface StepperProps {
    step: number;
}

export function Stepper({ step }: StepperProps) {
    return (
        <div className="flex items-center w-full mb-8 px-2">
            <div className="relative flex items-center justify-center">
                {step === 1 ? (
                    <div className="w-2.5 h-2.5 bg-blue-600 rotate-45 ring-[6px] ring-blue-50"></div>
                ) : (
                    <div className="w-2.5 h-2.5 bg-blue-600 rotate-45"></div>
                )}
            </div>

            <div className="flex-1 mx-4">
                <div className={`w-full border-t-[2px] transition-all duration-300 ${step >= 2 ? 'border-solid border-blue-600' : 'border-dashed border-blue-400 opacity-60'
                    }`}></div>
            </div>

            <div className="relative flex items-center justify-center">
                {step === 2 ? (
                    <div className="w-2.5 h-2.5 bg-blue-600 rotate-45 ring-[6px] ring-blue-50"></div>
                ) : (
                    <div className="w-2.5 h-2.5 bg-white border border-blue-600 rotate-45"></div>
                )}
            </div>
        </div>
    );
}