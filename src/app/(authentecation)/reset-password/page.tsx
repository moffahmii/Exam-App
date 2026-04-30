import ResetPasswordForm from "@/features/auth/reset-password/components/reset-password-form";

export default function ResetPasswordPage({ searchParams, }: {
    searchParams: { token?: string };
}) {
    const token = searchParams?.token || null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white">
            <ResetPasswordForm token={token} />
        </div>
    );
}