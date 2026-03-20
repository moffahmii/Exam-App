import Link from 'next/link'
import React from 'react'
import EmailInputForm from '../_components/emai-input-form'

export default function page() {
    return (
        <div className="w-full max-w-lg space-y-8 px-4 font-mono">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800 font-inter">
                    Creat account
                </h1>
                <EmailInputForm />
            </div>
            <p className="text-center text-sm text-slate-600 font-mono">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium text-blue-600">
                    Create yours
                </Link>
            </p>
        </div>
    )
}




// // <div className="w-full max-w-lg space-y-8 px-4">
// //     {/* Heading */}
// //     <div className="space-y-2">
// //         <h1 className="text-3xl font-bold text-gray-800 font-inter">
// //             Create Your Account
// //         </h1>
// //     </div>
// //     {/* Form Fields */}
// //     <div className="space-y-6">
// //         <div className='flex gap-4'>
// //             {/* First Name Field */}
// //             <div className="space-y-2 font-mono flex-1">
// //                 <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 font-sans">
// //                     First Name
// //                 </Label>
// //                 <Input
// //                     id="firstName"
// //                     placeholder="Ahmed"
// //                     className="h-11 border-gray-200 focus-visible:ring-blue-500"
// //                 />
// //             </div>
// //             {/* Last Name Field */}
// //             <div className="space-y-2 font-mono flex-1">
// //                 <Label htmlFor="lastName" >
// //                     Last Name
// //                 </Label>
// //                 <Input
// //                     id="lastName"
// //                     placeholder="Ali"
// //                     className="h-11 border-gray-200 focus-visible:ring-blue-500"
// //                 />
// //             </div>
// //         </div>
// //         {/* Username Field */}
// //         <div className="space-y-2 font-mono">
// //             <Label htmlFor="username" >
// //                 Username
// //             </Label>
// //             <Input
// //                 id="username"
// //                 placeholder="user123"
// //                 className="h-11 border-gray-200 focus-visible:ring-blue-500"
// //             />
// //         </div>
// //         {/* Email Field */}
// //         <div className="space">
// //             <Label htmlFor="email" >
// //                 Email
// //             </Label>
// //             <Input
// //                 id="email"
// //                 type="email"
// //                 placeholder="you@example.com"
// //                 className="h-11 border-gray-200 focus-visible:ring-blue-500"
// //             />
// //         </div>
// //         {/* Password Field */}
// //         <div className="space-y-4">
// //             <PasswordInput
// //                 label="Password"
// //                 id="password"
// //                 name="password"
// //             />
// //             {/* Confirm Password Field */}
// //             <PasswordInput
// //                 label="Confirm Password"
// //                 id="confirmPassword"
// //                 name="confirmPassword"
// //                 placeholder="Confirm your password"
// //             />
// //         </div>
// //     </div>
// //     {/* Login Button */}
// //     <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white">
// //         Register
// //     </Button>
// //     {/* Footer Link */}
// //     <p className="text-center text-sm text-slate-600 font-mono">
// //         Already have an account?{" "}
// //         <Link href="/login" className="font-medium text-blue-600">
// //             Login
// //         </Link>
// //     </p>
// // </div>
// <PasswordRsestSent />
