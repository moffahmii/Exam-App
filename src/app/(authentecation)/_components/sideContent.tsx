import { Brain, FileText, FolderCode } from "lucide-react";
import { BackCircle } from "./backCircle";

export default function SideContent() {
    return (
        <div className="hidden lg:flex flex-col justify-center overflow-hidden px-16 bg-gray-100 h-screen border-r relative">

            {/* Background Layer */}
            <div className="absolute inset-0 blur-3xl opacity-40 pointer-events-none">
                <BackCircle
                    size="w-[350px] h-[350px]"
                    className="absolute top-5 left-90"
                />
                <BackCircle
                    size="w-[350px] h-[350px]"
                    className="absolute top-100 right-100"
                />
            </div>
            {/* Content Layer */}
            <div className="relative z-10">
                {/* Logo */}
                <div className="flex items-start gap-2 mb-16">
                    <div className="bg-blue-600 text-white px-2 py-1 rounded">
                        <FolderCode />
                    </div>
                    <span className="font-semibold text-blue-600 font-mono">
                        Exam App
                    </span>
                </div>
                {/* Title */}
                <h1 className="text-3xl items-center font-bold text-gray-800 mb-12 font-inter">
                    Empower your learning journey with our smart exam platform.
                </h1>
                {/* Features */}
                <div className="space-y-10">
                    {/* Feature 1 */}
                    <div className="flex gap-4 font-mono">
                        <span className="border-2 border-blue-600 text-blue-600 flex items-center justify-center w-9 h-9">
                            <Brain size={24} />
                        </span>
                        <div>
                            <h3 className="font-semibold text-lg text-blue-600">
                                Tailored Diplomas
                            </h3>
                            <p className="font-normal text-gray-700 max-w-sm">
                                Choose from specialized tracks like Frontend, Backend,
                                and Mobile Development.
                            </p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="flex gap-4 font-mono">
                        <span className="border-2 border-blue-600 text-blue-600 flex items-center justify-center w-9 h-9">
                            <FileText size={24} />
                        </span>
                        <div>
                            <h3 className="font-semibold text-lg text-blue-600">
                                Focused Exams
                            </h3>
                            <p className="font-normal text-gray-700 max-w-sm">
                                Access topic-specific tests including HTML, CSS,
                                JavaScript, and more.
                            </p>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="flex gap-4 font-mono">
                        <span className="border-2 border-blue-600 text-blue-600 flex items-center justify-center w-9 h-9">
                            <FileText size={24} />
                        </span>
                        <div>
                            <h3 className="font-semibold text-lg text-blue-600">
                                Smart Multi-Step Forms
                            </h3>
                            <p className="font-normal text-gray-700 max-w-sm">
                                Seamless guided forms that simplify exam applications
                                and improve the user experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}