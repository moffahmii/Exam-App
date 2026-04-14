'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState, forwardRef } from 'react'
interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
    label = "Password",
    id = "password",
    placeholder = "********",
    error,
    className,
    ...props 
}, ref) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2 font-mono w-full">
            <Label htmlFor={id} className="text-sm font-medium text-slate-700 font-sans">
                {label}
            </Label>
            <div className="relative">
                <Input
                    {...props}
                    ref={ref} 
                    id={id}
                    autoComplete='new-password'
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className={`h-11 border-slate-200 pr-10 focus-visible:ring-blue-500 ${error ? "border-red-500 focus-visible:ring-red-500" : ""} ${className}`}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
            </div>
            {error && (
                <p className="text-[10px] text-red-500 font-mono mt-1 ml-1">
                    {error}
                </p>
            )}
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;