import { Brain, FileText, FolderCode } from "lucide-react";
import { BackCircle } from "./backCircle";

export default function SideContent() {
    return (
        <div className="flex flex-col justify-center px-16 bg-gray-100 relative  min-h-screen">

            <div className="absolute inset-0 pointer-events-none">
                <BackCircle
                    size={350}
                    className="top-25 left-25"
                />

                <BackCircle
                    size={400}
                    className="top-10 left-60"
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-start gap-2 mb-16">
                    <div className="bg-blue-600 text-white px-2 py-1 rounded">
                        <FolderCode />
                    </div>
                    <span className="font-semibold text-blue-600">
                        Exam App
                    </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-12">
                    Empower your learning journey with our smart exam platform.
                </h1>

                <div className="space-y-10">
                    <div className="flex gap-4">
                        <span className="border-2 border-blue-600 text-blue-600 flex items-center justify-center w-9 h-9">
                            <Brain size={24} />
                        </span>
                        <div>
                            <h3 className="font-semibold text-lg text-blue-600">
                                Tailored Diplomas
                            </h3>
                            <p className="text-gray-700 max-w-sm">
                                Choose from specialized tracks like Frontend, Backend, and Mobile Development.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <span className="border-2 border-blue-600 text-blue-600 flex items-center justify-center w-9 h-9">
                            <FileText size={24} />
                        </span>
                        <div>
                            <h3 className="font-semibold text-lg text-blue-600">
                                Focused Exams
                            </h3>
                            <p className="text-gray-700 max-w-sm">
                                Access topic-specific tests including HTML, CSS, JavaScript, and more.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <span className="border-2 border-blue-600 text-blue-600 flex items-center justify-center w-9 h-9">
                            <FileText size={24} />
                        </span>
                        <div>
                            <h3 className="font-semibold text-lg text-blue-600">
                                Smart Multi-Step Forms
                            </h3>
                            <p className="text-gray-700 max-w-sm">
                                Seamless guided forms that simplify exam applications and improve the user experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}