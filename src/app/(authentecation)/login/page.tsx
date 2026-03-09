import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PasswordInput from "../_components/password-Input"

export default function LoginForm() {
    return (
        <div className="w-full max-w-lg space-y-8 px-4">
            {/* Heading */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800 font-inter">
                    Login
                </h1>
            </div>
            {/* Form Fields */}
            <div className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2 font-mono">
                    <Label htmlFor="username" className="text-sm font-medium text-slate-700 font-sans">
                        Username
                    </Label>
                    <Input
                        id="username"
                        placeholder="user123"
                        className="h-11 border-gray-200 focus-visible:ring-blue-500"
                    />
                </div>
                {/* Password Field */}
                <PasswordInput />
                {/* Forgot Password Link */}
                <div className="flex justify-end font-mono">
                    <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-blue-600 hover:underline font-sans underline-none "
                    >
                        Forgot your password?
                    </Link>
                </div>
            </div>
            {/* Login Button */}
            <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white">
                Login
            </Button>
            {/* Footer Link */}
            <p className="text-center text-sm text-slate-600 font-mono">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium text-blue-600">
                    Create yours
                </Link>
            </p>
        </div>
    )
}