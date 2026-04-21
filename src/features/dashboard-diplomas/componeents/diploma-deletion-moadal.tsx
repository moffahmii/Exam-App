"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";
import useDeleteDiploma from "../hooks/use-delete-diploma";

interface DeleteDiplomaModalProps {
    isOpen: boolean;
    onClose: () => void;
    diplomaId: string;
    diplomaTitle: string;
}

export function DeleteDiplomaModal({ isOpen, onClose, diplomaId, diplomaTitle, }: DeleteDiplomaModalProps) {
    const router = useRouter();
    const { mutateAsync: deleteDiploma, isPending } = useDeleteDiploma();
    const handleConfirmDelete = async () => {
        try {
            await deleteDiploma(diplomaId);
            onClose(); 
            router.push("/dashboard/diplomas"); 
        } catch (error) {
            console.error("Error deleting diploma:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <AlertTriangle className="text-red-600" size={24} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                        Delete Diploma
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Are you sure you want to delete <span className="font-semibold text-gray-900">"{diplomaTitle}"</span>? This action cannot be undone and will permanently remove the data from our servers.
                    </p>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isPending}
                        onClick={onClose}
                        className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        disabled={isPending}
                        onClick={handleConfirmDelete}
                        className="bg-red-600 hover:bg-red-700 text-white min-w-[100px]"
                    >
                        {isPending ? "Deleting..." : "Yes, Delete"}
                    </Button>
                </div>
            </div>
        </div>
    );
}