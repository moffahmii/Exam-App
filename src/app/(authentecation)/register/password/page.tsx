import React from 'react'
import PasswordStepForm from '../../_components/PasswordStepForm'

export default function PasswordPage() {
    return (
        <div className="w-full max-w-lg space-y-8 px-4">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800 font-inter tracking-tight">
                    Create Account
                </h1>
                <p className="text-blue-600 font-semibold text-lg">
                    Create a strong password
                </p>
            </header>

            <PasswordStepForm />
        </div>
    )
}