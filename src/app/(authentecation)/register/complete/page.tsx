import React from 'react'
import Link from 'next/link'
import UserInfoForm from '../../../../features/auth/components/user-info-form'

export default function UserInfoPage() {
    return (
        <div className="w-full max-w-lg space-y-8 px-4 ">
            {/* Header Section */}
            <header className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800 font-inter tracking-tight">
                    Create Your Account
                </h1>
                <p className="text-blue-600 font-semibold text-lg">
                    Tell us more about you
                </p>
            </header>
            {/* The Isolated Form Component */}
            <UserInfoForm />
        </div>
    )
}