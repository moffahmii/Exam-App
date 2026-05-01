import { Brain, FileText, FolderCode } from "lucide-react";
import { BackCircle } from "./backCircle";

export default function SideContent() {

    const SolidFolderCode = ({ className = "" }) => (
        <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M2 6C2 4.89543 2.89543 4 4 4H9.5C10.0304 4 10.5391 4.21071 10.9142 4.58579L13.0858 6.75736C13.2733 6.94488 13.5276 7.05025 13.7929 7.05025H20C21.1046 7.05025 22 7.94568 22 9.05025V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z"
                fill="currentColor"
            />
            <path
                d="M10 10.5L7.5 13.5L10 16.5M14 10.5L16.5 13.5L14 16.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
    return (
        <div className="flex flex-col justify-center px-16 overflow-hidden bg-gray-100 relative  min-h-screen">

            <div className="absolute  inset-0 blur-3xl  opacity-60 pointer-events-none">
                <BackCircle
                    size="w-[350px] h-[350px]"
                    className="absolute top-5 left-90"
                />
                <BackCircle
                    size="w-[350px] h-[350px] "
                    className="absolute top-100 right-100"
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-16 jus">
                    <SolidFolderCode className="text-blue-600" />
                    <span className="font-semibold text-2xl text-blue-600">
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