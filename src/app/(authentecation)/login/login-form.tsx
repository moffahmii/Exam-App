"use client"
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import PasswordInput from '../_components/password-Input'
import { Button } from '@/components/ui/button'
import useLogin from '../hooks/use-login'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { isPending, mutate } = useLogin()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        // mutate({ username, password })
        const res = await signIn('credentials', {
            username,
            password,
            redirect: false,
        })
        if (!res?.ok) {
            setError(res?.error || 'Login failed')
            return;
        }
        location.href = '/'
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 font-mono">
                <Label
                    htmlFor="username"
                    className="text-sm font-medium text-slate-700 font-sans"
                >
                    Username
                </Label>
                <div className="relative">
                    <Input
                        id="username"
                        value={username}
                        onChange={(e: any) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className={`h-11 border-slate-200 focus-visible:ring-blue-500 
                                ? "border-red-500"
                                : ""
                            }`}
                    />
                </div>
            </div>
            <PasswordInput
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
            />
            {/* Forgot Password Link */}
            <div className="flex justify-end">
                <Link
                    href="/forgot-password"
                    className="text-medium text-blue-600 hover:text-blue-800 font-mono"
                >
                    Forgot your password?
                </Link>
            </div>
            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-600 font-mono text-center border bg-red-50 border-red-500 p-2">
                    {error}
                </p>
            )}
            <Button type="submit" className="w-full h-11" disabled={isPending}>
                {isPending ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    )
}