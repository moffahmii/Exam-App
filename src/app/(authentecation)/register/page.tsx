import Link from 'next/link'
import React from 'react'
import EmailInputForm from '../../../features/auth/components/emai-input-form'

export default function page() {
    return (
        <div className="w-full max-w-lg space-y-8 px-4">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800 font-inter">
                    Creat account
                </h1>
                <EmailInputForm />
            </div>
            <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-blue-600">
                    Login here.
                </Link>
            </p>
        </div>
    )
}

