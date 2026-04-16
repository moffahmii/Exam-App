export function ExamProgress({ currentIndex, total }) {
    return (
        <div className="p-6">
            <div className="flex justify-between mb-2">
                <span>Quiz Session</span>
                <p>
                    Question {currentIndex + 1} of {total}
                </p>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                    className="h-full bg-blue-600"
                    style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                />
            </div>
        </div>
    );
}