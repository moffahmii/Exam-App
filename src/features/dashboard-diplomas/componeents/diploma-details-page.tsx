"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Ban } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { PageHeader } from "@/shared/components/custom/header-page";
import { GlobalDeleteModal } from "@/shared/components/custom/delete-modal";
import { IDiplomas } from "@/shared/types/diplomas";

import useDiplomaDetails from "../hooks/use-single-diploma-details";
import useDeleteDiploma from "../hooks/use-delete-diploma";
import { DiplomaDetailsSkeleton } from "../skeletons/diploma-details-skeleton";

export default function DiplomaDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const id = params.id;

    const { data: diploma, isLoading, isError } = useDiplomaDetails(id);
    const { mutate: deleteDiploma, isPending: isDeleting } = useDeleteDiploma();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (isLoading) return <DiplomaDetailsSkeleton />;

    const diplomaData = diploma as IDiplomas;

    if (isError || !diplomaData) {
        return (
            <div className="p-6 text-red-500 font-medium text-center">
                Error loading diploma details or not found.
            </div>
        );
    }

    const pageBreadcrumbs = [
        { label: "Diplomas", href: "/dashboard/diplomas" },
        { label: diplomaData.title }
    ];

    const handleConfirmDelete = () => {
        deleteDiploma(id, {
            onSuccess: () => {
                setShowDeleteModal(false);
                router.push("/dashboard/diplomas");
            }
        });
    };

    return (
        <div className="h-auto w-full bg-gray-100 min-h-screen">
            <PageHeader breadcrumbs={pageBreadcrumbs}>
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-black font-semibold font-inter text-xl">
                        {diplomaData.title}
                    </h2>

                    <div className="flex items-center gap-3">
                        {diplomaData.immutable && (
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-800 text-sm font-medium bg-gray-200 h-10">
                                <Ban size={16} />
                                Immutable
                            </div>
                        )}

                        {diplomaData.immutable ? (
                            <Button disabled className="bg-blue-600 h-10 text-sm font-medium flex items-center gap-2 px-4 py-2">
                                <Pencil size={18} /> Edit
                            </Button>
                        ) : (
                            <Button asChild className="bg-blue-600 hover:bg-blue-700 h-10 text-sm font-medium text-white flex items-center gap-2 px-4 py-2">
                                <Link href={`/dashboard/diplomas/edit/${id}`}>
                                    <Pencil size={18} /> Edit
                                </Link>
                            </Button>
                        )}

                        <Button
                            disabled={diplomaData.immutable}
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-red-600 hover:bg-red-700 text-sm font-medium text-white flex items-center gap-2 px-4 py-2 h-10"
                        >
                            <Trash2 size={18} /> Delete
                        </Button>
                    </div>
                </div>
            </PageHeader>

            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white p-4 border border-gray-200">
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-3">Image</h3>
                            <div className="relative overflow-hidden">
                                <Image
                                    width={400}
                                    height={300}
                                    unoptimized
                                    src={diplomaData.image}
                                    alt={diplomaData.title}
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-3">Title</h3>
                            <p className="text-base font-medium text-black">{diplomaData.title}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-3">Description</h3>
                            <p className="text-sm font-normal text-gray-800 leading-relaxed">
                                {diplomaData.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <GlobalDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Diploma"
                description={`Are you sure you want to delete "${diplomaData.title}"?`}
                isLoading={isDeleting}
            />
        </div>
    );
}