'use client';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState, forwardRef } from 'react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="relative w-full">
                <Input
                    {...props}
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    className={`h-11 pr-10 ${className}`}
                />

                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;