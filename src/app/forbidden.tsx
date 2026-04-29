import Link from "next/link";

export default function Forbidden() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">

            <div className="bg-gray-800/80 backdrop-blur border border-gray-700 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">

                {/* Icon */}
                <div className="text-red-400 text-5xl mb-4">
                    ⛔
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-white">
                    403 - Forbidden
                </h1>

                {/* Description */}
                <p className="text-gray-400 mt-3 leading-relaxed">
                    You don’t have permission to access this page.
                    <br />
                    Please contact your administrator if you think this is a mistake.
                </p>

                {/* Action */}
                <Link
                    href="/"
                    className="mt-6 inline-flex items-center justify-center bg-white text-gray-900 font-medium px-5 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                    Go Home
                </Link>

            </div>

        </div>
    );
}