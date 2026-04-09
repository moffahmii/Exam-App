'use client'
import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'
import { useSession } from 'next-auth/react'
interface ProfileFormProps {
    initialData: {
        firstName?: string;
        lastName?: string;
        username?: string;
        email?: string;
        phone?: string;
    }
}
export default function ProfileForm({ initialData }: ProfileFormProps) {
    const { data: session } = useSession();
    // 1. تأكد من وضع قيم مبدئية عبارة عن نصوص فارغة "" وليس undefined
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (session?.user) {
            setFormData({
                // استخدم عامل الـ OR (||) لضمان عدم تمرير undefined أبداً
                firstName: session.user.firstName || '',
                lastName: session.user.lastName || '',
                username: session.user.username || '',
                email: session.user.email || '',
                phone: session.user.phone || ''
            });
        }
    }, [session]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sending Data to API:", formData);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" value={formData.firstName} onChange={handleChange} className="h-12 border-slate-200" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" value={formData.lastName} onChange={handleChange} className="h-12 border-slate-200" />
                </div>
            </div>

            <div className="space-y-2 font-mono">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={formData.username} disabled className="h-12 bg-slate-50 text-slate-500 cursor-not-allowed" />
            </div>

            <div className="space-y-2 font-mono">
                <div className="flex justify-between items-center">
                    <Label htmlFor="email">Email</Label>
                    <button type="button" className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
                        <Pencil size={14} /> Change
                    </button>
                </div>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} className="h-12 border-slate-200" />
            </div>

            <div className="space-y-2 font-mono">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={formData.phone} onChange={handleChange} className="h-12 border-slate-200" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-4 font-mono">
                <Button type="button" variant="ghost" className="flex-1 h-12 text-red-600 bg-red-50 hover:bg-red-100">
                    Delete My Account
                </Button>
                <Button type="submit" className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white">
                    Save Changes
                </Button>
            </div>
        </form>
    )
}