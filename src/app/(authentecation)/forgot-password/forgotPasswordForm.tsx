"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Mail, Loader2 } from 'lucide-react'
import useForgotPassword from '../hooks/use-forgot-pass'
import { EmailFormValues, emailSchema } from '@/lib/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function ForgotPasswordForm({ onSent }: { onSent: (email: string) => void }) {
    const [email, setEmail] = useState('')

    const { mutate, isPending, error } = useForgotPassword(() => {
        onSent(email)
    })

    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            mutate(email)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-11 pl-10 border-gray-200 focus-visible:ring-blue-500"
                    />
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-600 bg-red-50 p-2 border border-red-200 text-center rounded-md">
                    {error.message}
                </p>
            )}

            <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
            >
                {isPending ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        Continue <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                )}
            </Button>
        </form>
    )
}