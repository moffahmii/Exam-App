"use client";
import React from 'react'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import { userInfoSchema, UserInfoValues } from '@/shared/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function UserInfoForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, } = useForm<UserInfoValues>({
        resolver: zodResolver(userInfoSchema),
        mode: "onChange",
    });
    const onSubmit = (values: UserInfoValues) => {
        Cookies.set("user_info_step", JSON.stringify(values), { expires: 1 / 24 });
        router.push("/register/password");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6  ">
            <div className="space-y-6">
                <div className='flex gap-4'>
                    {/* First Name */}
                    <div className="space-y-2 flex-1">
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-800">
                            First Name
                        </Label>
                        <Input
                            {...register("firstName")}
                            id="firstName"
                            placeholder="Ahmed"
                            className={`h-11 border-gray-200 focus-visible:ring-blue-500 ${errors.firstName ? "border-red-500" : ""}`}
                        />
                        {errors.firstName && <p className="text-xs text-red-500 ">{errors.firstName.message}</p>}
                    </div>
                    {/* Last Name */}
                    <div className="space-y-2 flex-1">
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-800 ">
                            Last Name
                        </Label>
                        <Input
                            {...register("lastName")}
                            id="lastName"
                            placeholder="Ali"
                            className={`h-11 border-gray-200 focus-visible:ring-blue-500 ${errors.lastName ? "border-red-500" : ""}`}
                        />
                        {errors.lastName && <p className="text-xs text-red-500 ">{errors.lastName.message}</p>}
                    </div>
                </div>
                {/* Username */}
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-gray-800">
                        Username
                    </Label>
                    <Input
                        {...register("username")}
                        id="username"
                        placeholder="user123"
                        className={`h-11 border-gray-200 focus-visible:ring-blue-500 ${errors.username ? "border-red-500" : ""}`}
                    />
                    {errors.username && <p className="text-xs text-red-500 ">{errors.username.message}</p>}
                </div>
                {/* Phone Number */}
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-800">
                        Phone Number
                    </Label>
                    <Input
                        {...register("phone")}
                        id="phone"
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        className={`h-11 border-gray-200 focus-visible:ring-blue-500 ${errors.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 ">{errors.phone.message}</p>}
                </div>
            </div>
            {/* Next Step Button */}
            <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all "
            >
                Next Step
            </Button>
        </form>
    );
}