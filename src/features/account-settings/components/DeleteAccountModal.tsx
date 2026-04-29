'use client'
import React from 'react'
import { Button } from "@/shared/components/ui/button"
import { AlertTriangle, X, Loader2 } from 'lucide-react'

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export default function DeleteAccountModal({ isOpen, onClose, onConfirm, isLoading }: DeleteAccountModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
            <div className="relative bg-white w-139.5 h-103 flex flex-col animate-in  duration-200 font-mono">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 transition-colors z-10"
                >
                    <X size={24} />
                </button>
                <div className="flex-1 p-9 flex flex-col items-center text-center justify-center">

                    <div className="mb-6 relative flex items-center justify-center bg-red-50 rounded-full w-27.5 h-27.5">

                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle size={50} className="text-red-500" strokeWidth={1.5} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 ">
                        <span className="text-red-600 text-lg font-medium mb-2">Are you sure you want to delete your account?</span>
                        This action is permanent and cannot be undone.
                    </p>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 flex items-center justify-center gap-4 py-4 px-13.5">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 h-12 w-54.25 text-gray-800 bg-gray-200 hover:bg-gray-400 text-sm font-medium border border-gray-200 "
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={isLoading}
                        onClick={onConfirm}
                        className="flex-1 h-12 w-54.25 bg-red-600 hover:bg-red-700 text-white text-sm font-medium "
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