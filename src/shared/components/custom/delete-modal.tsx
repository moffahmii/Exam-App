'use client'

import React from 'react'
import { Button } from "@/shared/components/ui/button"
import { AlertTriangle, X, Loader2 } from 'lucide-react'

interface GlobalDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    isLoading?: boolean;
    title?: string;
    description?: string;
}

export function GlobalDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
    title = "Are you sure you want to delete your account?",
    description = "This action is permanent and cannot be undone."
}: GlobalDeleteModalProps) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200 p-4">
            <div className="relative bg-white w-139.5 h-103 flex flex-col animate-in zoom-in-95 duration-200 font-mono shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col items-center justify-center px-10">
                    {/* Icon Section */}
                    <div className="mb-6 flex items-center justify-center bg-red-50 rounded-full w-27.5 h-27.5 shrink-0">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle size={50} className="text-red-500" strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="w-full text-center space-y-3">
                        <h3 className="text-red-600 text-lg font-bold leading-tight wrap-break-words px-2">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed wrap-break-words px-4">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Footer Buttons Section */}
                <div className="border-t border-gray-200 bg-gray-50 flex items-center justify-center gap-4 py-6 px-13.5 shrink-0">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 h-12 text-gray-800 bg-gray-200 hover:bg-gray-300 text-sm font-medium border border-gray-200 rounded-none transition-colors"
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={isLoading}
                        onClick={onConfirm}
                        className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-none transition-colors"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin size-4" />
                        ) : (
                            "Yes, delete"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}