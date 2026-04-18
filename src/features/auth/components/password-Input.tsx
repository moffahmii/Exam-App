'use client';

import React, { useState, forwardRef, memo } from 'react';
import { Input } from '@/shared/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
    className,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
            <Input
                {...props}
                ref={ref}
                autoComplete='new-password'
                type={showPassword ? "text" : "password"}
                className={`h-11 border-slate-200 pr-10 focus-visible:ring-blue-500 ${className || ''}`}
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
    );
});

PasswordInput.displayName = "PasswordInput";

export default memo(PasswordInput);