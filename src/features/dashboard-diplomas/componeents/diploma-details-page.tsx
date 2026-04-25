"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Pencil, Trash2, Ban } from "lucide-react";
import useDiplomaDetails from "../hooks/use-single-diploma-details";
import { PageHeader } from "@/features/dashboard-header/components/header-page";
import { useState } from "react";
import { DeleteDiplomaModal } from "./diploma-deletion-moadal";
import { useRouter } from "next/navigation";
export default function DiplomaDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const id = params.id;
    const { data: diploma, isLoading, isError } = useDiplomaDetails(id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
            <PageHeader>
                {/* التوزيع يتم هنا في الصفحة نفسها */}
                <div className="flex items-center justify-between w-full">

                    {/* جهة اليسار: العنوان */}
                    <h2 className="text-black font-semibold font-inter text-lg">
                        {diplomaData.title}
                    </h2>

                    {/* جهة اليمين: الأزرار */}
                    <div className="flex items-center gap-3">
                        {diplomaData.immutable && (
                            <div className="flex items-center gap-2 px-4 py-2 text-gray-800 text-sm font-medium bg-gray-200 h-10">
                                <Ban size={16} />
                                Immutable
                            </div>
                        )}

                        {diplomaData.immutable ? (
                            <Button
                                disabled
                                className="flex items-center bg-blue-600 gap-2 px-4 py-2 text-sm font-medium h-10"
                            >
                                <Pencil size={18} />
                                Edit
                            </Button>
                        ) : (
                            <Button
                                asChild
                                className="bg-blue-600 hover:bg-blue-700 h-10 text-sm font-medium text-white flex items-center gap-2 px-4 py-2"
                            >
                                <Link href={`/dashboard/diplomas/edit/${id}`}>
                                    <Pencil size={18} />
                                    Edit
                                </Link>
                            </Button>
                        )}

                        <Button
                            disabled={diplomaData.immutable}
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-red-600 hover:bg-red-700 text-sm font-medium text-white flex items-center gap-2 px-4 py-2 h-10"
                        >
                            <Trash2 size={18} />
                            Delete
                        </Button>
                    </div>
                </div>
            </PageHeader>
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white p-4">
                    <div className="flex flex-col gap-8">
                        <div className="">
                            <h3 className="text-sm font-normal text-gray-400 mb-3">Image</h3>
                            <div className="relative overflow-hidde">
                                <Image
                                    width={600}
                                    height={300}
                                    unoptimized
                                    src={diplomaData.image}
                                    alt={diplomaData.title}
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-3">Title</h3>
                            <p className="text-base font-medium text-black">
                                {diplomaData.title}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-normal text-gray-400 mb-3">
                                Description
                            </h3>
                            <p className="text-sm font-normal text-gray-800">
                                {diplomaData.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteDiplomaModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                diplomaId={id}
                diplomaTitle={diplomaData.title}
            />
        </div>
    );
}