import Image from "next/image";
import icon from "../../../asstes/folder-code.png"
import logo from "../../../asstes/elevatelogo.png"

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
            <div className="flex items-center  mt-1">
                <Image
                    src={icon}
                    alt="Exam App Icon"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <h1 className="text-xl text-blue-600 font-mono font-semibold tracking-tight leading-none">
                    Exam App
                </h1>
            </div>
        </div>
    );
}