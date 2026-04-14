"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import PasswordInput from "./password-Input";
import { PasswordFormValues, passwordSchema } from "@/lib/schemas/auth-schema";
import useSignup from "../hooks/use-signup";

export default function PasswordStepForm() {
    const { mutate, isPending, error } = useSignup();

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        mode: "onChange",
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: PasswordFormValues) => {
        const email = Cookies.get("user_email");
        const infoData = JSON.parse(Cookies.get("user_info_step") || "{}");

        const finalPayload = {
            username: infoData.username,
            email: email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            firstName: infoData.firstName,
            lastName: infoData.lastName,
            phone: infoData.phone,
        };

        mutate(finalPayload as any);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirm Password */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} placeholder="Confirm your password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && (
                    <p className="text-sm text-red-500 font-mono bg-red-50 p-3 rounded-md border border-red-100">
                        {(error as Error).message}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md"
                >
                    {isPending ? "Creating Account..." : "Create Account"}
                </Button>
            </form>
        </Form>
    );
}