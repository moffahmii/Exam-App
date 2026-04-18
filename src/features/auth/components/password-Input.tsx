'use client';

import React, { useState, forwardRef, memo } from 'react';
import { Input } from '@/shared/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
    className,
    label,
    error,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-1 w-full">
            {/* عرض الليبل إذا وجد */}
            {label && (
                <label className="text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}

            <div className="relative">
                <Input
                    {...props}
                    ref={ref}
                    autoComplete='new-password'
                    type={showPassword ? "text" : "password"}
                    className={`h-11 border-slate-200 pr-10 focus-visible:ring-blue-500 ${error ? 'border-red-500' : ''} ${className || ''}`}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
            </div>
            {error && (
                <p className="text-xs font-medium text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";

export default memo(PasswordInput);