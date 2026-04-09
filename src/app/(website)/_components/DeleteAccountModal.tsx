'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X } from 'lucide-react'

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export default function DeleteAccountModal({ isOpen, onClose, onConfirm, isLoading }: DeleteAccountModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[600px] p-0 border-none rounded-none font-mono overflow-hidden">

                {/* زر الإغلاق المخصص */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-12 flex flex-col items-center text-center space-y-6">
                    {/* أيقونة التحذير مع الدوائر الخلفية */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-24 h-24 bg-red-50 rounded-full animate-pulse" />
                        <div className="absolute w-16 h-16 bg-red-100/50 rounded-full" />
                        <div className="relative w-12 h-12 flex items-center justify-center text-red-500">
                            <AlertTriangle size={48} strokeWidth={1.5} />
                        </div>
                    </div>

                    <DialogHeader className="space-y-3">
                        <DialogTitle className="text-2xl font-bold text-red-600">
                            Are you sure you want to delete your account?
                        </DialogTitle>
                        <DialogDescription className="text-lg text-slate-500 max-w-[400px] mx-auto leading-relaxed">
                            This action is permanent and cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* منطقة الأزرار (الـ Footer) */}
                <div className="p-8 pt-0 flex gap-4">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1 h-14 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-none text-lg font-medium"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={onConfirm}
                        className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white rounded-none text-lg font-medium"
                    >
                        {isLoading ? "Deleting..." : "Yes, delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}