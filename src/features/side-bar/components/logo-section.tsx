import Image from "next/image";
import logo from "../../../asstes/elevatelogo.png";

const SolidFolderCode = ({ className = "" }) => (
    <svg
        width="30"
        height="30"
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

export default function LogoSection() {
    return (
        <div className="p-10 flex flex-col items-start gap-2">
            <Image
                src={logo}
                alt="Elevate Logo"
                width={192}
                height={40}
                className="grayscale brightness-30 text-gray-700 object-contain"
                priority
            />

            <div className="flex items-center gap-2 mt-1">
                <SolidFolderCode className="text-blue-600" />
                <h1 className="text-xl text-blue-600 font-mono font-semibold tracking-tight leading-none">
                    Exam App
                </h1>
            </div>
        </div>
    );
}