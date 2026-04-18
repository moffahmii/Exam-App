"use client"
import Link from 'next/link'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Field, FieldLabel, FieldError, FieldGroup } from '@/shared/components/ui/field'
import PasswordInput from './password-Input'
import ErrorAlert from './ErrorAlert'
import useLogin from '../hooks/use-login'
import { LoginFields } from '../types/auth'
import { loginSchema } from '@/shared/schemas/auth-schema'

export default function LoginForm() {
    const { mutate, isPending, error: authError } = useLogin()
    const form = useForm<LoginFields>({
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/*Username*/}

            <FieldGroup>
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="User123"
                                value={field.value ?? ""}
                                className="h-11 border-slate-200 focus-visible:ring-blue-500"
                                aria-invalid={fieldState.invalid}
                                autoComplete='username'
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
            {/* password */}
            <FieldGroup>
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                            <PasswordInput
                                {...field}
                                id={field.name}
                                value={field.value ?? ""}
                                placeholder="********"
                                autoComplete='current-password'
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
            {/* Forgot password link */}
            <div className="flex justify-end">
                <Link
                    href="/forgot-password"
                    className="text-medium text-blue-600 hover:text-blue-800"
                >
                    Forgot your password?
                </Link>
            </div>
            {/* Server Error */}
            {authError && <ErrorAlert message={authError.message} />}
            {/* Login button */}
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