import Image from "next/image";
import icon from "../../../asstes/folder-code.png";
import logo from "../../../asstes/elevatelogo.png";

export function LogoLight() {
    return (
        <div className="p-10 flex flex-col items-start gap-2">
            <Image
                src={logo}
                alt="Elevate Logo"
                width={192}
                height={40}
                className="object-contain"
                priority
            />

            <div className="flex items-center mt-1 gap-2">
                <Image
                    src={icon}
                    alt="Exam App Icon"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <h1 className="text-xl font-mono font-semibold tracking-tight text-blue-600">
                    Exam App
                </h1>
            </div>
        </div>
    );
}