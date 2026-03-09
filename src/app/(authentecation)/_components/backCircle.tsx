import { cn } from "@/lib/utils";

interface BackgroundCircleProps {
    className?: string;
    size?: string;      
}

export function BackCircle({
    className,
    size = "w-[300px] h-[300px]", 
}: BackgroundCircleProps) {
    return (
        <div
            className={cn(
                "absolute rounded-full z-10 bg-blue-400", 
                size,
                className 
            )}
        />
    );
}