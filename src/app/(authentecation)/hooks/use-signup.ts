import { signupAction } from "@/lib/api/auth/auth-api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function useSignup() {
    const router = useRouter();

    return useMutation({
        mutationKey: ['Signup'],
        mutationFn: signupAction,
        onSuccess: (data) => {
            // 1. تخزين الـ Token الحقيقي (عشان يفضل عامل Login)
            Cookies.set("token", data.token, { expires: 7 }); // يعيش 7 أيام مثلاً

            // 2. تنظيف "الشنط" المؤقتة (Cleaning up)
            Cookies.remove("user_email");
            Cookies.remove("user_info_step");
            Cookies.remove("auth_stage");


            // 3. التحويل لصفحة الـ Home أو الـ Login
            router.push("/");
        },
        onError: (error: any) => {
            console.log(error)
        }
    });
}