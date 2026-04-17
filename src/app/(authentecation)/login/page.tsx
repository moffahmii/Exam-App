import LoginForm from "@/features/auth/components/login-form"
import Link from "next/link"

export default function Login() {
    return (
        <main className="w-full max-w-lg space-y-8 px-4">
            {/* Heading */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800 font-inter">
                    Login
                </h1>
            </div>
            {/* Form Fields */}
            <div className="space-y-2">
                <LoginForm />
            </div>
            {/* Footer Link */}
            <p className="text-center text-sm text-slate-600 font-mono">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium text-blue-600">
                    Create yours
                </Link>
            </p>
        </main>
    )
}