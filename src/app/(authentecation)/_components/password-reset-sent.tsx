import React from 'react'

export default function PasswordRsestSent({ email }: { email: string }) {
    return (
        <div className="w-full max-w-lg space-y-8 px-4 font-mono">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800 font-inter">
                    Password Reset Sent
                </h1>
                <p className="font-normal text-gray-800">
                    We have sent a password reset link to:
                    <span className='text-blue-500'>{email}</span>
                </p>
                <p className='font-normal text-gray-800 my-10' >Please check your inbox and follow the instructions to reset your password.</p>
                <p className='font-normal text-gray-500'>If you don’t see the email within a few minutes, check your spam or junk folder.</p>
            </div>
        </div>
    )
}
