'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeOff } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

export default function PasswordInput() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2 font-mono">
            <Label htmlFor="password" className="text-sm font-medium text-slate-700 font-sans">
                Password
            </Label>
            <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="h-11 border-slate-200 pr-10 focus-visible:ring-blue-500"
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <EyeOff size={18} />
                </button>
            </div>
        </div>
    );
}
