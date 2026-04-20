"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Pencil, Trash2, Ban } from "lucide-react";
import useDiplomaDetails from "../hooks/use-single-diploma-details";
import { PageHeader } from "@/features/dashboard-header/components/header-page";


export default function DiplomaDetailsPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const { data: diploma, isLoading, isError } = useDiplomaDetails(id);
    if (isLoading) {
        return <div className="p-6 text-gray-500">Loading diploma details...</div>;
    }
   const diplomaData = diploma as IDiplomas;
    if (isError || !diplomaData) {
        return (
            <div className="p-6 text-red-500">
                Error loading diploma details or not found.
            </div>
        );
    }

    return (
        <div className="h-auto">
            <PageHeader
                title={diplomaData.title}
                actions={
                    <>
                        {diplomaData.immutable && (
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-700 text-sm font-medium border">
                                <Ban size={16} />
                                Immutable
                            </div>
                        )}
                        <Button
                            asChild
                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                        >
                            <Link href={`/dashboard/diplomas/${id}/edit`}>
                                <Pencil size={16} />
                                Edit
                            </Link>
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                            <Trash2 size={16} />
                            Delete
                        </Button>
                    </>
                }
            />

            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white p-4">
                    <div className="flex flex-col gap-8">
                        <div className="w-75 h-75">
                            <h3 className="text-sm font-medium text-gray-400 mb-3">Image</h3>
                            <div className="relative overflow-hidden bg-gray-50">
                                <img
                                    src={diplomaData.image}
                                    alt={diplomaData.title}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">Title</h3>
                            <p className="text-base font-medium text-gray-900">
                                {diplomaData.title}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">
                                Description
                            </h3>
                            <p className="text-base text-gray-700 leading-relaxed max-w-5xl">
                                {diplomaData.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}