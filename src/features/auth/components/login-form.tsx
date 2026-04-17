"use client"
import { Label } from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import PasswordInput from './password-Input'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'
import useLogin from '../hooks/use-login'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFields } from '../types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/shared/schemas/auth-schema'
import ErrorAlert from './ErrorAlert'

export default function LoginForm() {
    const { mutate, isPending, error: authError } = useLogin()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<LoginFields> = (data) => {
        mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="space-y-2">
                <Label
                    htmlFor="username"
                    className="text-sm font-medium text-slate-700 "
                >
                    Username
                </Label>
                <div className="relative">
                    <Input
                        id="username"
                        placeholder="Enter your username"
                        {...register('username')} 
                        className={`h-11 border-slate-200 focus-visible:ring-blue-500 ${errors.username ? "border-red-500 focus-visible:ring-red-500" : ""
                            }`}
                    />
                </div>
                {errors.username && (
                    <p className="text-sm text-red-500">{errors.username.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <PasswordInput
                    id="password"
                    {...register('password')}
                    className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
            </div>

            <div className="flex justify-end">
                <Link
                    href="/forgot-password"
                    className="text-medium text-blue-600 hover:text-blue-800 "
                >
                    Forgot your password?
                </Link>
            </div>
            {authError && (<ErrorAlert message={authError.message} />)}
            <Button
                type="submit"
                className="w-full h-11"
                disabled={isPending}
            >
                {isPending ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    )
}