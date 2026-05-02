import React from 'react';
import { XCircle } from 'lucide-react';

interface ErrorAlertProps {
    message?: string;
}

export default function ErrorAlert({ message = "Something went wrong" }: ErrorAlertProps) {
    if (!message) return null;
    return (
        <div className="relative mt-6 w-full">
            <div className="relative border border-red-500 bg-red-50 p-3 text-center pt-4 mt-2">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full">
                    <XCircle className="h-6 w-6 text-red-500" strokeWidth={1.5} />
                </div>
                <p className="text-red-600 font-medium text-sm">
                    {message}
                </p>
            </div>
        </div>
    );
}