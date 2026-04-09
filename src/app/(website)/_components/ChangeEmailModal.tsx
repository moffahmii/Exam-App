'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ChevronRight, Loader2 } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useSession } from 'next-auth/react'
import { useChangeEmail } from '../_hooks/use-change-email'

interface ChangeEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentEmail?: string;
}
export default function ChangeEmailModal({ isOpen, onClose, currentEmail }: ChangeEmailModalProps) {
    const { update } = useSession();
    const { step, setStep, isLoading, timeLeft, handleRequest, handleVerify, reset } = useChangeEmail();
    const [newEmail, setNewEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const onNext = async () => {
        setErrorMsg(null);
        const result = await handleRequest(newEmail);
        if (!result.success) {
            setErrorMsg(result.error || "Something went wrong");
        }
    };
    const onVerify = async () => {
        setErrorMsg(null);
        const result = await handleVerify(otp);
        if (result.success) {
            await update({ user: { email: newEmail } });
            handleClose();
        } else {
            setErrorMsg(result.error || "Invalid OTP code");
        }
    };
    const handleClose = () => {
        reset();
        setNewEmail('');
        setOtp('');
        setErrorMsg(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-none w-[549px] h-[412px] p-0 border-none rounded-none font-mono flex flex-col">
                <div className="relative h-12 w-full px-6 flex items-center justify-between"></div>
                <div className="flex-1 px-10 pt-4 pb-6 flex flex-col justify-start">
                    <DialogHeader className="p-0 space-y-4">
                        <DialogTitle className="text-3xl font-bold text-slate-900 tracking-tight">Change Email</DialogTitle>
                        {step === 1 ? (
                            <>
                                <h4 className="text-xl font-semibold text-blue-600">Enter your new email</h4>
                                <div className="mt-8 space-y-2 text-left">
                                    <Label className="text-sm font-medium text-slate-500">Email</Label>
                                    <Input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => {
                                            setNewEmail(e.target.value);
                                            setErrorMsg(null); // مسح الخطأ بمجرد الكتابة
                                        }}
                                        placeholder="user@example.com"
                                        className={`h-12 rounded-none border-slate-200 focus-visible:ring-blue-600 ${errorMsg ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    />
                                    {errorMsg && (
                                        <p className="text-xs text-red-600 mt-1 animate-in fade-in slide-in-from-top-1">
                                            {errorMsg}
                                        </p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <h4 className="text-xl font-semibold text-blue-600">Verify OTP</h4>
                                <p className="text-sm text-slate-500 leading-relaxed text-left">
                                    Please enter the 6-digits code we have sent to:<br />
                                    <span className="text-slate-900 font-medium">{newEmail}</span>
                                    <button onClick={() => { setStep(1); setErrorMsg(null); }} className="ml-2 text-blue-600 underline">Edit</button>
                                </p>
                                <div className="mt-6 flex flex-col items-center gap-4">
                                    <InputOTP maxLength={6} value={otp} onChange={(val) => { setOtp(val); setErrorMsg(null); }}>
                                        <InputOTPGroup className="gap-2">
                                            {[...Array(6)].map((_, i) => (
                                                <InputOTPSlot
                                                    key={i}
                                                    index={i}
                                                    className={`w-10 h-12 border-slate-200 rounded-none text-lg font-bold ${errorMsg ? 'border-red-500 focus:ring-red-500' : ''}`}
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                    {errorMsg && (
                                        <p className="text-xs text-red-600 animate-in fade-in">
                                            {errorMsg}
                                        </p>
                                    )}
                                    <p className="text-xs text-slate-400">
                                        You can request another code in: <span className="font-bold text-slate-600">{timeLeft}s</span>
                                    </p>
                                </div>
                            </>
                        )}
                    </DialogHeader>
                </div>
                <div className="p-8 pt-0">
                    <Button
                        disabled={isLoading}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-none flex items-center justify-center gap-2 text-lg font-medium"
                        onClick={step === 1 ? onNext : onVerify}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : step === 1 ? (
                            <>Next <ChevronRight size={18} strokeWidth={3} /></>
                        ) : (
                            "Verify Code"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}