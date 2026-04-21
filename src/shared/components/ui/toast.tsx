'use client'

import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
}

export function Toast({ message, type = 'success', isVisible, onClose }: ToastProps) {
    // إخفاء الإشعار تلقائياً بعد 3 ثواني
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="flex items-center gap-3 bg-[#1e2530] text-slate-200 px-5 py-3.5 rounded shadow-xl border border-slate-700/50 min-w-[300px]">
                {type === 'success' ? (
                    <Check size={18} className="text-[#00c07f] flex-shrink-0" strokeWidth={2.5} />
                ) : (
                    <X size={18} className="text-red-400 flex-shrink-0" strokeWidth={2.5} />
                )}
                <span className="text-sm font-medium tracking-wide font-mono sm:font-sans">
                    {message}
                </span>
            </div>
        </div>
    );
}